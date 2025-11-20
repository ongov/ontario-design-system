import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { generateMenuItem } from '../../utils/components/header/header-menu-items';
import { convertStringToBoolean } from '../../utils/helper/utils';

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
	 * The menu items to display
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * Reference to the menu button (for focus trapping in standalone mode)
	 */
	@Prop() menuButtonRef?: HTMLElement;

	/**
	 * Whether this is being used standalone (true) or inside tabs (false)
	 */
	@Prop() standalone: boolean = true;

	/**
	 * Parsed menu items
	 */
	@State() private menuItemState: MenuItem[];

	/**
	 * Whether the menu is open (standalone mode only)
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * Current focused item index
	 */
	private currentIndex: number | undefined = undefined;

	/**
	 * Reference to the menu container
	 */
	private menu!: HTMLElement;

	/**
	 * Reference to aria-live region
	 */
	private ariaLiveRegion!: HTMLElement;

	/**
	 * Focus trap cleanup
	 */
	private focusTrapCleanup: (() => void) | null = null;

	/* ===========================
        Lifecycle & Watchers
    =========================== */

	componentWillLoad() {
		this.parseMenuItems();
	}

	@Watch('menuItems')
	parseMenuItems() {
		this.menuItemState = this.parseMenuItemsData(this.menuItems) || [];
		this.setActiveLink(this.menuItemState);
	}

	/* ===========================
        Event Listeners (Standalone Mode Only)
    =========================== */

	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		if (!this.standalone) return; // Ignore if inside tabs

		this.menuIsOpen = event.detail;
		this.menuIsOpen ? this.setupInitialFocus() : this.resetState();
	}

	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (!this.standalone) return; // Tabs component handles this
		if (!this.menuIsOpen) return;

		this.handleArrowNavigation(event);
	}

	@Listen('focusout', { target: 'window' })
	handleFocusOut(event: FocusEvent) {
		if (!this.standalone || !this.menuIsOpen) return;

		setTimeout(() => {
			const menuButton = this.getMenuButton();
			const focusedElement = event.relatedTarget as HTMLElement;

			const focusInMenu = this.menu?.contains(focusedElement);
			const focusOnButton = menuButton?.contains(focusedElement);
			const focusInShadowRoot = this.el.shadowRoot?.contains(focusedElement);

			if (!focusInMenu && !focusOnButton && !focusInShadowRoot) {
				this.menuIsOpen = false;
				this.resetState();
				this.emitMenuClosed();
			}
		}, 0);
	}

	/* ===========================
        Keyboard Navigation
    =========================== */

	private handleArrowNavigation(event: KeyboardEvent) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		event.preventDefault();

		const focusableElements = this.menu.querySelectorAll('.ontario-menu-item') as NodeListOf<HTMLElement>;

		if (event.key === 'ArrowDown') {
			this.currentIndex = this.currentIndex === undefined ? 0 : (this.currentIndex + 1) % focusableElements.length;
		} else {
			this.currentIndex =
				this.currentIndex === undefined
					? focusableElements.length - 1
					: (this.currentIndex - 1 + focusableElements.length) % focusableElements.length;
		}

		focusableElements[this.currentIndex].focus();
		this.updateAriaLive(this.currentIndex);
	}

	/* ===========================
        Focus Management (Standalone Mode)
    =========================== */

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

	private resetState() {
		this.currentIndex = undefined;
		this.clearFocusTrap();
	}

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
        Focus Trap (Standalone Mode)
    =========================== */

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
		};

		document.addEventListener('keydown', handler, true);
		this.focusTrapCleanup = () => document.removeEventListener('keydown', handler, true);
	}

	private clearFocusTrap() {
		if (this.focusTrapCleanup) {
			this.focusTrapCleanup();
			this.focusTrapCleanup = null;
		}
	}

	private getFocusableElements(panel: HTMLElement): HTMLElement[] {
		if (!panel) return [];

		const selectors =
			'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		const elements = panel.querySelectorAll(selectors) as NodeListOf<HTMLElement>;

		return Array.from(elements).filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hasAttribute('hidden'));
	}

	private emitMenuClosed() {
		this.el.dispatchEvent(
			new CustomEvent('menuClosed', {
				bubbles: true,
				composed: true,
			}),
		);
	}

	/* ===========================
        Accessibility
    =========================== */

	private updateAriaLive(selectedIndex: number) {
		if (!this.ariaLiveRegion || !this.menuItemState) return;
		this.ariaLiveRegion.textContent = `Option ${selectedIndex + 1} of ${this.menuItemState.length}`;
	}

	/* ===========================
        Data Parsing
    =========================== */

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
		// When standalone, wrap in nav with open/close behavior
		// When inside tabs, just render the list
		const menuList = (
			<ul>
				{this.menuItemState?.map((item: MenuItem) =>
					generateMenuItem(item.href, item.title, item.linkIsActive ?? false, item.description),
				)}
			</ul>
		);

		if (this.standalone) {
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
			// Inside tabs - just render the list
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
