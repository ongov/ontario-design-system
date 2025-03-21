import { newE2EPage } from '@stencil/core/testing';

describe('ontario-task-list', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task-list></ontario-task-list>');

		const element = await page.find('ontario-task-list');
		expect(element).toHaveClass('hydrated');
	});
});
