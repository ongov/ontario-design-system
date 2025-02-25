import { newE2EPage } from '@stencil/core/testing';

describe('ontario-aside', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-aside></ontario-aside>');
		const component = await page.find('ontario-aside');
		const element = await page.find('ontario-aside >>> aside');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-aside', 'ontario-border-highlight--teal']);
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-aside></ontario-aside>');
			component = await page.find('ontario-aside');
			element = await page.find('ontario-aside >>> aside');
		});

		it('renders changes to the headingType property', async () => {
			component.setProperty('headingType', 'h3');
			await page.waitForChanges();

			expect(element.firstChild.nodeName).toBe('SLOT');

			component.setProperty('headingType', 'h4');
			await page.waitForChanges();
			expect(element.firstChild.nodeName).toBe('SLOT');
		});

		it('renders changes to the class names when the highlightColor is changed', async () => {
			component.setProperty('highlightColour', 'gold');
			await page.waitForChanges();

			expect(element).toHaveClasses(['ontario-aside', 'ontario-border-highlight--gold']);

			component.setProperty('highlightColour', 'lime');
			await page.waitForChanges();

			expect(element).toHaveClasses(['ontario-aside', 'ontario-border-highlight--lime']);
		});

		it('renders changes to the HTML through the headingContentType property', async () => {
			component.setProperty('headingContentType', 'string');
			component.setProperty('headingContent', 'Quick fact:');
			await page.waitForChanges();

			const heading = await page.find('ontario-aside >>> h2');

			expect(heading).toEqualHtml('<h2 class="ontario-aside__title ontario-h5">Quick fact:</h2>');

			component.setProperty('headingContentType', 'html');
			component.setProperty('headingContent', '<a href="#">Quick fact:</a>');
			await page.waitForChanges();

			expect(heading).toEqualHtml('<h2 class="ontario-aside__title ontario-h5"><a href="#">Quick fact:</a></h2>');
		});
	});
});
