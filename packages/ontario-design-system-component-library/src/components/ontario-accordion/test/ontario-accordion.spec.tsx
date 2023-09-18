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
					<div>
						<h2></h2>
						<div class="ontario-accordions__container">
							<div class="ontario-accordion__controls">
								<button aria-expanded="true" class="ontario-accordion__button--expand-all">
									<span class="ontario-accordion--expand-open-all">
										<div>Collapse all</div>
									</span>
								</button>
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</ontario-accordion>
    `);
	});
});
