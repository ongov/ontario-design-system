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
									<div class="ontario-critical-alert__icon">
										<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="white"></path>
											<rect fill="black" height="4" width="2" x="11" y="10"></rect>
											<rect fill="black" height="2" width="2" x="11" y="16"></rect>
										</svg>
									</div>
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
