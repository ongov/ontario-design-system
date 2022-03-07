import { newSpecPage } from '@stencil/core/testing';
import { OntarioTextarea } from '../ontario-textarea';

describe('ontario-textarea', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" label-caption="Ontario Textarea"></ontario-textarea>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	describe('render', () => {
		it('should render a default textarea element', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" label-caption="Ontario Textarea"></ontario-textarea>`,
			});
			expect(page.root).toEqualHtml(`
				<ontario-textarea name="ontario-textarea" element-id="ontario-textarea" label-caption="Ontario Textarea">
					<mock:shadow-root>
						<div>
							<label htmlfor="ontario-textarea" class="ontario-label">
								Ontario Textarea
								<span class="ontario-label__flag">(optional)</span>
							</label>
							<slot name="hint-text"></slot>
							<textarea class="ontario-textarea" id="ontario-textarea" name="ontario-textarea" value=""></textarea>
							<slot name="hint-expander"></slot>
						</div>
					</mock:shadow-root>
				</ontario-textarea>
			`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
									described-by="textarea-hint-id"
									name="textarea-name"
									required="true"
									element-id="textarea-id"
									value="textarea value"
									label-caption="Ontario Textarea"
								></ontario-textarea>`,
			});

			expect(page.rootInstance.describedBy).toBe('textarea-hint-id');
			expect(page.rootInstance.name).toBe('textarea-name');
			expect(page.rootInstance.required).toBe(true);
			expect(page.rootInstance.value).toBe('textarea value');
			expect(page.rootInstance.elementId).toBe('textarea-id');
			expect(page.rootInstance.focused).toBe(false);
			expect(page.rootInstance.labelCaption).toBe('Ontario Textarea');
		});
	});

	describe('events/methods', () => {
		it('should handle focus with right focused state', async () => {
			const textarea = new OntarioTextarea();
			textarea.handleFocus();
			expect(textarea.focused).toBeTruthy();
		});

		it('should handle blur with right focused state', async () => {
			const textarea = new OntarioTextarea();
			textarea.focused = true;
			textarea.handleBlur();
			expect(textarea.focused).toBeFalsy();
		});

		it('should emit a keyboard event on change', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
									name="textarea-name"
									required="true"
									element-id="textarea-id"
								></ontario-textarea>`,
			});

			const emitSpy = jest.fn();
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('changeEvent', emitSpy);
			page.rootInstance.handleChange(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
			);
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
								></ontario-textarea>`,
			});

			const emitSpy = jest.fn();
			const testValue = 'This is a test';
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('changeEvent', emitSpy);
			page.rootInstance.value = testValue;
			page.rootInstance.handleChange(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
			);
			await page.waitForChanges();
			expect(page.rootInstance.value).toBe(testValue);
		});

		it('should return the textarea id when using the getId method', async () => {
			const page = await newSpecPage({
				components: [OntarioTextarea],
				html: `<ontario-textarea
									name="textarea-name"
									required="true"
									element-id="textarea-id"
								></ontario-textarea>`,
			});

			expect(page.rootInstance.getId()).toEqual('textarea-id');
		});
	});
});