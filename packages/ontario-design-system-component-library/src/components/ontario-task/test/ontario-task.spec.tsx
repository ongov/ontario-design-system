import { newSpecPage } from '@stencil/core/testing';
import { OntarioTask } from '../ontario-task';

describe('ontario-task', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task task-status="notStarted" task-id="task-1"></ontario-task>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-task data-task-status="notStarted" task-id="task-1" task-status="notStarted">
				<mock:shadow-root>
				  <article aria-describedby="default-hint-id" aria-labelledby="task-label--task-1" class="ontario-task ontario-task-status--not-started" data-task-status="notStarted" role="group">
						<div>
							<div class="ontario-task__content">
								<h3 class="ontario-task__label" id="task-label--task-1"></h3>
								<ontario-badge aria-label="Task Status: Not Started (notStarted)" class="ontario-task__badge" colour="lightTeal" role="status">
									Not Started
								</ontario-badge>
							</div>
						</div>
					</article>
				</mock:shadow-root>
			</ontario-task>
		`);
	});
});
