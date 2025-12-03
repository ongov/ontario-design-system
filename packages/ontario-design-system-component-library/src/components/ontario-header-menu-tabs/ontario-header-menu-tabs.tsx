import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { HeaderKeyboardNavigation } from '../../utils/components/header/header-keyboard-navigation';

@Component({
	tag: 'ontario-header-menu-tabs',
	styleUrl: 'ontario-header-menu-tabs.scss',
	shadow: true,
})
export class OntarioHeaderMenuTabs {
	@Element() el: HTMLElement;

	/* ===========================
        Props & State
    =========================== */
	/**
	 * Menu items for the "Topics" tab.
	 * Can be passed as a MenuItem array or JSON string.
	 *
	 * @example
	 * topicsMenuItems={[
	 *   { href: '/about', title: 'About' },
	 *   { href: '/services', title: 'Services' }
	 * ]}
	 */
	@Prop() topicsMenuItems: MenuItem[] | string;

	/**
	 * Menu items for the "Sign In" tab.
	 * Can be passed as a MenuItem array or JSON string.
	 *
	 * @example
	 * signInMenuItems={[
	 *   { href: '/login', title: 'Login' },
	 *   { href: '/register', title: 'Register' }
	 * ]}
	 */
	@Prop() signInMenuItems: MenuItem[] | string;

	/**
	 * Reference to the menu button that opens this dropdown.
	 * Used for focus trapping - allows focus to loop back to the button.
	 *
	 * @example
	 * menuButtonRef={this.menuButton}
	 */
	@Prop() menuButtonRef?: HTMLElement;

	/**
	 * Enable auto-detect handoff.
	 */
	@Prop() autoDetectMode?: boolean = false;

	/**
	 * The currently active tab index.
	 * 0 = Topics tab, 1 = Sign In tab
	 */
	@State() private activeTab: number = 0;

	/**
	 * Whether the menu dropdown is currently open.
	 * Controlled by the menuButtonToggled event from the header.
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * Parsed topics menu items (converted from string if needed).
	 */
	@State() private topicsMenuItemsState: MenuItem[] = [];

	/**
	 * Parsed sign-in menu items (converted from string if needed).
	 */
	@State() private signInMenuItemsState: MenuItem[] = [];

	/**
	 * Current focused menu item index for arrow key navigation.
	 * Undefined when no menu item is focused (e.g., when a tab button has focus).
	 */
	private currentIndex: number | undefined = undefined;

	/**
	 * Reference to the menu container element.
	 */
	private menu!: HTMLElement;

	/**
	 * Reference to the ARIA live region for screen reader announcements.
	 */
	private ariaLiveRegion!: HTMLElement;

	/**
	 * Cleanup function for the focus trap event listener.
	 * Called when menu closes to remove the event listener.
	 */
	private focusTrapCleanup: (() => void) | null = null;

	/**
	 * Return the navigation container element used for focus-trapping.
	 * Prefer the header's shadowRoot container first (covers embedded case),
	 * then fall back to the ref'd this.menu for standalone rendering.
	 */
	private getMenuContainer(): HTMLElement | null {
		// Prefer container that's rendered in the component shadow root (used in the tabbed layout)
		const containerFromShadow = this.el.shadowRoot?.querySelector(
			'.ontario-application-navigation__container',
		) as HTMLElement | null;
		if (containerFromShadow) return containerFromShadow;

		// If this.menu is the full nav (standalone), return it directly
		if (this.menu && this.menu.classList?.contains('ontario-application-navigation')) return this.menu;

		// Otherwise try to find the container inside the ref'd menu (fallback)
		return (this.menu?.querySelector('.ontario-application-navigation__container') as HTMLElement | null) || null;
	}

	/**
	 * Whether we've already installed the focus trap for the currently-open panel.
	 * Prevents duplicate installs across lifecycle ticks / events.
	 */
	private trapInstalled = false;

	/* ===========================
        Lifecycle
    =========================== */
	/**
	 * Lifecycle hook called before the component is loaded.
	 * Parses menu items from props.
	 */
	componentWillLoad() {
		this.parseMenuItems();
	}

	/**
	 * Watches for changes to menu item props and re-parses them.
	 * Automatically called when topicsMenuItems or signInMenuItems change.
	 */
	@Watch('topicsMenuItems')
	@Watch('signInMenuItems')
	parseMenuItems() {
		this.topicsMenuItemsState = this.parseMenuItemsData(this.topicsMenuItems) || [];
		this.signInMenuItemsState = this.parseMenuItemsData(this.signInMenuItems) || [];
	}

	/**
	 * Lifecycle hook: after each render, try to install the trap if menu is open.
	 * This runs automatically after the component updates, avoiding timers.
	 */
	componentDidRender() {
		if (this.menuIsOpen && !this.trapInstalled) {
			this.tryInstallTrap();
		}
	}
	/* ===========================
        Event Listeners
    =========================== */
	/**
	 * Listen for menu button toggle events from the parent header component
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		this.menuIsOpen = event.detail;

		if (this.menuIsOpen) {
			// Lifecycle will call tryInstallTrap() — just focus
			this.setupInitialFocus();
		} else {
			this.resetState();
		}
	}

	/**
	 * Handle keyboard navigation within the tabbed menu
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (!this.menuIsOpen) return;

		// Handle tab switching with arrows
		if (this.handleTabSwitching(event)) return;

		// Handle menu navigation within active panel
		this.handleMenuNavigation(event);
	}

	/**
	 * Listen for end of menu navigation from child overflow menus.
	 * When user reaches the last item, move focus back to the active tab.
	 */
	@Listen('endOfMenuReached', { target: 'window' })
	handleEndOfMenu(event: CustomEvent) {
		if (!this.menuIsOpen) return;

		// Prevent default to stop any other handlers
		event.stopPropagation();

		// Small delay to ensure current navigation completes
		setTimeout(() => {
			this.focusTab(this.activeTab);
			this.currentIndex = undefined;
		}, 50);
	}

	@Listen('menuReady', { target: 'window' })
	async onMenuReady(event: CustomEvent) {
		// Match panel by id so we only claim the right menu
		const panelId = this.getActiveTabPanel()?.id || null;
		if (event.detail?.panelId !== panelId) return;

		// If auto-detect is on, emit takeOwnership
		if (this.autoDetectMode) {
			window.dispatchEvent(
				new CustomEvent('takeOwnership', {
					detail: { panelId },
					bubbles: true,
					composed: true,
				}),
			);
		}

		// Try to install trap (works regardless of autoDetectMode)
		this.tryInstallTrap();
	}

	/**
	 * Try to install the focus trap synchronously based on current DOM.
	 * Sets trapInstalled = true when successful to avoid repeated installs.
	 */
	private tryInstallTrap() {
		if (this.trapInstalled) return;

		const panel = this.getActiveTabPanel();
		const overflowMenu = panel?.querySelector('ontario-header-overflow-menu') as HTMLElement | null;
		const hasItems = !!overflowMenu?.shadowRoot?.querySelectorAll('.ontario-menu-item')?.length;
		const menuContainer = this.getMenuContainer();

		if (menuContainer && this.menuButtonRef && hasItems) {
			this.setupFocusTrap(menuContainer, this.menuButtonRef);
			this.trapInstalled = true;
		}
	}

	/**
	 * Prevent menu from closing when focus moves within the trap
	 * The focus trap handles Tab key looping, but we need to prevent
	 * the header's focusout listener from closing the menu
	 */
	@Listen('focusout', { target: 'window' })
	handleFocusOut(event: FocusEvent) {
		if (!this.menuIsOpen) return;

		setTimeout(() => {
			const relatedTarget = event.relatedTarget as HTMLElement;
			const menuButton = this.menuButtonRef;

			// Get all elements in our focus trap
			const menuContainer = this.getMenuContainer();
			const focusable = this.getFocusableElements(menuContainer);
			const tabs = this.el.shadowRoot?.querySelectorAll('[role="tab"]') as NodeListOf<HTMLElement>;

			const allTrapElements = [...Array.from(tabs), ...focusable, menuButton].filter(Boolean);

			// Check if focus is still within our trap
			const focusStillInTrap = allTrapElements.some((el) => el === relatedTarget);

			// If focus left the trap entirely, don't prevent the header from closing
			// But if focus is still in trap, stop the event from bubbling to prevent close
			if (focusStillInTrap) {
				event.stopPropagation();
			}
		}, 0);
	}

	/* ===========================
        Tab Switching
    =========================== */
	/**
	 * Handle tab switching between Topics and Sign In tabs using Arrow Left/Right
	 */
	private handleTabSwitching(event: KeyboardEvent): boolean {
		if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return false;

		event.preventDefault();
		this.activeTab = event.key === 'ArrowRight' ? 1 : 0;
		this.currentIndex = undefined; // Reset menu navigation when switching tabs
		this.focusTab(this.activeTab);
		return true;
	}

	/**
	 * Programmatically switches to a specific tab (called by click events).
	 *
	 * @param tabIndex - Index of tab to switch to (0 = Topics, 1 = Sign In)
	 */
	private switchTab(tabIndex: number) {
		this.activeTab = tabIndex;
		this.currentIndex = undefined;
		this.focusTab(tabIndex);
	}

	/**
	 * Focus a specific tab by index and update focus trap
	 */
	private focusTab(tabIndex: number) {
		setTimeout(() => {
			const tab = this.el.shadowRoot?.querySelector(
				`#ontario-menu-tab-${tabIndex === 0 ? 'topics' : 'sign-in'}`,
			) as HTMLButtonElement;

			if (!tab) return;
			tab.focus();

			// Update focus trap to include newly focused tab
			if (this.menuButtonRef) {
				const menuContainer = this.getMenuContainer();
				if (menuContainer) {
					this.setupFocusTrap(menuContainer, this.menuButtonRef);
				}
			}
		}, 0);
	}

	/* ===========================
				Menu Navigation (Arrow Up/Down)
		=========================== */
	/**
	 * Get the currently active tab panel
	 */
	private getActiveTabPanel(): HTMLElement | null {
		const panelId = `#ontario-menu-panel-${this.activeTab === 0 ? 'topics' : 'sign-in'}`;
		return this.el.shadowRoot?.querySelector(panelId) as HTMLElement;
	}

	/**
	 * Handle menu navigation within the active tab panel
	 */
	private handleMenuNavigation(event: KeyboardEvent) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		const activePanel = this.getActiveTabPanel();
		if (!activePanel) return;

		const overflowMenu = activePanel.querySelector('ontario-header-overflow-menu') as HTMLElement | null;
		if (!overflowMenu) return;

		const focusableElements = HeaderKeyboardNavigation.getFocusableElementsInShadow(overflowMenu);
		if (!focusableElements.length) return;

		const currentMenuItems = this.activeTab === 0 ? this.topicsMenuItemsState : this.signInMenuItemsState;
		const activeElement = HeaderKeyboardNavigation.getShadowActiveElement(overflowMenu) as HTMLElement | null;
		const focusedIndex = activeElement ? focusableElements.findIndex((el) => el === activeElement) : -1;
		if (focusedIndex !== -1) this.currentIndex = focusedIndex;

		event.preventDefault();
		if (event.key === 'ArrowDown') {
			this.currentIndex = this.currentIndex === undefined ? 0 : (this.currentIndex + 1) % focusableElements.length;
		} else {
			this.currentIndex =
				this.currentIndex === undefined
					? focusableElements.length - 1
					: (this.currentIndex - 1 + focusableElements.length) % focusableElements.length;
		}

		focusableElements[this.currentIndex].focus();
		this.updateAriaLive(this.currentIndex, currentMenuItems);
	}
	/* ===========================
        Focus Management
    =========================== */
	/**
	 * Set up initial focus when tabbed menu opens
	 */
	private setupInitialFocus() {
		setTimeout(() => {
			this.focusTab(this.activeTab);
		}, 150);
	}

	/**
	 * Reset state when menu closes
	 */
	private resetState() {
		this.currentIndex = undefined;
		this.clearFocusTrap();
	}

	/**
	 * Get the currently focused element, checking both shadow roots
	 */
	private getActiveElement(): Element | null {
		// First check if a tab button is focused (in this component's shadow root)
		const tabsFocus = this.el.shadowRoot?.activeElement;
		if (tabsFocus && tabsFocus.getAttribute('role') === 'tab') {
			return tabsFocus;
		}

		// Then check if a menu item is focused (in overflow menu's shadow root)
		const activePanel = this.getActiveTabPanel();
		if (!activePanel) return null;

		const overflowMenu = activePanel.querySelector('ontario-header-overflow-menu');
		if (!overflowMenu?.shadowRoot) return null;

		// Return the active element from the overflow menu's shadow root
		return overflowMenu.shadowRoot.activeElement;
	}
	/* ===========================
        Focus Trap (Full Loop for Mobile/Tablet)
    =========================== */
	/**
	 * Set up focus trap for the given panel and loop target
	 */
	private setupFocusTrap(panel: HTMLElement, loopTarget: HTMLElement) {
		this.clearFocusTrap();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const tabsList = this.el.shadowRoot?.querySelectorAll('[role="tab"]') as NodeListOf<HTMLElement>;
			const tabs = tabsList ? Array.from(tabsList) : [];
			const panelFocusables = panel ? HeaderKeyboardNavigation.getFocusableElements(panel) : [];
			const activePanel = this.getActiveTabPanel();
			const overflowMenu = activePanel?.querySelector('ontario-header-overflow-menu') as HTMLElement | null;
			const overflowFocusables = overflowMenu
				? HeaderKeyboardNavigation.getFocusableElementsInShadow(overflowMenu)
				: [];

			const focusable: HTMLElement[] = [...tabs, ...panelFocusables, ...overflowFocusables].filter(Boolean);

			if (!focusable.length) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			// Our custom active element getter checks both shadow roots
			const active = this.getActiveElement() as Element | null;
			const isInLoop = focusable.includes(active as HTMLElement);
			const isOnLoopTarget = active === loopTarget;

			// If focus isn't in our loop or on the loop target, ignore
			if (!isInLoop && !isOnLoopTarget) return;

			if (e.shiftKey) {
				// Shift+Tab: backwards
				if (active === first || active === loopTarget) {
					e.preventDefault();
					(last as HTMLElement).focus();
				}
			} else {
				// Tab: forwards
				if (active === last || active === loopTarget) {
					e.preventDefault();
					(first as HTMLElement).focus();
				}
			}
		};

		document.addEventListener('keydown', handler, true);
		this.focusTrapCleanup = () => document.removeEventListener('keydown', handler, true);
	}

	/**
	 * Clear the active focus trap
	 */
	private clearFocusTrap() {
		if (this.focusTrapCleanup) {
			this.focusTrapCleanup();
			this.focusTrapCleanup = null;
		}
	}

	/**
	 * Get all focusable elements within the menu panel.
	 * Uses shared utility for consistent element detection.
	 *
	 * Accepts a possibly-null panel (returns [] if none).
	 */
	private getFocusableElements(panel?: HTMLElement | null): HTMLElement[] {
		const container = panel ?? this.getMenuContainer();
		if (!container) return [];
		return HeaderKeyboardNavigation.getFocusableElements(container);
	}

	/* ===========================
        Accessibility
    =========================== */
	/**
	 * Update ARIA live region to announce current menu item position
	 */
	private updateAriaLive(selectedIndex: number, menuItems: MenuItem[]) {
		HeaderKeyboardNavigation.updateAriaLive(this.ariaLiveRegion, selectedIndex, menuItems);
	}

	/* ===========================
        Data Parsing
    =========================== */
	/**
	 * Parse menu items from either array or JSON string format
	 */
	private parseMenuItemsData(items: MenuItem[] | string | undefined): MenuItem[] | null {
		if (!items) return null;

		if (typeof items === 'string') {
			return JSON.parse(items);
		}

		return Array.isArray(items) ? items : null;
	}

	/* ===========================
        Render
    =========================== */
	render() {
		return (
			<div class="ontario-menu-tabs-host" hidden={!this.menuIsOpen} aria-hidden={!this.menuIsOpen ? 'true' : 'false'}>
				<div class="ontario-application-navigation__container">
					<div class="ontario-menu-tabs-container">
						{/* Tab Buttons */}
						<div class="ontario-mobile-menu__tabs" role="tablist">
							<button
								class={`ontario-mobile-menu__tab ${this.activeTab === 0 ? 'ontario-mobile-menu__tab--active' : ''}`}
								id="ontario-menu-tab-topics"
								role="tab"
								aria-selected={this.activeTab === 0 ? 'true' : 'false'}
								aria-controls="ontario-menu-panel-topics"
								tabindex={this.activeTab === 0 ? '0' : '-1'}
								type="button"
								onClick={() => this.switchTab(0)}
							>
								Topics
							</button>
							<button
								class={`ontario-mobile-menu__tab ${this.activeTab === 1 ? 'ontario-mobile-menu__tab--active' : ''}`}
								id="ontario-menu-tab-sign-in"
								role="tab"
								aria-selected={this.activeTab === 1 ? 'true' : 'false'}
								aria-controls="ontario-menu-panel-sign-in"
								tabindex={this.activeTab === 1 ? '0' : '-1'}
								type="button"
								onClick={() => this.switchTab(1)}
							>
								Sign In
							</button>
						</div>

						{/* Topics Panel */}
						<div
							class={`ontario-mobile-menu__panel ${this.activeTab === 0 ? 'ontario-mobile-menu__panel--active' : ''}`}
							id="ontario-menu-panel-topics"
							role="tabpanel"
							aria-labelledby="ontario-menu-tab-topics"
							hidden={this.activeTab !== 0}
						>
							<ontario-header-overflow-menu
								menuItems={this.topicsMenuItemsState}
								menuButtonRef={this.menuButtonRef}
								autoDetectMode={this.autoDetectMode}
							/>
						</div>

						{/* Sign In Panel */}
						<div
							class={`ontario-mobile-menu__panel ${this.activeTab === 1 ? 'ontario-mobile-menu__panel--active' : ''}`}
							id="ontario-menu-panel-sign-in"
							role="tabpanel"
							aria-labelledby="ontario-menu-tab-sign-in"
							hidden={this.activeTab !== 1}
						>
							<ontario-header-overflow-menu
								menuItems={this.signInMenuItemsState}
								menuButtonRef={this.menuButtonRef}
								autoDetectMode={this.autoDetectMode}
							/>
						</div>
					</div>
				</div>

				<div
					id="aria-live-region"
					class="ontario-show-for-sr"
					aria-live="polite"
					ref={(el) => (this.ariaLiveRegion = el as HTMLElement)}
				></div>
			</div>
		);
	}
}
