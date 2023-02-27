import { newE2EPage } from '@stencil/core/testing';

describe('ontario-back-to-top', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-back-to-top></ontario-back-to-top>');

		const element = await page.find('ontario-back-to-top');
		expect(element).toHaveClass('hydrated');
	});
});
