import { newSpecPage } from '@stencil/core/testing';
import { OntarioCards } from '../ontario-card';

describe('ontario-cards', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCards],
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
