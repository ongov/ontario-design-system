import { Component, Prop, State, Watch, h, Listen, Element, getAssetPath } from '@stencil/core';

import OntarioIconClose from '../ontario-icon/assets/ontario-icon-close-header.svg';
import OntarioIconMenu from '../ontario-icon/assets/ontario-icon-menu-header.svg';
import OntarioIconSearch from '../ontario-icon/assets/ontario-icon-search.svg';
import OntarioIconSearchWhite from '../ontario-icon/assets/ontario-icon-search-white.svg';

import { menuItems, applicationHeaderInfo, languageToggleOptions, ontarioMenuItems } from './ontario-header.interface';

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
	 * Information pertaining to the application header. This is only necessary for the 'application' header type.
	 *
	 * This includes the application name, URL and optional props for the number of links in the subheader, tablet, and mobile views.
	 *
	 * @example
	 * 	<ontario-header
	 *		type="application"
	 * .  application-header-info='{
	 * 			"name": "Application name",
	 * 			"href": "/application-homepage"
	 * 			"maxSubheaderDesktopLinks": "3",
	 * 			"maxSubheaderTabletLinks": "2",
	 * 			"maxSubheaderMobileLinks": "1"
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
	 * State for Ontario Menu API response data
	 */
	@State() apiResponseData: ontarioMenuItems[];

	/**
	 * State for Ontario Menu API response data
	 */
	@State() apiResponseSuccesful: boolean;

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
	 * Call to Ontario Menu API to fetch linksets to populate header component
	 */
	fetchOntarioMenu() {
		fetch('https://www.ontario.ca/system/menu/main/linkset')
			.then(response => {
				return response.json()
			}).then((data) => {
				this.apiResponseSuccesful = true;
				this.apiResponseData = data.linkset[0].item;
			})
			.catch(() => {
				this.apiResponseSuccesful = false;
				console.log(
					'Unable to retrieve data from Ontario Menu API'
				);
			});
	}

	/**
	 * This function generates the menu items in a <li>, accordingly, to the given parameters.
	 *
	 * href and name are necessary, but rest are not.
	 *
	 * @param href - the href of the menu item
	 * @param name - the name of the menu item
	 * @param linkIsActive - when set to true, this will add the classes necessary to style the link in a way that indicates to the user what the active page/link is
	 * @param liClass - if there is a class that is related to the <a> portion of the menu item, put it here
	 * @param onClick - for any custon onClick event a user might want to add to their menu links
	 * @param onBlur - when set to true, it will call the function trapMenuFocus(), otherwise nothing is done (used in lastLink)
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
	 * This function generates the menu dropdown button for the ontario header component.
	 *
	 * @param viewportSize - the size of the screen where the function is being called. It can either be set to `desktop`, `tablet` or `mobile`. This dictates the classes used on the menu button, as well as the ref to keep the focus trapped when the menu is open.
	 */
	private renderMenuButton(viewportSize: string) {
		return (
			<button
				class={
					viewportSize === 'desktop'
						? 'ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-show-for-large'
						: viewportSize === 'tablet'
						? 'ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large'
						: viewportSize === 'mobile'
						? 'ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-show-for-small-only'
						: 'ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline'
				}
				id={this.type === 'ontario' ? 'ontario-header-menu-toggler' : 'ontario-application-header-menu-toggler'}
				aria-controls="ontario-navigation"
				aria-label={this.menuToggle ? 'open menu' : 'close menu'}
				onClick={this.handleMenuToggle}
				type="button"
				ref={
					viewportSize === 'desktop'
						? el => (this.menuButtonDesktop = el as HTMLInputElement)
						: viewportSize === 'tablet'
						? el => (this.menuButtonTablet = el as HTMLInputElement)
						: viewportSize === 'mobile'
						? el => (this.menuButtonMobile = el as HTMLInputElement)
						: el => (this.menuButton = el as HTMLInputElement)
				}
			>
				<span class="ontario-header__icon-container" innerHTML={this.menuToggle ? OntarioIconClose : OntarioIconMenu} />
				<span>Menu</span>
			</button>
		);
	}

	/**
	 * A helper function to generate navigation dropdown links with onBlur functionality. This is used for the application header.
	 *
	 * @param item - the menu item to be looped over (contains the name and href)
	 * @param index
	 * @param links - the number of links associated with the maxSubheader[size]Links in the application header info prop. This will determine how many links should be displayed in the dropdown.
	 * @param viewportSize - the size of the viewport. It can be set to `desktop`, `tablet` or `mobile`.
	 * @returns
	 */
	private generateNavigationLinks(item: menuItems, index: number, links: number | undefined, viewportSize: string) {
		const lastLink = index + 1 === (links ? this.itemState.length - links : this.itemState.length) ? true : false;

		return this.generateMenuItem(item.href, item.name, item.linkIsActive, viewportSize, '', item.onClickHandler, lastLink);
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
		this.fetchOntarioMenu();
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
									{this.renderMenuButton('ontario-header')}
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
									{/* If API call is succesful, return linkset from Ontario Menu API.
											If API call is unsuccessful, use static menu.*/}
									{this.apiResponseSuccesful
										? this.apiResponseData?.map((item:ontarioMenuItems, index:number) => {
												const lastLink = index + 1 === this.apiResponseData.length ? true : false;
												const activeLinkRegex = item.title.replace(/\s+/g, '-').toLowerCase();
												const linkIsActive = window.location.pathname.includes(activeLinkRegex) ? true : false;
												return this.generateMenuItem(item.href, item.title, linkIsActive, 'ontario-header', 'ontario-header-navigation__menu-item', undefined, lastLink);
											})
										: this.itemState?.map((item, index) => {
												const lastLink = index + 1 === this.itemState.length ? true : false;
												return this.generateMenuItem(item.href, item.name, item.linkIsActive, 'ontario-header', 'ontario-header-navigation__menu-item', item.onClickHandler, lastLink);
											})
									}
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
											{this.applicationHeaderInfoState.maxSubheaderDesktopLinks && (
												<ul class="ontario-application-subheader__menu ontario-show-for-large">
													{this.itemState
														?.slice(0, this.applicationHeaderInfoState.maxSubheaderDesktopLinks)
														.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-desktop', '', item.onClickHandler))}
												</ul>
											)}

											{/* Tablet subheader links */}
											{this.applicationHeaderInfoState.maxSubheaderTabletLinks && (
												<ul class="ontario-application-subheader__menu ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
													{this.itemState
														?.slice(0, this.applicationHeaderInfoState.maxSubheaderTabletLinks)
														.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-tablet', '', item.onClickHandler))}
												</ul>
											)}

											{/* Desktop subheader links */}
											{this.applicationHeaderInfoState.maxSubheaderMobileLinks && (
												<ul class="ontario-application-subheader__menu ontario-show-for-small-only">
													{this.itemState
														?.slice(0, this.applicationHeaderInfoState.maxSubheaderMobileLinks)
														.map(item => this.generateMenuItem(item.href, item.name, item.linkIsActive, 'app-mobile', '', item.onClickHandler))}
												</ul>
											)}

											{/* Render menu button if itemState exists, and if there are items to display in a dropdown menu */}
											{this.itemState !== undefined && this.applicationHeaderInfoState.maxSubheaderDesktopLinks !== this.itemState.length && this.renderMenuButton('desktop')}

											{this.itemState !== undefined && this.applicationHeaderInfoState.maxSubheaderTabletLinks !== this.itemState.length && this.renderMenuButton('tablet')}

											{this.itemState !== undefined && this.applicationHeaderInfoState.maxSubheaderMobileLinks !== this.itemState.length && this.renderMenuButton('mobile')}
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
										{this.itemState?.slice(this.applicationHeaderInfoState.maxSubheaderDesktopLinks, this.itemState.length).map((item: any, index) => {
											return this.generateNavigationLinks(item, index, this.applicationHeaderInfoState.maxSubheaderDesktopLinks, 'app-desktop');
										})}
									</ul>

									{/* Ontario application header tablet menu dropdown links */}
									<ul class="ontario-show-for-medium ontario-hide-for-small ontario-hide-for-large">
										{this.itemState?.slice(this.applicationHeaderInfoState.maxSubheaderTabletLinks, this.itemState.length).map((item, index) => {
											return this.generateNavigationLinks(item, index, this.applicationHeaderInfoState.maxSubheaderTabletLinks, 'app-tablet');
										})}
									</ul>

									{/* Ontario application header mobile menu dropdown links */}
									<ul class="ontario-show-for-small-only">
										{this.itemState?.slice(this.applicationHeaderInfoState.maxSubheaderMobileLinks, this.itemState.length).map((item, index) => {
											return this.generateNavigationLinks(item, index, this.applicationHeaderInfoState.maxSubheaderMobileLinks, 'app-mobile');
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
