import { newSpecPage } from '@stencil/core/testing';
import { OntarioTaskList } from '../ontario-task-list';

describe('ontario-task-list', () => {
	beforeAll(() => {
		global.MutationObserver = class {
			constructor(callback: any) {
				(this as any).callback = callback;
			}
			observe(_target: any, _options: any) {}
			disconnect() {}
			takeRecords() {
				return [];
			}
		} as any;
	});

	it('renders with a label and updates when the label changes', async () => {
		const page = await newSpecPage({
			components: [OntarioTaskList],
			html: `<ontario-task-list label="My Task List"></ontario-task-list>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		const heading = page.root.shadowRoot?.querySelector('.ontario-task-list__heading');
		if (!heading) {
			throw new Error('Heading element not found in shadowRoot.');
		}

		expect(heading.textContent).toBe('My Task List');

		// Update the label prop
		page.root.setAttribute('label', 'Updated Task List');
		await page.waitForChanges();

		expect(heading.textContent).toBe('Updated Task List');
	});

	it('handles language changes and updates translations', async () => {
		const page = await newSpecPage({
			components: [OntarioTaskList],
			html: `<ontario-task-list language="en"></ontario-task-list>`,
		});

		if (!page.root) {
			throw new Error('Component did not render properly.');
		}

		// Verify initial language
		let completionText = page.root.shadowRoot?.querySelector('.ontario-task-list__completion-text')?.textContent;
		if (!completionText) {
			throw new Error('Completion text element not found in shadowRoot.');
		}
		expect(completionText).toBe('You have completed 0 out of 0 tasks.');

		// Change language to French
		page.root.setAttribute('language', 'fr');
		await page.waitForChanges();

		// Verify updated translation
		completionText = page.root.shadowRoot?.querySelector('.ontario-task-list__completion-text')?.textContent;
		expect(completionText).toBe('Vous avez complété 0 sur 0 tâches.');
	});
});
