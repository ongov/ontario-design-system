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
					<div>
						<label class="ontario-label" htmlfor="dropdown-list">
							<span class="ontario-label__flag">
							(optional)
							</span>
						</label>
						<div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
						<select class="ontario-dropdown ontario-input" id="dropdown-list" value="dropdown-option-1" style="background-image: url(/assets/ontario-material-dropdown-arrow-48px.svg);">
							<option selected="" value="dropdown-option-1">Option 1</option>
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

		it('should keep the host value empty when the start option is shown first', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" is-empty-start-option="Please select" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			const startOption = select.querySelector('option') as HTMLOptionElement;

			expect(page.root?.value).toBe('');
			expect(startOption.getAttribute('value')).toBe('');
			expect(select.getAttribute('value')).toBe('');
		});

		it('should warn and fall back when the provided value does not match an option', async () => {
			const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" value="missing-option" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			expect(page.root?.value).toBe('dropdown-option-1');
			expect(warnSpy).toHaveBeenCalled();

			warnSpy.mockRestore();
		});

		it('should apply the provided value over selected option flags', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" value="dropdown-option-2" options='[{ "value": "dropdown-option-1", "label": "Option 1", "selected": true }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			const options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			expect(page.root?.value).toBe('dropdown-option-2');
			expect(select.getAttribute('value')).toBe('dropdown-option-2');
			expect(options[0].hasAttribute('selected')).toBe(false);
			expect(options[1].getAttribute('selected')).toBe('');
		});

		it('should keep the host value in sync with the selected option', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			select.value = 'dropdown-option-2';
			select.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
			await page.waitForChanges();

			expect(page.root?.value).toBe('dropdown-option-2');
		});

		it('should reflect external value updates in the rendered select', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" value="dropdown-option-1" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			let options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];
			expect(select.getAttribute('value')).toBe('dropdown-option-1');
			expect(options[0].getAttribute('selected')).toBe('');
			expect(options[1].hasAttribute('selected')).toBe(false);

			(page.root as HTMLOntarioDropdownListElement).value = 'dropdown-option-2';
			await page.waitForChanges();
			options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			expect(page.root?.value).toBe('dropdown-option-2');
			expect(select.getAttribute('value')).toBe('dropdown-option-2');
			expect(options[0].hasAttribute('selected')).toBe(false);
			expect(options[1].getAttribute('selected')).toBe('');
		});

		it('should emit a host input event with the current value in detail', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const onInput = jest.fn();
			page.root?.addEventListener('input', onInput);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			select.value = 'dropdown-option-2';
			select.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
			await page.waitForChanges();

			expect(onInput).toHaveBeenCalledTimes(1);
			expect(page.root?.value).toBe('dropdown-option-2');
			expect(onInput.mock.calls[0][0].detail.value).toBe('dropdown-option-2');
		});

		it('should emit a host change event with the current value in detail', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const onChange = jest.fn();
			page.root?.addEventListener('change', onChange);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			select.value = 'dropdown-option-2';
			select.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
			await page.waitForChanges();

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(page.root?.value).toBe('dropdown-option-2');
			expect(onChange.mock.calls[0][0].detail.value).toBe('dropdown-option-2');
		});

		it('should preserve the dropdownOnChange custom event detail', async () => {
			const page = await newSpecPage({
				components: [OntarioDropdownList],
				html: `<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			});

			const onDropdownChange = jest.fn();
			page.doc.addEventListener('dropdownOnChange', onDropdownChange);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			select.value = 'dropdown-option-2';
			select.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
			await page.waitForChanges();

			expect(onDropdownChange).toHaveBeenCalledTimes(1);
			expect(onDropdownChange.mock.calls[0][0].detail).toEqual({
				id: 'dropdown-list',
				value: 'dropdown-option-2',
			});
		});
	});
});
