import { Component, Prop, State, Watch, h, Listen, Element, getAssetPath } from '@stencil/core';

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
	 * The number of links to appear in the Ontario application type header's subheader on desktop size. This is only required for the 'application' type header.
	 *
	 * These links will display in the order they are described in the menuItems prop. For example, if the applicationSubheaderDesktopLinks number is '4', the first four menuItems items will appear in the application subheader on desktop, and the rest will appear in the menu dropdown.
	 *
	 * If no dropdown item is needed, the applicationSubheaderDesktopLinks number should match the menuItems items length.
	 */
	@Prop() applicationSubheaderDesktopLinks: number;

	/**
	 * The number of links to appear in the Ontario application type header's subheader on tablet size. This is only required for the 'application' type header.
	 *
	 * These links will display in the order they are described in the menuItems prop. For example, if the applicationSubheaderTabletLinks number is '2', the first two menuItems items will appear in the application subheader on tablet, and the rest will appear in the menu dropdown.
	 *
	 * If no dropdown item is needed, the applicationSubheaderTabletLinks number should match the menuItems items length.
	 */
	@Prop() applicationSubheaderTabletLinks: number;

	/**
	 * The number of links to appear in the Ontario application type header's subheader on mobile size. This is only required for the 'application' type header. This is optional.
	 *
	 * These links will display in the order they are described in the menuItems prop. For example, if the applicationSubheaderMobileLinks number is '2', the first item in the menuItems list will appear in the application subheader on desktop, and the rest will appear in the menu dropdown.
	 *
	 * If no dropdown item is needed, the applicationSubheaderDesktopLinks number should match the menuItems items length.
	 */
	@Prop() applicationSubheaderMobileLinks: number;

	/**
	 * The application header information is reassigned to applicationHeaderInfoState for parsing
	 */
	@State() private applicationHeaderInfoState: applicationHeaderInfo;

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
	@State() private languageState: languageToggleOptions;

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
	menuButtonDesktop!: HTMLElement;
	menuButtonTablet!: HTMLElement;
	menuButtonMobile!: HTMLElement;
	searchBar!: HTMLInputElement;
	searchButton!: HTMLInputElement;

	@Watch('applicationHeaderInfo')
	private parseApplicationHeaderInfo() {
		const applicationHeaderInfo = this.applicationHeaderInfo;
		if (applicationHeaderInfo) {
			if (typeof applicationHeaderInfo === 'string')
				this.applicationHeaderInfoState = JSON.parse(applicationHeaderInfo);
			else this.applicationHeaderInfoState = applicationHeaderInfo;
		}
	}

	/**
	 * Logic to close the menu when anything outside the menu is clicked
	 */
	@Listen('click', { capture: true, target: 'window' })
	handleClick(event: any) {
		// if the button is clicked, return
		if (
			event.composedPath().includes(this.menuButton) ||
			event.composedPath().includes(this.menuButtonDesktop) ||
			event.composedPath().includes(this.menuButtonTablet) ||
			event.composedPath().includes(this.menuButtonMobile)
		) {
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
	trapMenuFocus = (e: any) => {
		let dataType = e.target?.dataset.type;
		if (dataType === 'app-desktop') {
			this.menuButtonDesktop.focus();
		} else if (dataType === 'app-tablet') {
			this.menuButtonTablet.focus();
		} else if (dataType === 'app-mobile') {
			this.menuButtonMobile.focus();
		} else {
			this.menuButton.focus();
		}
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
	 */
	private generateMenuItem(href: string, name: string, linkIsActive: any, type: string, liClass?: string, onClick?: any, onBlur?: boolean) {
		return (
			<li class={liClass}>
				<a class={linkIsActive && `ontario-link--active`} href={href} onClick={onClick} onBlur={onBlur ? this.trapMenuFocus : undefined} data-type={type}>
					{name}
				</a>
			</li>
		);
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
		this.parseApplicationHeaderInfo();
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
					<div class="ontario-header__container" ref={(el) => (this.header = el as HTMLInputElement)}>
						<header
							class={this.searchToggle ? 'ontario-header ontario-header--search-open' : 'ontario-header'}
							id="ontario-header"
						>
							<div class="ontario-row">
								{/* Ontario header logo */}
								<div class="ontario-header__logo-container ontario-columns ontario-small-2 ontario-medium-4 ontario-large-3">
									<a href="https://www.ontario.ca/page/government-ontario">
										<img class="ontario-show-for-medium" src={getAssetPath('./assets/ontario-logo--desktop.svg')} alt="Government of Ontario" />
										<img class="ontario-show-for-small-only" src={getAssetPath('./assets/ontario-logo--mobile.svg')} alt="Government of Ontario" />
									</a>
								</div>

								{/* Ontario header search input */}
								<form
									name="searchForm"
									id="ontario-search-form-container"
									onSubmit={this.handleSubmit}
									class="ontario-header__search-container ontario-columns ontario-small-10 ontario-medium-offset-3 ontario-medium-6 ontario-large-offset-0 ontario-large-6"
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
										ref={(el) => (this.searchBar = el as HTMLInputElement)}
										onKeyDown={this.onEscapePressed}
									/>
									<input class="ontario-header__search-reset" id="ontario-search-reset" type="reset" value="" aria-label="Clear field"></input>
									<button class="ontario-header__search-submit" id="ontario-search-submit" type="submit">
										<span class="ontario-show-for-sr">Submit</span>
										<span class="ontario-header__icon-container" innerHTML={OntarioIconSearch} />
									</button>
								</form>

								{/* Ontario header language toggle + menu button */}
								<div class="ontario-header__nav-right-container ontario-columns ontario-small-10 ontario-medium-8 ontario-large-3">
									<a
										href={this.languageState?.frenchLink}
										class="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline"
									>
										<abbr title="Français" class="ontario-show-for-small-only">
											FR
										</abbr>
										<span class="ontario-show-for-medium">Français</span>
									</a>
									<button
										class="ontario-header__search-toggler ontario-header-button ontario-header-button--without-outline ontario-hide-for-large"
										id="ontario-header-search-toggler"
										aria-controls="ontario-search-form-container"
										onClick={this.handleSearchToggle}
										ref={el => (this.searchButton = el as HTMLInputElement)}
									>
										<span class="ontario-header__icon-container" innerHTML={OntarioIconSearchWhite} />
										<span class="ontario-show-for-medium ontario-show">Search</span>
									</button>
									<button
										class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline"
										id="ontario-header-menu-toggler"
										aria-controls="ontario-navigation"
										aria-label={this.menuToggle ? 'open menu' : 'close menu'}
										onClick={this.handleMenuToggle}
										ref={el => (this.menuButton = el as HTMLInputElement)}
										type="button"
									>
										<span class="ontario-header__icon-container" innerHTML={this.menuToggle ? OntarioIconClose : OntarioIconMenu} />
										<span>Menu</span>
									</button>
								</div>
								<div class="ontario-header__search-close-container ontario-columns ontario-small-2 ontario-medium-3">
									<button
										class="ontario-header__search-close ontario-header-button ontario-header-button--without-outline"
										id="ontario-header-search-close"
										aria-label="close search bar"
										type="button"
										onClick={this.handleSearchToggle}
									>
										<span aria-hidden={`${!this.searchToggle}`}>close</span>
										<span class="ontario-header__icon-container" innerHTML={OntarioIconClose} />
									</button>
								</div>
							</div>
						</header>

						{/* Ontario header navigation */}
						<nav
							role="navigation"
							class={this.menuToggle ? 'ontario-navigation  ontario-navigation--open' : 'ontario-navigation'}
							id="ontario-navigation"
							aria-hidden={`${!this.menuToggle}`}
						>
							<div class="ontario-navigation__container">
								<ul>
									{/*
										Maps through all the menu items, and the last item is set to lastLink.
										When the focus goes away from the lastLink, return the focus to the menu button
										(only applicable pressing the "tab" key, not actually clicking away from the menu).
									*/}
									{this.itemState?.map((item, index) => {
										const lastLink = index + 1 === this.itemState.length ? true : false;
										return this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-header', 'ontario-header-navigation__menu-item', item.onClickHandler, lastLink);
									})}
								</ul>
							</div>
						</nav>
					</div>
					{this.menuToggle && <div class="ontario-hide-for-large ontario-overlay" />}
				</div>
			);
		} else {
			return (
				<div>
					<div class="ontario-application-header-container" id="ontario-application-header" ref={el => (this.header = el as HTMLInputElement)}>
						{/* Ontario application header black bar */}
						<header class="ontario-application-header" id="ontario-header">
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
						</header>

						{/* Ontario application header subhearder */}
						<div class="ontario-application-subheader-menu__container">
							<section class="ontario-application-subheader">
								<div class="ontario-row">
									<div class="ontario-columns ontario-small-12 ontario-application-subheader__container">
										<p class="ontario-application-subheader__heading">
											<a href={this.applicationHeaderInfoState?.href}>{this.applicationHeaderInfoState?.name}</a>
										</p>
										<div class="ontario-application-subheader__menu-container">
											{/* Desktop subheader links */}
											{this.applicationSubheaderDesktopLinks && (
												<ul class="ontario-application-subheader__menu ontario-show-for-large">
													{this.itemState
														?.slice(0, this.applicationSubheaderDesktopLinks)
														.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-desktop', '', item.onClickHandler))}
												</ul>
											)}

											{/* Tablet subheader links */}
											{this.applicationSubheaderTabletLinks && (
												<ul class="ontario-application-subheader__menu ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
													{this.itemState
														?.slice(0, this.applicationSubheaderTabletLinks)
														.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-tablet', '', item.onClickHandler))}
												</ul>
											)}

											{/* Desktop subheader links */}
											{this.applicationSubheaderMobileLinks && (
												<ul class="ontario-application-subheader__menu ontario-show-for-small-only">
													{this.itemState
														?.slice(0, this.applicationSubheaderMobileLinks)
														.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-mobile', '', item.onClickHandler))}
												</ul>
											)}

											{/* Render menu button if itemState exists, and if there are items to display in a dropdown menu */}
											{this.itemState !== undefined && this.applicationSubheaderDesktopLinks !== this.itemState.length && (
												<button
													class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-show-for-large"
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-navigation"
													aria-label={this.menuToggle ? 'open menu' : 'close menu'}
													onClick={this.handleMenuToggle}
													ref={el => (this.menuButtonDesktop = el as HTMLInputElement)}
													type="button"
												>
													<span class="ontario-header__icon-container" innerHTML={this.menuToggle ? OntarioIconClose : OntarioIconMenu} />
													<span>Menu</span>
												</button>
											)}

											{this.itemState !== undefined && this.applicationSubheaderTabletLinks !== this.itemState.length && (
												<button
													class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large"
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-navigation"
													aria-label={this.menuToggle ? 'open menu' : 'close menu'}
													onClick={this.handleMenuToggle}
													ref={el => (this.menuButtonTablet = el as HTMLInputElement)}
													type="button"
												>
													<span class="ontario-header__icon-container" innerHTML={this.menuToggle ? OntarioIconClose : OntarioIconMenu} />
													<span>Menu</span>
												</button>
											)}

											{this.itemState !== undefined && this.applicationSubheaderMobileLinks !== this.itemState.length && (
												<button
													class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-show-for-small-only"
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-navigation"
													aria-label={this.menuToggle ? 'open menu' : 'close menu'}
													onClick={this.handleMenuToggle}
													ref={el => (this.menuButtonMobile = el as HTMLInputElement)}
													type="button"
												>
													<span class="ontario-header__icon-container" innerHTML={this.menuToggle ? OntarioIconClose : OntarioIconMenu} />
													<span>Menu</span>
												</button>
											)}
										</div>
									</div>
								</div>
							</section>
							<nav
								role="navigation"
								class={this.menuToggle === true ? 'ontario-application-navigation ontario-navigation--open' : 'ontario-application-navigation'}
								id="ontario-application-navigation"
								aria-hidden={this.menuToggle === true ? 'false' : 'true'}
							>
								<div class="ontario-application-navigation__container">
									{/* Ontario application header desktop menu dropdown links */}
									<ul class="ontario-show-for-large">
										{this.itemState?.slice(this.applicationSubheaderDesktopLinks, this.itemState.length).map((item: any, index) => {
											const lastLink =
												index + 1 === (this.applicationSubheaderDesktopLinks ? this.itemState.length - this.applicationSubheaderDesktopLinks : this.itemState.length)
													? true
													: false;
											return this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-desktop', '', item.onClickHandler, lastLink);
										})}
									</ul>

									{/* Ontario application header tablet menu dropdown links */}
									<ul class="ontario-show-for-medium ontario-hide-for-small ontario-hide-for-large">
										{this.itemState?.slice(this.applicationSubheaderTabletLinks, this.itemState.length).map((item, index) => {
											const lastLink =
												index + 1 === (this.applicationSubheaderTabletLinks ? this.itemState.length - this.applicationSubheaderTabletLinks : this.itemState.length) ? true : false;
											return this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-tablet', '', item.onClickHandler, lastLink);
										})}
									</ul>

									{/* Ontario application header mobile menu dropdown links */}
									<ul class="ontario-show-for-small-only">
										{this.itemState?.slice(this.applicationSubheaderMobileLinks, this.itemState.length).map((item, index) => {
											const lastLink =
												index + 1 === (this.applicationSubheaderMobileLinks ? this.itemState.length - this.applicationSubheaderMobileLinks : this.itemState.length) ? true : false;
											return this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-mobile', '', item.onClickHandler, lastLink);
										})}
									</ul>
								</div>
							</nav>
						</div>
					</div>
					{this.menuToggle && <div class="ontario-hide-for-large ontario-overlay" />}
				</div>
			);
		}
	}
}
