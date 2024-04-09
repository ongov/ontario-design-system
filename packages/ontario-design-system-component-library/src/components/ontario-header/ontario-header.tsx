import { Component, Prop, State, Watch, h, Listen, Element, getAssetPath } from '@stencil/core';

import { Input } from '../../utils/common/input/input';
import {
	MenuItem,
	ApplicationHeaderInfo,
	LanguageToggleOptions,
	OntarioMenuItems,
	OntarioHeaderType,
} from './ontario-header.interface';

import OntarioIconClose from '../ontario-icon/assets/ontario-icon-close-header.svg';
import OntarioIconMenu from '../ontario-icon/assets/ontario-icon-menu-header.svg';
import OntarioIconSearch from '../ontario-icon/assets/ontario-icon-search.svg';
import OntarioIconSearchWhite from '../ontario-icon/assets/ontario-icon-search-white.svg';
import OntarioHeaderDefaultData from './ontario-header-default-data.json';

import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';

import translations from '../../translations/global.i18n.json';
import config from '../../config.json';

@Component({
	tag: 'ontario-header',
	styleUrls: {
		ontario: 'ontario-header.scss',
		application: 'ontario-application-header.scss',
		serviceOntario: 'service-ontario-header.scss',
	},
	shadow: true,
	assetsDirs: ['./assets'],
})
export class OntarioHeader {
	@Element() el: HTMLElement;

	/**
	 * The type of header.
	 */
	@Prop() type?: OntarioHeaderType = 'application';

	/**
	 * Information pertaining to the application header. This is only necessary for the 'application' header type.
	 *
	 * This includes the application name, URL and optional props for the number of links in the subheader for desktop, tablet, and mobile views.
	 *
	 * @example
	 *  <ontario-header
	 *    type="application"
	 *    application-header-info='{
	 *      "title": "Application name",
	 *      "href": "/application-homepage",
	 *      "maxSubheaderDesktopLinks": "3",
	 *      "maxSubheaderTabletLinks": "2",
	 *      "maxSubheaderMobileLinks": "1"
	 *    }'>
	 *  </ontario-header>
	 */
	@Prop() applicationHeaderInfo: ApplicationHeaderInfo | string;

	/**
	 * The items that will go inside the menu.
	 */
	@Prop() menuItems: MenuItem[] | string;

	/**
	 * Option to disable fetching of the dynamic menu from the Ontario Header API
	 *
	 * @example
	 * 	<ontario-header
	 * 			type="ontario"
	 * 			disable-dynamic-menu="false"
	 *			menu-items='[{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			}]'>
	 *	</ontario-header>
	 */
	@Prop() disableDynamicMenu: boolean = false;

	/**
	 * Information pertaining to the language toggle links.
	 *
	 * @example
	 * <ontario-header
	 * 	language-toggle-options='{
	 *    "englishLink": "/en",
	 *    "frenchLink": "/fr"
	 *  }'
	 *  ...
	 * >
	 * </ontario-header>
	 */
	@Prop() languageToggleOptions?: LanguageToggleOptions | string;

	/**
	 * A custom function to pass to the language toggle button.
	 */
	@Prop() customLanguageToggle?: (event: globalThis.Event) => void;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * The base path to an assets folder containing the Design System assets
	 */
	@Prop() assetBasePath: string;

	/**
	 * The application header information is reassigned to applicationHeaderInfoState for parsing
	 */
	@State() private applicationHeaderInfoState: ApplicationHeaderInfo;

	/**
	 * The menuItems is reassigned to itemState for parsing
	 *
	 * @example
	 * 	<ontario-header
	 * 			type="ontario"
	 * 			disable-dynamic-menu="true"
	 *			menu-items='[{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			},{
	 *				"title": "Hint",
	 *				"href": "/ontario-hint"
	 *				"linkIsActive": "false"
	 *			}]'>
	 *	</ontario-header>
	 */
	@State() private menuItemState: MenuItem[];

	/**
	 * Check to see if menu is dynamic or static
	 */
	@State() private isDynamicMenu: boolean = false;

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
	@State() private languageState: LanguageToggleOptions;

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

	@State() translations: any = translations;

	@Watch('applicationHeaderInfo')
	private parseApplicationHeaderInfo() {
		const applicationHeaderInfo = this.applicationHeaderInfo;
		if (applicationHeaderInfo) {
			if (typeof applicationHeaderInfo === 'string')
				this.applicationHeaderInfoState = JSON.parse(applicationHeaderInfo);
			else this.applicationHeaderInfoState = applicationHeaderInfo;
		}
	}

	@Watch('menuItems')
	parseMenuItems() {
		const isEnglish = this.language === 'en';

		if (!Array.isArray(this.menuItems) && typeof this.menuItems === 'string') {
			this.menuItemState = JSON.parse(this.menuItems);
			this.isDynamicMenu = false;
		} else if (Array.isArray(this.menuItems) && this.type === 'application') {
			this.menuItemState = this.menuItems;
			this.isDynamicMenu = false;
		} else {
			this.menuItemState = isEnglish ? OntarioHeaderDefaultData.en : OntarioHeaderDefaultData.fr;
			this.isDynamicMenu = false;
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

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
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
		location.href = `${this.translations.header.ontarioSearchURL[`${this.language}`]}${event.target[0].value}`;
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
	async fetchOntarioMenu() {
		const isEnglish = this.language === 'en';

		// If menu has already been fetched and contains dynamic menu items, do not run fetch again
		if (!this.isDynamicMenu) {
			const apiUrl = isEnglish
				? (config.ONTARIO_HEADER_API_URL_EN as string)
				: (config.ONTARIO_HEADER_API_URL_FR as string);

			const response = await fetch(apiUrl)
				.then((response) => response.json())
				.then((json) => json.linkset[0].item as OntarioMenuItems[])
				.catch(() => {
					console.error('Unable to retrieve data from Ontario Menu API');
					return [];
				});

			if (response.length > 0) {
				const externalMenuItems = response.map((item) => {
					return { href: item.href, title: item.title };
				});
				this.menuItemState = externalMenuItems;
				this.isDynamicMenu = true;
			}
		}
		return;
	}

	/**
	 * Generate a link to the given image based on the base asset path.
	 * @param imageName Name of the image to build the path to
	 * @returns Path to image with asset path
	 */
	private getImageAssetSrcPath(imageName: string): string {
		return `${this.assetBasePath ? this.assetBasePath : getAssetPath('./assets')}/${imageName}`;
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
		type: string,
		liClass?: string,
		onClick?: any,
		onBlur?: boolean,
	) {
		return (
			<li class={liClass}>
				<a
					class={linkIsActive === true ? `ontario-link--active` : ``}
					href={href}
					onClick={onClick}
					onBlur={onBlur ? this.trapMenuFocus : undefined}
					data-type={type}
				>
					{title}
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
		if (!this.isMenuVisible(viewportSize)) {
			return;
		}

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
				aria-label={
					this.menuToggle
						? this.translations.header.closeMenu[`${this.language}`]
						: this.translations.header.openMenu[`${this.language}`]
				}
				onClick={this.handleMenuToggle}
				type="button"
				ref={
					viewportSize === 'desktop'
						? (el) => (this.menuButtonDesktop = el as HTMLInputElement)
						: viewportSize === 'tablet'
						? (el) => (this.menuButtonTablet = el as HTMLInputElement)
						: viewportSize === 'mobile'
						? (el) => (this.menuButtonMobile = el as HTMLInputElement)
						: (el) => (this.menuButton = el as HTMLInputElement)
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
	 * @param item - the menu item to be looped over (contains the title and href)
	 * @param index
	 * @param links - the number of links associated with the maxSubheader[size]Links in the application header info prop. This will determine how many links should be displayed in the dropdown.
	 * @param viewportSize - the size of the viewport. It can be set to `desktop`, `tablet` or `mobile`.
	 * @returns
	 */
	private generateNavigationLinks(item: MenuItem, index: number, links: number | undefined, viewportSize: string) {
		const lastLink =
			index + 1 === (links ? this.menuItemState.length - links : this.menuItemState.length) ? true : false;

		return this.generateMenuItem(
			item.href,
			item.title,
			item.linkIsActive,
			viewportSize,
			'',
			item.onClickHandler,
			lastLink,
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

	private isMenuVisible(viewportSize: string) {
		const { menuItemState, applicationHeaderInfoState } = this;
		const { maxSubheaderMobileLinks, maxSubheaderTabletLinks, maxSubheaderDesktopLinks } =
			applicationHeaderInfoState ?? {};

		const numOfMenuItems = menuItemState?.length ?? 0;

		if (numOfMenuItems <= 0) {
			return false;
		}

		if (viewportSize === 'mobile') {
			return maxSubheaderMobileLinks && numOfMenuItems - maxSubheaderMobileLinks > 0;
		}

		if (viewportSize === 'tablet') {
			return maxSubheaderTabletLinks && numOfMenuItems - maxSubheaderTabletLinks > 0;
		}

		if (viewportSize === 'desktop') {
			return maxSubheaderDesktopLinks && numOfMenuItems - maxSubheaderDesktopLinks > 0;
		}

		return true;
	}

	componentWillLoad() {
		this.parseApplicationHeaderInfo();
		this.parseMenuItems();
		this.parseLanguage();
	}

	componentDidRender() {
		if (this.disableDynamicMenu === false && this.type === 'ontario') {
			this.fetchOntarioMenu();
		}
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
		const isServiceOntarioType = this.type === 'serviceOntario';

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
									<a href={this.translations.header.logoLink[`${this.language}`]}>
										<img
											class="ontario-show-for-medium"
											src={this.getImageAssetSrcPath('ontario-logo--desktop.svg')}
											alt={this.translations.header.logoAltText[`${this.language}`]}
										/>
										<img
											class="ontario-show-for-small-only"
											src={this.getImageAssetSrcPath('ontario-logo--mobile.svg')}
											alt={this.translations.header.logoAltText[`${this.language}`]}
										/>
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
										{this.translations.header.search[`${this.language}`]}
									</label>
									<Input
										type="text"
										name="search"
										id="ontario-search-input-field"
										autoComplete="off"
										aria-autocomplete="none"
										className="ontario-input ontario-header__search-input"
										required={true}
										ref={(el) => (this.searchBar = el as HTMLInputElement)}
										onKeyDown={this.onEscapePressed}
									></Input>
									<Input
										className="ontario-header__search-reset"
										id="ontario-search-reset"
										type="reset"
										value=""
										aria-label={this.translations.header.clearSearchField[`${this.language}`]}
									></Input>
									<button class="ontario-header__search-submit" id="ontario-search-submit" type="submit">
										<span class="ontario-show-for-sr">{this.translations.header.submit[`${this.language}`]}</span>
										<span class="ontario-header__icon-container" innerHTML={OntarioIconSearch} />
									</button>
								</form>

								{/* Ontario header language toggle + menu button */}
								<div class="ontario-header__nav-right-container ontario-columns ontario-small-10 ontario-medium-8 ontario-large-3">
									<ontario-language-toggle
										url={this.language === 'en' ? this.languageState?.frenchLink : this.languageState?.englishLink}
										size="default"
										customLanguageToggle={this.customLanguageToggle}
										language={this.language}
									></ontario-language-toggle>
									<button
										class="ontario-header__search-toggler ontario-header-button ontario-header-button--without-outline ontario-hide-for-large"
										id="ontario-header-search-toggler"
										aria-controls="ontario-search-form-container"
										onClick={this.handleSearchToggle}
										ref={(el) => (this.searchButton = el as HTMLInputElement)}
									>
										<span class="ontario-header__icon-container" innerHTML={OntarioIconSearchWhite} />
										<span class="ontario-show-for-medium ontario-show">
											{this.translations.header.search[`${this.language}`]}
										</span>
									</button>
									{this.renderMenuButton('ontario-header')}
								</div>
								<div class="ontario-header__search-close-container ontario-columns ontario-small-2 ontario-medium-3">
									<button
										class="ontario-header__search-close ontario-header-button ontario-header-button--without-outline"
										id="ontario-header-search-close"
										aria-label={this.translations.header.closeSearch[`${this.language}`]}
										type="button"
										onClick={this.handleSearchToggle}
									>
										<span aria-hidden={`${!this.searchToggle}`}>
											{this.translations.header.close[`${this.language}`]}
										</span>
										<span class="ontario-header__icon-container" innerHTML={OntarioIconClose} />
									</button>
								</div>
							</div>
						</header>

						{/* Ontario header navigation */}
						<nav
							role="navigation"
							class={this.menuToggle ? 'ontario-navigation ontario-navigation--open' : 'ontario-navigation'}
							id="ontario-navigation"
						>
							<div class="ontario-navigation__container">
								<ul>
									{/*
										Maps through all the menu items, and the last item is set to lastLink.
										When the focus goes away from the lastLink, return the focus to the menu button
										(only applicable pressing the "tab" key, not actually clicking away from the menu).
									*/}
									{this.menuItemState?.map((item, index: number) => {
										const lastLink = index + 1 === this.menuItemState.length;
										const activeLinkRegex = item.title.replace(/\s+/g, '-').toLowerCase();
										const linkIsActive = window.location.pathname.includes(activeLinkRegex);
										return this.isDynamicMenu
											? this.generateMenuItem(
													item.href,
													item.title,
													linkIsActive,
													'ontario-header',
													'ontario-header-navigation__menu-item',
													undefined,
													lastLink,
											  )
											: this.generateMenuItem(
													item.href,
													item.title,
													item.linkIsActive,
													'ontario-header',
													'ontario-header-navigation__menu-item',
													item.onClickHandler,
													lastLink,
											  );
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
					<div
						class="ontario-application-header-container"
						id="ontario-application-header"
						ref={(el) => (this.header = el as HTMLInputElement)}
					>
						{/* Ontario application header black bar */}
						<header class="ontario-application-header" id="ontario-header">
							<div class="ontario-row">
								<div class="ontario-columns ontario-small-6 ontario-application-header__logo">
									<a href={this.translations.header.logoLink[`${this.language}`]}>
										<img
											src={this.getImageAssetSrcPath('ontario-logo--desktop.svg')}
											alt={this.translations.header.logoAltText[`${this.language}`]}
										/>
									</a>
								</div>
								<div class="ontario-columns ontario-small-6 ontario-application-header__lang-toggle">
									<ontario-language-toggle
										size="small"
										url={this.language === 'en' ? this.languageState?.frenchLink : this.languageState?.englishLink}
										customLanguageToggle={this.customLanguageToggle}
										language={this.language}
									></ontario-language-toggle>
								</div>
							</div>
						</header>

						{/* Ontario application header subhearder */}
						<div class="ontario-application-subheader-menu__container">
							<section
								class={`ontario-application-subheader ${isServiceOntarioType ? 'ontario-service-subheader' : ''}`}
							>
								<div class="ontario-row">
									<div class="ontario-columns ontario-small-12 ontario-application-subheader__container">
										{!isServiceOntarioType ? (
											<p class="ontario-application-subheader__heading">
												<a href={this.applicationHeaderInfoState?.href}>{this.applicationHeaderInfoState?.title}</a>
											</p>
										) : (
											<a href={this.applicationHeaderInfoState?.href} class="ontario-service-subheader__link">
												<div class="ontario-service-subheader__heading-container">
													<p class="ontario-service-subheader__heading">
														{this.translations.header.serviceOntario[`${this.language}`]}
													</p>
													<p class="ontario-service-subheader__description">{this.applicationHeaderInfoState?.title}</p>
												</div>
											</a>
										)}
										<div class="ontario-application-subheader__menu-container">
											{/* Desktop subheader links */}
											{this.applicationHeaderInfoState?.maxSubheaderDesktopLinks && (
												<ul
													class={`${
														isServiceOntarioType
															? 'ontario-service-subheader__menu'
															: 'ontario-application-subheader__menu'
													} ontario-show-for-large`}
												>
													{this.menuItemState
														?.slice(0, this.applicationHeaderInfoState?.maxSubheaderDesktopLinks)
														.map((item) =>
															this.generateMenuItem(
																item.href,
																item.title,
																item.linkIsActive,
																'app-desktop',
																'',
																item.onClickHandler,
															),
														)}
												</ul>
											)}

											{/* Tablet subheader links */}
											{this.applicationHeaderInfoState?.maxSubheaderTabletLinks && (
												<ul class="ontario-application-subheader__menu ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
													{this.menuItemState
														?.slice(0, this.applicationHeaderInfoState?.maxSubheaderTabletLinks)
														.map((item) =>
															this.generateMenuItem(
																item.href,
																item.title,
																item.linkIsActive,
																'app-tablet',
																'',
																item.onClickHandler,
															),
														)}
												</ul>
											)}

											{/* Desktop subheader links */}
											{this.applicationHeaderInfoState?.maxSubheaderMobileLinks && (
												<ul class="ontario-application-subheader__menu ontario-show-for-small-only">
													{this.menuItemState
														?.slice(0, this.applicationHeaderInfoState.maxSubheaderMobileLinks)
														.map((item) =>
															this.generateMenuItem(
																item.href,
																item.title,
																item.linkIsActive,
																'app-mobile',
																'',
																item.onClickHandler,
															),
														)}
												</ul>
											)}

											{/* Render menu button if menuItemState exists, and if there are items to display in a dropdown menu */}
											{this.menuItemState !== undefined &&
												this.applicationHeaderInfoState?.maxSubheaderDesktopLinks !== this.menuItemState.length &&
												this.renderMenuButton('desktop')}

											{this.menuItemState !== undefined &&
												this.applicationHeaderInfoState?.maxSubheaderTabletLinks !== this.menuItemState.length &&
												this.renderMenuButton('tablet')}

											{this.menuItemState !== undefined &&
												this.applicationHeaderInfoState?.maxSubheaderMobileLinks !== this.menuItemState.length &&
												this.renderMenuButton('mobile')}
										</div>
									</div>
								</div>
							</section>
							<nav
								role="navigation"
								class={
									this.menuToggle === true
										? 'ontario-application-navigation ontario-navigation--open'
										: 'ontario-application-navigation'
								}
								id="ontario-application-navigation"
							>
								<div class="ontario-application-navigation__container">
									{/* Ontario application header desktop menu dropdown links */}
									<ul class="ontario-show-for-large">
										{this.menuItemState
											?.slice(this.applicationHeaderInfoState?.maxSubheaderDesktopLinks, this.menuItemState.length)
											.map((item: any, index) => {
												return this.generateNavigationLinks(
													item,
													index,
													this.applicationHeaderInfoState?.maxSubheaderDesktopLinks,
													'app-desktop',
												);
											})}
									</ul>

									{/* Ontario application header tablet menu dropdown links */}
									<ul class="ontario-show-for-medium ontario-hide-for-small ontario-hide-for-large">
										{this.menuItemState
											?.slice(this.applicationHeaderInfoState?.maxSubheaderTabletLinks, this.menuItemState.length)
											.map((item, index) => {
												return this.generateNavigationLinks(
													item,
													index,
													this.applicationHeaderInfoState?.maxSubheaderTabletLinks,
													'app-tablet',
												);
											})}
									</ul>

									{/* Ontario application header mobile menu dropdown links */}
									<ul class="ontario-show-for-small-only">
										{this.menuItemState
											?.slice(this.applicationHeaderInfoState?.maxSubheaderMobileLinks, this.menuItemState.length)
											.map((item, index) => {
												return this.generateNavigationLinks(
													item,
													index,
													this.applicationHeaderInfoState?.maxSubheaderMobileLinks,
													'app-mobile',
												);
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
