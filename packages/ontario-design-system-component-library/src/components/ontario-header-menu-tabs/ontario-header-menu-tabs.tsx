import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { HeaderKeyboardNavigation } from '../../utils/components/header/header-keyboard-navigation';

/**
 * Ontario Header Menu Tabs Component
 *
 * A tabbed navigation menu used for Ontario headers on mobile and tablet devices.
 * Displays two tabs: "Topics" and "Sign In", each containing their own menu items.
 * Includes full keyboard navigation and focus trapping for accessibility.
 *
 * @example
 * <ontario-header-menu-tabs
 *   topicsMenuItems={menuItems}
 *   signInMenuItems={signInItems}
 *   menuButtonRef={buttonElement}
 * />
 */
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
			// try to install the trap once the panel + overflow menu items are available
			this.installTrapWhenReady(1000); // 1s max wait
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
	 * Wait until the overflow menu's shadow DOM and menu items are available,
	 * then install the focus trap. Uses MutationObserver for reliability and
	 * falls back to a timeout.
	 *
	 * @param timeoutMs maximum time to wait for elements (ms)
	 */
	private installTrapWhenReady(timeoutMs: number = 500) {
		const start = performance.now();
		const activePanel = () => this.getActiveTabPanel();

		const tryInstall = () => {
			const panel = activePanel();
			const overflowMenu = panel?.querySelector('ontario-header-overflow-menu') as HTMLElement | null;
			const hasItems = !!overflowMenu?.shadowRoot?.querySelectorAll('.ontario-menu-item')?.length;
			const menuContainer = this.el.shadowRoot?.querySelector(
				'.ontario-application-navigation__container',
			) as HTMLElement | null;

			if (menuContainer && this.menuButtonRef && hasItems) {
				this.setupFocusTrap(menuContainer, this.menuButtonRef);
				return true;
			}
			return false;
		};

		// quick synchronous check first
		if (tryInstall()) return;

		// observe the active panel for DOM changes so we can attach as soon as items appear
		const panel = activePanel();
		if (!panel) {
			// if panel not found yet, poll via rAF until timeout
			const tick = () => {
				if (tryInstall()) return;
				if (performance.now() - start < timeoutMs) {
					requestAnimationFrame(tick);
				} else {
					const menuContainer = this.el.shadowRoot?.querySelector(
						'.ontario-application-navigation__container',
					) as HTMLElement | null;
					if (menuContainer && this.menuButtonRef) this.setupFocusTrap(menuContainer, this.menuButtonRef);
				}
			};
			requestAnimationFrame(tick);
			return;
		}

		const observer = new MutationObserver(() => {
			if (tryInstall()) {
				observer.disconnect();
			} else if (performance.now() - start > timeoutMs) {
				observer.disconnect();
				// fallback best-effort
				const menuContainer = this.el.shadowRoot?.querySelector(
					'.ontario-application-navigation__container',
				) as HTMLElement | null;
				if (menuContainer && this.menuButtonRef) this.setupFocusTrap(menuContainer, this.menuButtonRef);
			}
		});

		observer.observe(panel, { childList: true, subtree: true });

		// also guard with an rAF poll in case mutations don't fire on some environments
		const tickFallback = () => {
			if (tryInstall()) {
				observer.disconnect();
				return;
			}
			if (performance.now() - start < timeoutMs) {
				requestAnimationFrame(tickFallback);
			} else {
				observer.disconnect();
				const menuContainer = this.el.shadowRoot?.querySelector(
					'.ontario-application-navigation__container',
				) as HTMLElement | null;
				if (menuContainer && this.menuButtonRef) this.setupFocusTrap(menuContainer, this.menuButtonRef);
			}
		};
		requestAnimationFrame(tickFallback);
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
			const menuContainer = this.el.shadowRoot?.querySelector(
				'.ontario-application-navigation__container',
			) as HTMLElement;
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
				const menuContainer = this.el.shadowRoot?.querySelector(
					'.ontario-application-navigation__container',
				) as HTMLElement;
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

		// Use shared utility for shadow active element
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

			// Get focusable elements from inside shadow DOM
			const focusable = this.getFocusableElements(panel);
			const tabs = this.el.shadowRoot?.querySelectorAll('[role="tab"]') as NodeListOf<HTMLElement>;

			if (tabs) focusable.unshift(...Array.from(tabs));
			if (!focusable.length) return;

			// First and last in the tab+menu sequence
			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			// Use our custom getActiveElement that checks both shadow roots
			const active = this.getActiveElement();

			const isInPanel = focusable.includes(active as HTMLElement);
			const isOnLoopTarget = active === loopTarget;

			// If focus isn't inside the loopable set and it's not on the menu button, ignore
			if (!isInPanel && !isOnLoopTarget) return;

			if (e.shiftKey) {
				// Shift + Tab (backwards)
				// If we're on the first (a tab), loop to the last menu item
				if (active === first) {
					e.preventDefault();
					(last as HTMLElement).focus();
				} else if (active === loopTarget) {
					// If user Shift+Tab'd from the menu button, put them on the last
					e.preventDefault();
					(last as HTMLElement).focus();
				}
			} else {
				// Tab (forwards)
				// If we're on the last menu item, loop to the first tab
				if (active === last) {
					e.preventDefault();
					(first as HTMLElement).focus();
				} else if (active === loopTarget) {
					// If focus was on the menu button and they Tab forward, go to first tab
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
	 * Get all focusable elements within a given panel, piercing through shadow DOM
	 * This is specific to the tabs component because it needs to access menu items
	 * inside the overflow menu's shadow root
	 */
	private getFocusableElements(panel: HTMLElement): HTMLElement[] {
		const activePanel = this.getActiveTabPanel();
		if (!activePanel) return [];

		const overflowMenu = activePanel.querySelector('ontario-header-overflow-menu') as HTMLElement | null;
		return HeaderKeyboardNavigation.getFocusableElementsInShadow(overflowMenu);
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
			<nav
				role="navigation"
				class={
					this.menuIsOpen ? 'ontario-application-navigation ontario-navigation--open' : 'ontario-application-navigation'
				}
				id="ontario-application-navigation"
				ref={(el) => (this.menu = el as HTMLElement)}
			>
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
							<ontario-header-overflow-menu menuItems={this.topicsMenuItemsState} standalone={false} />
						</div>

						{/* Sign In Panel */}
						<div
							class={`ontario-mobile-menu__panel ${this.activeTab === 1 ? 'ontario-mobile-menu__panel--active' : ''}`}
							id="ontario-menu-panel-sign-in"
							role="tabpanel"
							aria-labelledby="ontario-menu-tab-sign-in"
							hidden={this.activeTab !== 1}
						>
							<ontario-header-overflow-menu menuItems={this.signInMenuItemsState} standalone={false} />
						</div>
					</div>
				</div>
				<div
					id="aria-live-region"
					class="ontario-show-for-sr"
					aria-live="polite"
					ref={(el) => (this.ariaLiveRegion = el as HTMLElement)}
				></div>
			</nav>
		);
	}
}
