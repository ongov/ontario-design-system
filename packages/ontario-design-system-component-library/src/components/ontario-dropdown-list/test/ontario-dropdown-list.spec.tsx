import { newSpecPage } from '@stencil/core/testing';
import { OntarioDropdownList } from '../ontario-dropdown-list';

describe('ontario-dropdown-list', () => {
  describe('snapshot', () => {
    it('should render the expected html', async () => {
      const page = await newSpecPage({
        components: [OntarioDropdownList],
        html: `	<ontario-dropdown-list label="Do you like cats?" name="cat-dropdown" is-required is-empty-start-option="Please select"
        options='[{
          " value": "dropdown-list-1",
          "label": "Option 1"
        },
        {
          "value": "dropdown-list-2",
          "label": "Option 2"
        },
        {
          "value": "dropdown-list-3",
          "label": "Option 3"
        }]'>
      </ontario-dropdown-list>`,
      });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render a dropdown list element', async () => {
      const page = await newSpecPage({
        components: [OntarioDropdownList],
        html: `<ontario-dropdown-list></ontario-dropdown-list>`,
      });
      expect(page.root).toEqualHtml(`
        <ontario-dropdown-list>
          <mock:shadow-root>
            <div class="ontario-form-group">
              <label class="ontario-label" htmlFor="ontario-dropdown-list">
                <span class="ontario-label__flag">
                  (optional)
                </span>
              </label>
              <select class="ontario-dropdown ontario-input" style="background-image: url(/assets/ontario-material-dropdown-arrow-48px.svg);"></select>
            </div>
          </mock:shadow-root>
        </ontario-dropdown-list>
      `);
    });


    it('should reflect attributes/props being set', async () => {
      const page = await newSpecPage({
        components: [OntarioDropdownList],
        html: `<ontario-dropdown-list
                  label="ontario dropdown label"
                  name="dropdown-options"
                  is-empty-start-option="Please select"
								></ontario-dropdown-list>`,
      });

      expect(page.rootInstance.label).toBe('ontario dropdown label');
      expect(page.rootInstance.name).toBe('dropdown-options');
      expect(page.rootInstance.isEmptyStartOption).toBe("Please select");
    });
  });
});
