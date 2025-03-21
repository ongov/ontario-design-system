import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';

jest.mock('@ongov/ontario-design-system-design-tokens/dist/ts/tokens', () => ({
	OntarioBreakpointsSmall: '40em',
	OntarioBreakpointsMedium: '64em',
	OntarioBreakpointsLarge: '90em',
}));

describe('ontario-header', () => {
	it('should render application header', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header
				type="application"
				application-header-info='{
					"title": "Application name",
					"href": "/",
					"maxSubheaderDesktopLinks": 3,
					"maxSubheaderTabletLinks": 1
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"title": "Link one",
					"href": "/link-one"
				},{
					"title": "Link two",
					"href": "/link-two"
				},{
					"title": "Link three",
					"href": "/link-three"
				},{
					"title": "Link four",
					"href": "/link-four"
				},{
					"title": "Link five",
					"href": "/link-five"
				},{
					"title": "Link six",
					"href": "/link-six"
				},{
					"title": "Link seven",
					"href": "/link-seven"
				}]'
			></ontario-header>`,
		});
		expect(page.root).toEqualHtml(`
    		<ontario-header
        		type="application"
				application-header-info='{
					"title": "Application name",
					"href": "/",
					"maxSubheaderDesktopLinks": 3,
					"maxSubheaderTabletLinks": 1
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"title": "Link one",
					"href": "/link-one"
				},{
					"title": "Link two",
					"href": "/link-two"
				},{
					"title": "Link three",
					"href": "/link-three"
				},{
					"title": "Link four",
					"href": "/link-four"
				},{
					"title": "Link five",
					"href": "/link-five"
				},{
					"title": "Link six",
					"href": "/link-six"
				},{
					"title": "Link seven",
					"href": "/link-seven"
				}]'>
				<mock:shadow-root>
					<div>
						<div class="ontario-application-header-container" id="ontario-application-header">
							<header class="ontario-application-header" id="ontario-header">
								<div class="ontario-row">
									<div class="ontario-application-header__logo ontario-columns ontario-small-6">
										<a href="https://www.ontario.ca/page/government-ontario">
											<img alt="Ontario.ca homepage" src="/assets/ontario-logo--desktop.svg">
										</a>
									</div>
									<div class="ontario-application-header__lang-toggle ontario-columns ontario-small-6">
										<ontario-language-toggle size="small" url="/fr"></ontario-language-toggle>
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
												<button aria-controls="ontario-navigation" aria-label="Show navigation menu" class="ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" id="ontario-application-header-menu-toggler" type="button">
													<span class="ontario-header__icon-container"></span>
													<span>Menu</span>
												</button>
											</div>
                    </div>
                  </div>
                </section>
                <slot name="menu-overflow">
                  <ontario-header-menu menu-items="[{&quot;title&quot;:&quot;Link one&quot;,&quot;href&quot;:&quot;/link-one&quot;},{&quot;title&quot;:&quot;Link two&quot;,&quot;href&quot;:&quot;/link-two&quot;},{&quot;title&quot;:&quot;Link three&quot;,&quot;href&quot;:&quot;/link-three&quot;},{&quot;title&quot;:&quot;Link four&quot;,&quot;href&quot;:&quot;/link-four&quot;},{&quot;title&quot;:&quot;Link five&quot;,&quot;href&quot;:&quot;/link-five&quot;},{&quot;title&quot;:&quot;Link six&quot;,&quot;href&quot;:&quot;/link-six&quot;},{&quot;title&quot;:&quot;Link seven&quot;,&quot;href&quot;:&quot;/link-seven&quot;}]"></ontario-header-menu>
                </slot>
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
					"title": "Arts and Culture",
					"href": "https://www.ontario.ca/page/arts-and-culture"
				},{
					"title": "Business and economy",
					"href": "https://www.ontario.ca/page/business-and-economy"
				},{
					"title": "Driving and Roads",
					"href": "https://www.ontario.ca/page/driving-and-roads"
				},{
					"title": "Education and training",
					"href": "https://www.ontario.ca/page/education-and-training"
				},{
					"title": "Environment and energy",
					"href": "https://www.ontario.ca/page/environment-and-energy"
				},{
					"title": "Government",
					"href": "https://www.ontario.ca/page/government"
				},{
					"title": "Health and wellness",
					"href": "https://www.ontario.ca/page/health-care-ontario"
				},{
					"title": "Home and community",
					"href": "https://www.ontario.ca/page/home-and-community"
				},{
					"title": "Jobs and employment",
					"href": "https://www.ontario.ca/page/jobs-and-employment"
				},{
					"title": "Law and safety",
					"href": "https://www.ontario.ca/page/law-and-safety"
				},{
					"title": "Rural and north",
					"href": "https://www.ontario.ca/page/rural-and-north"
				},{
					"title": "Taxes and benefits",
					"href": "https://www.ontario.ca/page/taxes-and-benefits"
				},{
					"title": "Travel and recreation",
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
					"title": "Arts and Culture",
					"href": "https://www.ontario.ca/page/arts-and-culture"
				},{
					"title": "Business and economy",
					"href": "https://www.ontario.ca/page/business-and-economy"
				},{
					"title": "Driving and Roads",
					"href": "https://www.ontario.ca/page/driving-and-roads"
				},{
					"title": "Education and training",
					"href": "https://www.ontario.ca/page/education-and-training"
				},{
					"title": "Environment and energy",
					"href": "https://www.ontario.ca/page/environment-and-energy"
				},{
					"title": "Government",
					"href": "https://www.ontario.ca/page/government"
				},{
					"title": "Health and wellness",
					"href": "https://www.ontario.ca/page/health-care-ontario"
				},{
					"title": "Home and community",
					"href": "https://www.ontario.ca/page/home-and-community"
				},{
					"title": "Jobs and employment",
					"href": "https://www.ontario.ca/page/jobs-and-employment"
				},{
					"title": "Law and safety",
					"href": "https://www.ontario.ca/page/law-and-safety"
				},{
					"title": "Rural and north",
					"href": "https://www.ontario.ca/page/rural-and-north"
				},{
					"title": "Taxes and benefits",
					"href": "https://www.ontario.ca/page/taxes-and-benefits"
				},{
					"title": "Travel and recreation",
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
										<img alt="Ontario.ca homepage" class="ontario-show-for-medium" src="/assets/ontario-logo--desktop.svg">
										<img alt="Ontario.ca homepage" class="ontario-show-for-small-only" src="/assets/ontario-logo--mobile.svg">
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
									<ontario-language-toggle size="default" url="/fr"></ontario-language-toggle>
									<button aria-controls="ontario-search-form-container" class="ontario-header-button ontario-header-button--without-outline ontario-header__search-toggler ontario-hide-for-large" id="ontario-header-search-toggler">
										<span class="ontario-header__icon-container"></span>
										<span class="ontario-show ontario-show-for-medium">
											Search
										</span>
									</button>
									<button aria-controls="ontario-navigation" aria-label="Show navigation menu" class="ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" id="ontario-header-menu-toggler" type="button">
										<span class="ontario-header__icon-container"></span>
										<span>
											Menu
										</span>
									</button>
								</div>
								<div class="ontario-columns ontario-header__search-close-container ontario-medium-3 ontario-small-2">
									<button aria-label="Close search bar" class="ontario-header-button ontario-header-button--without-outline ontario-header__search-close" id="ontario-header-search-close" type="button">
										<span aria-hidden="true">
											close
										</span>
										<span class="ontario-header__icon-container"></span>
									</button>
								</div>
							</div>
						</header>
						<ontario-header-menu menu-items="[{&quot;title&quot;:&quot;Arts and Culture&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/arts-and-culture&quot;},{&quot;title&quot;:&quot;Business and economy&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/business-and-economy&quot;},{&quot;title&quot;:&quot;Driving and Roads&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/driving-and-roads&quot;},{&quot;title&quot;:&quot;Education and training&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/education-and-training&quot;},{&quot;title&quot;:&quot;Environment and energy&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/environment-and-energy&quot;},{&quot;title&quot;:&quot;Government&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/government&quot;},{&quot;title&quot;:&quot;Health and wellness&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/health-care-ontario&quot;},{&quot;title&quot;:&quot;Home and community&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/home-and-community&quot;},{&quot;title&quot;:&quot;Jobs and employment&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/jobs-and-employment&quot;},{&quot;title&quot;:&quot;Law and safety&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/law-and-safety&quot;},{&quot;title&quot;:&quot;Rural and north&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/rural-and-north&quot;},{&quot;title&quot;:&quot;Taxes and benefits&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/taxes-and-benefits&quot;},{&quot;title&quot;:&quot;Travel and recreation&quot;,&quot;href&quot;:&quot;https://www.ontario.ca/page/travel-and-recreation&quot;}]"></ontario-header-menu>
					</div>
				</div>
			</mock:shadow-root>
			</ontario-header>
		`);
	});

	it('should render service ontario header', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header
				type="serviceOntario"
				application-header-info='{
					"title": "Application name",
					"href": "/",
					"maxSubheaderDesktopLinks": 3,
					"maxSubheaderTabletLinks": 1
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"title": "Link one",
					"href": "/link-one"
				},{
					"title": "Link two",
					"href": "/link-two"
				},{
					"title": "Link three",
					"href": "/link-three"
				},{
					"title": "Link four",
					"href": "/link-four"
				},{
					"title": "Link five",
					"href": "/link-five"
				},{
					"title": "Link six",
					"href": "/link-six"
				},{
					"title": "Link seven",
					"href": "/link-seven"
				}]'
			></ontario-header>`,
		});

		expect(page.root).toEqualHtml(`
    		<ontario-header
        	type="serviceOntario"
					application-header-info='{
					"title": "Application name",
					"href": "/",
					"maxSubheaderDesktopLinks": 3,
					"maxSubheaderTabletLinks": 1
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"title": "Link one",
					"href": "/link-one"
				},{
					"title": "Link two",
					"href": "/link-two"
				},{
					"title": "Link three",
					"href": "/link-three"
				},{
					"title": "Link four",
					"href": "/link-four"
				},{
					"title": "Link five",
					"href": "/link-five"
				},{
					"title": "Link six",
					"href": "/link-six"
				},{
					"title": "Link seven",
					"href": "/link-seven"
				}]'>
				<mock:shadow-root>
					<div>
						<div class="ontario-application-header-container" id="ontario-application-header">
							<header class="ontario-application-header" id="ontario-header">
								<div class="ontario-row">
									<div class="ontario-application-header__logo ontario-columns ontario-small-6">
										<a href="https://www.ontario.ca/page/government-ontario">
											<img alt="Ontario.ca homepage" src="/assets/ontario-logo--desktop.svg">
										</a>
									</div>
									<div class="ontario-application-header__lang-toggle ontario-columns ontario-small-6">
										<ontario-language-toggle size="small" url="/fr"></ontario-language-toggle>
									</div>
								</div>
							</header>
							<div class="ontario-application-subheader-menu__container">
								<section class="ontario-application-subheader ontario-service-subheader">
									<div class="ontario-row">
										<div class="ontario-application-subheader__container ontario-columns ontario-small-12">
											<a href="/" class="ontario-service-subheader__link">
												<div class="ontario-service-subheader__heading-container">
													<p class="ontario-service-subheader__heading">
														ServiceOntario
													</p>
													<p class="ontario-service-subheader__description">Application name</p>
												</div>
											</a>
											<div class="ontario-application-subheader__menu-container">
												<button aria-controls="ontario-navigation" aria-label="Show navigation menu" class="ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" id="ontario-application-header-menu-toggler" type="button">
													<span class="ontario-header__icon-container"></span>
													<span>Menu</span>
												</button>
											</div>
  		            	</div>
                  </div>
                </section>
							<slot name="menu-overflow">
                <ontario-header-menu menu-items="[{&quot;title&quot;:&quot;Link one&quot;,&quot;href&quot;:&quot;/link-one&quot;},{&quot;title&quot;:&quot;Link two&quot;,&quot;href&quot;:&quot;/link-two&quot;},{&quot;title&quot;:&quot;Link three&quot;,&quot;href&quot;:&quot;/link-three&quot;},{&quot;title&quot;:&quot;Link four&quot;,&quot;href&quot;:&quot;/link-four&quot;},{&quot;title&quot;:&quot;Link five&quot;,&quot;href&quot;:&quot;/link-five&quot;},{&quot;title&quot;:&quot;Link six&quot;,&quot;href&quot;:&quot;/link-six&quot;},{&quot;title&quot;:&quot;Link seven&quot;,&quot;href&quot;:&quot;/link-seven&quot;}]"></ontario-header-menu>
              </slot>
						</div>
					</div>
				</div>
			</mock:shadow-root>
		</ontario-header>
    `);
	});
});
