import { newSpecPage } from '@stencil/core/testing';
import { OntarioCriticalAlert } from '../ontario-critical-alert';

describe('ontario-critical-alert', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCriticalAlert],
			html: `<ontario-critical-alert content="This is the critical alert content"></ontario-critical-alert>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-critical-alert content="This is the critical alert content">
				<mock:shadow-root>
					<div class="ontario-critical-alert">
						<div class="ontario-row">
							<div class="ontario-column ontario-small-12">
								<div class="ontario-critical-alert__body">
									<div class="ontario-critical-alert__icon"></div>
									<p>
										This is the critical alert content
									</p>
								</div>
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</ontario-critical-alert>
    `);
	});
});
