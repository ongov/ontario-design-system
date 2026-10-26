import { render } from '@stencil/vitest';

describe('ontario-input', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await render(
				`<ontario-input element-id="ontario-input" caption='{"captionText": "Ontario Input"}' name="ontario-input"></ontario-input>`,
			);

			expect(page.root).toMatchSnapshot();
		});
	});

	describe('render', () => {
		it('should render a default input element', async () => {
			const page = await render(
				`<ontario-input element-id="ontario-input" caption='{"captionText": "Ontario Input"}' name="ontario-input"></ontario-input>`,
			);
			expect(page.root).toEqualHtml(`
<ontario-input element-id="ontario-input" caption="{"captionText": "Ontario Input"}" name="ontario-input" class="hydrated">
  <mock:shadow-root>
    <div>
      <label htmlfor="ontario-input" class="ontario-label">
        Ontario Input
        <span class="ontario-label__flag">
          (optional)
        </span>
      </label>
      <ontario-error-message hidden class="hydrated">
        <mock:shadow-root></mock:shadow-root>
      </ontario-error-message>
      <input class="ontario-input" id="ontario-input" name="ontario-input" type="text" value>
    </div>
  </mock:shadow-root>
</ontario-input>
`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await render(`<ontario-input
					name="input-name"
					element-id="input-id"
					value="input value"
					type='tel'
					input-width='7-char-width'
					caption='{"captionText": "Ontario Input"}'
				></ontario-input>`);

			expect(page.instance.name).toBe('input-name');
			expect(page.instance.value).toBe('input value');
			expect(page.instance.elementId).toBe('input-id');
			expect(page.instance.type).toBe('tel');
			expect(page.instance.inputWidth).toBe('7-char-width');
			expect(page.instance.captionState.captionText).toBe('Ontario Input');
		});
	});

	describe('events/methods', () => {
		it('should emit a keyboard event on change', async () => {
			const page = await render(`<ontario-input
					name="input-name"
					element-id="input-id"
				></ontario-input>`);

			const emitSpy = vi.fn();
			const leftArrowKeyCode = 37;
			document.addEventListener('inputOnChange', emitSpy);
			page.instance.handleEvent(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
				'change',
			);
			await page.waitForChanges();
			expect(emitSpy).toHaveBeenCalled();
		});

		// Note: This is skipped until it can be figured out why it doesn't work.
		it.skip('should update the input value on a change event', async () => {
			const page = await render(`<ontario-input
					name="input-name"
					element-id="input-id"
				></ontario-input>`);

			const emitSpy = vi.fn();
			const testValue = 'This is a test';
			const leftArrowKeyCode = 37;
			document.addEventListener('inputOnChange', emitSpy);
			page.instance.value = testValue;
			console.log('value:', page.instance.value);
			page.instance.handleEvent(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
				'change',
			);
			await page.waitForChanges();
			console.log('value2:', page.instance.value);
			expect(emitSpy).toHaveBeenCalled();
			expect(page.instance.value).toBe(testValue);
		});

		it('should return the input id when using the getId method', async () => {
			const page = await render(`<ontario-input
					name="input-name"
					element-id="input-id"
				></ontario-input>`);

			expect(page.instance.getId()).toEqual('input-id');
		});
	});

	describe('form association', () => {
		it('should call setFormValue with the current value when handleValueChange is invoked', async () => {
			const page = await render(`<ontario-input
					name="input-name"
					element-id="input-id"
					value="initial"
					caption='{"captionText": "Ontario Input"}'
				></ontario-input>`);

			const setFormValueSpy = vi.fn();
			page.instance.internals = { setFormValue: setFormValueSpy };
			page.instance.value = 'updated value';
			page.instance.handleValueChange();

			expect(setFormValueSpy).toHaveBeenCalledWith('updated value');
		});

		it('should call setFormValue with an empty string when value is cleared', async () => {
			const page = await render(`<ontario-input
					name="input-name"
					element-id="input-id"
					value="initial"
					caption='{"captionText": "Ontario Input"}'
				></ontario-input>`);

			const setFormValueSpy = vi.fn();
			page.instance.internals = { setFormValue: setFormValueSpy };
			page.instance.value = undefined;
			page.instance.handleValueChange();

			expect(setFormValueSpy).toHaveBeenCalledWith('');
		});
	});
});
