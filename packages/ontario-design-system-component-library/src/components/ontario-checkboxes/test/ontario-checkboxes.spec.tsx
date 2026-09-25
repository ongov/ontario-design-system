import { describe, expect, it, vi } from 'vitest';
import { render } from '@stencil/vitest';

describe('ontario-checkbox', () => {
	it('renders', async () => {
		const page = await render(`<ontario-checkboxes></ontario-checkboxes>`);
		expect(page.root).toEqualHtml(`
<ontario-checkboxes class="hydrated">
  <mock:shadow-root>
    <div>
      <fieldset class="ontario-fieldset">
        <legend class="ontario-fieldset__legend">
          <span class="ontario-label__flag">
            (optional)
          </span>
        </legend>
        <div role="alert" class="ontario-error-messaging ontario-error__hidden">
          <ontario-icon-alert-error class="hydrated">
            <mock:shadow-root>
              <div class="ontario-icon ontario-icon--width-24">
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-error">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#cd0000"></path>
                  <path d="M11 17h2v-2h-2v2zm0-4h2V7h-2v6z" fill="#fff"></path>
                </svg>
              </div>
            </mock:shadow-root>
          </ontario-icon-alert-error>
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
		const page = await render(
			`<ontario-checkboxes options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label", "checked": true }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label", "checked": true }]'></ontario-checkboxes>`,
		);

		expect((page.root as HTMLOntarioCheckboxesElement)?.value).toEqual(['checkbox-option-1', 'checkbox-option-2']);
	});

	it('should apply the provided value over checked option flags', async () => {
		const page = await render(
			`<ontario-checkboxes value='["checkbox-option-2"]' options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label", "checked": true }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		);

		const checkboxOne = page.root?.shadowRoot?.querySelector('#checkbox-1') as HTMLInputElement;
		const checkboxTwo = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;

		expect((page.root as HTMLOntarioCheckboxesElement)?.value).toEqual(['checkbox-option-2']);
		expect(checkboxOne.checked).toBe(false);
		expect(checkboxTwo.checked).toBe(true);
	});

	it('should emit a host change event with the current value in detail', async () => {
		const page = await render(
			`<ontario-checkboxes name="checkbox-group" options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		);

		const onChange = vi.fn();
		page.root?.addEventListener('change', onChange);

		const checkbox = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;
		checkbox.checked = true;
		checkbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onChange).toHaveBeenCalledTimes(1);
		expect((page.root as HTMLOntarioCheckboxesElement)?.value).toEqual(['checkbox-option-2']);
		expect(onChange.mock.calls[0][0].detail.value).toEqual(['checkbox-option-2']);
	});

	it('should preserve the checkboxOnChange custom event detail', async () => {
		const page = await render(
			`<ontario-checkboxes name="checkbox-group" options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		);

		const onCheckboxChange = vi.fn();
		document.addEventListener('checkboxOnChange', onCheckboxChange);

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
		const page = await render(
			`<ontario-checkboxes name="checkbox-group" options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		);

		const checkboxOne = page.root?.shadowRoot?.querySelector('#checkbox-1') as HTMLInputElement;
		const checkboxTwo = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;

		checkboxOne.checked = true;
		checkboxOne.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();
		expect((page.root as HTMLOntarioCheckboxesElement).value).toEqual(['checkbox-option-1']);

		checkboxTwo.checked = true;
		checkboxTwo.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();
		expect((page.root as HTMLOntarioCheckboxesElement).value).toEqual(['checkbox-option-1', 'checkbox-option-2']);

		checkboxOne.checked = false;
		checkboxOne.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();
		expect((page.root as HTMLOntarioCheckboxesElement).value).toEqual(['checkbox-option-2']);
	});

	it('should warn and ignore provided values that do not match an option', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		const page = await render(
			`<ontario-checkboxes value='["checkbox-option-2", "missing-option"]' options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label", "checked": true }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		);

		expect((page.root as HTMLOntarioCheckboxesElement).value).toEqual(['checkbox-option-2']);
		expect(warnSpy).toHaveBeenCalled();

		warnSpy.mockRestore();
	});

	it('should reflect external value updates in the rendered checkboxes', async () => {
		const page = await render(
			`<ontario-checkboxes value='["checkbox-option-1"]' options='[{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" }, { "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }]'></ontario-checkboxes>`,
		);

		const checkboxOne = page.root?.shadowRoot?.querySelector('#checkbox-1') as HTMLInputElement;
		const checkboxTwo = page.root?.shadowRoot?.querySelector('#checkbox-2') as HTMLInputElement;
		expect(checkboxOne.checked).toBe(true);
		expect(checkboxTwo.checked).toBe(false);

		(page.root as HTMLOntarioCheckboxesElement).value = ['checkbox-option-2'];
		await page.waitForChanges();

		expect((page.root as HTMLOntarioCheckboxesElement).value).toEqual(['checkbox-option-2']);
		expect(checkboxOne.checked).toBe(false);
		expect(checkboxTwo.checked).toBe(true);
	});

	it('should expose the checkbox background variable on both :root and :host selectors', async () => {
		const page = await render(`<ontario-checkboxes></ontario-checkboxes>`);

		const styles = Array.from(page.root?.shadowRoot?.querySelectorAll('style') ?? [])
			.map((s) => s.textContent ?? '')
			.join('\n');

		expect(styles).toMatch(/:root\s*,\s*:host\s*\{[^}]*--checkbox-bg:/);
	});
});
