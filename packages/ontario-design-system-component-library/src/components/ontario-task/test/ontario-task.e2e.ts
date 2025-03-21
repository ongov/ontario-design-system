import { newE2EPage } from '@stencil/core/testing';

describe('ontario-task', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task></ontario-task>');

		const element = await page.find('ontario-task');
		expect(element).toHaveClass('hydrated');
	});
});
