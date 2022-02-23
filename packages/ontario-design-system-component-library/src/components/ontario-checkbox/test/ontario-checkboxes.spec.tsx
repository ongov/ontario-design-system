import { newSpecPage } from '@stencil/core/testing';
import { OntarioCheckboxes } from '../ontario-checkboxes';

describe('ontario-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioCheckboxes],
      html: `<ontario-checkboxes></ontario-checkboxes>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-checkboxes>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-checkboxes>
    `);
  });
});
