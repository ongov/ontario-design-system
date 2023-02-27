import { newSpecPage } from '@stencil/core/testing';
import { OntarioBackToTop } from '../ontario-back-to-top';

describe('ontario-back-to-top', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioBackToTop],
			html: `<ontario-back-to-top></ontario-back-to-top>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-back-to-top>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-back-to-top>
    `);
	});
});
