import { newSpecPage } from '@stencil/core/testing';
import { OntarioButton } from '../ontario-button';
import { elementContentDefault, labelDefault, ariaLabelDefault } from './ontario-button.test.config';

it('should render a default button', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button>${elementContentDefault}</ontario-button>`,
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
		html: `<ontario-button type="primary" html-type="submit">${elementContentDefault}</ontario-button>`,
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
		html: `<ontario-button label="${labelDefault}">${elementContentDefault}</ontario-button>`,
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

it('should render a default button with the aria-label attribute being overwritten', async () => {
	const page = await newSpecPage({
		components: [OntarioButton],
		html: `<ontario-button aria-label="${ariaLabelDefault}">${elementContentDefault}</ontario-button>`,
	});
	expect(page.root).toEqualHtml(`
    <ontario-button aria-label="Aria Label">
      <mock:shadow-root>
        <button aria-label="Aria Label" class="ontario-button ontario-button--secondary" type="button">
          Element Content
        </button>
      </mock:shadow-root>
      Element Content
    </ontario-button>
  `);
});
