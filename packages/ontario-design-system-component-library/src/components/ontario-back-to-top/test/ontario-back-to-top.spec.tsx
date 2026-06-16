import { render } from '@stencil/vitest';

describe('ontario-back-to-top', () => {
	it('should render the expected html', async () => {
		const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

		expect(page.root).toMatchSnapshot();
	});

	it('renders', async () => {
		const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);
		expect(page.root).toEqualHtml(`
<ontario-back-to-top class="hydrated">
  <mock:shadow-root>
    <button class="ontario-back-to-top" aria-label="Scroll back to the top">
      <span aria-hidden="true">
        <svg class="ontario-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
        </svg>
      </span>
      Top
    </button>
  </mock:shadow-root>
</ontario-back-to-top>
`);
	});
});
