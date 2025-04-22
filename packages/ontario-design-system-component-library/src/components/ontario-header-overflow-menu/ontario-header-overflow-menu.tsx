import { Component, Prop, State, Watch, h, Listen, Element } from '@stencil/core';
import { MenuItem } from './ontario-header-overflow-menu.interface';

@Component({
	tag: 'ontario-header-overflow-menu',
	styleUrl: 'ontario-header-overflow-menu.scss',
	shadow: true,
})
export class OntarioHeaderApplicationMenu {
	@Element() el: HTMLElement;

	/**
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
	 * The `menuItems` are reassigned to `menuItemState` for parsing by `parseMenuItems()`.
	 */
	@State() private menuItemState: MenuItem[];

	/**
	 * A state variable to determine whether the menu is open or not.
	 *
	 * Triggered by either the `menuButtonToggled` event or the `click` event.
	 */
	@State() private menuIsOpen: boolean = false;

	/**
	 * The current index of the menu item that is focused.
	 */
	private currentIndex: number | undefined = undefined;

	@Watch('menuItems')
	parseMenuItems() {
		if (!Array.isArray(this.menuItems) && typeof this.menuItems === 'string') {
			this.menuItemState = JSON.parse(this.menuItems);
		} else {
			this.menuItemState = this.menuItems;
		}

		// if a menu item is the active page, update the linkIsActive value for that menu item
		this.menuItemState.map((item) => {
			const activeLinkRegex = item.href.replace(/\s+/g, '-').toLowerCase();
			item.linkIsActive = window.location.pathname.includes(activeLinkRegex);
		});
	}

	/**
	 * This listens for the `menuButtonToggled` event sent from the header menu button when it is clicked.
	 * It is used to toggle menu visibility by adding or removing the ontario-navigation--open class on the nav element.
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		this.menuIsOpen = event.detail;
		this.currentIndex = undefined;
	}

	/**
	 * Listens for clicks on anything outside of the menu and closes
	 * the menu by removing the ontario-navigation--open class on the nav element.
	 */
	@Listen('click', { capture: true, target: 'window' })
	handleClick(event: any) {
		// if the menu (ref) is clicked, return
		if (event.composedPath().includes(this.menu)) {
			this.menuIsOpen = true;
			return;
		}

		this.menuIsOpen = false;
		this.currentIndex = undefined;
	}

	/**
	 * Listens for keydown events and handles navigation within the menu using the ArrowUp and ArrowDown keys.
	 */
	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (this.menuIsOpen) {
			const focusableElements: NodeListOf<HTMLElement> = this.menu.querySelectorAll('.ontario-menu-item');

			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					if (this.currentIndex === -1 || this.currentIndex === undefined) {
						this.currentIndex = 0;
					} else {
						this.currentIndex = (this.currentIndex + 1) % focusableElements.length;
					}
					focusableElements[this.currentIndex].focus();
					/**
					 * Tried other ways of triggering this function to condense code via a watch on currentIndex,
					 * and also tried sticking at the bottom of the switch's parent if statement.
					 *
					 * Both attempts led to inconsistent results (e.g. the aria message was out of sync with currentIndex)
					 * or just didn't appear at all. Setting this at the source seems to have the best outcome.
					 */
					this.updateAriaLive(this.currentIndex);
					break;
				case 'ArrowUp':
					event.preventDefault();
					if (this.currentIndex === -1 || this.currentIndex === undefined) {
						this.currentIndex = focusableElements.length - 1;
					} else {
						this.currentIndex = (this.currentIndex - 1 + focusableElements.length) % focusableElements.length;
					}
					focusableElements[this.currentIndex].focus();
					this.updateAriaLive(this.currentIndex);
					break;
				case 'Tab':
					focusableElements.forEach((element, index) => {
						element.addEventListener('focus', () => {
							this.currentIndex = index;
							this.updateAriaLive(this.currentIndex);
						});
					});
					break;
			}
		}
	}

	/**
	 * Updates the aria-live region with the menu item count and selected option.
	 *
	 * @param {number} selectedIndex The index of the selected menu item
	 */
	private updateAriaLive(selectedIndex: number) {
		const menuItemCount = this.menuItemState.length;
		const selectedMenuItemNumber = selectedIndex + 1;
		const ariaLiveMessage = `Option ${selectedMenuItemNumber} of ${menuItemCount}`;

		if (this.ariaLiveRegion) {
			this.ariaLiveRegion.textContent = ariaLiveMessage;
		}
	}

	/**
	 * This function generates the menu items in a <li>, accordingly, to the given parameters.
	 *
	 * href and title are necessary, but rest are not.
	 *
	 * @param href - the href of the menu item
	 * @param title - the title of the menu item
	 * @param linkIsActive - when set to true, this will add the classes necessary to style the link in a way that indicates to the user what the active page/link is
	 * @param liClass - if there is a class that is related to the <a> portion of the menu item, put it here
	 * @param onClick - for any custom onClick event a user might want to add to their menu links
	 */
	private generateMenuItem(
		href: string,
		title: string,
		linkIsActive: boolean | undefined,
		liClass?: string,
		onClick?: any,
	) {
		return (
			<li class={liClass}>
				<a class={`ontario-menu-item ${linkIsActive ? 'ontario-link--active' : ''}`} href={href} onClick={onClick}>
					{title}
				</a>
			</li>
		);
	}

	componentWillLoad() {
		this.parseMenuItems();
	}

	/**
	 * Assigning values to elements to use them as ref
	 */
	private menu!: HTMLElement;

	/**
	 * The aria-live region that will be updated with the selected menu item.
	 */
	private ariaLiveRegion!: HTMLElement;

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
					<ul>
						{this.menuItemState.map((item: any) => {
							return this.generateMenuItem(item.href, item.title, item.linkIsActive);
						})}
					</ul>
				</div>
				<div
					id="aria-live-region"
					class="ontario-visually-hidden"
					aria-live="polite"
					ref={(el) => (this.ariaLiveRegion = el as HTMLElement)}
				></div>
			</nav>
		);
	}
}
