import { E2EPage, E2EElement, newE2EPage } from '@stencil/core/testing';

describe('ontario-footer', () => {
	describe('renders default ontario-footer', () => {
		let page: E2EPage;
		let element: E2EElement;
		let footerLinks: E2EElement;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent(`
				<ontario-footer
					type="default"
					footer-links='{
						"accessibilityLink": {
							"text": "Accessibility",
							"href": "https://www.ontario.ca/page/accessibility"
						},
						"privacyLink": {
							"href": "https://www.ontario.ca/page/privacy-statement"
						},
						"contactLink": {
							"text": "Contact",
							"href": "https://www.ontario.ca/feedback/contact-us"
						},
						"printerLink": {
							"href": "https://www.ontario.ca/page/copyright-information"
						}
					}'
				></ontario-footer>
			`);
			element = await page.find('ontario-footer >>> footer');
			footerLinks = await element.find('.ontario-footer__links-container--inline');
		});

		it('should render default footer wrapper', async () => {
			expect(element).not.toBeNull();
			expect(footerLinks).not.toBeNull();
			expect(element).toHaveClass('ontario-footer--default');
		});

		it('should render accessibility link', async () => {
			const accessibilityLink = await footerLinks.find('[href="https://www.ontario.ca/page/accessibility"]');
			expect(accessibilityLink).not.toBeNull();
		});

		it('should render printer link', async () => {
			const privacyLink = await footerLinks.find('[href="https://www.ontario.ca/page/privacy-statement"]');
			expect(privacyLink).not.toBeNull();
		});

		it('should render contact link', async () => {
			const contactLink = await footerLinks.find('[href="https://www.ontario.ca/feedback/contact-us"]');
			expect(contactLink).not.toBeNull();
		});

		it('should render printer link', async () => {
			const printersLink = await element.find('[href="https://www.ontario.ca/page/copyright-information"]');
			expect(printersLink).not.toBeNull();
		});
	});

	describe('renders twoColumn ontario-footer', () => {
		let page: E2EPage;
		let element: E2EElement;
		let topSection: E2EElement;
		let bottomSection: E2EElement;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent(`
				<ontario-footer
					type="twoColumn"
					footer-links='{
						"accessibilityLink": {
							"text": "Accessibility",
							"href": "https://www.ontario.ca/page/accessibility"
						},
						"privacyLink": {
							"href": "https://www.ontario.ca/page/privacy-statement"
						},
						"contactLink": {
							"text": "Contact",
							"href": "https://www.ontario.ca/feedback/contact-us"
						},
						"printerLink": {
							"href": "https://www.ontario.ca/page/copyright-information"
						}
					}'
					two-column-options='{
						"column1": {
							"title": "Ontario Design System",
							"content": [
								{
									"type": "text",
									"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
								},
								{
									"type": "list",
									"heading": "Latest release",
									"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
								}
							]
						},
						"column2": {
							"title": "Help us improve the design system",
							"content": [
								{
									"type": "html",
									"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
								}
							],
							"button": {
								"text": "Send us an email",
								"link": "#"
							}
						}
					}'
				></ontario-footer>
			`);
			element = await page.find('ontario-footer >>> footer');
			topSection = await element.find('.ontario-footer__expanded-top-section');
			bottomSection = await element.find('.ontario-footer__expanded-bottom-section');
		});

		it('should render twoColumn footer wrapper', async () => {
			const footerLinks = await bottomSection.find('.ontario-footer__links-container--inline');

			expect(element).not.toBeNull();
			expect(footerLinks).not.toBeNull();
			expect(topSection).not.toBeNull();
			expect(bottomSection).not.toBeNull();
			expect(element).toHaveClasses(['ontario-footer', 'ontario-footer--expanded']);
		});

		it('should render 2 columns', async () => {
			const columns = await topSection.findAll('.ontario-columns');
			expect(columns.length).toEqual(2);
		});
	});

	describe('renders threeColumn ontario-footer', () => {
		let page: E2EPage;
		let element: E2EElement;
		let topSection: E2EElement;
		let bottomSection: E2EElement;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent(`
				<ontario-footer
					type="threeColumn"
					footer-links='{
						"accessibilityLink": {
							"text": "Accessibility",
							"href": "https://www.ontario.ca/page/accessibility"
						},
						"privacyLink": {
							"href": "https://www.ontario.ca/page/privacy-statement"
						},
						"contactLink": {
							"text": "Contact",
							"href": "https://www.ontario.ca/feedback/contact-us"
						},
						"printerLink": {
							"href": "https://www.ontario.ca/page/copyright-information"
						}
					}'
					three-column-options='{
						"column1": {
							"title": "Ontario Design System",
							"content": [
								{
									"type": "text",
									"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
								}
							]
						},
						"column2": {
							"title": "Latest release",
							"content": [
								{
									"type": "list",
									"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
								}
							]
						},
						"column3": {
							"title": "Help us improve the design system",
							"content": [
								{
									"type": "html",
									"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
								}
							],
							"button": {
								"text": "Send us an email",
								"link": "#"
							}
						}
					}'
				></ontario-footer>
			`);
			element = await page.find('ontario-footer >>> footer');
			topSection = await element.find('.ontario-footer__expanded-top-section');
			bottomSection = await element.find('.ontario-footer__expanded-bottom-section');
		});

		it('should render threeColumn footer wrapper', async () => {
			const footerLinks = await bottomSection.find('.ontario-footer__links-container--inline');

			expect(element).not.toBeNull();
			expect(footerLinks).not.toBeNull();
			expect(topSection).not.toBeNull();
			expect(bottomSection).not.toBeNull();
			expect(element).toHaveClasses(['ontario-footer', 'ontario-footer--expanded']);
		});

		it('should render 3 columns', async () => {
			const columns = await topSection.findAll('.ontario-columns');
			expect(columns.length).toEqual(3);
		});
	});
});
