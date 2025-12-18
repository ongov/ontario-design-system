import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from '../../utils/common/common.interface';

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

	@Prop() topicsMenuItems: MenuItem[] | string;
	@Prop() signInMenuItems: MenuItem[] | string;
	@Prop() menuButtonRef?: HTMLElement;

	@State() private activeTab: number = 0;
	@State() private menuIsOpen: boolean = false;
	@State() private topicsMenuItemsState: MenuItem[] = [];
	@State() private signInMenuItemsState: MenuItem[] = [];

	private currentIndex: number | undefined = undefined;
	private menu!: HTMLElement;
	private ariaLiveRegion!: HTMLElement;
	private focusTrapCleanup: (() => void) | null = null;

	/* ===========================
        Lifecycle
    =========================== */

	componentWillLoad() {
		this.parseMenuItems();
	}

	@Watch('topicsMenuItems')
	@Watch('signInMenuItems')
	parseMenuItems() {
		this.topicsMenuItemsState = this.parseMenuItemsData(this.topicsMenuItems) || [];
		this.signInMenuItemsState = this.parseMenuItemsData(this.signInMenuItems) || [];
	}

	/* ===========================
        Event Listeners
    =========================== */

	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		this.menuIsOpen = event.detail;
		this.menuIsOpen ? this.setupInitialFocus() : this.resetState();
	}

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

	private handleTabSwitching(event: KeyboardEvent): boolean {
		if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return false;

		event.preventDefault();
		this.activeTab = event.key === 'ArrowRight' ? 1 : 0;
		this.currentIndex = undefined; // Reset menu navigation
		this.focusTab(this.activeTab);
		return true;
	}

	private switchTab(tabIndex: number) {
		this.activeTab = tabIndex;
		this.currentIndex = undefined;
		this.focusTab(tabIndex);
	}

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

	private handleArrowNavigation(event: KeyboardEvent) {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;

		event.preventDefault();

		const activePanel = this.getActiveTabPanel();
		if (!activePanel) return;

		const focusableElements = activePanel.querySelectorAll('.ontario-menu-item') as NodeListOf<HTMLElement>;
		const currentMenuItems = this.activeTab === 0 ? this.topicsMenuItemsState : this.signInMenuItemsState;

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

	private getActiveTabPanel(): HTMLElement | null {
		const panelId = `#ontario-menu-panel-${this.activeTab === 0 ? 'topics' : 'sign-in'}`;
		return this.el.shadowRoot?.querySelector(panelId) as HTMLElement;
	}

	/* ===========================
        Focus Management
    =========================== */

	private setupInitialFocus() {
		setTimeout(() => {
			this.focusTab(this.activeTab);

			if (this.menuButtonRef) {
				this.setupFocusTrap(this.menuButtonRef);
			}
		}, 150);
	}

	private resetState() {
		this.currentIndex = undefined;
		this.clearFocusTrap();
	}

	/* ===========================
        Focus Trap (Full Loop for Mobile)
    =========================== */

	private setupFocusTrap(menuButton: HTMLElement) {
		this.clearFocusTrap();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const container = this.el.shadowRoot?.querySelector('.ontario-menu-tabs-container') as HTMLElement;
			const focusable = this.getFocusableElements(container);

			// Include menu button in trap cycle
			const allFocusable = [menuButton, ...focusable];
			const first = allFocusable[0];
			const last = allFocusable[allFocusable.length - 1];
			const active = document.activeElement;

			if (e.shiftKey) {
				if (active === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (active === last) {
					e.preventDefault();
					first.focus();
				}
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

	private getFocusableElements(container: HTMLElement): HTMLElement[] {
		if (!container) return [];
		const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
		const elements = container.querySelectorAll(selector) as NodeListOf<HTMLElement>;
		return Array.from(elements).filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hasAttribute('hidden'));
	}

	/* ===========================
        Accessibility
    =========================== */

	private updateAriaLive(selectedIndex: number, menuItems: MenuItem[]) {
		if (!this.ariaLiveRegion || !menuItems) return;
		this.ariaLiveRegion.textContent = `Option ${selectedIndex + 1} of ${menuItems.length}`;
	}

	/* ===========================
        Data Parsing
    =========================== */

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
