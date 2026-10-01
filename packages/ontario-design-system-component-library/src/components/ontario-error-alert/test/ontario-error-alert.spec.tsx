import { newSpecPage } from '@stencil/core/testing';
import { OntarioErrorAlert } from '../ontario-error-alert';

describe('ontario-error-alert', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioErrorAlert],
			html: `<ontario-error-alert></ontario-error-alert>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-error-alert>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-error-alert>
    `);
	});
});
