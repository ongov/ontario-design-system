import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';

describe('ontario-header', () => {
	it('should render application header', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header
        type="application"
        application-header-info='{
					"name": "Application name" ,
					"href": "/"
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				application-subheader-desktop-links="3"
				application-subheader-tablet-links="1"
				menu-items='[{
					"name": "Link one",
					"href": "/link-one"
				},{
					"name": "Link two",
					"href": "/link-two"
				},{
					"name": "Link three",
					"href": "/link-three"
				},{
					"name": "Link four",
					"href": "/link-four"
				},{
					"name": "Link five",
					"href": "/link-five"
				},{
					"name": "Link six",
					"href": "/link-six"
				},{
					"name": "Link seven",
					"href": "/link-seven"
				}]'
      ></ontario-header>`,
		});
		expect(page.root).toEqualHtml(`
    <ontario-header
        type="application"
        application-header-info='{
					"name": "Application name" ,
					"href": "/"
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				application-subheader-desktop-links="3"
				application-subheader-tablet-links="1"
				menu-items='[{
					"name": "Link one",
					"href": "/link-one"
				},{
					"name": "Link two",
					"href": "/link-two"
				},{
					"name": "Link three",
					"href": "/link-three"
				},{
					"name": "Link four",
					"href": "/link-four"
				},{
					"name": "Link five",
					"href": "/link-five"
				},{
					"name": "Link six",
					"href": "/link-six"
				},{
					"name": "Link seven",
					"href": "/link-seven"
				}]'>
				<mock:shadow-root>
					<div>
						<div class="ontario-application-header-container" id="ontario-application-header">
							<header class="ontario-application-header" id="ontario-header">
								<div class="ontario-row">
									<div class="ontario-application-header__logo ontario-columns ontario-small-6">
										<a href="https://www.ontario.ca/page/government-ontario">
											<img alt="Government of Ontario" src="/assets/ontario-logo-application-header.svg">
										</a>
									</div>
									<div class="ontario-application-header__lang-toggle ontario-columns ontario-small-6">
										<a class="ontario-header-button ontario-header-button--without-outline" href="/fr">
											<abbr class="ontario-show-for-small-only" title="Français">
												FR
											</abbr>
											<span class="ontario-show-for-medium">
												Français
											</span>
										</a>
									</div>
								</div>
							</header>
							<div class="ontario-application-subheader-menu__container">
								<section class="ontario-application-subheader">
									<div class="ontario-row">
										<div class="ontario-application-subheader__container ontario-columns ontario-small-12">
											<p class="ontario-application-subheader__heading">
												<a href="/">
													Application name
												</a>
											</p>
											<div class="ontario-application-subheader__menu-container">
												<ul class="ontario-application-subheader__menu ontario-show-for-large">
                          <li>
														<a data-type="app-desktop" href="/link-one">
															Link one
														</a>
													</li>
													<li>
														<a data-type="app-desktop" href="/link-two">
															Link two
														</a>
													</li>
													<li>
														<a data-type="app-desktop" href="/link-three">
															Link three
														</a>
													</li>
												</ul>
												<ul class="ontario-application-subheader__menu ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
													<li>
														<a data-type="app-tablet" href="/link-one">
															Link one
														</a>
													</li>
												</ul>
												<button class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-show-for-large" id="ontario-application-header-menu-toggler" aria-controls="ontario-navigation" aria-label="close menu" type="button">
													<span class="ontario-header__icon-container"></span>
													<span>Menu</span>
												</button>
												<button class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large" id="ontario-application-header-menu-toggler" aria-controls="ontario-navigation" aria-label="close menu" type="button">
													<span class="ontario-header__icon-container"></span>
													<span>Menu</span>
												</button>
												<button class="ontario-header__menu-toggler ontario-header-button ontario-header-button--with-outline ontario-show-for-small-only" id="ontario-application-header-menu-toggler" aria-controls="ontario-navigation" aria-label="close menu" type="button">
													<span class="ontario-header__icon-container"></span>
													<span>Menu</span>
												</button>
											</div>
										</div>
									</div>
              </section>
							<nav aria-hidden="true" class="ontario-application-navigation" id="ontario-application-navigation" role="navigation">
								<div class="ontario-application-navigation__container">
									<ul class="ontario-show-for-large">
										<li>
											<a data-type="app-desktop" href="/link-four">
												Link four
											</a>
										</li>
										<li>
											<a data-type="app-desktop" href="/link-five">
												Link five
											</a>
										</li>
										<li>
											<a data-type="app-desktop" href="/link-six">
												Link six
											</a>
										</li>
										<li>
											<a data-type="app-desktop" href="/link-seven">
												Link seven
											</a>
										</li>
									</ul>
									<ul class="ontario-show-for-medium ontario-hide-for-small ontario-hide-for-large">
									<li>
										<a data-type="app-tablet" href="/link-two">
											Link two
										</a>
									</li>
									<li>
										<a data-type="app-tablet" href="/link-three">
											Link three
										</a>
									</li>
										<li>
											<a data-type="app-tablet" href="/link-four">
												Link four
											</a>
										</li>
										<li>
											<a data-type="app-tablet" href="/link-five">
												Link five
											</a>
										</li>
										<li>
											<a data-type="app-tablet" href="/link-six">
												Link six
											</a>
										</li>
										<li>
											<a data-type="app-tablet" href="/link-seven">
												Link seven
											</a>
										</li>
									</ul>
									<ul class="ontario-show-for-small-only">
									<li>
											<a data-type="app-mobile" href="/link-one">
												Link one
											</a>
									</li>
									<li>
										<a data-type="app-mobile" href="/link-two">
											Link two
										</a>
									</li>
									<li>
										<a data-type="app-mobile" href="/link-three">
											Link three
										</a>
									</li>
										<li>
											<a data-type="app-mobile" href="/link-four">
												Link four
											</a>
										</li>
										<li>
											<a data-type="app-mobile" href="/link-five">
												Link five
											</a>
										</li>
										<li>
											<a data-type="app-mobile" href="/link-six">
												Link six
											</a>
										</li>
										<li>
											<a data-type="app-mobile" href="/link-seven">
												Link seven
											</a>
										</li>
									</ul>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</mock:shadow-root>
		</ontario-header>
    `);
	});

	it('should render ontario header', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header
        type="ontario"
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"name": "Arts and Culture",
					"href": "https://www.ontario.ca/page/arts-and-culture"
				},{
					"name": "Business and economy",
					"href": "https://www.ontario.ca/page/business-and-economy"
				},{
					"name": "Driving and Roads",
					"href": "https://www.ontario.ca/page/driving-and-roads"
				},{
					"name": "Education and training",
					"href": "https://www.ontario.ca/page/education-and-training"
				},{
					"name": "Environment and energy",
					"href": "https://www.ontario.ca/page/environment-and-energy"
				},{
					"name": "Government",
					"href": "https://www.ontario.ca/page/government"
				},{
					"name": "Health and wellness",
					"href": "https://www.ontario.ca/page/health-care-ontario"
				},{
					"name": "Home and community",
					"href": "https://www.ontario.ca/page/home-and-community"
				},{
					"name": "Jobs and employment",
					"href": "https://www.ontario.ca/page/jobs-and-employment"
				},{
					"name": "Law and safety",
					"href": "https://www.ontario.ca/page/law-and-safety"
				},{
					"name": "Rural and north",
					"href": "https://www.ontario.ca/page/rural-and-north"
				},{
					"name": "Taxes and benefits",
					"href": "https://www.ontario.ca/page/taxes-and-benefits"
				},{
					"name": "Travel and recreation",
					"href": "https://www.ontario.ca/page/travel-and-recreation"
				}]'
      ></ontario-header>`,
		});
		expect(page.root).toEqualHtml(`
    <ontario-header
        type="ontario"
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"name": "Arts and Culture",
					"href": "https://www.ontario.ca/page/arts-and-culture"
				},{
					"name": "Business and economy",
					"href": "https://www.ontario.ca/page/business-and-economy"
				},{
					"name": "Driving and Roads",
					"href": "https://www.ontario.ca/page/driving-and-roads"
				},{
					"name": "Education and training",
					"href": "https://www.ontario.ca/page/education-and-training"
				},{
					"name": "Environment and energy",
					"href": "https://www.ontario.ca/page/environment-and-energy"
				},{
					"name": "Government",
					"href": "https://www.ontario.ca/page/government"
				},{
					"name": "Health and wellness",
					"href": "https://www.ontario.ca/page/health-care-ontario"
				},{
					"name": "Home and community",
					"href": "https://www.ontario.ca/page/home-and-community"
				},{
					"name": "Jobs and employment",
					"href": "https://www.ontario.ca/page/jobs-and-employment"
				},{
					"name": "Law and safety",
					"href": "https://www.ontario.ca/page/law-and-safety"
				},{
					"name": "Rural and north",
					"href": "https://www.ontario.ca/page/rural-and-north"
				},{
					"name": "Taxes and benefits",
					"href": "https://www.ontario.ca/page/taxes-and-benefits"
				},{
					"name": "Travel and recreation",
					"href": "https://www.ontario.ca/page/travel-and-recreation"
				}]'
      >
      <mock:shadow-root>
        <div>
          <div class="ontario-header__container">
            <header class="ontario-header" id="ontario-header">
              <div class="ontario-row">
                <div class="ontario-columns ontario-header__logo-container ontario-large-3 ontario-medium-4 ontario-small-2">
                  <a href="https://www.ontario.ca/page/government-ontario">
                    <img alt="Government of Ontario" class="ontario-show-for-medium" src="/assets/ontario-logo--desktop.svg">
										<img class="ontario-show-for-small-only" src="/assets/ontario-logo--mobile.svg" alt="Government of Ontario" />
                  </a>
                </div>
                <form class="ontario-columns ontario-header__search-container ontario-large-6 ontario-large-offset-0 ontario-medium-6 ontario-medium-offset-3 ontario-small-10" id="ontario-search-form-container" name="searchForm" novalidate="">
                  <label class="ontario-show-for-sr" htmlfor="ontario-search-input-field">
                    Search
                  </label>
                  <input aria-autocomplete="none" autocomplete="off" class="ontario-header__search-input ontario-input" id="ontario-search-input-field" name="search" required="" type="text">
                  <input aria-label="Clear field" class="ontario-header__search-reset" id="ontario-search-reset" type="reset" value="">
                  <button class="ontario-header__search-submit" id="ontario-search-submit" type="submit">
										<span class="ontario-show-for-sr">
											Submit
										</span>
										<span class="ontario-header__icon-container"></span>
                  </button>
                </form>
                <div class="ontario-columns ontario-header__nav-right-container ontario-large-3 ontario-medium-8 ontario-small-10">
                  <a class="ontario-header-button ontario-header-button--without-outline ontario-header__language-toggler" href="/fr">
                    <abbr class="ontario-show-for-small-only" title="Français">
                      FR
                    </abbr>
                    <span class="ontario-show-for-medium">
                      Français
                    </span>
                  </a>
									<button aria-controls="ontario-search-form-container" class="ontario-header-button ontario-header-button--without-outline ontario-header__search-toggler ontario-hide-for-large" id="ontario-header-search-toggler">
										<span class="ontario-header__icon-container"></span>
										<span class="ontario-show ontario-show-for-medium">
											Search
										</span>
									</button>
                  <button aria-controls="ontario-navigation" aria-label="close menu" class="ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" id="ontario-header-menu-toggler" type="button">
										<span class="ontario-header__icon-container"></span>
                    <span>
                      Menu
                    </span>
                  </button>
                </div>
                <div class="ontario-columns ontario-header__search-close-container ontario-medium-3 ontario-small-2">
                  <button aria-label="close search bar" class="ontario-header-button ontario-header-button--without-outline ontario-header__search-close" id="ontario-header-search-close" type="button">
                    <span aria-hidden="true">
                      close
                    </span>
                    <span class="ontario-header__icon-container"></span>
                  </button>
                </div>
              </div>
            </header>
            <nav aria-hidden="true" class="ontario-navigation" id="ontario-navigation" role="navigation">
              <div class="ontario-navigation__container">
								<ul>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/arts-and-culture">Arts and Culture</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/business-and-economy">Business and economy</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/driving-and-roads">Driving and Roads</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/education-and-training">Education and training</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/environment-and-energy">Environment and energy</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/government">Government</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/health-care-ontario">Health and wellness</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/home-and-community">Home and community</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/jobs-and-employment">Jobs and employment</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/law-and-safety">Law and safety</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/rural-and-north">Rural and north</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/taxes-and-benefits">Taxes and benefits</a>
									</li>
									<li class="ontario-header-navigation__menu-item">
										<a data-type="ontario-header" href="https://www.ontario.ca/page/travel-and-recreation">Travel and recreation</a>
									</li>
								</ul>
              </div>
            </nav>
          </div>
        </div>
      </mock:shadow-root>
    </ontario-header>
  `);
	});
});
