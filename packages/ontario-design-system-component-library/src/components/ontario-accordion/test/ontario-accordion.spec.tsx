import { newSpecPage } from '@stencil/core/testing';
import { OntarioAccordion } from '../ontario-accordion';

describe('ontario-accordion', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioAccordion],
			html: `<ontario-accordion></ontario-accordion>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-accordion>
    `);
	});
});
