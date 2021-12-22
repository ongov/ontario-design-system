import { newSpecPage } from '@stencil/core/testing';
import { OntarioTextarea } from '../ontario-textarea';

describe('ontario-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioTextarea],
      html: `<ontario-textarea></ontario-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-textarea>
    `);
  });
});
