import { newSpecPage } from '@stencil/core/testing';
import { OntarioButton } from '../ontario-button';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

it('should render a default button', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button>Element Content</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="Element Content" class="ontario-button ontario-button--secondary" type="button">
          Element Content
        </button>
      </mock:shadow-root>
      Element Content
    </ontario-button>
  `);
});

it('should render a primary submit button', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button type="primary" html-type="submit">Element Content</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button type="primary" html-type="submit">
      <mock:shadow-root>
        <button aria-label="Element Content" class="ontario-button ontario-button--primary" type="submit">
          Element Content
        </button>
      </mock:shadow-root>
      Element Content
    </ontario-button>
  `);
});

it('should render a default button with label overriding the element content', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button label="Label">Element Content</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button label="Label">
      <mock:shadow-root>
        <button aria-label="Label" class="ontario-button ontario-button--secondary" type="button">
          Label
        </button>
      </mock:shadow-root>
      Element Content
    </ontario-button>
  `);
});

it('should render a default button with the aria-label-text attribute being overwritten', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button aria-label-text="Aria Label">Element Content</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button aria-label-text="Aria Label">
      <mock:shadow-root>
        <button aria-label="Aria Label" class="ontario-button ontario-button--secondary" type="button">
          Element Content
        </button>
      </mock:shadow-root>
      Element Content
    </ontario-button>
  `);
});

it('should render a default button with an id being explicity specified', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button element-id="DefaultButton">Element Content</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button element-id="DefaultButton">
      <mock:shadow-root>
        <button aria-label="Element Content" class="ontario-button ontario-button--secondary" type="button" id="DefaultButton">
          Element Content
        </button>
      </mock:shadow-root>
      Element Content
    </ontario-button>
  `);
});

it('should render as a link when href is provided', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button href="/services" target="_blank" rel="noreferrer">Browse services</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button href="/services" target="_blank" rel="noreferrer">
      <mock:shadow-root>
        <a aria-label="Browse services" class="ontario-button ontario-button--secondary" href="/services" rel="noreferrer" target="_blank">
          Browse services
        </a>
      </mock:shadow-root>
      Browse services
    </ontario-button>
  `);
});

it('should ignore submit htmlType when rendering as a link', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button href="/services" html-type="submit" type="primary">Browse services</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button href="/services" html-type="submit" type="primary">
      <mock:shadow-root>
        <a aria-label="Browse services" class="ontario-button ontario-button--primary" href="/services">
          Browse services
        </a>
      </mock:shadow-root>
      Browse services
    </ontario-button>
  `);
});
