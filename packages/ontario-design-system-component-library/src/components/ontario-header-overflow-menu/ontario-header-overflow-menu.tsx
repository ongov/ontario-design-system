import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { generateMenuItem } from '../../utils/components/header/header-menu-items';
import { convertStringToBoolean } from '../../utils/helper/utils';
import { HeaderKeyboardNavigation } from '../../utils/components/header/header-keyboard-navigation';

/**
 * Ontario Header Overflow Menu Component
 *
 * A dropdown navigation menu used for Ontario headers. Can operate in two modes:
 *
 * **Standalone mode (desktop):**
 * - Manages its own open/close state
 * - Handles all keyboard navigation and focus trapping
 * - Auto-closes when focus leaves the menu
 * - Partial focus trap (only Shift+Tab backwards to menu button)
 *
 * **Embedded mode (inside tabs on mobile/tablet):**
 * - Just renders menu items
 * - Parent component (tabs) handles all behavior
 * - No event listeners or state management
 *
 * @example
 * // Standalone
 * <ontario-header-overflow-menu
 *   menuItems={items}
 *   menuButtonRef={buttonElement}
 *   standalone={true}
 * />
 *
 * // Inside tabs
 * <ontario-header-overflow-menu
 *   menuItems={items}
 *   standalone={false}
 * />
 */
@Component({
	tag: 'ontario-header-overflow-menu',
	styleUrl: 'ontario-header-overflow-menu.scss',
	shadow: true,
})
export class OntarioHeaderOverflowMenu {
	@Element() el: HTMLElement;

	/* ===========================
        Props & State
    =========================== */
	/**
	 * The menu items to display.
	 * Can be passed as a MenuItem array or JSON string.
	 *
	 * @example
	 * menuItems={[
	 *   { href: '/about', title: 'About', linkIsActive: false },
	 *   { href: '/services', title: 'Services', linkIsActive: true }
	 * ]}
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * Reference to the menu button that opens this dropdown.
	 * Used for focus trapping in standalone mode - allows Shift+Tab to loop back.
	 *
	 * @example
	 * menuButtonRef={this.menuButton}
	 */
	@Prop() menuButtonRef?: HTMLElement;

	/**
	 * Whether this is being used standalone (true) or inside tabs (false).
	 *
	 * **Standalone mode (true):**
	 * - Handles own open/close state, event listeners, and focus trapping
	 * - Desktop behavior with partial focus trap
	 *
	 * **Embedded mode (false):**
	 * - Just renders menu items
	 * - Parent component handles all behavior
	 * - Mobile/tablet behavior inside tabs component
	 *
	 * @default true
	 */
	@Prop() standalone: boolean = true;

	/**
	 * Parsed menu items (converted from string if needed).
	 * Internal state used for rendering.
	 */
	@State() private menuItemState: MenuItem[];

	/**
	 * Whether the menu dropdown is currently open.
	 * Only used in standalone mode - embedded mode ignores this.
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * Current focused menu item index for arrow key navigation.
	 * Undefined when no menu item is focused.
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
        Lifecycle & Watchers
    =========================== */
	/**
	 * Lifecycle hook called before the component is loaded.
	 * Parses menu items from props.
	 */
	componentWillLoad() {
		this.parseMenuItems();
	}

	/**
	 * Watches for changes to menuItems prop and re-parses them.
	 * Automatically called when menuItems prop changes.
	 */
	@Watch('menuItems')
	parseMenuItems() {
		this.menuItemState = this.parseMenuItemsData(this.menuItems) || [];
		this.setActiveLink(this.menuItemState);
	}

	/* ===========================
        Event Listeners (Standalone Mode Only)
    =========================== */
	/**
	 * Listen for menu button toggle events from the parent header component.
	 * Only active in standalone mode - embedded mode ignores this.
	 *
	 * Opens or closes the menu and manages focus accordingly.
	 *
	 * @param event - Custom event containing boolean (true = open, false = close)
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		if (!this.standalone) return; // Ignore if inside tabs

		this.menuIsOpen = event.detail;
		this.menuIsOpen ? this.setupInitialFocus() : this.resetState();
	}

	/**
	 * Handle keyboard navigation within the menu using Arrow Up/Down keys.
	 * Only active in standalone mode - embedded mode lets tabs component handle this.
	 *
	 * Implements circular navigation (wraps from last to first and vice versa).
	 * Updates screen reader announcements as user navigates.
	 *
	 * @param event - Keyboard event
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (!this.standalone) return; // Tabs component handles this
		if (!this.menuIsOpen) return;

		this.handleArrowNavigation(event);
	}

	/**
	 * Listen for focus leaving the menu to auto-close it (desktop behavior).
	 * Only active in standalone mode - embedded mode doesn't auto-close.
	 *
	 * Checks if focus moved outside both the menu and the menu button.
	 * If so, closes the menu and emits a menuClosed event.
	 *
	 * @param event - Focus event containing relatedTarget (element receiving focus)
	 */
	@Listen('focusout', { target: 'window' })
	handleFocusOut(event: FocusEvent) {
		if (!this.standalone || !this.menuIsOpen) return;

		// Use setTimeout to ensure relatedTarget is set
		setTimeout(() => {
			const menuButton = this.getMenuButton();
			const focusedElement = event.relatedTarget as HTMLElement;

			// Check if focus moved outside both the menu and the menu button
			const focusInMenu = this.menu?.contains(focusedElement);
			const focusOnButton = menuButton?.contains(focusedElement);
			const focusInShadowRoot = this.el.shadowRoot?.contains(focusedElement);

			if (!focusInMenu && !focusOnButton && !focusInShadowRoot) {
				// Focus has left the menu - close it
				this.menuIsOpen = false;
				this.resetState();
				this.emitMenuClosed();
			}
		}, 0);
	}

	/* ===========================
        Keyboard Navigation
    =========================== */
	/**
	 * Handle arrow key navigation within menu items.
	 * Syncs currentIndex with actually focused element before navigating.
	 * This ensures seamless transition from Tab navigation to Arrow navigation.
	 *
	 * Uses shared utility for consistent behavior across components.
	 *
	 * @param event - Keyboard event (Arrow Up or Arrow Down)
	 */
	private handleArrowNavigation(event: KeyboardEvent) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		const focusableElements = this.menu.querySelectorAll('.ontario-menu-item') as NodeListOf<HTMLElement>;

		// Sync currentIndex with actually focused element before navigating
		const syncedIndex = HeaderKeyboardNavigation.syncCurrentIndexWithFocus(focusableElements, () =>
			this.getActiveElement(),
		);
		if (syncedIndex !== undefined) {
			this.currentIndex = syncedIndex;
		}

		// Handle arrow navigation
		this.currentIndex = HeaderKeyboardNavigation.handleArrowNavigation(
			event,
			this.currentIndex,
			focusableElements,
			this.menuItemState,
			(index) => this.updateAriaLive(index),
		);
	}

	/* ===========================
        Focus Management (Standalone Mode)
    =========================== */
	/**
	 * Set up initial focus when standalone menu opens.
	 * Focuses the first menu item and sets up the focus trap.
	 * Uses 150ms delay to ensure dropdown animation has started.
	 */
	private setupInitialFocus() {
		setTimeout(() => {
			const firstMenuItem = this.menu.querySelector('.ontario-menu-item') as HTMLElement;
			if (firstMenuItem) {
				firstMenuItem.focus();
				this.currentIndex = 0;
				this.updateAriaLive(0);
			}

			const menuButton = this.getMenuButton();
			if (menuButton) {
				this.setupFocusTrap(this.menu, menuButton);
			}
		}, 150);
	}

	/**
	 * Reset component state when menu closes.
	 * Clears current navigation index and removes focus trap.
	 */
	private resetState() {
		this.currentIndex = undefined;
		this.clearFocusTrap();
	}

	/**
	 * Get the menu button from the parent header component or fallback to DOM search.
	 * Tries menuButtonRef prop first, then searches for common button IDs.
	 *
	 * @returns The menu button element, or null if not found
	 */
	private getMenuButton(): HTMLButtonElement | null {
		if (this.menuButtonRef) return this.menuButtonRef as HTMLButtonElement;

		const selectors = [
			'#ontario-header-menu-toggler',
			'#ontario-application-header-menu-toggler',
			'#ontario-header-sign-in-toggler',
		];

		for (const selector of selectors) {
			const button = document.querySelector(selector) as HTMLButtonElement;
			if (button?.getAttribute('aria-expanded') === 'true') return button;
		}

		return null;
	}

	/* ===========================
        Focus Trap (Standalone Mode - Partial Trap)
    =========================== */
	/**
	 * Set up a partial focus trap for desktop simple menu.
	 * Only traps Shift+Tab from first item back to menu button.
	 * Allows Tab to naturally exit the menu after the last item.
	 *
	 * This creates desktop-appropriate behavior where users can Tab out
	 * naturally but Shift+Tab from the first item returns to the menu button.
	 *
	 * @param panel - The menu panel containing focusable elements
	 * @param loopTarget - The menu button to loop back to (Shift+Tab target)
	 */
	private setupFocusTrap(panel: HTMLElement, loopTarget: HTMLElement) {
		this.clearFocusTrap();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const focusable = this.getFocusableElements(panel);
			if (!focusable.length) return;

			const active = document.activeElement;

			// Partial trap for desktop - only Shift+Tab backwards
			if (e.shiftKey && active === focusable[0]) {
				e.preventDefault();
				loopTarget.focus();
			}
			// Allow normal Tab behavior - don't trap it
		};

		document.addEventListener('keydown', handler, true);
		this.focusTrapCleanup = () => document.removeEventListener('keydown', handler, true);
	}

	/**
	 * Clear the active focus trap event listener.
	 * Called when menu closes or before setting up a new trap.
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
	 * @param panel - Container element to search within
	 * @returns Array of focusable HTMLElements
	 */
	private getFocusableElements(panel: HTMLElement): HTMLElement[] {
		return HeaderKeyboardNavigation.getFocusableElements(panel);
	}

	/**
	 * Emit a menuClosed event to tell the parent header component.
	 * This allows the header to update its state when the menu auto-closes.
	 */
	private emitMenuClosed() {
		this.el.dispatchEvent(
			new CustomEvent('menuClosed', {
				bubbles: true,
				composed: true,
			}),
		);
	}

	/**
	 * Get the currently focused element, accounting for Shadow DOM.
	 * Uses shared utility for consistent behavior across components.
	 *
	 * @returns The currently focused element, or null if none
	 */
	private getActiveElement(): Element | null {
		return HeaderKeyboardNavigation.getActiveElement(this.el);
	}

	/* ===========================
        Accessibility
    =========================== */
	/**
	 * Update the ARIA live region to announce the current menu item position.
	 * Screen readers will announce "Option X of Y" when user navigates.
	 * Uses shared utility for consistent announcements.
	 *
	 * @param selectedIndex - Index of currently focused menu item
	 */
	private updateAriaLive(selectedIndex: number) {
		HeaderKeyboardNavigation.updateAriaLive(this.ariaLiveRegion, selectedIndex, this.menuItemState);
	}

	/* ===========================
        Data Parsing
    =========================== */
	/**
	 * Parse menu items from either array or JSON string format.
	 * Handles both prop formats for maximum flexibility.
	 * Converts string boolean values to actual booleans for linkIsActive.
	 *
	 * @param items - Menu items as array or JSON string
	 * @returns Parsed MenuItem array, or null if invalid
	 */
	private parseMenuItemsData(items: MenuItem[] | string | undefined): MenuItem[] | null {
		if (!items) return null;

		if (typeof items === 'string') {
			const parsed = JSON.parse(items) as MenuItem[];
			parsed.forEach((item) => {
				if (typeof item?.linkIsActive === 'string') {
					item.linkIsActive = convertStringToBoolean(item.linkIsActive);
				}
			});
			return parsed;
		}

		return Array.isArray(items) ? items : null;
	}

	/**
	 * Set active link based on current URL if none specified.
	 * Checks if any menu item has linkIsActive set to true.
	 * If not, automatically marks items as active based on URL matching.
	 *
	 * @param menuItems - Array of menu items to process
	 */
	private setActiveLink(menuItems: MenuItem[]) {
		if (!menuItems) return;

		const hasActiveLink = menuItems.some((item) => item?.linkIsActive === true);

		if (!hasActiveLink) {
			menuItems.forEach((item) => {
				const sanitizedSlug = item.href.replace(/\s+/g, '-').toLowerCase();
				item.linkIsActive = window.location.pathname.includes(sanitizedSlug);
			});
		}
	}

	/* ===========================
        Render
    =========================== */

	/**
	 * Render the menu in either standalone or embedded mode.
	 *
	 * **Standalone mode:** Full navigation wrapper with open/close classes
	 * **Embedded mode:** Simple div with menu items (for use inside tabs)
	 */
	render() {
		// Generate the menu list (same for both modes)
		const menuList = (
			<ul>
				{this.menuItemState?.map((item: MenuItem) =>
					generateMenuItem(item.href, item.title, item.linkIsActive ?? false, item.description),
				)}
			</ul>
		);

		if (this.standalone) {
			// Standalone mode - full navigation wrapper
			return (
				<nav
					role="navigation"
					class={
						this.menuIsOpen
							? 'ontario-application-navigation ontario-navigation--open'
							: 'ontario-application-navigation'
					}
					id="ontario-application-navigation"
					ref={(el) => (this.menu = el as HTMLElement)}
				>
					<div class="ontario-application-navigation__container">
						<div class="ontario-navigation-content" role="tabpanel">
							{menuList}
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
		} else {
			// Embedded mode - just the menu list
			return (
				<div class="ontario-menu-list" ref={(el) => (this.menu = el as HTMLElement)}>
					{menuList}
					<div
						class="ontario-show-for-sr"
						aria-live="polite"
						ref={(el) => (this.ariaLiveRegion = el as HTMLElement)}
					></div>
				</div>
			);
		}
	}
}
