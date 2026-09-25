import { describe, expect, it, vi } from 'vitest';
import { render } from '@stencil/vitest';

describe('ontario-checkbox', () => {
	it('renders', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		expect(page.root).toEqualHtml(`
<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" class="hydrated">
  <mock:shadow-root>
    <div>
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
      <div class="ontario-checkbox">
        <div class="ontario-checkbox__item">
          <input class="ontario-checkbox__input" id="terms" name="terms" type="checkbox" value="agreed">
          <label htmlfor="terms" class="ontario-label ontario-checkbox__label">
            I agree to the terms and conditions
            <span class="ontario-label__flag">
              (optional)
            </span>
          </label>
        </div>
      </div>
    </div>
  </mock:shadow-root>
</ontario-checkbox>
`);
	});

	it('should generate an elementId when none is provided', async () => {
		const page = await render(
			`<ontario-checkbox label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		expect((page.root as HTMLOntarioCheckboxElement).elementId).toBeTruthy();
	});

	it('should not be checked by default', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		expect(input.checked).toBe(false);
	});

	it('should reflect the checked prop on the rendered input', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" checked></ontario-checkbox>`,
		);

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		expect(input.checked).toBe(true);
	});

	it('should emit checkboxOnChange with the current checked state when toggled', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const onCheckboxChange = vi.fn();
		document.addEventListener('checkboxOnChange', onCheckboxChange);

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onCheckboxChange).toHaveBeenCalledTimes(1);
		expect(onCheckboxChange.mock.calls[0][0].detail).toEqual({
			checked: true,
			id: 'terms',
			value: 'agreed',
		});
		expect((page.root as HTMLOntarioCheckboxElement).checked).toBe(true);
	});

	it('should emit a host change event when toggled', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const onChange = vi.fn();
		page.root?.addEventListener('change', onChange);

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it('should display the required flag and mark the input as required', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" required></ontario-checkbox>`,
		);

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		const flag = page.root?.shadowRoot?.querySelector('.ontario-label__flag');

		expect(input.required).toBe(true);
		expect(flag?.textContent).toContain('required');
	});

	it('should display an error message when errorMessage is set', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" error-message="You must agree to continue"></ontario-checkbox>`,
		);

		const errorMessage = page.root?.shadowRoot?.querySelector('.ontario-error-messaging__content');
		expect(errorMessage?.textContent).toBe('You must agree to continue');
	});

	it('should clear the error box/checkmark styling once checked, while keeping a manually-set errorMessage visible', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" error-message="You must agree to continue"></ontario-checkbox>`,
		);

		expect(page.root?.shadowRoot?.querySelector('.ontario-input--error')).toBeTruthy();

		(page.root as HTMLOntarioCheckboxElement).checked = true;
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('.ontario-input--error')).toBeFalsy();
		expect((page.root as HTMLOntarioCheckboxElement).errorMessage).toBe('You must agree to continue');
		const errorMessage = page.root?.shadowRoot?.querySelector('.ontario-error-messaging__content');
		expect(errorMessage?.textContent).toBe('You must agree to continue');
	});

	it('should immediately display a required-validation error when required and unchecked, with no interaction needed', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" required></ontario-checkbox>`,
		);

		expect((page.root as HTMLOntarioCheckboxElement).errorMessage).toBe('You must select this checkbox to continue.');
	});

	it('should clear the required-validation error once the checkbox is checked', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" required></ontario-checkbox>`,
		);

		expect((page.root as HTMLOntarioCheckboxElement).errorMessage).toBeTruthy();

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect((page.root as HTMLOntarioCheckboxElement).errorMessage).toBeFalsy();
	});

	it('should not display a required-validation error when not required', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="Subscribe to the newsletter" name="terms" value="subscribed"></ontario-checkbox>`,
		);

		expect((page.root as HTMLOntarioCheckboxElement).errorMessage).toBeFalsy();
	});

	it('should use requiredValidationMessage instead of the default translation when provided', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" required required-validation-message="Please accept the Terms and Conditions to proceed."></ontario-checkbox>`,
		);

		expect((page.root as HTMLOntarioCheckboxElement).errorMessage).toBe(
			'Please accept the Terms and Conditions to proceed.',
		);
	});

	it('should warn when name is not provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" value="agreed"></ontario-checkbox>`,
		);

		expect(warnSpy).toHaveBeenCalled();
		warnSpy.mockRestore();
	});

	it('should warn when value is not provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms"></ontario-checkbox>`,
		);

		expect(warnSpy).toHaveBeenCalled();
		warnSpy.mockRestore();
	});

	it('should call setFormValue with the value when checked', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const setFormValueSpy = vi.fn();
		page.instance.internals = { setFormValue: setFormValueSpy };
		page.instance.checked = true;
		await page.waitForChanges();

		expect(setFormValueSpy).toHaveBeenCalledWith('agreed');
	});

	it('should call setFormValue with null when unchecked', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" checked></ontario-checkbox>`,
		);

		const setFormValueSpy = vi.fn();
		page.instance.internals = { setFormValue: setFormValueSpy };
		page.instance.checked = false;
		await page.waitForChanges();

		expect(setFormValueSpy).toHaveBeenCalledWith(null);
	});

	it('should call customOnChange when the checkbox is toggled', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const customOnChangeSpy = vi.fn();
		page.instance.customOnChange = customOnChangeSpy;

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(customOnChangeSpy).toHaveBeenCalledTimes(1);
	});

	it('should call customOnBlur when the checkbox loses focus', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const customOnBlurSpy = vi.fn();
		page.instance.customOnBlur = customOnBlurSpy;

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(customOnBlurSpy).toHaveBeenCalledTimes(1);
	});

	it('should call customOnFocus when the checkbox gains focus', async () => {
		const page = await render(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);

		const customOnFocusSpy = vi.fn();
		page.instance.customOnFocus = customOnFocusSpy;

		const input = page.root?.shadowRoot?.querySelector('#terms') as HTMLInputElement;
		input.dispatchEvent(new Event('focus', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(customOnFocusSpy).toHaveBeenCalledTimes(1);
	});
});
