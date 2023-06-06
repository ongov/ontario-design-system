import { newE2EPage } from '@stencil/core/testing';

describe('ontario-step-indicator', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-step-indicator></ontario-step-indicator>');

		const element = await page.find('ontario-step-indicator');
		expect(element).toHaveClass('hydrated');
	});
});
