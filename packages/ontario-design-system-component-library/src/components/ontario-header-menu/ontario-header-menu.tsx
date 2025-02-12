import { Component, Prop, State, Watch, h, Listen, Event, EventEmitter, Element } from '@stencil/core';
import { MenuItem } from './ontario-header-menu.interface';

@Component({
	tag: 'ontario-header-menu',
	styleUrl: 'ontario-header-menu.scss',
	shadow: true,
})
export class OntarioHeaderApplicationMenu {
	@Element() el: HTMLElement;

	/**
	 * The items that will go inside the menu.
	 *
	 *  @example
	 * 	<ontario-header-menu
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
	 *	</ontario-header-menu>
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * Controls the tab order flow of the menu in relation to the rest of the page.
	 *
	 * If set to `true`, when a user tabs to the end of the menu,
	 * the tab order / focus will be reset to the menu button in the header.
	 *
	 * If set to `false` the tab order will continue on down the page.
	 */
	@Prop() trapMenuFocus: boolean = true;

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

	@Watch('menuItems')
	parseMenuItems() {
		if (!Array.isArray(this.menuItems) && typeof this.menuItems === 'string') {
			this.menuItemState = JSON.parse(this.menuItems);
		} else {
			this.menuItemState = this.menuItems;
		}

		// if a menu item is the active page, update the linkIsActive value for that menu item
		this.menuItemState.map((item) => {
			const activeLinkRegex = item.title.replace(/\s+/g, '-').toLowerCase();
			item.linkIsActive = window.location.pathname.includes(activeLinkRegex);
		});
	}

	/**
	 * Emitted by `linkIsLast()`.
	 */
	@Event() endOfMenuReached: EventEmitter<boolean>;

	/**
	 * This listens for the `menuButtonToggled` event sent from the header menu button when it is clicked.
	 * It is used to toggle menu visibility by adding or removing the ontario-navigation--open class on the nav element.
	 */
	@Listen('menuButtonToggled', { target: 'window' })
	toggleMenuVisibility(event: CustomEvent<boolean>) {
		this.menuIsOpen = event.detail;
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
	 * @param onBlur - when set to true, it will call the function trapMenuFocus(), otherwise nothing is done (used in lastLink)
	 */
	private generateMenuItem(
		href: string,
		title: string,
		linkIsActive: boolean | undefined,
		lastLink: boolean = false,
		liClass?: string,
		onClick?: any,
	) {
		return (
			<li class={liClass}>
				<a
					class={linkIsActive === true ? `ontario-link--active` : ``}
					href={href}
					onClick={onClick}
					onBlur={this.trapMenuFocus && lastLink ? () => this.linkIsLast() : undefined}
				>
					{title}
				</a>
			</li>
		);
	}

	/**
	 * Conditionally triggered by the onBlur property of the menu item.
	 *
	 * Emits the `endOfMenuReached` event, which the header listens for to set the tab focus to the menu button.
	 */
	private linkIsLast() {
		this.endOfMenuReached.emit(true);
	}

	componentWillLoad() {
		this.parseMenuItems();
	}

	/**
	 * Assigning values to elements to use them as ref
	 */
	menu!: HTMLElement;

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
						{this.menuItemState.map((item: any, index) => {
							const isLastItem = index + 1 == this.menuItemState.length ? true : false;
							return this.generateMenuItem(item.href, item.title, item.linkIsActive, isLastItem);
						})}
					</ul>
				</div>
			</nav>
		);
	}
}
