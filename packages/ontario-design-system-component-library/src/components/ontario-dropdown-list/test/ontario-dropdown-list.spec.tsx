import { newSpecPage } from '@stencil/core/testing';
import { OntarioDropdownList } from '../ontario-dropdown-list';

describe('ontario-dropdown-list', () => {
	describe('render', () => {
		it('should render a dropdown list element', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }]'></ontario-dropdown-list>`,
			});
			expect(page.root).toEqualHtml(`
				<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }]'>
				<mock:shadow-root>
					<div class="ontario-form-group">
						<label class="ontario-label" htmlfor="dropdown-list">
							<span class="ontario-label__flag">
							(optional)
							</span>
						</label>
						<div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
						<select class="ontario-dropdown ontario-input" id="dropdown-list" style="background-image: url(/assets/ontario-material-dropdown-arrow-48px.svg);">
							<option value="dropdown-option-1">Option 1</option>
						</select>
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
                  element-id="dropdown-list",
                  is-empty-start-option="Please select"
                  caption='{"captionText": "Label"}'
				  options='[{ "value": "dropdown-option-1", "label": "Option 1" }]'
				></ontario-dropdown-list>`,
			});

			expect(page.rootInstance.name).toBe('dropdown-options');
			expect(page.rootInstance.elementId).toBe('dropdown-list');
			expect(page.rootInstance.isEmptyStartOption).toBe('Please select');
			expect(page.rootInstance.captionState.captionText).toBe('Label');
			expect(page.rootInstance.options).toBe('[{ "value": "dropdown-option-1", "label": "Option 1" }]');
		});
	});
});
