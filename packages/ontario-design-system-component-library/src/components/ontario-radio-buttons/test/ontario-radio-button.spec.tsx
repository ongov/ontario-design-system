import { newSpecPage } from '@stencil/core/testing';
import { OntarioRadioButtons } from '../ontario-radio-buttons';

describe('ontario-radio-buttons', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioRadioButtons],
      html: `<ontario-radio-buttons></ontario-radio-buttons>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-radio-buttons>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-radio-buttons>
    `);
  });
});
