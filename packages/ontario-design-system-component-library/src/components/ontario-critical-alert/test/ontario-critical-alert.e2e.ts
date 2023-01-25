import { newE2EPage } from '@stencil/core/testing';

describe('ontario-critical-alert', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-critical-alert></ontario-critical-alert>');

		const element = await page.find('ontario-critical-alert');
		expect(element).toHaveClass('hydrated');
	});
});
