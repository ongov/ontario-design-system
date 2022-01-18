import { newSpecPage } from '@stencil/core/testing';
import { OntarioIconSecondary } from '../ontario-icon-account';

describe('ontario-icon-secondary', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioIconSecondary],
      html: `<ontario-icon-secondary></ontario-icon-secondary>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-icon-secondary>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-icon-secondary>
    `);
  });
});
