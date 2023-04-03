import { newE2EPage } from '@stencil/core/testing';

describe('ontario-callout', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-callout></ontario-callout>');

		const element = await page.find('ontario-callout');
		expect(element).toHaveClass('hydrated');
	});
});
