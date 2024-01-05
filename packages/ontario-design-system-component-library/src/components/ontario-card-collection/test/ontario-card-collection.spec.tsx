import { newSpecPage } from '@stencil/core/testing';
import { OntarioCardCollection } from '../ontario-card-collection';

describe('ontario-card-collection', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCardCollection],
			html: `<ontario-card-collection></ontario-card-collection>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-card-collection>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-card-collection>
    `);
	});
});
