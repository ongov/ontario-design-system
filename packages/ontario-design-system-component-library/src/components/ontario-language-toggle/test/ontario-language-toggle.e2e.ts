import { newE2EPage } from '@stencil/core/testing';

describe('ontario-language-toggle', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-language-toggle></ontario-language-toggle>');

		const element = await page.find('ontario-language-toggle');
		expect(element).toHaveClass('hydrated');
	});

	it('should render the small language toggler class when the size property is set to `small`', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-language-toggle size="small"></ontario-language-toggle>');

		const toggler = await page.find('ontario-language-toggle >>> a');
		expect(toggler).toHaveClasses(['ontario-language-toggler', 'ontario-language-toggler--small']);
	});

	it('should render the default language toggler class when the size property is set to `default`', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-language-toggle size="default"></ontario-language-toggle>');

		const toggler = await page.find('ontario-language-toggle >>> a');
		expect(toggler).toHaveClasses(['ontario-language-toggler', 'ontario-language-toggler--default']);
	});

	it('renders changes to the language property', async () => {
		let page = await newE2EPage();
		await page.setContent('<ontario-language-toggle></ontario-language-toggle>');
		let component = await page.find('ontario-language-toggle');
		let element = await page.find('ontario-language-toggle >>> a');

		component.setProperty('language', 'fr');
		await page.waitForChanges();

		expect(element.textContent).toEqual('ENEnglish');
	});

	it('should toggle the language when clicked', async () => {
		let page = await newE2EPage();
		await page.setContent('<ontario-language-toggle></ontario-language-toggle>');
		let component = await page.find('ontario-language-toggle');

		// Test the initial state
		const initialLanguagePromise = component.getProperty('language');
		const initialLanguage = await initialLanguagePromise;
		expect(initialLanguage).toBe('en');

		// Click on the toggle button
		await component.click();

		// Wait for the toggle event to propagate
		await page.waitForChanges();

		// Test the toggled state
		const toggledLanguagePromise = component.getProperty('language');
		const toggledLanguage = await toggledLanguagePromise;
		expect(toggledLanguage).toBe('fr');
	});

	describe('events/methods', () => {
		it('fires the headerLanguageToggled event when clicked', async () => {
			let page = await newE2EPage();
			await page.setContent('<ontario-language-toggle></ontario-language-toggle>');
			let component = await page.find('ontario-language-toggle');

			const clickEvent = await page.spyOnEvent('headerLanguageToggled');
			component.click();
			await page.waitForChanges();

			expect(clickEvent).toHaveReceivedEventTimes(1);
		});
	});
});
