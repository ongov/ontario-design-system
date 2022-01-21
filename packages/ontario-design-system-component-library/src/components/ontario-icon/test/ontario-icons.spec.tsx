import { newSpecPage } from '@stencil/core/testing';
import { OntarioIcons } from '../ontario-icons';

describe('ontario-icons', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioIcons],
      html: `<ontario-icons></ontario-icons>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-icons>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-icons>
    `);
  });
});
