import { newE2EPage } from '@stencil/core/testing';

describe('ontario-form-container)', () => {
	it('renders with the default gap', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-form-container></ontario-form-container>');

		const div = await page.find('ontario-form-container >>> div');
		expect(div).toHaveClass('ontario-form-container--gap-40');
	});

	it('renders with the condensed gap', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-form-container gap="condensed"></ontario-form-container>');

		const div = await page.find('ontario-form-container >>> div');
		expect(div).toHaveClass('ontario-form-container--gap-16');
	});
});
