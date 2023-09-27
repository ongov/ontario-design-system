import { newE2EPage } from '@stencil/core/testing';

describe('ontario-accordion', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-accordion></ontario-accordion>');

		const element = await page.find('ontario-accordion');
		expect(element).toHaveClass('hydrated');
	});
});
