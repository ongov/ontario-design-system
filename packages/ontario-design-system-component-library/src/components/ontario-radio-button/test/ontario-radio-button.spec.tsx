import { newSpecPage } from '@stencil/core/testing';
import { OntarioRadioButton } from '../ontario-radio-button';

describe('ontario-radio-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioRadioButton],
      html: `<ontario-radio-button></ontario-radio-button>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-radio-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-radio-button>
    `);
  });
});
