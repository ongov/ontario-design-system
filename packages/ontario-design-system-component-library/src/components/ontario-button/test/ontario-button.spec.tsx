import { newSpecPage } from '@stencil/core/testing';
import { OntarioButton } from '../ontario-button';
import { elementContentDefault, labelDefault, ariaLabelDefault, htmlTypeDefault, typeDefault } from './ontario-button.test.config';

it('should render a default button', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button>${elementContentDefault}</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button>
      <mock:shadow-root>
        <button aria-label="${elementContentDefault}" class="ontario-button ontario-button--${typeDefault}" type="${htmlTypeDefault}">
          ${elementContentDefault}
        </button>
      </mock:shadow-root>
      ${elementContentDefault}
    </ontario-button>    
  `);
});

it('should render a primary submit button', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button type="primary" html-type="submit">${elementContentDefault}</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button type="primary" html-type="submit">
      <mock:shadow-root>
        <button aria-label="${elementContentDefault}" class="ontario-button ontario-button--primary" type="submit">
          ${elementContentDefault}
        </button>
      </mock:shadow-root>
      ${elementContentDefault}
    </ontario-button>
  `);
});

it('should render a default button with label overriding the element content', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button label="${labelDefault}">${elementContentDefault}</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button label="${labelDefault}">
      <mock:shadow-root>
        <button aria-label="${labelDefault}" class="ontario-button ontario-button--${typeDefault}" type="${htmlTypeDefault}">
          ${labelDefault}
        </button>
      </mock:shadow-root>
      ${elementContentDefault}
    </ontario-button>
  `);
});

it('should render a default button with the aria-label attribute being overwritten', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button aria-label="${ariaLabelDefault}">${elementContentDefault}</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button aria-label="${ariaLabelDefault}">
      <mock:shadow-root>
        <button aria-label="${ariaLabelDefault}" class="ontario-button ontario-button--${typeDefault}" type="${htmlTypeDefault}">
          ${elementContentDefault}
        </button>
      </mock:shadow-root>
      ${elementContentDefault}
    </ontario-button>
  `);
});

it('should render a default button with an id being explicity specified', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button id="DefaultButton">${elementContentDefault}</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button id="DefaultButton">
      <mock:shadow-root>
        <button aria-label="${elementContentDefault}" class="ontario-button ontario-button--${typeDefault}" type="${htmlTypeDefault}" id="DefaultButton">
          ${elementContentDefault}
        </button>
      </mock:shadow-root>
      ${elementContentDefault}
    </ontario-button>
  `);
});
