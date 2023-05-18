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
						<div class="ontario-form-group">
							<label htmlfor="ontario-textarea" class="ontario-label">
								Ontario Textarea
								<span class="ontario-label__flag">
									(optional)
								</span>
							</label>
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
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('inputOnChange', emitSpy);
			page.rootInstance.handleEvent(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
				'change',
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
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			const emitSpy = jest.fn();
			const testValue = 'This is a test';
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('inputOnChange', emitSpy);
			page.rootInstance.value = testValue;
			page.rootInstance.handleEvent(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
				'change',
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
					caption="Ontario Textarea"
				></ontario-textarea>`,
			});

			expect(page.rootInstance.getId()).toEqual('textarea-id');
		});
	});
});
