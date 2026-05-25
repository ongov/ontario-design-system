import { newE2EPage } from '@stencil/core/testing';

describe('ontario-summary-list-item', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-summary-list-item></ontario-summary-list-item>');

		const element = await page.find('ontario-summary-list-item');
		expect(element).toHaveClass('hydrated');
	});
});
