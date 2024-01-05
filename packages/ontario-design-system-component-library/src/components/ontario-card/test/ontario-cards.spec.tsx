import { newSpecPage } from '@stencil/core/testing';
import { OntarioCard } from '../ontario-card';

describe('ontario-cards', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-cards></ontario-cards>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-cards>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-cards>
    `);
	});
});
