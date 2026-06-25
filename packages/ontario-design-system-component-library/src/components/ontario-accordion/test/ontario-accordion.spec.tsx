import { render } from '@stencil/vitest';

describe('ontario-accordion', () => {
	it('renders', async () => {
		const page = await render(`<ontario-accordion></ontario-accordion>`);
		expect(page.root).toEqualHtml(`
<ontario-accordion class="hydrated">
  <mock:shadow-root>
    <div>
      <h2></h2>
      <div class="ontario-accordions__container">
        <div class="ontario-accordion__controls">
          <button class="ontario-accordion__button--expand-all" aria-expanded="true">
            <span class="ontario-accordion--expand-open-all">
              <div>
                Collapse all
              </div>
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
