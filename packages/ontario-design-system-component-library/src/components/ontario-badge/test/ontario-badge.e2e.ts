import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('ontario-badge', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-badge></ontario-badge>');
		const component = await page.find('ontario-badge');
		const element = await page.find('ontario-badge >>> span');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-badge', 'ontario-badge--default-heavy']);
	});

	describe('render prop changes', () => {
		let page: E2EPage;
		let component: E2EElement;
		let element: E2EElement;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-badge></ontario-badge>');
			component = await page.find('ontario-badge');
			element = await page.find('ontario-badge >>> span');
		});

		it('renders changes to the class names when the colour prop is changed', async () => {
			component.setProperty('colour', 'light-teal');
			await page.waitForChanges();

			expect(element).toHaveClasses(['ontario-badge', 'ontario-badge--default-light']);

			component.setProperty('colour', 'black');
			await page.waitForChanges();

			expect(element).toHaveClasses(['ontario-badge', 'ontario-badge--neutral-heavy']);
		});

		/*
		 * TODO: Haven't found an ideal way yet to test the aria-label-text property and how
		 * it should create an aria-label attribute on the element.
		 */
		// it('renders changes to the aria-label-text property', async () => {
		// component.setProperty('aria-label-text', 'This is aria label text.');
		// await page.waitForChanges();

		// expect(element.getAttribute("ariaLabel")).toBe("This is aria label text.");

		// expect(element).toHaveAttribute('aria-label');

		// let v = await page.$eval(element, (element: { hasAttribute: (arg0: string) => any; }) => element.hasAttribute("aria-label"))
		// expect(v).toBe(true);
		// let el: any;
		// let value = await page.evaluate(element => element ? element.getAttribute("aria-label") : null, el);
		// expect(value).toBe(true);

		// element.hasAttribute("aria-label").toBe(true);
		// expect(hasAriaLabelAttribute).toBe(true);
		// await page.evaluate(`${element}.getAttribute("data-Color")`)

		// expect(element.getAttribute('aria-label')).toBe('This is aria label text.');
		// });
	});

	describe('render text content changes', () => {
		let page: E2EPage;

		beforeEach(async () => {
			page = await newE2EPage();
		});

		it('renders changes to the component content when the host textContent is changed', async () => {
			await page.setContent('<ontario-badge>Not started</ontario-badge>');
			const element = await page.find('ontario-badge >>> span');

			expect(element).toEqualText('Not started');
		});

		it('renders changes to the component content when the label prop is changed', async () => {
			await page.setContent('<ontario-badge></ontario-badge>');
			const component = await page.find('ontario-badge');
			const element = await page.find('ontario-badge >>> span');

			component.setProperty('label', 'Completed');
			await page.waitForChanges();

			expect(element).toEqualText('Completed');

			component.setProperty('label', 'In progress');
			await page.waitForChanges();

			expect(element).toEqualText('In progress');
		});

		it('renders label content as priority even if host textContent is set', async () => {
			await page.setContent('<ontario-badge>Not started</ontario-badge>');
			const component = await page.find('ontario-badge');
			const element = await page.find('ontario-badge >>> span');

			component.setProperty('label', 'In progress');
			await page.waitForChanges();

			expect(element).toEqualText('In progress');
		});
	});
});
