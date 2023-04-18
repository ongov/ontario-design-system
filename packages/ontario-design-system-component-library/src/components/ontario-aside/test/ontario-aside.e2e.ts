import { newE2EPage } from '@stencil/core/testing';

describe('ontario-aside', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-aside></ontario-aside>');

		const element = await page.find('ontario-aside');
		expect(element).toHaveClass('hydrated');
	});
});
