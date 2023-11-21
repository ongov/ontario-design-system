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
					<ul class="
						ontario-card--cards-per-row-3
						ontario-card-type--basic
						ontario-card__container
					">
					</ul>
        </mock:shadow-root>
      </ontario-card>
    `);
	});
});
