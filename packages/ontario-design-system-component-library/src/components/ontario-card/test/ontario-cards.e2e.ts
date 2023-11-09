import { newE2EPage } from '@stencil/core/testing';

describe('ontario-cards', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-cards></ontario-cards>');

		const element = await page.find('ontario-cards');
		expect(element).toHaveClass('hydrated');
	});
});
