import { newSpecPage } from '@stencil/core/testing';
import { OntarioInput } from '../ontario-input';

describe('ontario-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioInput],
      html: `<ontario-input></ontario-input>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-input>
    `);
  });
});
