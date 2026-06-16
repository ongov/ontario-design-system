import { render } from '@stencil/vitest';

describe('ontario-radio-buttons', () => {
	it('renders', async () => {
		const page = await render(`<ontario-radio-buttons></ontario-radio-buttons>`);
		expect(page.root).toEqualHtml(`
<ontario-radio-buttons class="hydrated">
  <mock:shadow-root>
    <div>
      <fieldset class="ontario-fieldset">
        <legend class="ontario-fieldset__legend">
          <span class="ontario-label__flag">
            (optional)
          </span>
        </legend>
        <div class="ontario-radios">
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
        </div>
      </fieldset>
    </div>
  </mock:shadow-root>
</ontario-radio-buttons>
`);
	});

	it('should keep the host value in sync with the checked radio option', async () => {
		const page = await render(
			`<ontario-radio-buttons options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label", "checked": true }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		expect(page.root?.value).toBe('radio-option-1');
	});

	it('should apply the provided value over checked option flags', async () => {
		const page = await render(
			`<ontario-radio-buttons value="radio-option-2" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label", "checked": true }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		const radioOne = page.root?.shadowRoot?.querySelector('#radio-1') as HTMLInputElement;
		const radioTwo = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;

		expect(page.root?.value).toBe('radio-option-2');
		expect(radioOne.checked).toBe(false);
		expect(radioTwo.checked).toBe(true);
	});

	it('should emit a host change event with the current value in detail', async () => {
		const page = await render(
			`<ontario-radio-buttons name="radio-group" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label" }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		const onChange = vi.fn();
		page.root?.addEventListener('change', onChange);

		const radio = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;
		radio.checked = true;
		radio.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(page.root?.value).toBe('radio-option-2');
		expect(onChange.mock.calls[0][0].detail.value).toBe('radio-option-2');
	});

	it('should preserve the radioOnChange custom event detail', async () => {
		const page = await render(
			`<ontario-radio-buttons name="radio-group" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label" }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		const onRadioChange = vi.fn();
		document.addEventListener('radioOnChange', onRadioChange);

		const radio = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;
		radio.checked = true;
		radio.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onRadioChange).toHaveBeenCalledTimes(1);
		expect(onRadioChange.mock.calls[0][0].detail).toEqual({
			checked: true,
			id: 'radio-2',
			value: 'radio-option-2',
		});
	});

	it('should reflect external value updates in the rendered radios', async () => {
		const page = await render(
			`<ontario-radio-buttons value="radio-option-1" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label" }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		const radioOne = page.root?.shadowRoot?.querySelector('#radio-1') as HTMLInputElement;
		const radioTwo = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;
		expect(radioOne.checked).toBe(true);
		expect(radioTwo.checked).toBe(false);

		(page.root as HTMLOntarioRadioButtonsElement).value = 'radio-option-2';
		await page.waitForChanges();

		expect(page.root?.value).toBe('radio-option-2');
		expect(radioOne.checked).toBe(false);
		expect(radioTwo.checked).toBe(true);
	});

	it('should warn and fall back when the provided value does not match an option', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		const page = await render(
			`<ontario-radio-buttons value="missing-option" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label", "checked": true }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		expect(page.root?.value).toBe('radio-option-1');
		expect(warnSpy).toHaveBeenCalled();

		warnSpy.mockRestore();
	});

	it('should clear all options when value is explicitly set to an empty string on load', async () => {
		const page = await render(
			`<ontario-radio-buttons value="" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label", "checked": true }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		const radioOne = page.root?.shadowRoot?.querySelector('#radio-1') as HTMLInputElement;
		const radioTwo = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;

		expect(page.root?.value).toBe('');
		expect(radioOne.checked).toBe(false);
		expect(radioTwo.checked).toBe(false);
	});

	it('should clear all options when value is programmatically set to an empty string', async () => {
		const page = await render(
			`<ontario-radio-buttons value="radio-option-1" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label" }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		);

		const radioOne = page.root?.shadowRoot?.querySelector('#radio-1') as HTMLInputElement;
		const radioTwo = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;

		expect(radioOne.checked).toBe(true);

		(page.root as HTMLOntarioRadioButtonsElement).value = '';
		await page.waitForChanges();

		expect(page.root?.value).toBe('');
		expect(radioOne.checked).toBe(false);
		expect(radioTwo.checked).toBe(false);
	});
});
