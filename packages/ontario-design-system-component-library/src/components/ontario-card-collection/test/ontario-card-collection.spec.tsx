import { render } from '@stencil/vitest';

describe('ontario-card-collection', () => {
	it('renders', async () => {
		const page = await render(`<ontario-card-collection></ontario-card-collection>`);
		expect(page.root).toEqualHtml(`
<ontario-card-collection class="hydrated">
  <mock:shadow-root>
    <ul class="ontario-card-collection__container ontario-card-collecton--cards-per-row-3">
      <slot></slot>
    </ul>
  </mock:shadow-root>
</ontario-card-collection>
`);
	});
});
