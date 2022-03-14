import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';

describe('ontario-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioHeader],
      html: `<ontario-header></ontario-header>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-header>
    `);
  });
});
