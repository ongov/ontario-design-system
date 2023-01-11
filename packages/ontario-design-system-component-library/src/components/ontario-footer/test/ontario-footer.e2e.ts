import { newE2EPage } from '@stencil/core/testing';

describe('ontario-footer', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-footer></ontario-footer>');

		const element = await page.find('ontario-footer');
		expect(element).toHaveClass('hydrated');
	});
});
