import { newSpecPage } from '@stencil/core/testing';
import { OntarioTaskList } from '../ontario-task-list';

describe('ontario-task-list', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioTaskList],
			html: `<ontario-task-list></ontario-task-list>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-task-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-task-list>
    `);
	});
});
