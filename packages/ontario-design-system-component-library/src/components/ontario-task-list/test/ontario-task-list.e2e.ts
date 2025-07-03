import { newE2EPage } from '@stencil/core/testing';

describe('ontario-task-list component', () => {
	it('renders with default props', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task-list label="My Tasks"></ontario-task-list>');

		const element = await page.find('ontario-task-list');
		expect(element).toHaveClass('hydrated');

		const label = await page.find('ontario-task-list >>> .ontario-task-list__heading');
		expect(label.textContent).toBe('My Tasks');
	});

	it('updates label dynamically', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task-list label="Initial Tasks"></ontario-task-list>');

		let label = await page.find('ontario-task-list >>> .ontario-task-list__heading');
		expect(label.textContent).toBe('Initial Tasks');

		// Update the label prop
		const element = await page.find('ontario-task-list');
		element.setProperty('label', 'Updated Tasks');
		await page.waitForChanges();

		label = await page.find('ontario-task-list >>> .ontario-task-list__heading');
		expect(label.textContent).toBe('Updated Tasks');
	});
});
