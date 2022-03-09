
import { newSpecPage } from '@stencil/core/testing';
import { OntarioIconAccessibility } from '../ontario-icon-accessibility';

describe('ontario-icon', () => {
  describe('snapshot', () => {
    it('should render the expected html', async () => {
      const page = await newSpecPage({
        components: [OntarioIconAccessibility],
        html: `<ontario-icon-accessibility colour="grey"></ontario-icon-accessibility>`,
      });

      expect(page.root).toMatchSnapshot();
    });
  })

  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioIconAccessibility],
      html: `<ontario-icon-accessibility colour="grey"></ontario-icon-accessibility>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-icon-accessibility colour="grey">
        <mock:shadow-root>
          <div class="ontario-icon ontario-icon--grey">
          </div>
        </mock:shadow-root>
      </ontario-icon-accessibility>
    `);
  });
});
