import { newSpecPage } from '@stencil/core/testing';
import { OntarioCard } from '../ontario-card';

describe('ontario-card', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-card></ontario-card>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-card>
    `);
	});
});
