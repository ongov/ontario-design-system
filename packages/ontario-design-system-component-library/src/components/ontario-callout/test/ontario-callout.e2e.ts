import { newE2EPage } from '@stencil/core/testing';

describe('ontario-callout', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-callout></ontario-callout>');
		const component = await page.find('ontario-callout');
		const element = await page.find('ontario-callout >>> div');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-callout', 'ontario-border-highlight--teal']);
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-callout></ontario-callout>');
			component = await page.find('ontario-callout');
			element = await page.find('ontario-callout >>> div');
		});

		it('renders changes to the headingType property', async () => {
			component.setProperty('headingType', 'h3');
			await page.waitForChanges();

			expect(element.firstChild.nodeName).toBe('H3');

			component.setProperty('headingType', 'h4');
			await page.waitForChanges();
			expect(element.firstChild.nodeName).toBe('H4');
		});

		it('renders changes to the class names when the highlightColor is changed', async () => {
			component.setProperty('highlightColour', 'gold');
			await page.waitForChanges();

			expect(element).toHaveClasses(['ontario-callout', 'ontario-border-highlight--gold']);

			component.setProperty('highlightColour', 'lime');
			await page.waitForChanges();

			expect(element).toHaveClasses(['ontario-callout', 'ontario-border-highlight--lime']);
		});

		it('renders changes to the HTML through the headingContentType property', async () => {
			component.setProperty('headingContentType', 'string');
			component.setProperty('headingContent', 'Get notified');
			await page.waitForChanges();

			const heading = await page.find('ontario-callout >>> h2');

			expect(heading).toEqualHtml('<h2 class="ontario-callout__title ontario-h5">Get notified</h2>');

			component.setProperty('headingContentType', 'html');
			component.setProperty('headingContent', '<a href="#">Get notified</a>');
			await page.waitForChanges();

			expect(heading).toEqualHtml('<h2 class="ontario-callout__title ontario-h5"><a href="#">Get notified</a></h2>');
		});
	});
});
