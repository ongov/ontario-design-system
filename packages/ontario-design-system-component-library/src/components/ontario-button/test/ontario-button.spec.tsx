import { render } from '@stencil/vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

it('should render a default button', async () => {
	const page = await render(`<ontario-button>Element Content</ontario-button>`);
	expect(page.root).toEqualHtml(`
<ontario-button class="hydrated">
  <mock:shadow-root>
    <button type="button" class="ontario-button ontario-button--secondary" aria-label="Element Content" id>
      Element Content
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
      Element Content
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
      Element Content
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
      Element Content
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
      Browse services
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
      Browse services
    </a>
  </mock:shadow-root>
  Browse services
</ontario-button>
`);
});
