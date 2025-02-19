import { newE2EPage } from '@stencil/core/testing';

describe('ontario-vertical-form-spacing)', () => {
	it('renders with default spacing', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-vertical-form-spacing></ontario-vertical-form-spacing>');

		const div = await page.find('ontario-vertical-form-spacing >>> div');
		expect(div).toHaveClass('ontario-vertical-form-spacing--40');
	});

	it('renders with condensed spacing', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-vertical-form-spacing spacing="condensed"></ontario-vertical-form-spacing>');

		const div = await page.find('ontario-vertical-form-spacing >>> div');
		expect(div).toHaveClass('ontario-vertical-form-spacing--16');
	});
});
