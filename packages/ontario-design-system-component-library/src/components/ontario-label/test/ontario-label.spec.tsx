import { newSpecPage } from '@stencil/core/testing';
import { OntarioLabel } from '../ontario-label';

describe('ontario-label snapshot', () => {
  it('should render the expected html of ontario-label', async () => {
    const page = await newSpecPage({
      components: [OntarioLabel],
      html: `<ontario-label>Default Label</ontario-label>`,
    });

    expect(page.root).toMatchSnapshot();
  });
})

describe('ontario-label', () => {
  it('should render the default label element', async () => {
    const page = await newSpecPage({
      components: [OntarioLabel],
      html: `<ontario-label>Default Label</ontario-label>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-label>
        <mock:shadow-root>
          <label class="ontario-label">Default Label
            <span class="ontario-label__flag">(optional)</span>
          </label>
        </mock:shadow-root>
        Default Label
      </ontario-label>
    `);
  });
});
