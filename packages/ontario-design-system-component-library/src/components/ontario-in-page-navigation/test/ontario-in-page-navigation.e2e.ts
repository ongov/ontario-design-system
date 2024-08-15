import { newE2EPage } from '@stencil/core/testing';

describe('ontario-inpage-navigation', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-inpage-navigation></ontario-inpage-navigation>');

		const element = await page.find('ontario-inpage-navigation');
		expect(element).toHaveClass('hydrated');
	});
});
