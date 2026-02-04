import { newE2EPage } from '@stencil/core/testing';

describe('sample-button', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<sample-button></sample-button>');

		const element = await page.find('sample-button');
		expect(element).toHaveClass('hydrated');
	});
});
