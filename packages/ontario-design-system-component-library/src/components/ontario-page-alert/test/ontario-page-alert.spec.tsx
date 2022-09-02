import { newSpecPage } from '@stencil/core/testing';
import { OntarioPageAlert } from '../ontario-page-alert';

describe('ontario-page-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioPageAlert],
      html: `<ontario-page-alert></ontario-page-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-page-alert>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-page-alert>
    `);
  });
});
