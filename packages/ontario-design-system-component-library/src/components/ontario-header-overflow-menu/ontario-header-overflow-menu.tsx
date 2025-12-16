import { Component, Prop, State, Watch, h, Listen, Element, Event, EventEmitter } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
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
	 *
	 * The items that will go inside the menu.
	 *
	 *  @example
	 * 	<ontario-header-overflow-menu
	 *			menu-items='[{
	 *				"title": "Link 1",
	 *				"href": "/link-1"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Link 2",
	 *				"href": "/link-2"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Link 3",
	 *				"href": "/link-3"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Link 4",
	 *				"href": "/link-4"
	 *				"linkIsActive": "false"
	 *			}]'>
	 *	</ontario-header-overflow-menu>
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

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
	 * Flag to track if auto-close check should happen.
	 */
	private shouldCheckAutoClose: boolean = true;

	/**
	 * Flag to prevent handling arrow navigation immediately after programmatically focusing first item.
	 */
	private justFocusedFirstItem = false;

	/**
	 * Reference to the menu container element.
	 */
	private menu!: HTMLElement;

	/**
	 * Reference to the ARIA live region for screen reader announcements.
	 */
	private ariaLiveRegion!: HTMLElement;

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
	 * Event emitted when Shift+Tab is pressed on first menu item.
	 * Tells the header to focus the menu button.
	 */
	@Event({ eventName: 'focusMenuButton', bubbles: true, composed: true })
	focusMenuButtonEvent!: EventEmitter<void>;

	/**
	 * Event emitted when user Tabs from the menu button.
	 * Asks if menu is open and ready to receive focus.
	 */
	@Event({ eventName: 'menuButtonTabPressed', bubbles: true, composed: true })
	menuButtonTabPressed!: EventEmitter<void>;

	/**
	 * Listen for focus first item event from menu tabs (embedded mode).
	 */
	@Listen('focusFirstItem', { target: 'window' })
	handleFocusFirstItem() {
		if (!this.isStandalone) {
			this.focusFirstMenuItem();
		}
	}

	/**
	 * Listen for Tab pressed from menu button.
	 * If menu is open and in standalone mode, focus first item.
	 */
	@Listen('menuButtonTabPressed', { target: 'window' })
	handleMenuButtonTab() {
		if (this.isStandalone && this.menuIsOpen) {
			this.focusFirstMenuItem();
		}
	}

	/**
	 * Listen for menu button toggle events (standalone mode only).
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	handleMenuButtonToggled(event: CustomEvent<boolean>) {
		if (!this.isStandalone) return;

		this.menuIsOpen = event.detail;
		if (!this.menuIsOpen) {
			this.resetState();
		}
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
	 * Listen for signal that focus has returned to menu button.
	 */
	@Listen('menuButtonFocused', { target: 'window' })
	handleMenuButtonFocused() {
		// Focus is back on button, don't close the menu
		this.shouldCheckAutoClose = false;
	}

	/**
	 * Auto-close menu when focus leaves (standalone mode only).
	 */
	@Listen('focusout', { target: 'window' })
	handleFocusOut(event: FocusEvent) {
		if (!this.isStandalone || !this.menuIsOpen) return;

		this.shouldCheckAutoClose = true;

		setTimeout(() => {
			const focusedElement = event.relatedTarget as HTMLElement;
			const focusInMenu = this.menu?.contains(focusedElement) || this.el.shadowRoot?.contains(focusedElement);

			if (!focusInMenu && this.shouldCheckAutoClose) {
				this.menuIsOpen = false;
				this.resetState();
				this.menuClosed.emit();
			}
		}, 0);
	}

	/**
	 * This listens for the `setAppLanguage` event sent from the language toggle when it is connected to the DOM.
	 * It is used for the initial language when the component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language> | Language) {
		this.language = validateLanguage(event);
	}

	/**
	 * This listens for the `headerLanguageToggled` event sent from the language toggle when it is connected to the DOM.
	 * It is used for changing the component language after the language toggle has been activated.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleLanguageToggle(event: CustomEvent<{ oldLanguage: Language; newLanguage: Language }>) {
		this.handleSetAppLanguage(event.detail.newLanguage);
	}

	/**
	 * Handle keyboard events in standalone mode.
	 */
	private handleStandaloneKeyboard(event: KeyboardEvent) {
		if (!this.menuIsOpen) return;

		const shadowActive = this.el.shadowRoot?.activeElement as HTMLElement;
		const focusInThisMenu = shadowActive && this.el.shadowRoot?.contains(shadowActive);

		if (!focusInThisMenu) return;

		// Handle Shift+Tab from first item -> ask header to focus button
		if (event.key === 'Tab' && event.shiftKey) {
			const focusable = this.getFocusableElements();
			if (focusable.length && shadowActive === focusable[0]) {
				event.preventDefault();
				this.focusMenuButtonEvent.emit();
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

		event.preventDefault();

		// Skip handling if we just programmatically focused the first item
		if (this.justFocusedFirstItem) {
			this.justFocusedFirstItem = false;
			return;
		}

		if (event.key === 'ArrowDown') {
			if (this.currentIndex === undefined) {
				// Sync with current focus if we don't have an index yet
				const activeElement = this.el.shadowRoot?.activeElement || document.activeElement;
				const focusedIndex = focusable.findIndex((el) => el === activeElement);
				this.currentIndex = focusedIndex !== -1 ? focusedIndex : 0;
			}
			this.currentIndex = (this.currentIndex + 1) % focusable.length;
		} else {
			if (this.currentIndex === undefined) {
				// Sync with current focus if we don't have an index yet
				const activeElement = this.el.shadowRoot?.activeElement || document.activeElement;
				const focusedIndex = focusable.findIndex((el) => el === activeElement);
				this.currentIndex = focusedIndex !== -1 ? focusedIndex : focusable.length - 1;
			}
			this.currentIndex = (this.currentIndex - 1 + focusable.length) % focusable.length;
		}

		focusable[this.currentIndex].focus();
		this.updateAriaLive(this.currentIndex);
	}

	/**
	 * Focus the first menu item.
	 * Sets currentIndex to 0 to track position for arrow navigation.
	 */
	private focusFirstMenuItem() {
		const focusable = this.getFocusableElements();
		if (focusable.length > 0) {
			focusable[0].focus();
			this.currentIndex = 0;
			this.justFocusedFirstItem = true;
			this.updateAriaLive(0);
		}
	}

	/**
	 * Reset state when menu closes.
	 */
	private resetState() {
		this.currentIndex = undefined;
		this.shouldCheckAutoClose = true;
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
	 * Get text in current language from a string or bilingual object.
	 */
	private getText(text: string | { en: string; fr: string } | undefined): string {
		if (!text) return '';
		if (typeof text === 'string') return text;
		return text[this.language ?? 'en'] || text.en || '';
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
								const isDisabled = item.disabled === true;
								const hasIcon = !!item.icon;
								const menuItemClass = hasIcon ? 'ontario-menu-item ontario-menu-item--with-icon' : 'ontario-menu-item';
								const IconComponent = hasIcon ? `ontario-icon-${item.icon!.id}` : null;

								return (
									<li class={menuItemClass} role="none">
										<a role="menuitem" href={item.href} tabIndex={isDisabled ? -1 : 0}>
											{hasIcon && IconComponent ? (
												<span class="ontario-menu-item__label-container">
													<IconComponent />
													<span class="ontario-menu-item__label">{this.getText(item.title)}</span>
												</span>
											) : (
												this.getText(item.title)
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
