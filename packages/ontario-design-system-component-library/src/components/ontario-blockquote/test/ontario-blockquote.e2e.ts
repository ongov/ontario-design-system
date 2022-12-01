import { newE2EPage } from '@stencil/core/testing';

describe('ontario-blockquote', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-blockquote></ontario-blockquote>');
		const component = await page.find('ontario-blockquote');
		const element = await page.find('ontario-blockquote >>> blockquote');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClass('ontario-blockquote');
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-blockquote></ontario-blockquote>');
			component = await page.find('ontario-blockquote');
			element = await page.find('ontario-blockquote >>> blockquote');
		});

		it('renders changes to the quote property', async () => {
			component.setProperty('quote', 'This is the quote');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-blockquote', 'ontario-blockquote--short']);
			expect(element.textContent).toContain('This is the quote');

			// set a longer quote and test that the short class does not exist
			component.setProperty(
				'quote',
				'When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one that has opened for us.',
			);
			await page.waitForChanges();
			expect(element).toHaveClass('ontario-blockquote');
			expect(element).not.toHaveClass('ontario-blockquote--short');
		});

		it('renders changes to the attribution property', async () => {
			component.setProperty('attribution', 'Homer Simpson');
			await page.waitForChanges();
			expect(element).toHaveClass('ontario-blockquote');
			expect(element.textContent).toContain('Homer Simpson');
		});

		it('renders changes to the byline property', async () => {
			component.setProperty('byline', 'Ontario Digital Service');
			await page.waitForChanges();
			expect(element).toHaveClass('ontario-blockquote');
			expect(element.textContent).toContain('Ontario Digital Service');
		});
	});

	describe('render CSS classes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-blockquote></ontario-blockquote>');
			component = await page.find('ontario-blockquote');
			element = await page.find('ontario-blockquote >>> blockquote');
		});

		it('should render only the `ontario-blockquote` class when the count of the quote prop is over 140 characters', async () => {
			component.setProperty(
				'quote',
				'I saw this movie about a bus that had to speed around a city, keeping its speed over fifty, and if its speed dropped, it would explode! I think it was called, "The Bus That Couldn’t Slow Down".',
			);
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-blockquote']);
		});

		it('should render both the `ontario-blockquote` and `ontario-blockquote--short` classes when the count of the quote prop is under 140 characters', async () => {
			component.setProperty('quote', 'This is an example of a short quote');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-blockquote', 'ontario-blockquote--short']);
		});
	});
});
