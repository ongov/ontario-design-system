import { newSpecPage } from '@stencil/core/testing';
import { OntarioTask } from '../ontario-task';

describe('ontario-task', () => {
	it('renders with default props', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task task-status="notStarted" task-id="task-1"></ontario-task>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		expect(page.root).toEqualHtml(`
					<ontario-task data-task-status="notStarted" task-id="task-1" task-status="notStarted">
							<mock:shadow-root>
								<li aria-labelledby="task-label--task-1" class="ontario-task ontario-task-status--not-started" data-task-status="notStarted" role="group">
											<div>
													<div class="ontario-task__content">
															<h3 class="ontario-task__label" id="task-label--task-1"></h3>
															<ontario-badge aria-label="Task Status: Not Started (notStarted)" class="ontario-task__badge" colour="lightTeal" role="status">
																	Not Started
															</ontario-badge>
													</div>
											</div>
									</li>
							</mock:shadow-root>
					</ontario-task>
			`);
	});

	it('renders with a custom label', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task task-status="inProgress" task-id="task-2" label="Task 2"></ontario-task>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		expect(page.root.shadowRoot?.querySelector('.ontario-task__label')?.textContent).toBe('Task 2');
	});

	it('renders with a different task status', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task task-status="completed" task-id="task-3"></ontario-task>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		const badge = page.root.shadowRoot?.querySelector('ontario-badge');
		expect(badge?.getAttribute('aria-label')).toBe('Task Status: Completed (completed)');
		expect(badge?.getAttribute('colour')).toBe('white');
		expect(badge?.textContent).toBe('Completed');
	});

	it('updates when task status changes', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task task-status="notStarted" task-id="task-4"></ontario-task>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		const badge = page.root.shadowRoot?.querySelector('ontario-badge');
		expect(badge?.textContent).toBe('Not Started');

		// Update the task status
		page.root.setAttribute('task-status', 'inProgress');
		await page.waitForChanges();

		expect(badge?.getAttribute('aria-label')).toBe('Task Status: In Progress (inProgress)');
		expect(badge?.textContent).toBe('In Progress');
	});

	it('renders with accessibility attributes', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task task-status="notStarted" task-id="task-5" label="Accessible Task"></ontario-task>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		const listItem = page.root.shadowRoot?.querySelector('li');
		expect(listItem?.getAttribute('role')).toBe('group');
		expect(listItem?.getAttribute('aria-labelledby')).toBe('task-label--task-5');
	});
});
