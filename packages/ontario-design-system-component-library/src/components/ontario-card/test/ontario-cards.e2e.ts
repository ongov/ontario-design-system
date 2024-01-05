import { newE2EPage } from '@stencil/core/testing';

describe('ontario-card', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-card></ontario-card>');

		const element = await page.find('ontario-card');
		expect(element).toHaveClass('hydrated');
	});
});
