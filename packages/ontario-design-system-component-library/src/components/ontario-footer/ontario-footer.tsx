import { Component, Prop, h, getAssetPath } from '@stencil/core';
// import { OntarioIconFacebook } from '@ontario-digital-service/ontario-design-system-component-library-react';
// import { OntarioIconTwitter } from '@ontario-digital-service/ontario-design-system-component-library-react';
// import { OntarioIconInstagram } from '@ontario-digital-service/ontario-design-system-component-library-react';


@Component({
	tag: 'ontario-footer',
	styleUrl: 'ontario-footer.scss',
	shadow: true,
	assetsDirs: ['assets'],
})

export class OntarioFooter {
	@Prop() type: 'default' | 'partnership' | 'expanded' = 'default';

	@Prop() isDefault: boolean = false;

	@Prop() isTwoColumns: boolean = false;

	@Prop() isExpanded: boolean = false;

	@Prop() isExpandedTwoColumn: boolean = false;

	@Prop() isExpandedThreeColumn: boolean = false;

	// text: {
	// 	footerLinks: {
	// 		accessibility: {
	// 			text: 'Accessibility';
	// 			url: 'https://www.ontario.ca/page/accessibility';
	// 		};
	// 		privacy: {
	// 			text: 'Privacy';
	// 			url: 'https://www.ontario.ca/page/privacy-statement';
	// 		};
	// 		contactUs: {
	// 			text: 'Contact us';
	// 			url: 'https://www.ontario.ca/feedback/contact-us';
	// 		};
	// 	};
	// 	copyright: 'Queen’s Printer for Ontario,';
	// 	copyrightLink: 'https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario';
	// 	inPartnershipWith: 'In partnership with the';
	// 	govOfOntario: 'Government of Ontario';
	// 	ministryOne: {
	// 		heading: 'Ontario Government';
	// 		description: 'The Government of Ontario includes 24 ministries as well as agencies and Crown corporations. Learn about';
	// 		descriptionLink: 'how the government works.';
	// 		contactUs: 'You can contact us through a ministry or';
	// 		contactUsLink: 'send us an email.';
	// 		buttonText: 'Find a ministry';
	// 	};
	// 	ministryTwo: {
	// 		heading: 'Ministry of Government and Consumer Services';
	// 		description: 'We deliver vital programs, services, and products ranging from health cards, drivers licences and birth certisicates to consumer protection and public safety.';
	// 		links: {
	// 			linkOne: 'ServiceOntario';
	// 			linkTwo: 'Consumer Protection Ontario';
	// 			linkThree: 'Switch to a photo health card';
	// 			linkFour: 'Administrative authorities';
	// 			linkFive: 'The Ontario Gazette';
	// 			linkSix: 'Archives of Ontario';
	// 			linkSeven: "Renew a driver's licence";
	// 			linkEight: 'Ontario photo card';
	// 			linkNine: 'Open Government';
	// 			linkTen: 'Search services';
	// 		};
	// 		contactUs: 'Call ServiceOntario at';
	// 		phone: '516-326-1234';
	// 		or: 'or';
	// 		email: 'send us an email.';
	// 		signupForReminders: 'for email reminders.';
	// 	};
	// 	signUp: 'Sign up';
	// 	contactUs: 'Contact us';
	// 	visitedTopics: 'Most visited topics';
	// 	topicItem: 'Topic item';
	// 	logoPlaceholder: 'Ministry logo placeholder';
	// };

	render() {
		return (
			<footer class={'ontario-footer ontario-footer--' + this.type}>
				{this.isExpanded && (
					<div class="ontario-footer__expanded-top-section">
						<div class="ontario-row">
							<div
								class={
									'ontario-columns ontario-small-12 ' +
									(this.isExpandedTwoColumn ? 'ontario-medium-6' : '') +
									(this.isExpandedThreeColumn ? 'ontario-expanded-footer__one-third-block ontario-medium-12 ontario-large-4' : '')
								}
							>
								{this.isExpandedTwoColumn && (
									<div>
										<h2 class="ontario-h4">Ontario Government</h2>
										<p>
											The Government of Ontario includes 24 ministries as well as agencies and Crown corporations. Learn about <a href="#">how the government works.</a>
										</p>
									</div>
								)}
								{this.isExpandedThreeColumn && (
									<div>
										<h2 class="ontario-h4">Ministry of Government and Consumer Services</h2>
										<p>
											We deliver vital programs, services, and products ranging from health cards, drivers licences and birth certisicates to consumer protection and public safety.
										</p>
									</div>
								)}
							</div>
							{this.isExpandedThreeColumn && (
								<div class="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
									<h2 class="ontario-h4">Most visited topics</h2>
									<ul class="ontario-footer__links-container ontario-footer__links-container--two-column-list">
										<li>
											<a class="ontario-footer__link" href="">
												ServiceOntario
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Consumer Protection Ontario
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Switch to a photo health card
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Administrative authorities
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												The Ontario Gazette
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Archives of Ontario
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Renew a driver's licence
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Ontario photo card
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Open Government
											</a>
										</li>
										<li>
											<a class="ontario-footer__link" href="">
												Search services
											</a>
										</li>
									</ul>
								</div>
							)}
							<div
								class={
									'ontario-columns ontario-small-12' +
									(this.isExpandedTwoColumn ? ' ontario-medium-6' : '') +
									(this.isExpandedThreeColumn ? ' ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block' : '')
								}
							>
								{this.isExpandedTwoColumn && (
									<div>
										<h2 class="ontario-h4">Contact us</h2>
										<p>
											You can contact us through a ministry or <a href="#">send us an email.</a>
										</p>
										<a class="ontario-footer__button ontario-button ontario-margin-bottom-0-!" href="#">
											Find a ministry
										</a>
									</div>
								)}
								{this.isExpandedThreeColumn && (
									<div>
										<h2 class="ontario-h4">Contact us</h2>
										<p>
											Call ServiceOntario at <a href="#">516-326-1234</a> or <a href="#">send us an email.</a>
										</p>
										<p>
											<a href="#">Sign up</a> for email reminders.
										</p>
										<ul class="ontario-footer__links-container ontario-footer__links-container--social">
											<li>
												<a class="ontario-footer__link" href="" aria-label="Facebook">
													<ontario-icon-facebook colour="white" />
												</a>
											</li>
											<li>
												<a class="ontario-footer__link" href="" aria-label="Twitter">
													<ontario-icon-twitter colour="white" />
												</a>
											</li>
											<li>
												<a class="ontario-footer__link" href="" aria-label="Instagram">
													<ontario-icon-instagram colour="white" />
												</a>
											</li>
											<li>
												<a class="ontario-footer__link" href="" aria-label="Youtube">
													<ontario-icon-youtube colour="white" />
												</a>
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div class={'ontario-row ' + (this.isExpanded ? 'ontario-footer__expanded-bottom-section' : '')}>
					{this.isDefault && (
						<div class={'ontario-columns ontario-small-12 ' + (this.isTwoColumns ? 'ontario-medium-7' : '')}>
							<ul class="ontario-footer__links-container ontario-footer__links-container--inline">
								<li>
									<a class="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">
										Accessibility
									</a>
								</li>
								<li>
									<a class="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">
										Privacy
									</a>
								</li>
								<li>
									<a class="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">
										Contact us
									</a>
								</li>
							</ul>
							<div class="ontario-footer__copyright">
								<a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario">
									&copy; Queen’s Printer for Ontario, <span class="ontario-nbsp">2012&ndash;21</span>
								</a>
							</div>
						</div>
					)}
					{this.isTwoColumns && (
						<div class="ontario-columns ontario-small-12 ontario-medium-5 ontario-footer__partnership-logo-container">
							<a href="https://www.ontario.ca/page/government-ontario" class="ontario-footer__ontario-logo">
								<img src={getAssetPath(`./assets/ontario-logo--partnership-footer.svg`)} alt="Government of Ontario" />
							</a>
							<p class="ontario-margin-bottom-0-!">
								In partnership with the <span class="ontario-nbsp">Government of Ontario</span>
							</p>
						</div>
					)}
				</div>
			</footer>
		);
	}
}
