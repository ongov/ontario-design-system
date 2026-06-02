import { newSpecPage } from '@stencil/core/testing';
import { OntarioCheckboxes } from '../ontario-checkboxes';

describe('ontario-checkbox', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes></ontario-checkboxes>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-checkboxes>
        <mock:shadow-root>
          <div>
            <fieldset class="ontario-fieldset">
              <legend class="ontario-fieldset__legend">
                <span class="ontario-label__flag">
                  (optional)
                </span>
              </legend>
              <div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
              <div class="ontario-checkboxes"></div>
            </fieldset>
          </div>
        </mock:shadow-root>
      </ontario-checkboxes>
    `);
	});

	it('should keep the host value in sync with checked checkbox options', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label", "checked": true }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label", "checked": true }]'></ontario-checkboxes>`,
		});

		expect(page.root?.value).toEqual(['checkbox-option-1', 'checkbox-option-2']);
	});

	it('should apply the provided value over checked option flags', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes value='["checkbox-option-2"]' options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label", "checked": true }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		});

		const checkboxOne = page.root?.shadowRoot?.querySelector('#checkbox-1') as HTMLInputElement;
		const checkboxTwo = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;

		expect(page.root?.value).toEqual(['checkbox-option-2']);
		expect(checkboxOne.checked).toBe(false);
		expect(checkboxTwo.checked).toBe(true);
	});

	it('should emit a host change event with the current value in detail', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes name="checkbox-group" options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		});

		const onChange = jest.fn();
		page.root?.addEventListener('change', onChange);

		const checkbox = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;
		checkbox.checked = true;
		checkbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(page.root?.value).toEqual(['checkbox-option-2']);
		expect(onChange.mock.calls[0][0].detail.value).toEqual(['checkbox-option-2']);
	});

	it('should preserve the checkboxOnChange custom event detail', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes name="checkbox-group" options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		});

		const onCheckboxChange = jest.fn();
		page.doc.addEventListener('checkboxOnChange', onCheckboxChange);

		const checkbox = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;
		checkbox.checked = true;
		checkbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onCheckboxChange).toHaveBeenCalledTimes(1);
		expect(onCheckboxChange.mock.calls[0][0].detail).toEqual({
			checked: true,
			id: 'checkbox-2',
			value: 'checkbox-option-2',
		});
	});

	it('should update the host value across multiple checkbox toggles', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes name="checkbox-group" options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		});

		const checkboxOne = page.root?.shadowRoot?.querySelector('#checkbox-1') as HTMLInputElement;
		const checkboxTwo = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;

		checkboxOne.checked = true;
		checkboxOne.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();
		expect(page.root?.value).toEqual(['checkbox-option-1']);

		checkboxTwo.checked = true;
		checkboxTwo.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();
		expect(page.root?.value).toEqual(['checkbox-option-1', 'checkbox-option-2']);

		checkboxOne.checked = false;
		checkboxOne.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();
		expect(page.root?.value).toEqual(['checkbox-option-2']);
	});

	it('should warn and ignore provided values that do not match an option', async () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes value='["checkbox-option-2", "missing-option"]' options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label", "checked": true }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		});

		expect(page.root?.value).toEqual(['checkbox-option-2']);
		expect(warnSpy).toHaveBeenCalled();

		warnSpy.mockRestore();
	});

	it('should reflect external value updates in the rendered checkboxes', async () => {
		const page = await newSpecPage({
			components: [OntarioCheckboxes],
			html: `<ontario-checkboxes value='["checkbox-option-1"]' options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		});

		const checkboxOne = page.root?.shadowRoot?.querySelector('#checkbox-1') as HTMLInputElement;
		const checkboxTwo = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;
		expect(checkboxOne.checked).toBe(true);
		expect(checkboxTwo.checked).toBe(false);

		(page.root as HTMLOntarioCheckboxesElement).value = ['checkbox-option-2'];
		await page.waitForChanges();

		expect(page.root?.value).toEqual(['checkbox-option-2']);
		expect(checkboxOne.checked).toBe(false);
		expect(checkboxTwo.checked).toBe(true);
	});
});
