import { newSpecPage } from '@stencil/core/testing';
import { OntarioBlockquote } from '../ontario-blockquote';

describe('ontario-blockquote', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioBlockquote],
      html: `<ontario-blockquote></ontario-blockquote>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-blockquote>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-blockquote>
    `);
  });
});
