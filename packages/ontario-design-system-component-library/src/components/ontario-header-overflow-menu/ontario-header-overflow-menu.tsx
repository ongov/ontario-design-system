import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';
import { generateMenuItem } from '../../utils/components/header/header-menu-items';
import { convertStringToBoolean } from '../../utils/helper/utils';

@Component({
	tag: 'ontario-header-overflow-menu',
	styleUrl: 'ontario-header-overflow-menu.scss',
	shadow: true,
})
export class OntarioHeaderApplicationMenu {
	@Element() el: HTMLElement;

	/**
	 * The items that will go inside the menu.
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * Sign-in menu items for the Ontario header on mobile
	 */
	@Prop() signInMenuItems?: MenuItem[] | string;

	/**
	 * The header type to determine if tabs should be shown
	 */
	@Prop() headerType?: string;

	/**
	 * The current breakpoint state to determine mobile behavior
	 */
	@Prop() breakpointState?: string;

	/**
	 * Reference to the menu button for focus trapping
	 */
	@Prop() menuButtonRef?: HTMLElement;

	/**
	 * The parsed menu items state
	 */
	@State() private menuItemState: MenuItem[];

	/**
	 * The parsed sign-in menu items state
	 */
	@State() private signInMenuItemState: MenuItem[] = [];

	/**
	 * The currently active tab (0 = topics, 1 = sign-in)
	 */
	@State() private activeTab: number = 0;

	/**
	 * Whether to show tabs (mobile + ontario header + has sign-in items)
	 */
	@State() private showTabs: boolean = false;

	/**
	 * Whether the menu is open or not
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * The current index of the menu item that is focused
	 */
	private currentIndex: number | undefined = undefined;

	/**
	 * Reference to the menu element
	 */
	private menu!: HTMLElement;

	/**
	 * Reference to the aria-live region
	 */
	private ariaLiveRegion!: HTMLElement;

	/**
	 * Single focus trap cleanup function
	 */
	private focusTrapCleanup: (() => void) | null = null;

	/**
	 * Component lifecycle - Initialize menu items and show tabs state
	 */
	componentWillLoad() {
		this.parseMenuItems();
		this.parseSignInMenuItems();
		this.updateShowTabs();
	}

	/**
	 * Watch for changes to menu items prop and parse them
	 */
	@Watch('menuItems')
	parseMenuItems() {
		this.menuItemState = this.parseMenuItemsData(this.menuItems) || [];
		this.setActiveLink(this.menuItemState);
	}

	/**
	 * Watch for changes to sign-in menu items prop and parse them
	 */
	@Watch('signInMenuItems')
	parseSignInMenuItems() {
		this.signInMenuItemState = this.parseMenuItemsData(this.signInMenuItems) || [];
		this.updateShowTabs();
	}

	/**
	 * Watch for changes to header type and breakpoint state to update tab visibility
	 */
	@Watch('headerType')
	@Watch('breakpointState')
	updateShowTabs() {
		this.showTabs =
			this.headerType === 'ontario' &&
			(this.breakpointState === 'mobile' || this.breakpointState === 'tablet') &&
			this.signInMenuItemState.length > 0;
	}

	/**
	 * Consolidated parsing logic for both menu types
	 */
	private parseMenuItemsData(items: MenuItem[] | string | undefined): MenuItem[] | null {
		if (!items) return null;

		if (typeof items === 'string') {
			const parsed = JSON.parse(items) as MenuItem[];
			// Convert stringified boolean values
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
	 * Set active link if none is explicitly set
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

	/**
	 * Listen for menu button toggle events from the parent header component
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
	 * Handle keyboard navigation within the menu
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (!this.menuIsOpen) return;

		if (this.showTabs) {
			this.handleTabbedKeyDown(event);
		} else {
			this.handleSimpleMenuKeyDown(event);
		}
	}

	/**
	 * Handle keyboard navigation for simple menu using arrow keys
	 */
	private handleSimpleMenuKeyDown(event: KeyboardEvent) {
		const focusableElements = this.menu.querySelectorAll('.ontario-menu-item') as NodeListOf<HTMLElement>;
		this.handleArrowNavigation(event, focusableElements, this.menuItemState);
	}

	/**
	 * Handle keyboard navigation for tabbed interface with tab switching and menu navigation
	 */
	private handleTabbedKeyDown(event: KeyboardEvent) {
		// Handle tab switching with arrows
		if (this.handleTabSwitching(event)) return;

		// Handle menu navigation within active panel
		const activePanel = this.getActiveTabPanel();
		if (!activePanel) return;

		const focusableElements = activePanel.querySelectorAll('.ontario-menu-item') as NodeListOf<HTMLElement>;
		const currentMenuItems = this.activeTab === 0 ? this.menuItemState : this.signInMenuItemState;
		this.handleArrowNavigation(event, focusableElements, currentMenuItems);
	}

	/**
	 * Consolidated arrow navigation logic for both simple and tabbed menus
	 */
	private handleArrowNavigation(event: KeyboardEvent, elements: NodeListOf<HTMLElement>, menuItems: MenuItem[]) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		event.preventDefault();

		if (event.key === 'ArrowDown') {
			this.currentIndex = this.currentIndex === undefined ? 0 : (this.currentIndex + 1) % elements.length;
		} else {
			this.currentIndex =
				this.currentIndex === undefined
					? elements.length - 1
					: (this.currentIndex - 1 + elements.length) % elements.length;
		}

		elements[this.currentIndex].focus();
		this.updateAriaLive(this.currentIndex, menuItems);
	}

	/**
	 * Handle tab switching between Topics and Sign In tabs
	 */
	private handleTabSwitching(event: KeyboardEvent): boolean {
		const tabs = this.el.shadowRoot?.querySelectorAll('[role="tab"]') as NodeListOf<HTMLButtonElement>;
		const currentTab = this.el.shadowRoot?.querySelector('[role="tab"][aria-selected="true"]') as HTMLButtonElement;

		if (!tabs || !currentTab || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return false;

		event.preventDefault();
		const currentTabIndex = Array.from(tabs).indexOf(currentTab);
		const nextTabIndex =
			event.key === 'ArrowRight'
				? (currentTabIndex + 1) % tabs.length
				: (currentTabIndex - 1 + tabs.length) % tabs.length;

		this.switchTab(nextTabIndex);
		return true;
	}

	/**
	 * Handle keyboard events specific to individual tab buttons
	 */
	private handleTabKeyDown(event: KeyboardEvent, tabIndex: number) {
		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowRight':
				event.preventDefault();
				event.stopPropagation();
				this.switchTab(tabIndex === 0 ? 1 : 0);
				break;

			case 'Enter':
			case ' ':
				event.preventDefault();
				event.stopPropagation();
				this.switchTab(tabIndex);
				break;
		}
	}

	/**
	 * Switch to a specific tab by index
	 */
	private switchTab(tabIndex: number) {
		this.activeTab = tabIndex;
		this.resetCurrentIndex();
		this.focusTab(tabIndex);
	}

	/**
	 * Focus a specific tab by index and update focus trap
	 */
	private focusTab(tabIndex: number) {
		setTimeout(() => {
			const tab = this.getTabElement(tabIndex);
			if (tab) {
				tab.focus();
				if (this.showTabs) {
					const activePanel = this.getActiveTabPanel();
					if (activePanel) {
						this.setupFocusTrap(activePanel, tab);
					}
				}
			}
		}, 0);
	}

	/**
	 * Get tab element by index
	 */
	private getTabElement(tabIndex: number): HTMLButtonElement | null {
		const tabId = `#ontario-mobile-menu-tab-${tabIndex === 0 ? 'topics' : 'sign-in'}`;
		return this.el.shadowRoot?.querySelector(tabId) as HTMLButtonElement;
	}

	/**
	 * Get the currently active tab panel
	 */
	private getActiveTabPanel(): HTMLElement | null {
		const panelId = `#ontario-mobile-menu-panel-${this.activeTab === 0 ? 'topics' : 'sign-in'}`;
		return this.el.shadowRoot?.querySelector(panelId) as HTMLElement;
	}

	/**
	 * Set up initial focus when menu opens based on interface type
	 */
	private setupInitialFocus() {
		setTimeout(() => {
			if (this.showTabs) {
				this.focusTab(this.activeTab);
			} else {
				const firstMenuItem = this.menu.querySelector('.ontario-menu-item') as HTMLElement;
				const menuContainer = this.el.shadowRoot?.querySelector('.ontario-navigation-content') as HTMLElement;
				const menuButton = this.getMenuButton();

				if (firstMenuItem) {
					firstMenuItem.focus();
					this.currentIndex = 0;
					this.updateAriaLive(0, this.menuItemState);
				}

				if (menuContainer && menuButton) {
					this.setupFocusTrap(menuContainer, menuButton);
				}
			}
		}, 100);
	}

	/**
	 * Reset state when menu closes
	 */
	private resetState() {
		this.resetCurrentIndex();
		this.clearFocusTrap();
	}

	/**
	 * Reset the current menu item index to undefined
	 */
	private resetCurrentIndex() {
		this.currentIndex = undefined;
	}

	/**
	 * Get the menu button from the parent header component or fallback to DOM search
	 */
	private getMenuButton(): HTMLButtonElement | null {
		if (this.menuButtonRef) {
			return this.menuButtonRef as HTMLButtonElement;
		}

		const selectors = [
			'#ontario-header-menu-toggler',
			'#ontario-application-header-menu-toggler',
			'#ontario-header-sign-in-toggler',
		];

		for (const selector of selectors) {
			const button = document.querySelector(selector) as HTMLButtonElement;
			if (button?.getAttribute('aria-expanded') === 'true') {
				return button;
			}
		}
		return null;
	}

	/**
	 * Set up focus trap for the given panel and loop target
	 */
	private setupFocusTrap(panel: HTMLElement, loopTarget: HTMLElement) {
		this.clearFocusTrap();
		this.focusTrapCleanup = this.trapFocus(panel, loopTarget);
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
	 * Get all focusable elements within a given panel
	 */
	private getFocusableElements(panel: HTMLElement): HTMLElement[] {
		if (!panel) return [];

		const selectors =
			'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		const elements = panel.querySelectorAll(selectors) as NodeListOf<HTMLElement>;

		return Array.from(elements).filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hasAttribute('hidden'));
	}

	/**
	 * Create a focus trap that loops between menu items and the loop target button
	 */
	private trapFocus(panel: HTMLElement, loopTarget: HTMLElement): () => void {
		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const focusable = this.getFocusableElements(panel);
			if (!focusable.length) return;

			const [first, last] = [focusable[0], focusable[focusable.length - 1]];

			let active = document.activeElement;
			if (this.el.shadowRoot?.activeElement) {
				active = this.el.shadowRoot.activeElement;
			}

			const isInPanel = focusable.includes(active as HTMLElement);
			const isOnLoopTarget = active === loopTarget;

			if (!isInPanel && !isOnLoopTarget) return;

			if (e.shiftKey) {
				if (active === first) {
					e.preventDefault();
					loopTarget.focus();
				} else if (active === loopTarget) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (active === last) {
					e.preventDefault();
					loopTarget.focus();
				} else if (active === loopTarget) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener('keydown', handler, true);
		return () => document.removeEventListener('keydown', handler, true);
	}

	/**
	 * Update the aria-live region with current selection information
	 */
	private updateAriaLive(selectedIndex: number, menuItems: MenuItem[]) {
		if (!this.ariaLiveRegion || !menuItems) return;
		this.ariaLiveRegion.textContent = `Option ${selectedIndex + 1} of ${menuItems.length}`;
	}

	/**
	 * Create a tab button with consistent properties
	 */
	private createTab(tabIndex: number, label: string, panelSuffix: string) {
		const isActive = this.activeTab === tabIndex;
		return (
			<button
				class={`ontario-mobile-menu__tab ontario-mobile-menu__tab--${panelSuffix} ${isActive ? 'ontario-mobile-menu__tab--active' : ''}`}
				id={`ontario-mobile-menu-tab-${panelSuffix}`}
				role="tab"
				aria-selected={isActive ? 'true' : 'false'}
				aria-controls={`ontario-mobile-menu-panel-${panelSuffix}`}
				tabindex={isActive ? '0' : '-1'}
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					event.preventDefault();
					this.switchTab(tabIndex);
				}}
				onKeyDown={(event) => this.handleTabKeyDown(event, tabIndex)}
			>
				{label}
			</button>
		);
	}

	/**
	 * Create a tab panel with consistent properties
	 */
	private createTabPanel(tabIndex: number, panelSuffix: string, menuItems: MenuItem[]) {
		const isActive = this.activeTab === tabIndex;
		return (
			<div
				class={`ontario-mobile-menu__panel ontario-mobile-menu__panel--${panelSuffix} ${isActive ? 'ontario-mobile-menu__panel--active' : ''}`}
				id={`ontario-mobile-menu-panel-${panelSuffix}`}
				role="tabpanel"
				aria-labelledby={`ontario-mobile-menu-tab-${panelSuffix}`}
				hidden={!isActive}
			>
				<ul>
					{menuItems?.map((item: MenuItem) =>
						generateMenuItem(item.href, item.title, item.linkIsActive ?? false, item.description),
					)}
				</ul>
			</div>
		);
	}

	/**
	 * Render the tabbed interface for Ontario header on mobile/tablet devices
	 */
	private renderTabbedInterface() {
		return (
			<div>
				<div class="ontario-mobile-menu__tabs" role="tablist">
					{this.createTab(0, 'Topics', 'topics')}
					{this.createTab(1, 'Sign In', 'sign-in')}
				</div>
				{this.createTabPanel(0, 'topics', this.menuItemState)}
				{this.createTabPanel(1, 'sign-in', this.signInMenuItemState)}
			</div>
		);
	}

	/**
	 * Render the simple menu interface for desktop or application header
	 */
	private renderSimpleMenu() {
		return (
			<div class="ontario-navigation-content" role="tabpanel">
				<ul>
					{this.menuItemState?.map((item: MenuItem) =>
						generateMenuItem(item.href, item.title, item.linkIsActive ?? false, item.description),
					)}
				</ul>
			</div>
		);
	}

	/**
	 * Main render method for the overflow menu component
	 */
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
					{this.showTabs ? this.renderTabbedInterface() : this.renderSimpleMenu()}
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
