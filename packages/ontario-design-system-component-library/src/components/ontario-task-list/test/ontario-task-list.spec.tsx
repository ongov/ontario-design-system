import { newSpecPage } from '@stencil/core/testing';
import { OntarioTaskList } from '../ontario-task-list';

describe('ontario-task', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioTaskList],
			html: `<ontario-task-list></ontario-task-list>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-task-list>
				<mock:shadow-root>
					<div class="ontario-task-list__container">
						<h2 class="ontario-task-list__heading"></h2>
						<p aria-live="polite" class="ontario-task-list__completion-text">
							You have completed&nbsp;0&nbsp;out of&nbsp;0&nbsp;tasks.
						</p>
						<div class="ontario-task-list" role="list">
							<slot></slot>
						</div>
					</div>
				</mock:shadow-root>
			</ontario-task-list>
		`);
	});
});
