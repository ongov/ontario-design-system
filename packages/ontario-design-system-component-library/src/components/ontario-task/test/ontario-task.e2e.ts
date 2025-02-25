import { newE2EPage } from '@stencil/core/testing';

describe('ontario-task', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task label="Task Label" task-id="task-1"></ontario-task>');

		const element = await page.find('ontario-task');
		expect(element).toHaveClass('hydrated');
	});

	it('renders with correct label', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task label="My Task" task-id="task-2"></ontario-task>');

		const label = await page.find('ontario-task >>> .ontario-task__label');
		expect(label).toEqualText('My Task');
	});

	it('applies the correct task status class', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task task-id="task-3" task-status="InProgress"></ontario-task>');

		const element = await page.find('ontario-task');
		const className = await element.getProperty('className');
		expect(className).toContain('ontario-task-status--in-progress');
	});

	it('displays the badge with the correct status', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-task task-id="task-4" task-status="Completed"></ontario-task>');

		const badge = await page.find('ontario-task >>> .ontario-task__badge');
		expect(badge).toBeTruthy();
		expect(badge).toEqualText('Completed');
	});

	it('does not render as a link when "deactivateLink" is true', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-task label="No Link" task-id="task-6" link="https://example.com" deactivate-link="true"></ontario-task>',
		);

		const link = await page.find('ontario-task >>> .ontario-task__link');
		expect(link).toBeNull();
	});

	it('renders hint text when "hintText" prop is provided', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-task label="Task with Hint" task-id="task-7" hint-text="This is a hint"></ontario-task>',
		);

		const hintText = await page.find('ontario-task >>> ontario-hint-text');
		expect(hintText).toBeTruthy();
		expect(hintText).toEqualText('This is a hint');
	});
});
