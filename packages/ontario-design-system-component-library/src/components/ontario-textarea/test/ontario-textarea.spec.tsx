import { render } from '@stencil/vitest';

describe('ontario-textarea', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await render(
				`<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" caption='{"captionText": "Ontario Textarea"}'></ontario-textarea>`,
			);
			expect(page.root).toMatchSnapshot();
		});
	});

	describe('render', () => {
		it('should render a default textarea element', async () => {
			const page = await render(
				`<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" caption='{"captionText": "Ontario Textarea"}'></ontario-textarea>`,
			);
			expect(page.root).toEqualHtml(`
<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" caption="{"captionText": "Ontario Textarea"}" class="hydrated">
  <mock:shadow-root>
    <div>
      <label htmlfor="ontario-textarea" class="ontario-label">
        Ontario Textarea
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
      <textarea class="ontario-textarea" id="ontario-textarea" name="ontario-textarea" value></textarea>
    </div>
  </mock:shadow-root>
</ontario-textarea>
`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					value="textarea value"
					caption='{"captionText": "Ontario Textarea"}'
				></ontario-textarea>`);

			expect(page.instance.name).toBe('textarea-name');
			expect(page.instance.value).toBe('textarea value');
			expect(page.instance.elementId).toBe('textarea-id');
			expect(page.instance.captionState.captionText).toBe('Ontario Textarea');
		});
	});

	describe('events/methods', () => {
		it('should emit a keyboard event on change', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`);

			const emitSpy = vi.fn();
			document.addEventListener('inputOnChange', emitSpy);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = 'Changed via textarea';
			textarea.dispatchEvent(new Event('change'));
			await page.waitForChanges();
			expect(emitSpy).toHaveBeenCalled();
		});

		it('should update the textarea value on a change event', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`);

			const emitSpy = vi.fn();
			const testValue = 'This is a test';
			document.addEventListener('inputOnChange', emitSpy);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = testValue;
			textarea.dispatchEvent(new Event('change'));
			await page.waitForChanges();
			expect(page.instance.value).toBe(testValue);
		});

		it('should keep the host value in sync on input events', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = 'Typing into the textarea';
			textarea.dispatchEvent(new Event('input'));

			await page.waitForChanges();

			expect(page.instance.value).toBe('Typing into the textarea');
			expect((page.root as HTMLOntarioTextareaElement).value).toBe('Typing into the textarea');
		});

		it('should reflect external value updates in the rendered textarea', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					element-id="textarea-id"
					value="Initial value"
					caption="Ontario Textarea"
				></ontario-textarea>`);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
			expect(textarea.getAttribute('value')).toBe('Initial value');

			(page.root as HTMLOntarioTextareaElement).value = 'Updated externally';
			await page.waitForChanges();

			expect(textarea.getAttribute('value')).toBe('Updated externally');
		});

		it('should expose the updated host value from the synthetic change event', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`);

			const emitSpy = vi.fn();
			page.root?.addEventListener('change', emitSpy);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = 'Committed textarea value';
			textarea.dispatchEvent(new Event('change'));

			await page.waitForChanges();

			expect(page.instance.value).toBe('Committed textarea value');
			expect((page.root as HTMLOntarioTextareaElement).value).toBe('Committed textarea value');
			expect(emitSpy).toHaveBeenCalledTimes(1);
			expect((emitSpy.mock.calls[0][0].target as HTMLOntarioTextareaElement).value).toBe('Committed textarea value');
		});

		it('should return the textarea id when using the getId method', async () => {
			const page = await render(`<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`);

			expect(page.instance.getId()).toEqual('textarea-id');
		});
	});
});
