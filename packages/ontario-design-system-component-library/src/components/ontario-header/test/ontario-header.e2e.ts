import { newE2EPage } from '@stencil/core/testing';

describe('ontario-header', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-header></ontario-header>');

		const element = await page.find('ontario-header');
		expect(element).toHaveClass('hydrated');
	});
});
