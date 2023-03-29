import { newE2EPage } from '@stencil/core/testing';

describe('ontario-critical-alert', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-critical-alert></ontario-critical-alert>');

		const element = await page.find('ontario-critical-alert');
		expect(element).toHaveClass('hydrated');
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-critical-alert></ontario-critical-alert>');
			component = await page.find('ontario-critical-alert');
			element = await page.find('ontario-critical-alert >>> div');
		});

		it('renders changes to the content property', async () => {
			component.setProperty('content', 'This is the critical alert content');
			await page.waitForChanges();
			expect(element).toHaveClass('ontario-critical-alert');
			expect(element.textContent).toContain('This is the critical alert content');
		});
	});
});
