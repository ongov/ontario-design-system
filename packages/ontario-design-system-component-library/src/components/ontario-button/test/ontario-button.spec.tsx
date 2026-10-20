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

it('should render an icon-only button when default-slotted with element content and no label/text', async () => {
	const page = await render(
		`<ontario-button aria-label-text="Open map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button aria-label-text="Open map" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary ontario-button--icon-only" aria-label="Open map" id>
      <slot></slot>
    </button>
  </mock:shadow-root>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path></svg>
</ontario-button>
`);
});

it('should still render as icon-only when the slotted SVG has its own accessible title', async () => {
	const page = await render(
		`<ontario-button aria-label-text="Open map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Open map</title><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></ontario-button>`,
	);
	const button = page.root?.shadowRoot?.querySelector('button');
	expect(button?.className).toBe('ontario-button ontario-button--secondary ontario-button--icon-only');
});

it('should ignore comment nodes when detecting icon-only mode', async () => {
	const page = await render(
		`<ontario-button aria-label-text="Open map"><!-- marker --><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button aria-label-text="Open map" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary ontario-button--icon-only" aria-label="Open map" id>
      <slot></slot>
    </button>
  </mock:shadow-root>
  <!-- marker -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path></svg>
</ontario-button>
`);
});

it('should render a leading icon slot alongside a label', async () => {
	const page = await render(
		`<ontario-button label="Save"><svg slot="leading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7"/></svg></ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button label="Save" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary ontario-button--icons-1" aria-label="Save" id>
      <span class="ontario-button__icon-slot">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        Save
      </span>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  <svg slot="leading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7"></path></svg>
</ontario-button>
`);
});

it('should render a trailing icon slot alongside a label', async () => {
	const page = await render(
		`<ontario-button label="Next"><svg slot="trailing-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6"/></svg></ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button label="Next" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary ontario-button--icons-1" aria-label="Next" id>
      <span class="ontario-button__icon-slot ontario-button__icon-slot--empty">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        Next
      </span>
      <span class="ontario-button__icon-slot">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  <svg slot="trailing-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6"></path></svg>
</ontario-button>
`);
});

it('should render both leading and trailing icon slots alongside a label', async () => {
	const page = await render(
		`<ontario-button label="Download">
			<svg slot="leading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7"/></svg>
			<svg slot="trailing-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6"/></svg>
		</ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button label="Download" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary ontario-button--icons-2" aria-label="Download" id>
      <span class="ontario-button__icon-slot">
        <slot name="leading-icon"></slot>
      </span>
      <span class="ontario-button__label">
        Download
      </span>
      <span class="ontario-button__icon-slot">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </mock:shadow-root>
  <svg slot="leading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12l5 5L20 7"></path></svg>
  <svg slot="trailing-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6"></path></svg>
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
