import { render } from '@stencil/vitest';

describe('ontario-accordion', () => {
	it('prints an error when accordionData cannot be parsed', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		await render(`<ontario-accordion accordion-data="not json"></ontario-accordion>`);

		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy.mock.calls[0][0]).toContain('%c accordionData %cfor%c <ontario-accordion> %ccould not be parsed.');

		warnSpy.mockRestore();
		errorSpy.mockRestore();
	});

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
