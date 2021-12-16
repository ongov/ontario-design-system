import { newSpecPage } from '@stencil/core/testing';
import { OntarioLabel } from '../ontario-label';

describe('ontario-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioLabel],
      html: `<ontario-label></ontario-label>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-label>
    `);
  });
});
