import { newSpecPage } from '@stencil/core/testing';
import { OntarioStepIndicator } from '../ontario-step-indicator';

describe('ontario-step-indicator', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioStepIndicator],
			html: `<ontario-step-indicator></ontario-step-indicator>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-step-indicator>
				<mock:shadow-root>
					<div class="ontario-row">
						<div class="class="ontario-columns ontario-small-12">
							<div class="ontario-step-indicator--with-back-button--false">
								<span class="ontario-h4">
									Step &nbsp; of &nbsp;
								</span>
							</div>
						</div>
					</div>
				</mock:shadow-root>
			</ontario-step-indicator>
    `);
	});

	it('it should render back button with a link', async () => {
		const page = await newSpecPage({
			components: [OntarioStepIndicator],
			html: `<ontario-step-indicator show-back-button="true"
			back-button-url="https://designsystem.ontario.ca/"></ontario-step-indicator>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-step-indicator>
        <mock:shadow-root>
          <div class="ontario-row">
						<div class="class="ontario-columns ontario-small-12">
							<div class="ontario-step-indicator--with-back-button--true">
								<a class="ontario-button ontario-button--tertiary" href="https://designsystem.ontario.ca/">
									<ontario-icon-chevron-left colour="blue"></ontario-icon-chevron-left>
									Step &nbsp; of &nbsp;
								</a>
							</div>
						</div>
					</div>
        </mock:shadow-root>
      </ontario-step-indicator>
    `);
	});

	it('it should render steps', async () => {
		const page = await newSpecPage({
			components: [OntarioStepIndicator],
			html: `<ontario-step-indicator current-step="2" number-of-steps="10"></ontario-step-indicator>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-step-indicator>
        <mock:shadow-root>
          <div class="ontario-row">
						<div class="class="ontario-columns ontario-small-12">
							<span class="ontario-h4">
								Step 2 of 10
							</span>
						</div>
					</div>
        </mock:shadow-root>
      </ontario-step-indicator>
    `);
	});

	it('it should render percentage', async () => {
		const page = await newSpecPage({
			components: [OntarioStepIndicator],
			html: `<ontario-step-indicator percentage-complete="70"></ontario-step-indicator>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-step-indicator>
        <mock:shadow-root>
          <div class="ontario-row">
						<div class="class="ontario-columns ontario-small-12">
							<span class="ontario-h4">
								70% Complete
							</span>
						</div>
					</div>
        </mock:shadow-root>
      </ontario-step-indicator>
    `);
	});
});
