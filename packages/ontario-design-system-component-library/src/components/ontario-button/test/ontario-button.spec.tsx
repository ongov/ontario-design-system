import { render } from '@stencil/vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

it('should render a default button', async () => {
	const page = await render(`<ontario-button>Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Element Content" id>
      <slot></slot>
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
      <slot></slot>
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
      Label
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
      <slot></slot>
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
      <slot></slot>
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
      <slot></slot>
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
      <slot></slot>
    </a>
  </mock:shadow-root>
  Browse services
</ontario-button>
`);
});

it('should render slotted SVG content inside the button', async () => {
	const page = await render(
		`<ontario-button aria-label-text="Open map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></ontario-button>`,
	);
	expect(page.root).toEqualHtml(`
<ontario-button aria-label-text="Open map" class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Open map" id>
      <slot></slot>
    </button>
  </mock:shadow-root>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path></svg>
</ontario-button>
`);
});
