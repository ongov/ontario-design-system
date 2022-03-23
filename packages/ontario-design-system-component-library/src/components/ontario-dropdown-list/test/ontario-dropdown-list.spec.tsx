import { newSpecPage } from '@stencil/core/testing';
import { OntarioDropdownList } from '../ontario-dropdown-list';

describe('ontario-dropdown-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioDropdownList],
      html: `<ontario-dropdown-list></ontario-dropdown-list>`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-dropdown-list>
        <mock:shadow-root>
          <div class="ontario-form-group">
            <fieldset class="ontario-fieldset">
              <legend class="ontario-fieldset__legend">
                <span class="ontario-label__flag">
                  (optional)
                </span>
              </legend>
              <select class="ontario-dropdown ontario-input" style="background-image: url(/assets/ontario-material-dropdown-arrow-48px.svg);"></select>
            </fieldset>
          </div>
        </mock:shadow-root>
      </ontario-dropdown-list>
    `);
  });
});
