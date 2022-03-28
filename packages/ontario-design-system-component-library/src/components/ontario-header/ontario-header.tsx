import { Component, Prop, State, Watch, h, Event, EventEmitter, Listen, Element } from '@stencil/core';
import OntarioIconClose from '../ontario-icon/assets/ontario-icon-close-header.svg';
import OntarioIconMenu from '../ontario-icon/assets/ontario-icon-menu-header.svg';
import OntarioIconSearch from '../ontario-icon/assets/ontario-icon-search.svg';
import OntarioIconSearchWhite from '../ontario-icon/assets/ontario-icon-search-white.svg';
import OntarioLogo from './ontario-logo--desktop.svg';
import OntarioLogoMobile from './ontario-logo--mobile.svg';
import { headerTitle } from './headerTitle.interface';
import { languageToggleOptions } from './languageToggleOptions.interface';
@Component({
	tag: 'ontario-header',
	styleUrls: {
		ontario: 'ontario-header.scss',
		application: 'ontario-application-header.scss',
	},
	shadow: true,
})
export class OntarioHeader {
	@Element() el: HTMLElement;

	@Prop() type?: 'application' | 'ontario' = 'application';

	@Prop() titleHeader: headerTitle | string;

	@State() titleHeaderState: headerTitle;

	@Watch('titleHeader')
	private parseTitleHeader() {
		const titleHeader = this.titleHeader;
		if (titleHeader) {
			if (typeof titleHeader === 'string') this.titleHeaderState = JSON.parse(titleHeader);
			else this.titleHeaderState = titleHeader;
		}
	}

	@Prop() menuItems: headerTitle[] | string;

	@State() private itemState: headerTitle[];

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

	@Prop() languageToggleOptions: languageToggleOptions | string;

	@State() languageState: languageToggleOptions;

	@Watch('languageToggleOptions')
	private parseLanguage() {
		const languageToggleOptions = this.languageToggleOptions;
		if (languageToggleOptions) {
			if (typeof languageToggleOptions === 'string') this.languageState = JSON.parse(languageToggleOptions);
			else this.languageState = languageToggleOptions;
		}
	}

	@Prop({ mutable: true }) toggle: boolean = false;

	@Event() changeEvent!: EventEmitter<any>;
	handleToggle = () => (this.toggle = !this.toggle);

	componentWillLoad() {
		this.parseTitleHeader();
		this.parseMenuItems();
		this.parseLanguage();
	}

	justTest = () => {
		console.log('test');
	};

	header!: HTMLInputElement;
	menuButton!: HTMLInputElement;
	trapMenuFocus = () => {
		this.menuButton.focus();
	};

	@Listen('click', { target: 'window' })
	handleClick(event: any) {
		if (this.el.contains(event.target)) {
			// If click was inside header, stop
			return;
		}
		// If the click was outside the current component, do the following
		if (this.toggle) this.toggle = !this.toggle;
	}

	render() {
		if (this.type == 'ontario') {
			return (
				<div>
					<div class="ontario-header__container" ref={el => (this.header = el as HTMLInputElement)}>
						<header class="ontario-header" id="ontario-header">
							<div class="ontario-row">
								<div class="ontario-hide-for-small-only ontario-header__logo-container ontario-columns ontario-small-2 ontario-medium-4 ontario-large-3 ">
									<a href="https://www.ontario.ca/page/government-ontario" innerHTML={OntarioLogo} />
								</div>

								<div class="ontario-show-for-small-only ontario-header__logo-container ontario-columns ontario-small-2 ontario-medium-4 ontario-large-3 ">
									<a href="https://www.ontario.ca/page/government-ontario" innerHTML={OntarioLogoMobile} />
								</div>

								<form
									name="searchForm"
									id="ontario-search-form-container"
									onSubmit={this.justTest}
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
									/>
									<input class="ontario-header__search-reset" id="ontario-search-reset" type="reset" value="" aria-label="Clear" />
									<button class="ontario-header__search-submit" id="ontario-search-submit" type="submit" onClick={this.justTest}>
										<div class="ontario-icon-container" innerHTML={OntarioIconSearch} />
										<span class="ontario-show-for-sr">Submit</span>
									</button>
								</form>
								<div class="ontario-header__nav-right-container ontario-columns ontario-small-10 ontario-medium-8 ontario-large-3">
									<a href="" class="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline">
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
										>
											<div class="ontario-icon-container" innerHTML={OntarioIconSearchWhite} />
											<span class="ontario-show-for-medium ontario-show">Search</span>
										</button>
									</div>
									{this.toggle ? (
										<button
											class="ontario-header__menu-toggler  ontario-header-button--with-outline ontario-header-button ontario-navigation--open"
											id="ontario-application-header-menu-toggler"
											aria-controls="ontario-application-navigation"
											aria-label="open menu"
											data-target="megaMenu"
											aria-hidden={!this.toggle}
											onClick={this.handleToggle}
											ref={el => (this.menuButton = el as HTMLInputElement)}
										>
											<div class="ontario-icon-container" innerHTML={OntarioIconClose} />
											<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
										</button>
									) : (
										<button
											class="ontario-header__menu-toggler  ontario-header-button--with-outline ontario-header-button ontario-navigation--closed"
											id="ontario-application-header-menu-toggler"
											aria-controls="ontario-application-navigation"
											aria-label="close menu"
											data-target="megaMenu"
											aria-hidden={!this.toggle}
											onClick={this.handleToggle}
											ref={el => (this.menuButton = el as HTMLInputElement)}
										>
											<div class="ontario-icon-container" innerHTML={OntarioIconMenu} />
											<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
										</button>
									)}
								</div>
							</div>
						</header>
						{this.toggle ? (
							<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation" aria-hidden={!this.toggle} onBlur={this.trapMenuFocus}>
								<div class="ontario-application-navigation ontario-application-navigation__container nav-ul-opened">
									<ul>
										{this.itemState?.map((item, index) => {
											const lastLink = index + 1 === this.itemState.length;
											return lastLink ? (
												<li>
													<a onBlur={this.trapMenuFocus} href={item.href}>
														{item.name}
													</a>
												</li>
											) : (
												<li>
													<a href={item.href}>{item.name}</a>
												</li>
											);
										})}
									</ul>
								</div>
							</nav>
						) : (
							<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation" aria-hidden={!this.toggle}>
								<div class="ontario-application-navigation ontario-application-navigation__container nav-ul-closed">
									<ul>
										{this.itemState?.map(item => (
											<li>
												<a tabindex="-1" href={item.href}>
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</div>
							</nav>
						)}
					</div>
					{this.toggle && <div class="ontario-hide-for-large ontario-application-overlay" />}
				</div>
			);
		} else {
			return (
				<div>
					<div class="ontario-application-header__container" id="ontario-application-header" ref={el => (this.header = el as HTMLInputElement)}>
						<div class="ontario-application-main-header-container">
							<section class="ontario-application-header">
								<div class="ontario-row">
									<div class="ontario-columns ontario-small-6 ontario-application-header__logo">
										<a href="https://www.ontario.ca/page/government-ontario" innerHTML={OntarioLogo} />
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
											<a href={this.titleHeaderState?.href}>{this.titleHeaderState?.name}</a>
										</p>
										<div class="ontario-application-subheader__menu-container">
											<div class="ontario-show-for-large">
												<ul class="ontario-application-subheader__menu ">
													{this.itemState?.slice(0, 5).map(item => (
														<li>
															<a href={item.href}>{item.name}</a>
														</li>
													))}
												</ul>
											</div>
											<div class="ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
												<ul class="ontario-application-subheader__menu ">
													{this.itemState?.slice(0, 2).map(item => (
														<li>
															<a href={item.href}>{item.name}</a>
														</li>
													))}
												</ul>
											</div>
											{this.toggle ? (
												<button
													class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-application-navigation--open"
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-application-navigation"
													aria-label="open menu"
													data-target="megaMenu"
													onClick={this.handleToggle}
													aria-hidden={!this.toggle}
													ref={el => (this.menuButton = el as HTMLInputElement)}
												>
													<div class="ontario-icon-container" innerHTML={OntarioIconClose} />
													<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
												</button>
											) : (
												<button
													class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-application-navigation--closed"
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-application-navigation"
													aria-label="open menu"
													data-target="megaMenu"
													onClick={this.handleToggle}
													aria-hidden={!this.toggle}
													ref={el => (this.menuButton = el as HTMLInputElement)}
												>
													<div class="ontario-icon-container" innerHTML={OntarioIconMenu}>
														{/* <OntarioIconMenu width="32px" height="32px" viewBox="0 0 24 24" /> */}
													</div>
													<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
												</button>
											)}
										</div>
									</div>
								</div>
							</section>
							{this.toggle ? (
								<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation" aria-hidden={!this.toggle}>
									<div class="ontario-application-navigation ontario-application-navigation__container nav-ul-opened">
										<ul>
											{this.itemState?.slice(0, 2).map(item => (
												<li class="ontario-show-for-small-only">
													<a href={item.href}>{item.name}</a>
												</li>
											))}

											{this.itemState?.slice(2, 5).map(item => (
												<li class="ontario-hide-for-large">
													<a href={item.href}>{item.name}</a>
												</li>
											))}

											{this.itemState?.slice(5).map((item, index) => {
												const lastLink = index + 1 === this.itemState.length - 5;
												return lastLink ? (
													<li>
														<a onBlur={this.trapMenuFocus} href={item.href}>
															{item.name}
														</a>
													</li>
												) : (
													<li>
														<a href={item.href}>{item.name}</a>
													</li>
												);
											})}
										</ul>
									</div>
								</nav>
							) : (
								<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation" aria-hidden={!this.toggle}>
									<div class="ontario-application-navigation ontario-application-navigation__container nav-ul-closed">
										<ul>
											{this.itemState?.slice(0, 2).map(item => (
												<li class="ontario-show-for-small-only">
													<a tabindex="-1" href={item.href}>
														{item.name}
													</a>
												</li>
											))}

											{this.itemState?.slice(2, 5).map(item => (
												<li class="ontario-hide-for-large">
													<a tabindex="-1" href={item.href}>
														{item.name}
													</a>
												</li>
											))}

											{this.itemState?.slice(5).map(item => (
												<li>
													<a tabindex="-1" href={item.href}>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</div>
								</nav>
							)}
						</div>
					</div>
					{this.toggle && <div class="ontario-hide-for-large ontario-application-overlay" />}
				</div>
			);
		}
	}
}
