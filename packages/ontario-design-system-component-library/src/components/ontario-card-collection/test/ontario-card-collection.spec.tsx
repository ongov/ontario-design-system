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
					<ul class="ontario-card-collection__container ontario-card-collecton--cards-per-row-3">
						<slot></slot>
					</ul>
        </mock:shadow-root>
      </ontario-card-collection>
    `);
	});
});
