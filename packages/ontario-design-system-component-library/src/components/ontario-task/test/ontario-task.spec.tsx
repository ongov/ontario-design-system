import { newSpecPage } from '@stencil/core/testing';
import { OntarioTask } from '../ontario-task';

describe('ontario-task', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task></ontario-task>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-task data-task-status="Not Started">
				<mock:shadow-root>
					<article aria-describedby="default-hint-id" aria-labelledby="task-label" class="ontario-task" role="group">
						<div>
							<div class="ontario-task__content">
								<h3 class="ontario-task__label" id="task-label"></h3>
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
