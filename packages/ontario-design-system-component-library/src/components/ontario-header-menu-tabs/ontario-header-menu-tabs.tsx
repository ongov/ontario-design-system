import { Component, Prop, State, Watch, h, Listen, Element, Event, EventEmitter } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { HeaderKeyboardNavigation } from '../../utils/components/header/header-keyboard-navigation';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ConsoleType } from '../../utils/console-message/console-message.enum';

/**
 * Ontario Header Menu Tabs Component
 *
 * - Provides a tabbed navigation interface for mobile/tablet views.
 * - Displays two tabs (Topics and Sign In) with overflow menu content.
 * - Manages keyboard navigation, focus trapping, and accessibility.
 */
@Component({
	tag: 'ontario-header-menu-tabs',
	styleUrl: 'ontario-header-menu-tabs.scss',
	shadow: true,
})
export class OntarioHeaderMenuTabs {
	@Element() el: HTMLElement;

	/**
	 * Menu items for the "Topics" tab.
	 * Can be passed as a MenuItem array or JSON string.
	 */
	@Prop() topicsMenuItems: MenuItem[] | string;

	/**
	 * Menu items for the "Sign In" tab.
	 * Can be passed as a MenuItem array or JSON string.
	 */
	@Prop() signInMenuItems: MenuItem[] | string;

	/**
	 * Reference to the menu button that opens this dropdown.
	 * Used for focus trapping.
	 */
	@Prop() menuButtonRef?: HTMLElement;

	/**
	 * Enable auto-detect handoff mode.
	 */
	@Prop() autoDetectMode?: boolean = false;

	/**
	 * The currently active tab index (0 = Topics, 1 = Sign In).
	 */
	@State() private activeTab: number = 0;

	/**
	 * Whether the menu dropdown is currently open.
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * Parsed topics menu items.
	 */
	@State() private topicsMenuItemsState: MenuItem[] = [];

	/**
	 * Parsed sign-in menu items.
	 */
	@State() private signInMenuItemsState: MenuItem[] = [];

	/**
	 * Reference to the ARIA live region for screen reader announcements.
	 */
	private ariaLiveRegion!: HTMLElement;

	/**
	 * Cleanup function for the focus trap event listener.
	 */
	private focusTrapCleanup: (() => void) | null = null;

	/**
	 * Whether the focus trap has been installed for the current panel.
	 */
	private trapInstalled = false;

	/**
	 * Event emitted when ownership handoff is triggered in auto-detect mode.
	 */
	@Event({ eventName: 'takeOwnership', bubbles: true, composed: true })
	takeOwnership!: EventEmitter<{ panelId: string | null }>;

	/**
	 * Event emitted to request overflow menu to focus its first item.
	 */
	@Event({ eventName: 'focusFirstItem', bubbles: true, composed: true })
	focusFirstItem!: EventEmitter<void>;

	/* ===========================
        Lifecycle
    =========================== */

	componentWillLoad() {
		this.parseTopicsMenuItems();
		this.parseSignInMenuItems();
	}

	/**
	 * Watch for changes to topicsMenuItems prop and re-parse.
	 */
	@Watch('topicsMenuItems')
	parseTopicsMenuItems() {
		this.topicsMenuItemsState = this.parseMenuItemsData(this.topicsMenuItems, 'topicsMenuItems');
	}

	/**
	 * Watch for changes to signInMenuItems prop and re-parse.
	 */
	@Watch('signInMenuItems')
	parseSignInMenuItems() {
		this.signInMenuItemsState = this.parseMenuItemsData(this.signInMenuItems, 'signInMenuItems');
	}

	/**
	 * Generic parser for menu items with error handling.
	 */
	private parseMenuItemsData(items: MenuItem[] | string | undefined, propName: string): MenuItem[] {
		if (!items) return [];

		try {
			if (typeof items === 'string') {
				return JSON.parse(items);
			} else if (Array.isArray(items)) {
				return items;
			} else {
				return [];
			}
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse props for ')
				.addMonospaceText('<ontario-header-menu-tabs>')
				.addRegularText(` ${propName} in `)
				.addMonospaceText('parseMenuItemsData()')
				.addRegularText(' method \n ')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);

			return []; // fallback on error
		}
	}

	/**
	 * After each render, try to install the focus trap if menu is open.
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
	 * Listen for menu button toggle events.
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		this.menuIsOpen = event.detail;

		if (this.menuIsOpen) {
			this.setupInitialFocus();
		} else {
			this.resetState();
		}
	}

	/**
	 * Handle keyboard navigation within the tabbed menu.
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (!this.menuIsOpen) return;

		// Tab switching with Left/Right arrows
		if (this.handleTabSwitching(event)) return;

		// Arrow Down from tab button to first menu item
		if (event.key === 'ArrowDown' && this.isFocusOnTab()) {
			event.preventDefault();
			this.moveToFirstMenuItem();
			return;
		}

		// Arrow Up from tab button (stay on tab)
		if (event.key === 'ArrowUp' && this.isFocusOnTab()) {
			event.preventDefault();
			return;
		}
	}

	/**
	 * Listen for end of menu reached event from overflow menus.
	 * When Tab is pressed on last item, loop focus back to active tab.
	 */
	@Listen('endOfMenuReached', { target: 'window' })
	handleEndOfMenu(event: CustomEvent) {
		if (!this.menuIsOpen) return;

		event.stopPropagation();

		setTimeout(() => {
			this.focusTab(this.activeTab);
		}, 50);
	}

	/**
	 * Listen for menuReady event from overflow menus.
	 * Triggers ownership handoff in auto-detect mode.
	 */
	@Listen('menuReady', { target: 'window' })
	async onMenuReady(event: CustomEvent) {
		const panel = this.getActiveTabPanel();
		const panelId = panel?.id || null;
		if (event.detail?.panelId !== panelId) return;

		if (this.autoDetectMode) {
			this.takeOwnership.emit({ panelId });
		}

		this.tryInstallTrap();
	}

	/**
	 * Prevent menu from closing when focus moves within the trap.
	 */
	@Listen('focusout', { target: 'window' })
	focusOut(event: FocusEvent) {
		if (!this.menuIsOpen) return;

		setTimeout(() => {
			const relatedTarget = event.relatedTarget as HTMLElement;
			const menuContainer = this.getMenuContainer();
			const focusable = menuContainer ? HeaderKeyboardNavigation.getFocusableElements(menuContainer) : [];
			const tabs = Array.from(this.el.shadowRoot?.querySelectorAll('[role="tab"]') || []);
			const allTrapElements = [...tabs, ...focusable, this.menuButtonRef].filter(Boolean);

			if (allTrapElements.some((el) => el === relatedTarget)) {
				event.stopPropagation();
			}
		}, 0);
	}

	/* ===========================
        Tab Switching
    =========================== */

	/**
	 * Handle tab switching with Arrow Left/Right.
	 */
	private handleTabSwitching(event: KeyboardEvent): boolean {
		if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return false;

		event.preventDefault();
		this.activeTab = event.key === 'ArrowRight' ? 1 : 0;
		this.focusTab(this.activeTab);
		return true;
	}

	/**
	 * Switch to a specific tab (called by click events).
	 */
	private switchTab(tabIndex: number) {
		this.activeTab = tabIndex;
		this.focusTab(tabIndex);
	}

	/**
	 * Focus a specific tab by index.
	 * Uses requestAnimationFrame to ensure DOM is ready.
	 */
	private focusTab(tabIndex: number) {
		requestAnimationFrame(() => {
			const tabId = `ontario-menu-tab-${tabIndex === 0 ? 'topics' : 'sign-in'}`;
			const tab = this.el.shadowRoot?.querySelector(`#${tabId}`) as HTMLButtonElement;
			tab?.focus();
		});
	}

	/* ===========================
        Focus Management
    =========================== */

	/**
	 * Set up initial focus when menu opens.
	 * Uses requestAnimationFrame to ensure DOM is ready after render.
	 */
	private setupInitialFocus() {
		requestAnimationFrame(() => {
			this.focusTab(this.activeTab);
		});
	}

	/**
	 * Try to install the focus trap if DOM is ready.
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
	 * Reset state when menu closes.
	 */
	private resetState() {
		this.clearFocusTrap();
		this.trapInstalled = false;
	}

	/**
	 * Check if focus is currently on a tab button.
	 */
	private isFocusOnTab(): boolean {
		return this.el.shadowRoot?.activeElement?.getAttribute('role') === 'tab';
	}

	/**
	 * Move focus from tab button to first menu item.
	 * Emits event for overflow menu to handle focus.
	 */
	private moveToFirstMenuItem() {
		const currentMenuItems = this.activeTab === 0 ? this.topicsMenuItemsState : this.signInMenuItemsState;
		if (!currentMenuItems?.length) return;

		// Emit event for overflow menu to focus first item
		this.focusFirstItem.emit();

		// Update ARIA live region
		requestAnimationFrame(() => {
			HeaderKeyboardNavigation.updateAriaLive(this.ariaLiveRegion, 0, currentMenuItems);
		});
	}

	/**
	 * Set up focus trap for Tab/Shift+Tab looping.
	 */
	private setupFocusTrap(panel: HTMLElement, loopTarget: HTMLElement) {
		this.clearFocusTrap();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const tabs = Array.from(this.el.shadowRoot?.querySelectorAll('[role="tab"]') || []) as HTMLElement[];
			const panelFocusables = HeaderKeyboardNavigation.getFocusableElements(panel);
			const activePanel = this.getActiveTabPanel();
			const overflowMenu = activePanel?.querySelector('ontario-header-overflow-menu') as HTMLElement | null;
			const overflowFocusables = overflowMenu
				? HeaderKeyboardNavigation.getFocusableElementsInShadow(overflowMenu)
				: [];

			const focusable = [...tabs, ...panelFocusables, ...overflowFocusables].filter(Boolean) as HTMLElement[];
			if (!focusable.length) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = this.getActiveElement();

			if (e.shiftKey) {
				if (active === first || active === loopTarget) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (active === last || active === loopTarget) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener('keydown', handler, true);
		this.focusTrapCleanup = () => document.removeEventListener('keydown', handler, true);
	}

	/**
	 * Clear the active focus trap.
	 */
	private clearFocusTrap() {
		if (this.focusTrapCleanup) {
			this.focusTrapCleanup();
			this.focusTrapCleanup = null;
		}
	}

	/* ===========================
        Helper Methods
    =========================== */

	/**
	 * Get the currently active tab panel.
	 */
	private getActiveTabPanel(): HTMLElement | null {
		const panelId = `ontario-menu-panel-${this.activeTab === 0 ? 'topics' : 'sign-in'}`;
		return this.el.shadowRoot?.querySelector(`#${panelId}`) as HTMLElement | null;
	}

	/**
	 * Get the menu container element for focus trapping.
	 */
	private getMenuContainer(): HTMLElement | null {
		return this.el.shadowRoot?.querySelector('.ontario-application-navigation__container') as HTMLElement | null;
	}

	/**
	 * Get the currently focused element (checks shadow roots).
	 */
	private getActiveElement(): Element | null {
		// Check tab buttons first
		const tabsFocus = this.el.shadowRoot?.activeElement;
		if (tabsFocus?.getAttribute('role') === 'tab') return tabsFocus;

		// Check overflow menu items
		const activePanel = this.getActiveTabPanel();
		const overflowMenu = activePanel?.querySelector('ontario-header-overflow-menu');
		return overflowMenu?.shadowRoot?.activeElement || null;
	}

	/* ===========================
        Render
    =========================== */

	render() {
		const isHidden = !this.menuIsOpen;

		return (
			<div class="ontario-menu-tabs-host" hidden={isHidden} aria-hidden={isHidden ? 'true' : 'false'}>
				<div class="ontario-application-navigation__container">
					<div class="ontario-menu-tabs-container">
						{/* Tab Buttons */}
						<div class="ontario-mobile-menu__tabs" role="tablist">
							{[
								{ index: 0, id: 'topics', label: 'Topics' },
								{ index: 1, id: 'sign-in', label: 'Sign In' },
							].map(({ index, id, label }) => (
								<button
									class={`ontario-mobile-menu__tab ${this.activeTab === index ? 'ontario-mobile-menu__tab--active' : ''}`}
									id={`ontario-menu-tab-${id}`}
									role="tab"
									aria-selected={this.activeTab === index ? 'true' : 'false'}
									aria-controls={`ontario-menu-panel-${id}`}
									tabindex={this.activeTab === index ? '0' : '-1'}
									type="button"
									onClick={() => this.switchTab(index)}
								>
									{label}
								</button>
							))}
						</div>

						{/* Tab Panels */}
						{[
							{ index: 0, id: 'topics', items: this.topicsMenuItemsState },
							{ index: 1, id: 'sign-in', items: this.signInMenuItemsState },
						].map(({ index, id, items }) => (
							<div
								class={`ontario-mobile-menu__panel ${this.activeTab === index ? 'ontario-mobile-menu__panel--active' : ''}`}
								id={`ontario-menu-panel-${id}`}
								role="tabpanel"
								aria-labelledby={`ontario-menu-tab-${id}`}
								hidden={this.activeTab !== index}
							>
								<ontario-header-overflow-menu menuItems={items} />
							</div>
						))}
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
