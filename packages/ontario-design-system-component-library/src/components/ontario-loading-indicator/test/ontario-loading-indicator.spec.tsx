import { render } from '@stencil/vitest';

describe('ontario-loading-indicator', () => {
	it('should render the expected html', async () => {
		const page = await render(`<ontario-loading-indicator></ontario-loading-indicator>`);

		expect(page.root).toMatchSnapshot();
	});

	it('renders', async () => {
		const page = await render(`<ontario-loading-indicator></ontario-loading-indicator>`);
		expect(page.root).toEqualHtml(`
<ontario-loading-indicator class="hydrated">
  <mock:shadow-root>
    <div class="ontario-loading-indicator__overlay" aria-hidden="true" role="alert" aria-live="assertive">
      <div class="ontario-loading-indicator">
        <svg class="ontario-loading-indicator__spinner" viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
        </svg>
        <p>
          Loading
        </p>
      </div>
    </div>
  </mock:shadow-root>
</ontario-loading-indicator>
`);
	});
});
