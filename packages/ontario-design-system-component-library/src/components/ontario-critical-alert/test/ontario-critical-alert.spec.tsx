import { render } from '@stencil/vitest';

describe('ontario-critical-alert', () => {
	it('renders', async () => {
		const page = await render(
			`<ontario-critical-alert content="This is the critical alert content"></ontario-critical-alert>`,
		);
		expect(page.root).toEqualHtml(`
<ontario-critical-alert content="This is the critical alert content" class="hydrated">
  <mock:shadow-root>
    <div class="ontario-critical-alert">
      <div class="ontario-row">
        <div class="ontario-column ontario-small-12">
          <div class="ontario-critical-alert__body">
            <div class="ontario-critical-alert__icon" aria-hidden="true">
              <svg class="svg-icon" role="img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="white"></path>
                <rect x="11" y="10" width="2" height="4" fill="black"></rect>
                <rect x="11" y="16" width="2" height="2" fill="black"></rect>
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

	it('should render a critical alert component with the content property overriding the element content', async () => {
		const page = await render(
			`<ontario-critical-alert content="I am the critical alert content that will display">Critical alert content</ontario-critical-alert>`,
		);
		expect(page.root).toEqualHtml(`
<ontario-critical-alert content="I am the critical alert content that will display" class="hydrated">
  <mock:shadow-root>
    <div class="ontario-critical-alert">
      <div class="ontario-row">
        <div class="ontario-column ontario-small-12">
          <div class="ontario-critical-alert__body">
            <div class="ontario-critical-alert__icon" aria-hidden="true">
              <svg class="svg-icon" role="img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="white"></path>
                <rect x="11" y="10" width="2" height="4" fill="black"></rect>
                <rect x="11" y="16" width="2" height="2" fill="black"></rect>
              </svg>
            </div>
            <p>
              I am the critical alert content that will display
            </p>
          </div>
        </div>
      </div>
    </div>
  </mock:shadow-root>
  Critical alert content
</ontario-critical-alert>
`);
	});
});
