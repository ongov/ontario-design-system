import { Component, Prop, State, Watch, h, Listen, Element, getAssetPath } from '@stencil/core';
import OntarioIconCloseSearch from '../ontario-icon/assets/ontario-icon-close.svg';
import OntarioIconClose from '../ontario-icon/assets/ontario-icon-close-header.svg';
import OntarioIconMenu from '../ontario-icon/assets/ontario-icon-menu-header.svg';
import OntarioIconSearch from '../ontario-icon/assets/ontario-icon-search.svg';
import OntarioIconSearchWhite from '../ontario-icon/assets/ontario-icon-search-white.svg';
import { menuItems, applicationHeaderInfo, languageToggleOptions } from './ontario-header.interface';

/**
 * Ontario Header component
 */
@Component({
	tag: 'ontario-header',
	styleUrls: {
		ontario: 'ontario-header.scss',
		application: 'ontario-application-header.scss',
	},
	shadow: true,
	assetsDirs: ['./assets'],
})
export class OntarioHeader {
	/**
	 * The HTML Element for the header
	 */
	@Element() el: HTMLElement;

	/**
	 * The type of header
	 */
	@Prop() type?: 'application' | 'ontario' = 'application';

	/**
	 * Information pertaining to the application. This is only necessary for the 'application' header type. This includes both the application name and URL for the appllication homepage.
	 *
	 * @example
	 * 	<ontario-header
	 *		type="application"
	 * .  application-header-info='{
	 * 			"name": "Application name",
	 * 			"href": "/application-homepage"
	 *    }'
	 *	</ontario-header>
	 */
	@Prop() applicationHeaderInfo: applicationHeaderInfo | string;

	/**
	 * The items that will go inside the menu
	 */
	@Prop() menuItems: menuItems[] | string;

	/**
	 * The link that contains the french page
	 */
	@Prop() languageToggleOptions: languageToggleOptions | string;

	/**
	 * The application header information is reassigned to applicationHeaderInfoState for parsing
	 */
	@State() applicationHeaderInfoState: applicationHeaderInfo;

	/**
	 * The menuItems is reassigned to itemState for parsing
	 *
	 * @example
	 * 	<ontario-header
	 *			menu-Items='[{
	 *				"name": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"name": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"name": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"name": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			}]'>
	 *	</ontario-header>
	 */
	@State() private itemState: menuItems[];

	/**
	 * The languageToggleOptions is reassigned to languageState for parsing
	 *
	 * @example
	 * 	<ontario-header
	 *		language-toggle-options='{
	 *			"englishLink":"/en",
	 *			"frenchLink": "/fr"
	 *		}'
	 *	</ontario-header>
	 */
	@State() languageState: languageToggleOptions;

	/**
	 * Toggler for the menu and the search button
	 */
	@State() menuToggle: boolean = false;
	@State() searchToggle?: boolean = false;

	/**
	 * Assigning values to elements to use them as ref
	 */
	header!: HTMLElement;
	menuButton!: HTMLElement;
	searchBar!: HTMLInputElement;
	searchButton!: HTMLInputElement;

	@Watch('applicationHeaderInfo')
	private parseapplicationHeaderInfo() {
		const applicationHeaderInfo = this.applicationHeaderInfo;
		if (applicationHeaderInfo) {
			if (typeof applicationHeaderInfo === 'string') this.applicationHeaderInfoState = JSON.parse(applicationHeaderInfo);
			else this.applicationHeaderInfoState = applicationHeaderInfo;
		}
	}

	/**
	 * Logic to close the menu when anything outside the menu is clicked
	 */
	@Listen('click', { capture: true, target: 'window' })
	handleClick(event: any) {
		// if the button is clicked, return
		if (event.composedPath().includes(this.menuButton)) {
			return;
		}

		// If the click was outside the current component, do the following
		if (this.menuToggle) this.menuToggle = !this.menuToggle;
	}

	@Watch('menuItems')
	parseMenuItems() {
		if (typeof this.menuItems !== 'undefined') {
			if (!Array.isArray(this.menuItems)) {
				this.itemState = JSON.parse(this.menuItems);
			} else {
				this.itemState = this.menuItems;
			}
		}
	}

	@Watch('languageToggleOptions')
	private parseLanguage() {
		const languageToggleOptions = this.languageToggleOptions;
		if (languageToggleOptions) {
			if (typeof languageToggleOptions === 'string') {
				this.languageState = JSON.parse(languageToggleOptions);
			} else {
				this.languageState = languageToggleOptions;
			}
		}
	}

	/**
	 * Logic to handle the menu toggling
	 */
	handleMenuToggle = () => {
		this.menuToggle = !this.menuToggle;
		this.searchToggle = undefined;
	};

	/**
	 * Logic to handle the search toggling
	 */
	handleSearchToggle = () => {
		this.searchToggle = !this.searchToggle;
	};

	/**
	 * event.preventDefault(): https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	 * location.href: https://developer.mozilla.org/en-US/docs/Web/API/Location/href
	 */
	handleSubmit = (event: any) => {
		event.preventDefault();
		location.href = `https://www.ontario.ca/search/search-results?query=${event.target[0].value}`;
	};

	/**
	 * Logic to make the focus go back to the menu button when the list ends
	 */
	trapMenuFocus = () => {
		this.menuButton.focus();
	};

	/**
	 * This function generates the menu items in a <li>, accordingly, to the given parameters.
	 *
	 * href and name are necessary, but rest are not.
	 *
	 * @param href the href of the menu item
	 * @param name the name of the menu item
	 * @param linkIsActive when set to true, this will add the classes necessary to style the link in a way that indicates to the user what the active page/link is
	 * @param liClass if there is a class that is related to the <a> portion of the menu item, put it here
	 * @param onClick for any custon onClick event a user might want to add to their menu links
	 * @param onBlur when set to true, it will call the function trapMenuFocus(), otherwise nothing is done (used in lastLink)
	 * @param tabIndex when set to true, it will set the tabindex to be -1, meaning it can't be in focus (used in items when the menu is closed)
	 */
	private generateMenuItem(href: string, name: string, linkIsActive: any, liClass?: string, onClick?: any, onBlur?: boolean, tabIndex?: boolean) {
		return (
			<li class={liClass}>
				<a class={linkIsActive && `ontario-link--active`} href={href} onClick={onClick} onBlur={onBlur ? this.trapMenuFocus : undefined} tabindex={tabIndex ? -1 : undefined}>
					{name}
				</a>
			</li>
		);
	}

	private showMenuButton() {
		return (
			<button
				class={
					this.menuToggle
						? 'ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-application-navigation--open'
						: 'ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-application-navigation--closed'
				}
				id="ontario-application-header-menu-toggler"
				aria-label={this.menuToggle ? 'open menu' : 'close menu'}
				onClick={this.handleMenuToggle}
				aria-hidden={`${this.menuToggle}`}
				ref={el => (this.menuButton = el as HTMLInputElement)}
			>
				<div class="ontario-icon-container" innerHTML={this.menuToggle ? OntarioIconClose : OntarioIconMenu} />
				<span>Menu</span>
			</button>
		);
	}

	/**
	 * The renderMenuButton is needed because of how the ref can only be used once in a component.
	 * Without this function, the trapMenuFocus() would not work in all of the 3 different configs (desktop, tablet, and mobile).
	 */
	private renderMenuButton(itemLength: number) {
		if (itemLength > 5) {
			return <div>{this.showMenuButton()}</div>;
		} else if (itemLength > 2) {
			return <div class="ontario-hide-for-large">{this.showMenuButton()}</div>;
		} else return <div class="ontario-show-for-small-only">{this.showMenuButton()}</div>;
	}

	/**
	 * The renderMenuUl function covers the edge case of when there are less than 4 items,
	 * and the screen size changes when the menu is opened.
	 */
	private renderMenuUl(itemLength: number) {
		if (itemLength > 5) {
			return '';
		} else if (itemLength > 2) {
			return 'ontario-hide-for-large';
		} else return 'ontario-show-for-small-only';
	}

	/**
	 * The renderOverlay function covers the edge case of when there are 2 or less items,
	 * and the screen size changes when the menu is opened.
	 */
	private renderOverlay(itemLength: number) {
		if (itemLength <= 2) {
			return 'ontario-show-for-small-only ontario-overlay';
		} else return 'ontario-hide-for-large ontario-overlay';
	}

	/**
	 * The onEscapePressed function clears the searchbar form when Escape is pressed
	 */
	private onEscapePressed(event: any) {
		if (event.key === 'Escape') {
			event.path[0].value = '';
		}
	}

	componentWillLoad() {
		this.parseapplicationHeaderInfo();
		this.parseMenuItems();
		this.parseLanguage();
	}

	/**
	 * Handles the focus when menu/toggle button is clicked.
	 * When search button is clicked, the search bar is in focus,
	 * when the closed button is clicked, the search button is back into focus.
	 * When the menu is closed, the menu button should be out of focus.
	 */
	componentDidUpdate() {
		if (this.type == 'ontario') {
			if (this.searchToggle === true) this.searchBar.focus();
			if (this.searchToggle === false) this.searchButton.focus();
			if (this.menuToggle === false) this.menuButton.blur();
		}
	}

	render() {
		if (this.type == 'ontario') {
			return (
				<div>
					<div class="ontario-header__container" ref={el => (this.header = el as HTMLInputElement)}>
						<header class={this.searchToggle ? 'ontario-header ontario-header--search-open' : 'ontario-header'} id="ontario-header">
							<div class="ontario-row">
								<div class="ontario-hide-for-small-only ontario-header__logo-container ontario-columns ontario-small-2 ontario-medium-4 ontario-large-3 ">
									<a href="https://www.ontario.ca/page/government-ontario">
										<img class="ontario-show-for-medium" src={getAssetPath('./assets/ontario-logo--desktop.svg')} alt="Government of Ontario" />
									</a>
								</div>

								<div class="ontario-show-for-small-only ontario-header__logo-container ontario-columns ontario-small-2 ontario-medium-4 ontario-large-3 ">
									<a href="https://www.ontario.ca/page/government-ontario">
										<img class="ontario-show-for-small-only" src={getAssetPath('./assets/ontario-logo--mobile.svg')} alt="Government of Ontario" />
									</a>
								</div>

								<form
									name="searchForm"
									id="ontario-search-form-container"
									onSubmit={this.handleSubmit}
									class="ontario-header__search-container ontario-columns ontario-small-10 ontario-medium-offset-3 ontario-medium-6 ontario-large-offset-0 ontario-large-6"
									aria-hidden={`${this.menuToggle}`}
									novalidate
								>
									<label htmlFor="ontario-search-input-field" class="ontario-show-for-sr">
										Search
									</label>
									<input
										type="text"
										name="search"
										id="ontario-search-input-field"
										autoComplete="off"
										aria-autocomplete="none"
										class="ontario-input ontario-header__search-input"
										required={true}
										ref={el => (this.searchBar = el as HTMLInputElement)}
										onKeyDown={this.onEscapePressed}
									/>
									<input class="ontario-header__search-reset" id="ontario-search-reset" type="reset" value="" aria-label="Clear" innerHTML={OntarioIconCloseSearch}></input>
									<button class="ontario-header__search-submit" id="ontario-search-submit" type="submit">
										<div class="ontario-icon-container" innerHTML={OntarioIconSearch} />
										<span class="ontario-show-for-sr">Submit</span>
									</button>
								</form>
								<div class="ontario-header__nav-right-container ontario-columns ontario-small-10 ontario-medium-8 ontario-large-3">
									<a href={this.languageState?.frenchLink} class="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline">
										<abbr title="Français" class="ontario-show-for-small-only">
											FR
										</abbr>
										<span class="ontario-show-for-medium">Français</span>
									</a>
									<div class="ontario-hide-for-large">
										<button
											class="ontario-header__search-toggler ontario-header-button ontario-header-button--without-outline "
											id="ontario-header-search-toggler"
											aria-controls="ontario-search-form-container"
											onClick={this.handleSearchToggle}
											ref={el => (this.searchButton = el as HTMLInputElement)}
										>
											<div class="ontario-icon-container" innerHTML={OntarioIconSearchWhite} />
											<span class="ontario-show-for-medium ontario-show">Search</span>
										</button>
									</div>
									{this.showMenuButton()}
								</div>
								<div class="ontario-header__search-close-container ontario-columns ontario-small-2 ontario-medium-3">
									<button
										class="ontario-header__search-close ontario-header-button ontario-header-button--without-outline"
										id="ontario-header-search-close"
										aria-label="close search bar"
										onClick={this.handleSearchToggle}
									>
										<span aria-hidden={`${this.menuToggle}`}>close</span>
										<div class="ontario-icon-container" innerHTML={OntarioIconClose} />
									</button>
								</div>
							</div>
						</header>
						{this.menuToggle ? (
							<nav role="navigation" class="ontario-navigation" id="ontario-navigation" aria-hidden={`${this.menuToggle}`}>
								<div class="ontario-navigation ontario-navigation__container ontario-navigation--open">
									<ul>
										{/*
											Maps through all the menu items, and the last item is set to lastLink.
											When the focus goes away from the lastLink, return the focus to the menu button
											(only applicable pressing the "tab" key, not actually clicking away from the menu).
										*/}
										{this.itemState?.map((item, index) => {
											const lastLink = index + 1 === this.itemState.length;
											return lastLink
												? this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler, true)
												: this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler);
										})}
									</ul>
								</div>
							</nav>
						) : (
							<nav role="navigation" class="ontario-navigation" id="ontario-navigation" aria-hidden={`${this.menuToggle}`}>
								<div class="ontario-navigation ontario-navigation__container ontario-navigation--closed">
									<ul>
										{/*
											When the menu is closed, all the items are set to tabindex = "-1".
											This is not really necessary, but it's good practice.
											https://www.maxability.co.in/2016/06/13/tabindex-for-accessibility-good-bad-and-ugly/
										*/}
										{this.itemState?.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler, false, true))}
									</ul>
								</div>
							</nav>
						)}
					</div>
					{this.menuToggle && <div class="ontario-hide-for-large ontario-overlay" />}
				</div>
			);
		} else {
			return (
				<div>
					<div class="ontario-application-header-container" id="ontario-application-header" ref={el => (this.header = el as HTMLInputElement)}>
						<div class="ontario-application-header-container">
							<section class="ontario-application-header">
								<div class="ontario-row">
									<div class="ontario-columns ontario-small-6 ontario-application-header__logo">
										<a href="https://www.ontario.ca/page/government-ontario">
											<img src={getAssetPath('./assets/ontario-logo-application-header.svg')} alt="Government of Ontario" />
										</a>
									</div>
									<div class="ontario-columns ontario-small-6 ontario-application-header__lang-toggle">
										<a href={this.languageState?.frenchLink} class="ontario-header-button ontario-header-button--without-outline">
											<abbr title="Français" class="ontario-show-for-small-only">
												FR
											</abbr>
											<span class="ontario-show-for-medium">Français</span>
										</a>
									</div>
								</div>
							</section>
						</div>
						<div class="ontario-application-subheader-menu__container">
							<section class="ontario-application-subheader">
								<div class="ontario-row">
									<div class="ontario-columns ontario-small-12 ontario-application-subheader__container">
										<p class="ontario-application-subheader__heading">
											<a href={this.applicationHeaderInfoState?.href}>{this.applicationHeaderInfoState?.name}</a>
										</p>
										<div class="ontario-application-subheader__menu-container">
											<div class="ontario-show-for-large">
												<ul class="ontario-application-subheader__menu ">
													{/*
														First 5 items in the itemState are shown in the header itself.
													*/}
													{this.itemState?.slice(0, 5).map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler))}
												</ul>
											</div>
											<div class="ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
												<ul class="ontario-application-subheader__menu ">
													{/*
														First 2 items in the itemState are shown in the header itself (tablet).
													*/}
													{this.itemState?.slice(0, 2).map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler))}
												</ul>
											</div>
											{this.itemState !== undefined && this.renderMenuButton(this.itemState.length)}
										</div>
									</div>
								</div>
							</section>
							{this.menuToggle ? (
								<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation" aria-hidden={`${this.menuToggle}`}>
									<div class="ontario-application-navigation ontario-application-navigation__container ontario-navigation--open">
										<ul class={this.renderMenuUl(this.itemState.length)}>
											{/*
												All items will be shown inside the menu on mobile,
												The first 2 items will be in the header, and rest inside menu on tablet,
												The first 5 items will be in the header, and rest inside menu on desktop.
											*/}
											{this.itemState?.slice(0, 2).map((item, index) => {
												const lastLink = index + 1 === this.itemState.length - 0;
												return lastLink
													? this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-show-for-small-only', item.onClickHandler, true)
													: this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-show-for-small-only', item.onClickHandler);
											})}

											{this.itemState?.slice(2, 5).map((item, index) => {
												const lastLink = index + 1 === this.itemState.length - 2;
												return lastLink
													? this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-hide-for-large', item.onClickHandler, true)
													: this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-hide-for-large', item.onClickHandler);
											})}

											{this.itemState?.slice(5).map((item, index) => {
												const lastLink = index + 1 === this.itemState.length - 5;
												return lastLink
													? this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler, true)
													: this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler);
											})}
										</ul>
									</div>
								</nav>
							) : (
								<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation" aria-hidden={`${this.menuToggle}`}>
									<div class="ontario-application-navigation ontario-application-navigation__container ontario-navigation--closed">
										<ul>
											{/*
												This part of the code is necessary for the animation to close the menu to work properly.
												When the menu is closed, all the items are set to tabindex = "-1".
												This is not really necessary, but it's good practice.
												https://www.maxability.co.in/2016/06/13/tabindex-for-accessibility-good-bad-and-ugly/
											*/}
											{this.itemState
												?.slice(0, 2)
												.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-show-for-small-only', item.onClickHandler, false, true))}

											{this.itemState
												?.slice(2, 5)
												.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-hide-for-large', item.onClickHandler, false, true))}

											{this.itemState?.slice(5).map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, '', item.onClickHandler, false, true))}
										</ul>
									</div>
								</nav>
							)}
						</div>
					</div>
					{this.menuToggle && <div class={this.renderOverlay(this.itemState.length)} />}
				</div>
			);
		}
	}
}
