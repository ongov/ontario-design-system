import { newSpecPage } from '@stencil/core/testing';
import { OntarioDropdownList } from '../ontario-dropdown-list';

describe('ontario-dropdown-list', () => {
	describe('render', () => {
		it('should render a dropdown list element', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list-1"></ontario-dropdown-list>`,
			});
			expect(page.root).toEqualHtml(`
        <ontario-dropdown-list element-id="dropdown-list-1">
          <mock:shadow-root>
            <div class="ontario-form-group">
              <label class="ontario-label" htmlfor="dropdown-list-1">
                <span class="ontario-label__flag">
                  (optional)
                </span>
              </label>
              <select class="ontario-dropdown ontario-input" id="dropdown-list-1" style="background-image: url(/assets/ontario-material-dropdown-arrow-48px.svg);"></select>
            </div>
          </mock:shadow-root>
        </ontario-dropdown-list>
      `);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list
                  name="dropdown-options"
                  element-id="dropdown-list-1",
                  is-empty-start-option="Please select"
                  caption='{"captionText": "ontario dropdown label"}'
								></ontario-dropdown-list>`,
			});

			expect(page.rootInstance.name).toBe('dropdown-options');
			expect(page.rootInstance.elementId).toBe('dropdown-list-1');
			expect(page.rootInstance.isEmptyStartOption).toBe('Please select');
			expect(page.rootInstance.captionState.captionText).toBe('ontario dropdown label');
		});
	});
});
