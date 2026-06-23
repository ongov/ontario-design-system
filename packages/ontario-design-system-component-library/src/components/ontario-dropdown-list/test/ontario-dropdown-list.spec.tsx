import { render } from '@stencil/vitest';

describe('ontario-dropdown-list', () => {
	describe('render', () => {
		it('should render a dropdown list element', async () => {
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }]'></ontario-dropdown-list>`,
			);
			expect(page.root).toEqualHtml(`
<ontario-dropdown-list element-id="dropdown-list" options="[{ "value": "dropdown-option-1", "label": "Option 1" }]" class="hydrated">
  <mock:shadow-root>
    <div>
      <label htmlfor="dropdown-list" class="ontario-label">
        <span class="ontario-label__flag">
          (optional)
        </span>
      </label>
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
      <select class="ontario-input ontario-dropdown" id="dropdown-list">
        <option value="dropdown-option-1" selected>
          Option 1
        </option>
      </select>
    </div>
  </mock:shadow-root>
</ontario-dropdown-list>
`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await render(`<ontario-dropdown-list
                  name="dropdown-options"
                  element-id="dropdown-list",
                  is-empty-start-option="Please select"
                  caption='{"captionText": "Label"}'
				  options='[{ "value": "dropdown-option-1", "label": "Option 1" }]'
				></ontario-dropdown-list>`);

			expect(page.instance.name).toBe('dropdown-options');
			expect(page.instance.elementId).toBe('dropdown-list');
			expect(page.instance.isEmptyStartOption).toBe('Please select');
			expect(page.instance.captionState.captionText).toBe('Label');
			expect(page.instance.options).toBe('[{ "value": "dropdown-option-1", "label": "Option 1" }]');
		});

		it('should keep the host value empty when the start option is shown first', async () => {
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" is-empty-start-option="Please select" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			const startOption = select.querySelector('option') as HTMLOptionElement;

			expect(page.root?.value).toBe('');
			expect(startOption.getAttribute('value')).toBe('');
		});

		it('should warn and fall back when the provided value does not match an option', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" value="missing-option" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			expect(page.root?.value).toBe('dropdown-option-1');
			expect(warnSpy).toHaveBeenCalled();

			warnSpy.mockRestore();
		});

		it('should apply the provided value over selected option flags', async () => {
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" value="dropdown-option-2" options='[{ "value": "dropdown-option-1", "label": "Option 1", "selected": true }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			const options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			expect(page.root?.value).toBe('dropdown-option-2');
			expect(options[0].hasAttribute('selected')).toBe(false);
			expect(options[1].getAttribute('selected')).toBe('');
		});

		it('should keep the host value in sync with the selected option', async () => {
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			select.value = 'dropdown-option-2';
			select.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
			await page.waitForChanges();

			expect(page.root?.value).toBe('dropdown-option-2');
		});

		it('should reflect external value updates in the rendered select', async () => {
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" value="dropdown-option-1" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
			let options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];
			expect(options[0].getAttribute('selected')).toBe('');
			expect(options[1].hasAttribute('selected')).toBe(false);

			(page.root as HTMLOntarioDropdownListElement).value = 'dropdown-option-2';
			await page.waitForChanges();
			options = Array.from(select.querySelectorAll('option')) as HTMLOptionElement[];

			expect(page.root?.value).toBe('dropdown-option-2');
			expect(options[0].hasAttribute('selected')).toBe(false);
			expect(options[1].getAttribute('selected')).toBe('');
		});

		it('should emit a host input event with the current value in detail', async () => {
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const onInput = vi.fn();
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
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const onChange = vi.fn();
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
			const page = await render(
				`<ontario-dropdown-list element-id="dropdown-list" options='[{ "value": "dropdown-option-1", "label": "Option 1" }, { "value": "dropdown-option-2", "label": "Option 2" }]'></ontario-dropdown-list>`,
			);

			const onDropdownChange = vi.fn();
			document.addEventListener('dropdownOnChange', onDropdownChange);

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
