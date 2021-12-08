import { newSpecPage } from '@stencil/core/testing';
import { OntarioButton } from '../ontario-button';

describe('ontario-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioButton],
      html: `<ontario-button></ontario-button>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-button>
    `);
  });
});
