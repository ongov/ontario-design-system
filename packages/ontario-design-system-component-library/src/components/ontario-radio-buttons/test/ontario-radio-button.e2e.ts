import { newE2EPage } from '@stencil/core/testing';

describe('ontario-radio-buttons', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-radio-buttons></ontario-radio-buttons>');

		const element = await page.find('ontario-radio-buttons');
		expect(element).toHaveClass('hydrated');
	});
});
