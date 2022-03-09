import { newSpecPage } from '@stencil/core/testing';
import { OntarioDropdownList } from '../ontario-dropdown-list';

describe('ontario-dropdown-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioDropdownList],
      html: `<ontario-dropdown-list></ontario-dropdown-list>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-dropdown-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-dropdown-list>
    `);
  });
});
