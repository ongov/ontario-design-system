import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';

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
	 * Listens for the menu button toggle event from the header component.
	 * Opens or closes the menu and manages focus accordingly.
	 *
	 * @param event - Custom event containing boolean (true = open, false = close)
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		this.menuIsOpen = event.detail;
		this.menuIsOpen ? this.setupInitialFocus() : this.resetState();
	}

	/**
	 * Handles all keyboard navigation within the menu.
	 * - Arrow Left/Right: Switch between tabs
	 * - Arrow Up/Down: Navigate menu items within active tab
	 *
	 * @param event - Keyboard event
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (!this.menuIsOpen) return;

		// Tab switching (Arrow Left/Right)
		if (this.handleTabSwitching(event)) return;

		// Menu item navigation (Arrow Up/Down)
		this.handleArrowNavigation(event);
	}

	/* ===========================
        Tab Switching
    =========================== */

	/**
	 * Handles Arrow Left/Right keys to switch between tabs.
	 * Resets menu item navigation when switching tabs.
	 *
	 * @param event - Keyboard event
	 * @returns True if event was handled (tab switch occurred), false otherwise
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
	 * Focuses the tab button for the given tab index.
	 * Uses setTimeout to ensure DOM has updated before focusing.
	 *
	 * @param tabIndex - Index of tab to focus (0 = Topics, 1 = Sign In)
	 */
	private focusTab(tabIndex: number) {
		setTimeout(() => {
			const tab = this.el.shadowRoot?.querySelector(
				`#ontario-menu-tab-${tabIndex === 0 ? 'topics' : 'sign-in'}`,
			) as HTMLButtonElement;
			tab?.focus();
		}, 0);
	}

	/* ===========================
        Menu Navigation (Arrow Up/Down)
    =========================== */

	/**
	 * Handles Arrow Up/Down keys to navigate menu items within the active tab.
	 * Implements circular navigation (wraps from last to first and vice versa).
	 * Updates screen reader announcements as user navigates.
	 *
	 * @param event - Keyboard event
	 */
	private handleArrowNavigation(event: KeyboardEvent) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		event.preventDefault();

		const activePanel = this.getActiveTabPanel();
		if (!activePanel) return;

		const focusableElements = activePanel.querySelectorAll('.ontario-menu-item') as NodeListOf<HTMLElement>;
		const currentMenuItems = this.activeTab === 0 ? this.topicsMenuItemsState : this.signInMenuItemsState;

		if (event.key === 'ArrowDown') {
			// Move down or wrap to first
			this.currentIndex = this.currentIndex === undefined ? 0 : (this.currentIndex + 1) % focusableElements.length;
		} else {
			// Move up or wrap to last
			this.currentIndex =
				this.currentIndex === undefined
					? focusableElements.length - 1
					: (this.currentIndex - 1 + focusableElements.length) % focusableElements.length;
		}

		focusableElements[this.currentIndex].focus();
		this.updateAriaLive(this.currentIndex, currentMenuItems);
	}

	/**
	 * Gets the DOM element for the currently active tab panel.
	 *
	 * @returns HTMLElement for active panel, or null if not found
	 */
	private getActiveTabPanel(): HTMLElement | null {
		const panelId = `#ontario-menu-panel-${this.activeTab === 0 ? 'topics' : 'sign-in'}`;
		return this.el.shadowRoot?.querySelector(panelId) as HTMLElement;
	}

	/* ===========================
        Focus Management
    =========================== */

	/**
	 * Sets up initial focus when menu opens.
	 * Focuses the currently active tab button and sets up focus trap.
	 * Uses 150ms delay to ensure dropdown animation has started.
	 */
	private setupInitialFocus() {
		setTimeout(() => {
			this.focusTab(this.activeTab);

			if (this.menuButtonRef) {
				this.setupFocusTrap(this.menuButtonRef);
			}
		}, 150);
	}

	/**
	 * Resets component state when menu closes.
	 * Clears current navigation index and removes focus trap.
	 */
	private resetState() {
		this.currentIndex = undefined;
		this.clearFocusTrap();
	}

	/* ===========================
        Focus Trap (Full Loop for Mobile)
    =========================== */

	/**
	 * Sets up a focus trap that loops Tab navigation within the menu.
	 * Implements full bidirectional trapping (Tab and Shift+Tab both loop).
	 * Includes the menu button in the trap cycle for complete accessibility.
	 *
	 * Pattern: Menu Button ↔ Tab Buttons ↔ Menu Items ↔ Menu Button (loops)
	 *
	 * @param menuButton - The button that opened the menu
	 */
	private setupFocusTrap(menuButton: HTMLElement) {
		this.clearFocusTrap();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const container = this.el.shadowRoot?.querySelector('.ontario-menu-tabs-container') as HTMLElement;
			const focusable = this.getFocusableElements(container);

			// Include menu button in trap cycle so user can loop back to it
			const allFocusable = [menuButton, ...focusable];
			const first = allFocusable[0];
			const last = allFocusable[allFocusable.length - 1];
			const active = document.activeElement;

			if (e.shiftKey) {
				// Shift+Tab from first element → loop to last
				if (active === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				// Tab from last element → loop to first
				if (active === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener('keydown', handler, true);
		this.focusTrapCleanup = () => document.removeEventListener('keydown', handler, true);
	}

	/**
	 * Removes the focus trap event listener.
	 * Called when menu closes or before setting up a new trap.
	 */
	private clearFocusTrap() {
		if (this.focusTrapCleanup) {
			this.focusTrapCleanup();
			this.focusTrapCleanup = null;
		}
	}

	/**
	 * Gets all focusable elements within a container.
	 * Only returns visible, non-disabled, non-hidden elements.
	 *
	 * @param container - Container element to search within
	 * @returns Array of focusable HTMLElements
	 */
	private getFocusableElements(container: HTMLElement): HTMLElement[] {
		if (!container) return [];
		const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
		const elements = container.querySelectorAll(selector) as NodeListOf<HTMLElement>;
		return Array.from(elements).filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hasAttribute('hidden'));
	}

	/* ===========================
        Accessibility
    =========================== */

	/**
	 * Updates the ARIA live region to announce the current menu item position.
	 * Screen readers will announce "Option X of Y" when user navigates.
	 *
	 * @param selectedIndex - Index of currently focused menu item
	 * @param menuItems - Array of menu items in the current tab
	 */
	private updateAriaLive(selectedIndex: number, menuItems: MenuItem[]) {
		if (!this.ariaLiveRegion || !menuItems) return;
		this.ariaLiveRegion.textContent = `Option ${selectedIndex + 1} of ${menuItems.length}`;
	}

	/* ===========================
        Data Parsing
    =========================== */

	/**
	 * Parses menu items from either array or JSON string format.
	 * Handles both prop formats for maximum flexibility.
	 *
	 * @param items - Menu items as array or JSON string
	 * @returns Parsed MenuItem array, or null if invalid
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
