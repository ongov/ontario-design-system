import { newSpecPage } from '@stencil/core/testing';
import { OntarioTextarea } from '../ontario-textarea';

describe('ontario-textarea', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" caption='{"captionText": "Ontario Textarea"}'></ontario-textarea>`,
			});
			expect(page.root).toMatchSnapshot();
		});
	});

	describe('render', () => {
		it('should render a default textarea element', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" caption='{"captionText": "Ontario Textarea"}'></ontario-textarea>`,
			});
			expect(page.root).toEqualHtml(`
				<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" caption='{"captionText": "Ontario Textarea"}'>
					<mock:shadow-root>
						<div>
							<label htmlfor="ontario-textarea" class="ontario-label">
								Ontario Textarea
								<span class="ontario-label__flag">
									(optional)
								</span>
							</label>
							<div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
							<textarea class="ontario-textarea" id="ontario-textarea" name="ontario-textarea" value=""></textarea>
						</div>
					</mock:shadow-root>
				</ontario-textarea>
			`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					value="textarea value"
					caption='{"captionText": "Ontario Textarea"}'
				></ontario-textarea>`,
			});

			expect(page.rootInstance.name).toBe('textarea-name');
			expect(page.rootInstance.value).toBe('textarea value');
			expect(page.rootInstance.elementId).toBe('textarea-id');
			expect(page.rootInstance.captionState.captionText).toBe('Ontario Textarea');
		});
	});

	describe('events/methods', () => {
		it('should emit a keyboard event on change', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			const emitSpy = jest.fn();
			page.doc.addEventListener('inputOnChange', emitSpy);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = 'Changed via textarea';
			textarea.dispatchEvent(new Event('change'));
			await page.waitForChanges();
			expect(emitSpy).toHaveBeenCalled();
		});

		it('should update the textarea value on a change event', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			const emitSpy = jest.fn();
			const testValue = 'This is a test';
			page.doc.addEventListener('inputOnChange', emitSpy);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = testValue;
			textarea.dispatchEvent(new Event('change'));
			await page.waitForChanges();
			expect(page.rootInstance.value).toBe(testValue);
		});

		it('should keep the host value in sync on input events', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
					name="textarea-name"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = 'Typing into the textarea';
			textarea.dispatchEvent(new Event('input'));

			await page.waitForChanges();

			expect(page.rootInstance.value).toBe('Typing into the textarea');
			expect((page.root as HTMLOntarioTextareaElement).value).toBe('Typing into the textarea');
		});

		it('should expose the updated host value from the synthetic change event', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
					name="textarea-name"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			const emitSpy = jest.fn();
			page.root?.addEventListener('change', emitSpy);

			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			textarea.value = 'Committed textarea value';
			textarea.dispatchEvent(new Event('change'));

			await page.waitForChanges();

			expect(page.rootInstance.value).toBe('Committed textarea value');
			expect((page.root as HTMLOntarioTextareaElement).value).toBe('Committed textarea value');
			expect(emitSpy).toHaveBeenCalledTimes(1);
			expect((emitSpy.mock.calls[0][0].target as HTMLOntarioTextareaElement).value).toBe('Committed textarea value');
		});

		it('should return the textarea id when using the getId method', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
					name="textarea-name"
					required="true"
					element-id="textarea-id"
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			expect(page.rootInstance.getId()).toEqual('textarea-id');
		});
	});
});
