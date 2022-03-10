import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
	tag: 'ontario-header',
	styleUrl: 'ontario-header.scss',
	shadow: true,
})
export class OntarioHeader {
	@Prop() toggle: boolean = false;

	@Event() changeEvent!: EventEmitter<any>;
	handleToggle = () => {
		this.toggle = !this.toggle;
	};

	render() {
		return (
			<div>
				<div class="ontario-application-header__container" id="ontario-application-header">
					<div class="ontario-application-main-header-container">
						<section class="ontario-application-header">
							<div class="ontario-row">
								<div class="ontario-columns ontario-small-6 ontario-application-header__logo">
									<a href="https://www.ontario.ca/page/government-ontario">{/* <img src={ontarioLogoDesktop} alt="" /> */}</a>
								</div>
								<div class="ontario-columns ontario-small-6 ontario-application-header__lang-toggle">
									<a href="/" class="ontario-header-button ontario-header-button--without-outline">
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
										<a href="/">Design System</a>
									</p>
									<div class="ontario-application-subheader__menu-container">
										<div class="ontario-show-for-large">
											<ul class="ontario-application-subheader__menu ">
												<li>
													<a href="ontario-button">Button</a>
												</li>
												<li>
													<a href="ontario-hint">Hint</a>
												</li>
												<li>
													<a href="ontario-text-area">Text Area</a>
												</li>
												<li>
													<a href="ontario-text-input">Text Input</a>
												</li>
												<li>
													<a href="#">Link 5</a>
												</li>
											</ul>
										</div>
										<div class="ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
											<ul class="ontario-application-subheader__menu ">
												<li>
													<a href="#">Link 1</a>
												</li>
												<li>
													<a href="#">Link 2</a>
												</li>
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
												<div class={`ontario-icon ontario-icon--white`}>
													{/* <OntarioIconClose width="32px" height="32px" viewBox="0 0 24 24" /> */}
													<span class="ontario-application-header-menu-span ontario-hide-for-small-only">Menu</span>
												</div>
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
												<div class={`ontario-icon ontario-icon--white`}>{/* <OntarioIconMenu width="32px" height="32px" viewBox="0 0 24 24" /> */}</div>
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
										<li class="ontario-show-for-small-only">
											<a href="#">Link 1</a>
										</li>
										<li class="ontario-show-for-small-only">
											<a href="#">Link 2</a>
										</li>
										<li class="ontario-hide-for-large">
											<a href="#">Link 3</a>
										</li>
										<li class="ontario-hide-for-large">
											<a href="#">Link 4</a>
										</li>
										<li class="ontario-hide-for-large">
											<a href="#">Link 5</a>
										</li>
										<li>
											<a href="#">Link 6</a>
										</li>
										<li>
											<a href="#">Link 7</a>
										</li>
										<li>
											<a href="#">Link 8</a>
										</li>
									</ul>
								</div>
							) : (
								<div class="ontario-application-navigation ontario-application-navigation__container nav-ul-closed">
									<ul>
										<li class="ontario-show-for-small-only">
											<a href="#">Link 1</a>
										</li>
										<li class="ontario-show-for-small-only">
											<a href="#">Link 2</a>
										</li>
										<li class="ontario-hide-for-large">
											<a href="#">Link 3</a>
										</li>
										<li class="ontario-hide-for-large">
											<a href="#">Link 4</a>
										</li>
										<li class="ontario-hide-for-large">
											<a href="#">Link 5</a>
										</li>
										<li>
											<a href="#">Link 6</a>
										</li>
										<li>
											<a href="#">Link 7</a>
										</li>
										<li>
											<a href="#">Link 8</a>
										</li>
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
