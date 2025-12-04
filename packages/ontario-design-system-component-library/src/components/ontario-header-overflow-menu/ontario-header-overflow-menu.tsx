import { Component, Prop, State, Watch, h, Listen, Element, Event, EventEmitter } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { convertStringToBoolean } from '../../utils/helper/utils';
import { HeaderKeyboardNavigation } from '../../utils/components/header/header-keyboard-navigation';

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
	 * Whether to automatically detect and coordinate focus trap ownership.
	 * When true, emits menuReady and waits for a parent to claim ownership.
	 * If no parent claims ownership, falls back to own focus trap.
	 *
	 * @default false
	 */
	@Prop() autoDetectMode: boolean = false;

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

	/**
	 * Runtime mode check.
	 * Returns true when this component is rendered standalone (not inside the tabbed
	 * menu or a mobile panel). Used to decide whether this component should manage
	 * open/close state, keyboard listeners, and the focus trap locally.
	 */
	private get isStandalone(): boolean {
		const inTabs = !!this.el.closest('ontario-header-menu-tabs');
		const inMobilePanel = !!this.el.closest('.ontario-mobile-menu__panel');
		return !inTabs && !inMobilePanel;
	}
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
		if (!this.isStandalone) return;

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
		// If standalone, only handle when our menu is open.
		if (this.isStandalone) {
			if (!this.menuIsOpen) return;

			// Handle Arrow Down from menu button to first menu item
			if (event.key === 'ArrowDown') {
				const menuButton = this.getMenuButton();
				const activeElement = document.activeElement;

				// If focus is on the menu button, move to first menu item
				if (menuButton && activeElement === menuButton) {
					event.preventDefault();
					const focusableElements = this.getFocusableElements(this.menu);
					if (focusableElements.length > 0) {
						focusableElements[0].focus();
						this.currentIndex = 0;
						this.updateAriaLive(0);
					}
					return;
				}
			}

			this.handleArrowNavigation(event);
			return;
		}

		// Embedded: check if focus is inside this menu instance
		const shadowActive = (this.el.shadowRoot?.activeElement as HTMLElement) || null;
		const domActive = (document.activeElement as HTMLElement) || null;

		const focusInThisMenu = !!(
			(shadowActive && this.el.shadowRoot?.contains(shadowActive)) ||
			(domActive && this.menu?.contains(domActive))
		);

		if (!focusInThisMenu) return;

		// Handle Tab key when on the last menu item
		if (event.key === 'Tab' && !event.shiftKey) {
			const focusableElements = this.getFocusableElements(this.menu);
			const currentElement = shadowActive || domActive;

			// Find the current element's index properly
			let currentIndex = -1;
			for (let i = 0; i < focusableElements.length; i++) {
				if (focusableElements[i] === currentElement || focusableElements[i].contains(currentElement as Node)) {
					currentIndex = i;
					break;
				}
			}

			const lastIndex = focusableElements.length - 1;

			if (currentIndex === lastIndex) {
				this.endOfMenuReached.emit();
			}
		}

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
		if (!this.isStandalone || !this.menuIsOpen) return;

		// Use setTimeout to ensure relatedTarget is set
		setTimeout(() => {
			const menuButton = this.getMenuButton();
			const focusedElement = event.relatedTarget as HTMLElement;

			// Check if focus moved outside both the menu and tfhe menu button
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

		const focusableElementsArray = this.getFocusableElements(this.menu);

		if (!focusableElementsArray || !focusableElementsArray.length) return;

		const focusableElements = this.arrayToNodeList(focusableElementsArray);
		const syncedIndex = HeaderKeyboardNavigation.syncCurrentIndexWithFocus(focusableElements, () =>
			this.getActiveElement(),
		);
		if (syncedIndex !== undefined) {
			this.currentIndex = syncedIndex;
		}

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
		const menuButton = this.getMenuButton();
		if (menuButton) {
			if (this.autoDetectMode && !this.isStandalone) {
				this.tryAutoOwnership();
			} else if (this.isStandalone) {
				this.setupFocusTrap(this.menu, menuButton);
			}
		}
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

			if (e.shiftKey && active === focusable[0]) {
				e.preventDefault();
				loopTarget.focus();
			}
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
	 * Convert an array of HTMLElements to a NodeList-like object.
	 * Adds the required 'item' method and array-like indexing.
	 *
	 * @param elements - Array of HTMLElements
	 * @returns NodeList-like object
	 */
	private arrayToNodeList(elements: HTMLElement[]): NodeListOf<HTMLElement> {
		const nodeList = Object.assign(elements, {
			item: (index: number) => elements[index] || null,
		});
		return nodeList as unknown as NodeListOf<HTMLElement>;
	}

	/**
	 * Emit a menuClosed event to tell the parent header component.
	 * This allows the header to update its state when the menu auto-closes.
	 */
	@Event({ eventName: 'menuClosed', bubbles: true, composed: true })
	menuClosed!: EventEmitter<void>;

	private emitMenuClosed() {
		this.menuClosed.emit();
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

	/**
	 * Flag used during the auto-detect ownership handshake.
	 * - false: no parent has claimed focus/keyboard ownership for this menu.
	 * - true: a parent (tabs/header) has responded to menuReady with takeOwnership.
	 *
	 * This prevents the overflow menu from installing its own focus trap when a parent
	 * has taken responsibility for focus management.
	 */
	private ownershipClaimed = false;

	/**
	 * Notify potential owners that this menu's items are ready.
	 *
	 * Emits a global 'menuReady' event with:
	 * - detail.panelId: id of the closest mobile panel (if any) so parents can match the panel
	 * - detail.host: DOM reference to this overflow menu instance
	 *
	 * The event bubbles and is composed so listeners outside the shadow DOM (e.g. tabs/header)
	 * can observe it and optionally claim ownership by dispatching 'takeOwnership'.
	 */
	@Event({ eventName: 'menuReady', bubbles: true, composed: true })
	menuReady!: EventEmitter<{ panelId: string | null; host: HTMLElement }>;

	/**
	 * Listen for takeOwnership from potential parent owners
	 */
	@Listen('takeOwnership', { target: 'window' })
	handleTakeOwnership(event: CustomEvent) {
		// Optionally check panelId to ensure the claim is for this menu
		const panelId = this.el.closest('.ontario-mobile-menu__panel')?.id || null;
		if (!event.detail || event.detail.panelId !== panelId) return;
		this.ownershipClaimed = true;
	}

	/**
	 * When items appear (or menu opens), call emitMenuReady and wait for owner
	 */
	private tryAutoOwnership(timeoutMs = 300) {
		this.ownershipClaimed = false;
		const panelId = this.el.closest('.ontario-mobile-menu__panel')?.id || null;
		this.menuReady.emit({ panelId, host: this.el });

		setTimeout(() => {
			if (!this.ownershipClaimed) {
				const menuButton = this.getMenuButton();
				if (menuButton) {
					this.setupFocusTrap(this.menu, menuButton);
				}
			}
		}, timeoutMs);
	}

	/**
	 * Emitted when navigation reaches the last menu item.
	 */
	@Event({ eventName: 'endOfMenuReached', bubbles: true, composed: true })
	endOfMenuReached!: EventEmitter<void>;

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
	render() {
		// Compute class and aria-hidden depending on whether we own open/close
		const navClass = this.isStandalone
			? this.menuIsOpen
				? 'ontario-application-navigation ontario-navigation--open'
				: 'ontario-application-navigation'
			: 'ontario-application-navigation ontario-navigation--open ontario-application-navigation--embedded';

		// Only set aria-hidden when standalone (parent controls visibility when embedded)
		const ariaHidden = this.isStandalone ? String(!this.menuIsOpen) : 'false';

		return (
			<nav
				role="navigation"
				class={navClass}
				id="ontario-application-navigation"
				ref={(el) => (this.menu = el as HTMLElement)}
				aria-hidden={ariaHidden}
			>
				<div class="ontario-application-navigation__container">
					<div class="ontario-menu-list">
						<ul class="ontario-menu" role="menu">
							{this.menuItemState.map((item) => {
								const isDisabled = (item as any)?.disabled === true;
								return (
									<li class="ontario-menu-item" role="none">
										<a role="menuitem" href={item.href} tabIndex={isDisabled ? -1 : 0}>
											{item.title}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				{/* optional aria-live region */}
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
