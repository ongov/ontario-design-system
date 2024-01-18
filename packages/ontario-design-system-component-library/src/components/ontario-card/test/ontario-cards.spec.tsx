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
					<li class="ontario-card ontario-card__card-type--basic ontario-card__header-type--default">
						<div class="ontario-card__text-container">
							<h2 class="ontario-card__heading">
								<a href="#"></a>
							</h2>
						</div>
					</li>
				</mock:shadow-root>
      </ontario-card>
    `);
	});
});
