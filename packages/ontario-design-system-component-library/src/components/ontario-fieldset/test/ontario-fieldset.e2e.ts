import { newE2EPage } from '@stencil/core/testing';

describe('ontario-fieldset', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-fieldset></ontario-fieldset>');

		const element = await page.find('ontario-fieldset');
		expect(element).toHaveClass('hydrated');
	});
});
