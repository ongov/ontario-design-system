import { newE2EPage } from '@stencil/core/testing';

describe('ontario-in-page-navigation', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-in-page-navigation></ontario-in-page-navigation>');

		const element = await page.find('ontario-in-page-navigation');
		expect(element).toHaveClass('hydrated');
	});
});
