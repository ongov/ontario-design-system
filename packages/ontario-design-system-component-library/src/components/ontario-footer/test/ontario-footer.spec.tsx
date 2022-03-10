import { newSpecPage } from '@stencil/core/testing';
import { OntarioFooter } from '../ontario-footer';

describe('ontario-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioFooter],
      html: `<ontario-footer></ontario-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-footer>
    `);
  });
});
