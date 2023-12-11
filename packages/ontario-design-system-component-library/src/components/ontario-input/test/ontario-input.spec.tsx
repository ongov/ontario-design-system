import { newSpecPage } from '@stencil/core/testing';
import { OntarioInput } from '../ontario-input';

describe('ontario-input', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input element-id="ontario-input" caption='{"captionText": "Ontario Input"}' name="ontario-input"></ontario-input>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	describe('render', () => {
		it('should render a default input element', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input element-id="ontario-input" caption='{"captionText": "Ontario Input"}' name="ontario-input"></ontario-input>`,
			});
			expect(page.root).toEqualHtml(`
				<ontario-input element-id="ontario-input" caption='{"captionText": "Ontario Input"}' name="ontario-input">
					<mock:shadow-root>
						<div class="ontario-form-group">
							<label class="ontario-label" htmlfor="ontario-input">
								Ontario Input
								<span class="ontario-label__flag">
									(optional)
								</span>
							</label>
							<div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
							<input type='text' class="ontario-input" id="ontario-input" name="ontario-input" value=""></input>
						</div>
					</mock:shadow-root>
				</ontario-input>
			`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
					name="input-name"
					element-id="input-id"
					value="input value"
					type='tel'
					input-width='7-char-width'
					caption='{"captionText": "Ontario Input"}'
				></ontario-input>`,
			});

			expect(page.rootInstance.name).toBe('input-name');
			expect(page.rootInstance.value).toBe('input value');
			expect(page.rootInstance.elementId).toBe('input-id');
			expect(page.rootInstance.type).toBe('tel');
			expect(page.rootInstance.inputWidth).toBe('7-char-width');
			expect(page.rootInstance.captionState.captionText).toBe('Ontario Input');
		});
	});

	describe('events/methods', () => {
		it('should emit a keyboard event on change', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
					name="input-name"
					element-id="input-id"
				></ontario-input>`,
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

		// Note: This is skipped until it can be figured out why it doesn't work.
		it.skip('should update the input value on a change event', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
					name="input-name"
					element-id="input-id"
				></ontario-input>`,
			});

			const emitSpy = jest.fn();
			const testValue = 'This is a test';
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('inputOnChange', emitSpy);
			page.rootInstance.value = testValue;
			console.log('value:', page.rootInstance.value);
			page.rootInstance.handleEvent(
				new KeyboardEvent('keydown', {
					keyCode: leftArrowKeyCode,
				}),
				'change',
			);
			await page.waitForChanges();
			console.log('value2:', page.rootInstance.value);
			expect(emitSpy).toHaveBeenCalled();
			expect(page.rootInstance.value).toBe(testValue);
		});

		it('should return the input id when using the getId method', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
					name="input-name"
					element-id="input-id"
				></ontario-input>`,
			});

			expect(page.rootInstance.getId()).toEqual('input-id');
		});
	});
});
