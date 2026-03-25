import { newSpecPage } from '@stencil/core/testing';
import { OntarioRadioButtons } from '../ontario-radio-buttons';

describe('ontario-radio-buttons', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioRadioButtons],
			html: `<ontario-radio-buttons></ontario-radio-buttons>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-radio-buttons>
        <mock:shadow-root>
          <div>
            <fieldset class="ontario-fieldset">
                <legend class="ontario-fieldset__legend">
                  <span class="ontario-label__flag">
                    (optional)
                  </span>
                </legend>
              <div class="ontario-radios">
                <div class="ontario-error-messaging ontario-error__hidden" role="alert">
                  <ontario-icon-alert-error></ontario-icon-alert-error>
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
		const page = await newSpecPage({
			components: [OntarioRadioButtons],
			html: `<ontario-radio-buttons options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label", "checked": true }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		});

		expect(page.root?.value).toBe('radio-option-1');
	});

	it('should emit a host change event with the current value in detail', async () => {
		const page = await newSpecPage({
			components: [OntarioRadioButtons],
			html: `<ontario-radio-buttons name="radio-group" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label" }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		});

		const onChange = jest.fn();
		page.root?.addEventListener('change', onChange);

		const radio = page.root?.shadowRoot?.querySelector('#radio-2') as HTMLInputElement;
		radio.checked = true;
		radio.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(page.root?.value).toBe('radio-option-2');
		expect(onChange.mock.calls[0][0].detail.value).toBe('radio-option-2');
	});

	it('should warn and fall back when the provided value does not match an option', async () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

		const page = await newSpecPage({
			components: [OntarioRadioButtons],
			html: `<ontario-radio-buttons value="missing-option" options='[{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label", "checked": true }, { "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }]'></ontario-radio-buttons>`,
		});

		expect(page.root?.value).toBe('radio-option-1');
		expect(warnSpy).toHaveBeenCalled();

		warnSpy.mockRestore();
	});
});
