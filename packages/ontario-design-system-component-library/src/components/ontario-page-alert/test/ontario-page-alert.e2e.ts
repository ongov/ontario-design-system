import { newE2EPage } from '@stencil/core/testing';

describe('ontario-page-alert', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-page-alert></ontario-page-alert>');

		const element = await page.find('ontario-page-alert');
		expect(element).toHaveClass('hydrated');
	});
});
