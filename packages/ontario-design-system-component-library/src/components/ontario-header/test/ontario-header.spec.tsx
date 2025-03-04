import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';

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
				</mock:shadow-root>
			</ontario-header>
		`);
	});
});
