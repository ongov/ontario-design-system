import { render } from '@stencil/vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

it('should render a default button', async () => {
	const page = await render(`<ontario-button>Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Element Content" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        <slot></slot>
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  Element Content
</ontario-button>
`);
});

it('should render a primary submit button', async () => {
	const page = await render(`<ontario-button type="primary" html-type="submit">Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button type="primary" html-type="submit" class="hydrated">
  <mock:shadow-root>
    <button type="submit" class="ontario-button ontario-button--primary" aria-label="Element Content" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        <slot></slot>
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  Element Content
</ontario-button>
`);
});

it('should render a default button with label overriding the element content', async () => {
	const page = await render(`<ontario-button label="Label">Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button label="Label" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Label" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        Label
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  Element Content
</ontario-button>
`);
});

it('should render a default button with the aria-label-text attribute being overwritten', async () => {
	const page = await render(`<ontario-button aria-label-text="Aria Label">Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button aria-label-text="Aria Label" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Aria Label" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        <slot></slot>
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  Element Content
</ontario-button>
`);
});

it('should render a default button with an id being explicity specified', async () => {
	const page = await render(`<ontario-button element-id="DefaultButton">Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button element-id="DefaultButton" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Element Content" id="DefaultButton">
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        <slot></slot>
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  Element Content
</ontario-button>
`);
});

it('should render as a link when href is provided', async () => {
	const page = await render(
		`<ontario-button href="/services" target="_blank" rel="noreferrer">Browse services</ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button href="/services" target="_blank" rel="noreferrer" class="hydrated">
  <mock:shadow-root>
    <a href="/services" target="_blank" rel="noreferrer" class="ontario-button ontario-button--secondary" aria-label="Browse services" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        <slot></slot>
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </a>
  </mock:shadow-root>
  Browse services
</ontario-button>
`);
});

it('should ignore submit htmlType when rendering as a link', async () => {
	const page = await render(
		`<ontario-button href="/services" html-type="submit" type="primary">Browse services</ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button href="/services" html-type="submit" type="primary" class="hydrated">
  <mock:shadow-root>
    <a href="/services" class="ontario-button ontario-button--primary" aria-label="Browse services" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        <slot></slot>
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </a>
  </mock:shadow-root>
  Browse services
</ontario-button>
`);
});

describe('accessible name validation', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('should warn about aria-label-text when there is no label and no aria-label-text', async () => {
		await render(`<ontario-button></ontario-button>`);

		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy.mock.calls[0][0]).toContain('aria-label-text');
	});

	it('should not warn when a label is provided', async () => {
		await render(`<ontario-button label="Save"></ontario-button>`);

		expect(warnSpy).not.toHaveBeenCalled();
	});

	it('should not warn when the element content gives the button its label', async () => {
		await render(`<ontario-button>Save</ontario-button>`);

		expect(warnSpy).not.toHaveBeenCalled();
	});

	it('should not warn when there is no label but aria-label-text is provided', async () => {
		await render(
			`<ontario-button aria-label-text="Open map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2z"/></svg></ontario-button>`,
		);

		expect(warnSpy).not.toHaveBeenCalled();
	});
});
