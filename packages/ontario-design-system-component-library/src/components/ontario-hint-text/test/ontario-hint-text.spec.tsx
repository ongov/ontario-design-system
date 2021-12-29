import { newSpecPage } from '@stencil/core/testing';
import { OntarioHintText } from '../ontario-hint-text';

describe('ontario-hint-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioHintText],
      html: `<ontario-hint-text></ontario-hint-text>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-hint-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-hint-text>
    `);
  });
});
