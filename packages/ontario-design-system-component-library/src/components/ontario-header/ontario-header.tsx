import { Component, Prop, State, Watch, h, Event, EventEmitter } from '@stencil/core';
import OntarioIconClose from '../ontario-icon/assets/ontario-icon-close-header.svg';
import OntarioIconMenu from '../ontario-icon/assets/ontario-icon-menu-header.svg';
import OntarioLogo from './ontario-logo-header.svg';
import { headerTitle } from './headerTitle.interface';
import { languageTogglePaths } from './languageTogglePaths.interface';
@Component({
	tag: 'ontario-header',
	styleUrl: 'ontario-header.scss',
	shadow: true,
})
export class OntarioHeader {
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

	@Prop() languageTogglePaths: languageTogglePaths | string;

	@State() languageState: languageTogglePaths;

	@Watch('languageTogglePaths')
	private parseLanguage() {
		const languageTogglePaths = this.languageTogglePaths;
		if (languageTogglePaths) {
			if (typeof languageTogglePaths === 'string') this.languageState = JSON.parse(languageTogglePaths);
			else this.languageState = languageTogglePaths;
		}
	}

	@Prop() toggle: boolean = false;

	@Event() changeEvent!: EventEmitter<any>;
	handleToggle = () => this.toggle = !this.toggle;

	componentWillLoad() {
		this.parseTitleHeader();
		this.parseMenuItems();
		this.parseLanguage();
	}

justTest() {
	console.log("test")
}

	render() {
		if (this.type == 'ontario') {
			return (
				<div class="documentation-only">
    <div class="ontario-header__container">
        <header class="ontario-header" id="ontario-header">
            <div class="ontario-row">
                <div class="ontario-header__logo-container ontario-columns ontario-small-2 ontario-medium-4 ontario-large-3">
                    <a href="https://www.ontario.ca/page/government-ontario">
                        <img class="ontario-show-for-medium" src="../../logos/ontario-logo--desktop.svg" alt="Government of Ontario" />
                        <img class="ontario-show-for-small-only" src="../../logos/ontario-logo--mobile.svg" alt="Government of Ontario" />
                    </a>
                </div>

                <form name="searchForm" id="ontario-search-form-container" onSubmit={this.justTest} class="ontario-header__search-container ontario-columns ontario-small-10 ontario-medium-offset-3 ontario-medium-6 ontario-large-offset-0 ontario-large-6" novalidate>
                    <label htmlFor="ontario-search-input-field" class="ontario-show-for-sr">Search</label>
                    <input type="text" name="search" id="ontario-search-input-field" autoComplete="off" aria-autocomplete="none" class="ontario-input ontario-header__search-input" required={true} />
                    <input class="ontario-header__search-reset" id="ontario-search-reset" type="reset" value="" aria-label="Clear"  />
                    <button class="ontario-header__search-submit" id="ontario-search-submit" type="submit" onClick={this.justTest}>
                        <span class="ontario-show-for-sr">Submit</span>
                        <svg class="ontario-icon" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <use xlinkHref="#ontario-icon-search"></use>
                        </svg>
                    </button>
                </form>
                <div class="ontario-header__nav-right-container ontario-columns ontario-small-10 ontario-medium-8 ontario-large-3">
                    <a href="" class="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline">
                        <abbr title="Français" class="ontario-show-for-small-only">
                            FR
                        </abbr>
                        <span class="ontario-show-for-medium">
                            Français
                        </span>
                    </a>

                    <button class="ontario-header__search-toggler ontario-header-button ontario-header-button--without-outline ontario-hide-for-large" id="ontario-header-search-toggler" aria-controls="ontario-search-form-container">
                        <svg class="ontario-icon" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <use xlinkHref="#ontario-icon-search"></use>
                        </svg>
                        <span class="ontario-show-for-medium ontario-show">
                            Search
                        </span>
                    </button>

                    <button class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline" id="ontario-header-menu-toggler" aria-controls="ontario-navigation" aria-label="open menu">
                        <svg class="ontario-icon" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <use xlinkHref="#ontario-icon-menu"></use>
                        </svg>

                        <span>Menu</span>
                    </button>
                </div>
                <div class="ontario-header__search-close-container ontario-columns ontario-small-2 ontario-medium-3">
                    <button class="ontario-header__search-close ontario-header-button ontario-header-button--without-outline" id="ontario-header-search-close" aria-label="close search bar">
                        <span aria-hidden="true">close</span>
                        <svg class="ontario-icon" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <use xlinkHref="#ontario-icon-close"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
        <nav role="navigation" class="ontario-navigation" id="ontario-navigation">
            <button class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline" id="ontario-header-nav-toggler" aria-controls="ontario-navigation" aria-label="close" data-target="megaMenu">
                <svg class="ontario-icon" focusable="false" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                    <use xlinkHref="#ontario-icon-close"></use>
                </svg>
                <span>Menu</span>
            </button>
            <div class="ontario-navigation__container">
                <ul>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Arts and culture</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Business and economy</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Driving and roads</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Education and training</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Environment and energy</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Government</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Health and wellness</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Home and community</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Jobs and employment</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Law and safety</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Rural and north</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Taxes and benefits</a>
                    </li>
                    <li class="ontario-header-navigation__menu-item">
                        <a href="#">Travel and recreation</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="ontario-overlay"></div>

    <script src="../../scripts/ontario-a11y.js"></script>
    <script src="../../scripts/ontario-header.js"></script>
    <script src="../../scripts/ontario-search.js"></script>
</div>
			);
		}
		else {
			return (
				<div>
					<div class="ontario-application-header__container" id="ontario-application-header">
						<div class="ontario-application-main-header-container">
							<section class="ontario-application-header">
								<div class="ontario-row">
									<div class="ontario-columns ontario-small-6 ontario-application-header__logo" innerHTML={OntarioLogo}>
										<a href="https://www.ontario.ca/page/government-ontario" />
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
													class="active ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline "
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-application-navigation"
													aria-label="open menu"
													data-target="megaMenu"
													onClick={this.handleToggle}
												>
													<div class={`ontario-icon ontario-icon--white`} innerHTML={OntarioIconClose}>
														{/* <OntarioIconClose width="32px" height="32px" viewBox="0 0 24 24" /> */}
													</div>
													<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
												</button>
											) : (
												<button
													class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline"
													id="ontario-application-header-menu-toggler"
													aria-controls="ontario-application-navigation"
													aria-label="open menu"
													data-target="megaMenu"
													onClick={this.handleToggle}
												>
													<div class={`ontario-icon ontario-icon--white`} innerHTML={OntarioIconMenu}>
														{/* <OntarioIconMenu width="32px" height="32px" viewBox="0 0 24 24" /> */}
													</div>
													<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
												</button>
											)}
										</div>
									</div>
								</div>
							</section>
							<nav role="navigation" class="ontario-application-navigation" id="ontario-application-navigation">
								{this.toggle ? (
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

											{this.itemState?.slice(5).map(item => (
												<li>
													<a href={item.href}>{item.name}</a>
												</li>
											))}
										</ul>
									</div>
								) : (
									<div class="ontario-application-navigation ontario-application-navigation__container nav-ul-closed">
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

											{this.itemState?.slice(5).map(item => (
												<li>
													<a href={item.href}>{item.name}</a>
												</li>
											))}
										</ul>
									</div>
								)}
							</nav>
						</div>
					</div>
					{this.toggle && <div class="ontario-hide-for-large ontario-application-overlay" />}
				</div>
			);
		}
	}
}
