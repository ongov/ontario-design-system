import { Component, Prop, State, Watch, h, Listen, Element, Event, EventEmitter } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { convertStringToBoolean } from '../../utils/helper/utils';
import { HeaderKeyboardNavigation } from '../../utils/components/header/header-keyboard-navigation';

/**
 * Overflow Menu Component
 *
 * Displays a dropdown menu of links. Can operate in two modes:
 *
 * ## Standalone Mode
 * Used when placed directly in the header (desktop view).
 * - Manages its own open/close state via `menuButtonToggled` event
 * - Automatically focuses first menu item when opened
 * - Sets up focus trap to keep keyboard navigation within menu
 * - Auto-closes when focus leaves the menu area
 * - **Emits**: `menuClosed` event when menu closes (for cleanup/state sync)
 *
 * ## Embedded Mode
 * Used when placed inside `ontario-header-menu-tabs` (mobile/tablet view).
 * - Parent component controls open/close state
 * - Parent component manages focus trap
 * - Menu is always visible when parent tab is active
 * - **Emits**: `endOfMenuReached` event when Tab is pressed on last item (for focus looping)
 *
 * **Mode Detection**: Auto-detected based on DOM position (no prop needed).
 * Checks if ancestor is `ontario-header-menu-tabs` or `.ontario-mobile-menu__panel`.
 */
@Component({
	tag: 'ontario-header-overflow-menu',
	styleUrl: 'ontario-header-overflow-menu.scss',
	shadow: true,
})
export class OntarioHeaderOverflowMenu {
	@Element() el: HTMLElement;

	/**
	 * The menu items to display.
	 * Can be passed as a MenuItem array or JSON string.
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * Reference to the menu button that opens this dropdown.
	 * Used for focus trapping in standalone mode.
	 */
	@Prop() menuButtonRef?: HTMLElement;

	/**
	 * Parsed menu items (converted from string if needed).
	 */
	@State() private menuItemState: MenuItem[];

	/**
	 * Whether the menu dropdown is currently open (standalone mode only).
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * Current focused menu item index for arrow key navigation.
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
	 */
	private focusTrapCleanup: (() => void) | null = null;

	/**
	 * Runtime mode detection.
	 * Returns true when standalone (not inside tabs or mobile panel).
	 */
	private get isStandalone(): boolean {
		return !this.el.closest('ontario-header-menu-tabs') && !this.el.closest('.ontario-mobile-menu__panel');
	}

	/**
	 * Lifecycle hook called before the component is loaded.
	 */
	componentWillLoad() {
		this.parseMenuItems();
	}

	/**
	 * Lifecycle hook called after component updates.
	 * Focuses first menu item when menu opens in standalone mode.
	 */
	componentDidUpdate() {
		if (this.menuIsOpen && this.isStandalone) {
			this.focusFirstMenuItem();
		}
	}

	/**
	 * Watch for changes to menuItems prop and re-parse them.
	 */
	@Watch('menuItems')
	parseMenuItems() {
		this.menuItemState = this.parseMenuItemsData(this.menuItems) || [];
		this.setActiveLink(this.menuItemState);
	}

	/**
	 * Event emitted when menu closes (standalone mode).
	 */
	@Event({ eventName: 'menuClosed', bubbles: true, composed: true })
	menuClosed!: EventEmitter<void>;

	/**
	 * Event emitted when Tab is pressed on the last menu item (embedded mode).
	 */
	@Event({ eventName: 'endOfMenuReached', bubbles: true, composed: true })
	endOfMenuReached!: EventEmitter<void>;

	/**
	 * Listen for focus first item event from menu tabs (embedded mode).
	 */
	@Listen('focusFirstItem')
	handleFocusFirstItem() {
		this.focusFirstMenuItem();
	}

	/**
	 * Listen for menu button toggle events (standalone mode only).
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		if (!this.isStandalone) return;

		this.menuIsOpen = event.detail;
		this.menuIsOpen ? this.setupInitialFocus() : this.resetState();
	}

	/**
	 * Handle keyboard navigation within the menu.
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (this.isStandalone) {
			this.handleStandaloneKeyboard(event);
		} else {
			this.handleEmbeddedKeyboard(event);
		}
	}

	/**
	 * Auto-close menu when focus leaves (standalone mode only).
	 */
	@Listen('focusout', { target: 'window' })
	handleFocusOut(event: FocusEvent) {
		if (!this.isStandalone || !this.menuIsOpen) return;

		setTimeout(() => {
			const menuButton = this.getMenuButton();
			const focusedElement = event.relatedTarget as HTMLElement;
			const focusInMenu = this.menu?.contains(focusedElement) || this.el.shadowRoot?.contains(focusedElement);
			const focusOnButton = menuButton?.contains(focusedElement);

			if (!focusInMenu && !focusOnButton) {
				this.menuIsOpen = false;
				this.resetState();
				this.menuClosed.emit();
			}
		}, 0);
	}

	/**
	 * Handle keyboard events in standalone mode.
	 */
	private handleStandaloneKeyboard(event: KeyboardEvent) {
		if (!this.menuIsOpen) return;

		// Arrow Down from menu button -> enter menu
		if (event.key === 'ArrowDown') {
			const menuButton = this.getMenuButton();
			if (document.activeElement === menuButton) {
				event.preventDefault();
				const focusable = this.getFocusableElements();
				if (focusable.length > 0) {
					focusable[0].focus();
					this.currentIndex = 0;
					this.updateAriaLive(0);
				}
				return;
			}
		}

		this.handleArrowNavigation(event);
	}

	/**
	 * Handle keyboard events in embedded mode.
	 */
	private handleEmbeddedKeyboard(event: KeyboardEvent) {
		const shadowActive = this.el.shadowRoot?.activeElement as HTMLElement;
		const domActive = document.activeElement as HTMLElement;
		const focusInThisMenu = !!(
			(shadowActive && this.el.shadowRoot?.contains(shadowActive)) ||
			(domActive && this.menu?.contains(domActive))
		);

		if (!focusInThisMenu) return;

		// Emit event when Tab from last item
		if (event.key === 'Tab' && !event.shiftKey) {
			const focusable = this.getFocusableElements();
			const currentElement = shadowActive || domActive;

			let currentIndex = -1;
			for (let i = 0; i < focusable.length; i++) {
				if (focusable[i] === currentElement || focusable[i].contains(currentElement as Node)) {
					currentIndex = i;
					break;
				}
			}

			if (currentIndex === focusable.length - 1) {
				this.endOfMenuReached.emit();
			}
		}

		this.handleArrowNavigation(event);
	}

	/**
	 * Handle arrow key navigation (both modes).
	 * Navigates through menu items with wrapping - arrows loop from last to first item and vice versa.
	 */
	private handleArrowNavigation(event: KeyboardEvent) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		const focusable = this.getFocusableElements();
		if (!focusable.length) return;

		// Sync currentIndex with actually focused element
		const activeElement = this.el.shadowRoot?.activeElement || document.activeElement;
		const focusedIndex = focusable.findIndex((el) => el === activeElement);
		if (focusedIndex !== -1) {
			this.currentIndex = focusedIndex;
		}

		event.preventDefault();

		if (event.key === 'ArrowDown') {
			if (this.currentIndex === undefined) {
				this.currentIndex = 0;
			} else {
				this.currentIndex = (this.currentIndex + 1) % focusable.length;
			}
		} else {
			if (this.currentIndex === undefined) {
				this.currentIndex = focusable.length - 1;
			} else {
				this.currentIndex = (this.currentIndex - 1 + focusable.length) % focusable.length;
			}
		}

		focusable[this.currentIndex].focus();
		this.updateAriaLive(this.currentIndex);
	}

	/**
	 * Focus the first menu item.
	 */
	private focusFirstMenuItem() {
		const focusable = this.getFocusableElements();
		if (focusable.length > 0) {
			focusable[0].focus();
			this.currentIndex = 0;
			this.updateAriaLive(0);
		}
	}

	/**
	 * Setup when menu opens (standalone mode).
	 */
	private setupInitialFocus() {
		const menuButton = this.getMenuButton();
		if (menuButton && this.isStandalone) {
			this.setupFocusTrap(menuButton);
		}
	}

	/**
	 * Reset state when menu closes.
	 */
	private resetState() {
		this.currentIndex = undefined;
		this.clearFocusTrap();
	}

	/**
	 * Get the menu button element.
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

	/**
	 * Set up focus trap (Shift+Tab from first item loops to button).
	 */
	private setupFocusTrap(loopTarget: HTMLElement) {
		this.clearFocusTrap();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab' || !e.shiftKey) return;

			const focusable = this.getFocusableElements();
			if (focusable.length && document.activeElement === focusable[0]) {
				e.preventDefault();
				loopTarget.focus();
			}
		};

		document.addEventListener('keydown', handler, true);
		this.focusTrapCleanup = () => document.removeEventListener('keydown', handler, true);
	}

	/**
	 * Clear the active focus trap event listener.
	 */
	private clearFocusTrap() {
		if (this.focusTrapCleanup) {
			this.focusTrapCleanup();
			this.focusTrapCleanup = null;
		}
	}

	/**
	 * Get all focusable elements within the menu.
	 */
	private getFocusableElements(): HTMLElement[] {
		return HeaderKeyboardNavigation.getFocusableElements(this.menu);
	}

	/**
	 * Update ARIA live region to announce current menu item position.
	 */
	private updateAriaLive(selectedIndex: number) {
		HeaderKeyboardNavigation.updateAriaLive(this.ariaLiveRegion, selectedIndex, this.menuItemState);
	}

	/**
	 * Parse menu items from prop (array or JSON string).
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
	 */
	private setActiveLink(menuItems: MenuItem[]) {
		if (!menuItems) return;

		// SSR guard — skip auto-activation when window is not available
		if (typeof window === 'undefined') return;

		const hasActiveLink = menuItems.some((item) => item?.linkIsActive === true);
		if (hasActiveLink) return;

		menuItems.forEach((item) => {
			const sanitizedSlug = item.href.replace(/\s+/g, '-').toLowerCase();
			item.linkIsActive = window.location.pathname.includes(sanitizedSlug);
		});
	}

	render() {
		const navClass = this.isStandalone
			? this.menuIsOpen
				? 'ontario-application-navigation ontario-navigation--open'
				: 'ontario-application-navigation'
			: 'ontario-application-navigation ontario-navigation--open ontario-application-navigation--embedded';

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
								const hasIcon = !!item.icon;
								const menuItemClass = hasIcon ? 'ontario-menu-item ontario-menu-item--with-icon' : 'ontario-menu-item';

								const IconComponent = hasIcon ? `ontario-icon-${item.icon!.id}` : null;

								return (
									<li class={menuItemClass} role="none">
										<a role="menuitem" href={item.href} tabIndex={isDisabled ? -1 : 0}>
											{hasIcon && IconComponent ? (
												<span class="ontario-menu-item__label-container">
													<IconComponent />
													<span class="ontario-menu-item__label">{item.title}</span>
												</span>
											) : (
												item.title
											)}
										</a>
									</li>
								);
							})}
						</ul>
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
