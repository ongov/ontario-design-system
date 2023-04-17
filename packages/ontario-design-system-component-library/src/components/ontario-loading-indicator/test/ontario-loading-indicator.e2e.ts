import { newE2EPage } from '@stencil/core/testing';

describe('ontario-loading-indicator', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-loading-indicator></ontario-loading-indicator>');

		const element = await page.find('ontario-loading-indicator');
		expect(element).toHaveClass('hydrated');
	});
});
