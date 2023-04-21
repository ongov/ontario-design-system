import { newE2EPage } from '@stencil/core/testing';

describe('ontario-icon', () => {
	describe('render', () => {
		it('renders', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-icon-accessibility></ontario-icon-accessibility>');

			const component = await page.find('ontario-icon-accessibility');
			const element = await page.find('ontario-icon-accessibility >>> div');

			expect(component).toHaveClass('hydrated');
			expect(element).toHaveClass('ontario-icon');
		});
	});

	it('renders changes to the icon', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-icon-accessibility></ontario-icon-accessibility>');
		const component = await page.find('ontario-icon-accessibility');
		const element = await page.find('ontario-icon-accessibility >>> div');
		// const style = getComputedStyle(element)

		expect(element).toHaveClass('ontario-icon');

		component.setProperty('colour', 'white');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-icon', 'ontario-icon--white']);

		component.setProperty('colour', 'bluey');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-icon', 'ontario-icon--black']);

		component.setProperty('iconWidth', '24');
		component.setProperty('colour', 'grey');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-icon', 'ontario-icon--grey', 'ontario-icon--width-24']);

		component.setProperty('iconWidth', 'not a number');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-icon', 'ontario-icon--width-24']);
	});
});
