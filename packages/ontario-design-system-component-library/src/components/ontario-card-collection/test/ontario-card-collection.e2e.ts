import { newE2EPage } from '@stencil/core/testing';

describe('ontario-card-collection', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-card-collection></ontario-card-collection>');

		const element = await page.find('ontario-card-collection');
		expect(element).toHaveClass('hydrated');
	});
});
