import { newSpecPage } from '@stencil/core/testing';
import { OntarioCriticalAlert } from '../ontario-critical-alert';

describe('ontario-critical-alert', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCriticalAlert],
			html: `<ontario-critical-alert></ontario-critical-alert>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-critical-alert>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-critical-alert>
    `);
	});
});
