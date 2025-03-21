import { newSpecPage } from '@stencil/core/testing';
import { OntarioTask } from '../ontario-task';

describe('ontario-task', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioTask],
			html: `<ontario-task></ontario-task>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-task>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-task>
    `);
	});
});
