import { Component, Prop, State, Watch, h, Event, EventEmitter } from '@stencil/core';
import OntarioIconClose from '../ontario-icon/assets/ontario-icon-close-header.svg';
import OntarioIconMenu from '../ontario-icon/assets/ontario-icon-menu-header.svg';
import OntarioLogo from './ontario-logo-header.svg';
import { titleHeader, languageTogglePaths } from './titleHeader';

@Component({
	tag: 'ontario-header',
	styleUrl: 'ontario-header.scss',
	shadow: true,
})
export class OntarioHeader {
	@Prop() type?: 'application' | 'ontario' = 'application';

	@Prop() titleHeader: titleHeader | string;

	@State() titleHeaderState: titleHeader;

	@Watch('titleHeader')
	private parseTitleHeader() {
		const titleHeader = this.titleHeader;
		if (titleHeader) {
			console.log('titleheader', titleHeader);
			if (typeof titleHeader === 'string') this.titleHeaderState = JSON.parse(titleHeader);
			else this.titleHeaderState = titleHeader;
		}
	}

	@Prop() menuItems: titleHeader[] | string;

	@State() private itemState: titleHeader[];

	@Watch('menuItems')
	parseMenuItems() {
		console.log('menuitems', this.menuItems);
		if (typeof this.menuItems !== 'undefined') {
			if (!Array.isArray(this.menuItems)) {
				this.itemState = JSON.parse(this.menuItems);
			} else {
				this.itemState = this.menuItems;
			}
		}
	}

	@Prop() languageTogglePaths: languageTogglePaths;

	@State() languageState: languageTogglePaths;

	@Watch('languageTogglePaths')
	private parseLanguage() {
		const languageTogglePaths = this.languageTogglePaths;
		if (languageTogglePaths) {
			console.log('languagetoggle', languageTogglePaths);
			if (typeof languageTogglePaths === 'string') this.languageState = JSON.parse(languageTogglePaths);
			else this.languageState = languageTogglePaths;
		}
	}

	@Prop() toggle: boolean = false;

	@Event() changeEvent!: EventEmitter<any>;
	handleToggle = () => {
		this.toggle = !this.toggle;
	};

	componentWillLoad() {
		this.parseTitleHeader();
		this.parseMenuItems();
		this.parseLanguage();
	}

	render() {
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
									<a href={this.languageState.frenchLink} class="ontario-header-button ontario-header-button--without-outline">
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
										<a href={this.titleHeaderState.href}>{this.titleHeaderState.name}</a>
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
