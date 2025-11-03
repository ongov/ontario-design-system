import { Component, Prop, State, Watch, Event, EventEmitter, Listen, h, Element } from '@stencil/core';

import {
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
import { MenuItem } from '../../utils/common/common.interface';
import { DeviceTypes } from '../../utils/common/common.enum';
import { isClientSideRendering } from '../../utils/common/environment';
import { Input } from '../../utils/common/input/input';
import { generateMenuItem } from '../../utils/components/header/header-menu-items';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ConsoleType } from '../../utils/console-message/console-message.enum';
import { getImageAssetSrcPath } from '../../utils/helper/assets';
import { determineDeviceType } from '../../utils/helper/utils';
import { DeviceType } from '../../utils/helper/utils-types';
import { validateLanguage } from '../../utils/validation/validation-functions';

import translations from '../../translations/global.i18n.json';
import config from '../../config.json';

@Component({
	tag: 'ontario-header',
	styleUrls: ['ontario-header.scss', 'ontario-application-header.scss', 'service-ontario-header.scss'],
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
	 *		"maxSubheaderLinks": {
	 *			"desktop": "3",
	 *			"tablet": "2",
	 *			"mobile": "1"
	 *		}
	 *    }'
	 *	>
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
	@State() menuToggled: boolean = false;
	@State() searchToggle?: boolean = false;

	@State() translations: any = translations;

	@State() breakpointDeviceState: DeviceType;

	@Watch('applicationHeaderInfo')
	private parseApplicationHeaderInfo() {
		const applicationHeaderInfo = this.applicationHeaderInfo;
		if (applicationHeaderInfo) {
			try {
				if (typeof applicationHeaderInfo === 'string')
					this.applicationHeaderInfoState = JSON.parse(applicationHeaderInfo);
				else this.applicationHeaderInfoState = applicationHeaderInfo;
			} catch (error) {
				const message = new ConsoleMessageClass();
				message
					.addDesignSystemTag()
					.addRegularText(' failed to parse props for ')
					.addMonospaceText('<ontario-header>')
					.addRegularText(' in ')
					.addMonospaceText('parseApplicationHeaderInfo()')
					.addRegularText(' method \n ')
					.addMonospaceText(error.stack)
					.printMessage(ConsoleType.Error);

				this.applicationHeaderInfoState = {
					title: '',
					href: '/',
				}; // fallback on error
			}
		}
	}

	@Watch('menuItems')
	parseMenuItems() {
		const isEnglish = this.language === 'en';
		try {
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
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse props for ')
				.addMonospaceText('<ontario-header>')
				.addRegularText(' in ')
				.addMonospaceText('parseMenuItems()')
				.addRegularText(' method \n ')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);

			this.menuItemState = [];
		}
	}

	@Watch('languageToggleOptions')
	private parseLanguage() {
		const languageToggleOptions = this.languageToggleOptions;

		try {
			if (languageToggleOptions) {
				if (typeof languageToggleOptions === 'string') {
					this.languageState = JSON.parse(languageToggleOptions);
				} else {
					this.languageState = languageToggleOptions;
				}
			}
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse props for ')
				.addMonospaceText('<ontario-header>')
				.addRegularText(' in ')
				.addMonospaceText('parseLanguage()')
				.addRegularText(' method \n ')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);

			this.languageState = {
				englishLink: '/en',
				frenchLink: '/fr',
			}; // fallback on error
		}
	}

	@Listen('keydown', { target: 'window' })
	handleKeyDown(event: KeyboardEvent) {
		if (this.menuToggled && event.key === 'Escape') {
			this.menuToggled = false;
			this.menuButtonToggled.emit(this.menuToggled);
			this.focusMenuButton();
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
		if (this.menuToggled) this.menuToggled = !this.menuToggled;
	}

	/**
	 * Logic to close the menu when the focus leaves the menu
	 */
	@Listen('focusout', { target: 'window' })
	handleFocusOut(event: FocusEvent) {
		if (this.menuToggled && !this.el.contains(event.relatedTarget as Node)) {
			this.menuToggled = false;
			this.menuButtonToggled.emit(this.menuToggled);
		}
	}

	/**
	 * Logic to set breakpointDeviceState to the appropriate device when the screen resizes
	 */
	@Listen('resize', { target: 'window' })
	handleResize() {
		this.breakpointDeviceState = isClientSideRendering() ? determineDeviceType() : DeviceTypes.Desktop;
	}

	/**
	 * This listens for the `setAppLanguage` event sent from the language toggle when it is is connected to the DOM.
	 * It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language> | Language) {
		this.language = validateLanguage(event);
		this.parseMenuItems();
	}

	/**
	 * This listens for the `headerLanguageToggled` event sent from the language toggle when it is is connected to the DOM.
	 * It is used for changing the component language after the language toggle has been activated.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleLanguageToggle(event: CustomEvent<{ oldLanguage: Language; newLanguage: Language }>) {
		this.handleSetAppLanguage(event.detail.newLanguage);
	}

	/**
	 * This event is toggled when the menu button is pressed.
	 * The <ontario-header-overflow-menu> sub-component listens for this event
	 * To trigger the showing and hiding of the overflow menu.
	 */
	@Event() menuButtonToggled: EventEmitter<boolean>;

	/**
	 * Logic to handle the menu toggling
	 */
	handlemenuToggled = () => {
		this.menuToggled = !this.menuToggled;
		this.menuButtonToggled.emit(this.menuToggled);
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
	@Listen('endOfMenuReached', { target: 'window' })
	focusMenuButton() {
		this.menuButton.focus();
	}

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
	 * Hydration Guard Flag
	 *
	 * This flag is used to determine if the component has been hydrated in the browser.
	 * It prevents certain browser-only operations, like fetching from APIs, from running
	 * during Server-Side Rendering (SSR), where `window` and `fetch` are not available.
	 *
	 * The `isHydrated` flag is set to true in `componentDidLoad()` and checked before
	 * triggering logic that should only run in the browser (e.g., `fetchOntarioMenu()`).
	 *
	 * Not reactive - should  not be stored in State.
	 */
	private isHydrated = false;

	/**
	 * Generate the full path to an image asset based on the base asset path.
	 *
	 * - If `assetBasePath` is provided, it is used as the base path.
	 * - If not, attempts to use Stencil's `getAssetPath` (for Stencil/Angular builds).
	 * - If that fails (e.g., in React), falls back to `/assets/`, assuming assets are in the public folder.
	 *
	 * This allows the component to work across multiple environments (Stencil, Angular, React).
	 *
	 * @param imageName - The name of the image file.
	 * @returns The full image path as a string.
	 */
	private getImageAssetSrcPath(imageName: string): string {
		return getImageAssetSrcPath(imageName, this.assetBasePath);
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
				class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline"
				id={this.type === 'ontario' ? 'ontario-header-menu-toggler' : 'ontario-application-header-menu-toggler'}
				aria-controls="ontario-navigation"
				aria-label={
					this.menuToggled
						? this.translations.header.closeMenu[`${this.language}`]
						: this.translations.header.openMenu[`${this.language}`]
				}
				aria-expanded={this.menuToggled ? 'true' : 'false'}
				onClick={this.handlemenuToggled}
				type="button"
				ref={(el) => (this.menuButton = el as HTMLInputElement)}
			>
				<span
					class="ontario-header__icon-container"
					innerHTML={this.menuToggled ? OntarioIconClose : OntarioIconMenu}
				/>
				<span>Menu</span>
			</button>
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
		if (this.type !== 'ontario') {
			const { menuItemState, applicationHeaderInfoState } = this;
			const { mobile = 0, tablet = 0, desktop = 0 } = applicationHeaderInfoState?.maxSubheaderLinks ?? {};

			const numOfMenuItems = menuItemState?.length ?? 0;

			if (numOfMenuItems <= 0) {
				return false;
			}

			if (viewportSize === DeviceTypes.Mobile) {
				return numOfMenuItems - mobile > 0;
			}

			if (viewportSize === DeviceTypes.Tablet) {
				return numOfMenuItems - tablet > 0;
			}

			if (viewportSize === DeviceTypes.Desktop) {
				return numOfMenuItems - desktop > 0;
			}
		}

		return true;
	}

	componentWillLoad() {
		this.parseApplicationHeaderInfo();
		this.parseMenuItems();
		this.parseLanguage();
	}

	componentDidLoad() {
		this.isHydrated = true;
	}

	componentDidRender() {
		if (this.isHydrated && this.disableDynamicMenu === false && this.type === 'ontario') {
			this.fetchOntarioMenu();
		}
		this.handleResize();
	}

	/**
	 * Handles the search focus when the search toggle button is clicked.
	 * When search button is clicked, the search bar is in focus,
	 * when the closed button is clicked, the search button is back into focus.
	 */
	componentDidUpdate() {
		if (this.type == 'ontario') {
			if (this.searchToggle === true) this.searchBar.focus();
			if (this.searchToggle === false) this.searchButton.focus();
		}
	}

	/**
	 * Assigning values to elements to use them as ref
	 */
	header!: HTMLElement;
	menuButton!: HTMLElement;
	searchBar!: HTMLInputElement;
	searchButton!: HTMLInputElement;

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
						{/* Minor styling differences in placement of ontario.ca menu and application menu */}
						<ontario-header-overflow-menu menuItems={this.menuItemState}></ontario-header-overflow-menu>
					</div>
					{this.menuToggled && <div class="ontario-hide-for-large ontario-overlay" />}
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
									></ontario-language-toggle>
								</div>
							</div>
						</header>

						{/* Ontario application header subheader */}
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
											{!!this.applicationHeaderInfoState?.maxSubheaderLinks?.[this.breakpointDeviceState] && (
												<ul class="ontario-application-subheader__menu">
													{this.menuItemState
														?.slice(0, this.applicationHeaderInfoState?.maxSubheaderLinks?.[this.breakpointDeviceState])
														.map((item) =>
															generateMenuItem(item.href, item.title, item.linkIsActive, '', item.onClickHandler),
														)}
												</ul>
											)}

											{/* Render menu button if menuItemState exists, and if there are items to display in a dropdown menu */}
											{this.menuItemState !== undefined &&
												this.applicationHeaderInfoState?.maxSubheaderLinks?.[this.breakpointDeviceState] !==
													this.menuItemState.length &&
												this.renderMenuButton('')}
										</div>
									</div>
								</div>
							</section>

							<slot name="menu-overflow">
								<ontario-header-overflow-menu
									menuItems={this.menuItemState?.slice(
										this.applicationHeaderInfoState?.maxSubheaderLinks?.[this.breakpointDeviceState],
										this.menuItemState.length,
									)}
								></ontario-header-overflow-menu>
							</slot>
						</div>
					</div>
					{this.menuToggled && <div class="ontario-hide-for-large ontario-overlay" />}
				</div>
			);
		}
	}
}
