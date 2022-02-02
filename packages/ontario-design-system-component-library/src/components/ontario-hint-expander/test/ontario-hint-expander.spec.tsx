import { newSpecPage } from '@stencil/core/testing';
import { OntarioHintExpander } from '../ontario-hint-expander';

describe('ontario-hint-expander', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioHintExpander],
      html: `<ontario-hint-expander></ontario-hint-expander>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-hint-expander>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-hint-expander>
    `);
  });
});
