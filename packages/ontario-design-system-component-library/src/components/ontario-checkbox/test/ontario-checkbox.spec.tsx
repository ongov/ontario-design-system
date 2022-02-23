import { newSpecPage } from '@stencil/core/testing';
import { OntarioCheckbox } from '../ontario-checkboxes';

describe('ontario-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioCheckbox],
      html: `<ontario-checkbox></ontario-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-checkbox>
    `);
  });
});
