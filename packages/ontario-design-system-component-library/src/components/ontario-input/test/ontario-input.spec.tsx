import {
	newSpecPage
} from '@stencil/core/testing';
import {
	OntarioInput
} from '../ontario-input';

describe('ontario-input', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input name="ontario-input" input-id="ontario-input"></ontario-input>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	describe('render', () => {
		it('should render a default input element', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input name="ontario-input" input-id="ontario-input"></ontario-input>`,
			});
			expect(page.root).toEqualHtml(`
				<ontario-input name="ontario-input" input-id="ontario-input">
					<mock:shadow-root>
					<input type='text' class="ontario-input" id="ontario-input" name="ontario-input" value=""></input>
					</mock:shadow-root>
				</ontario-input>
			`);
		});

		it('should reflect attributes/props being set', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
									described-by="input-hint-id"
									name="input-name"
									required="true"
									input-id="input-id"
									value="input value"
									type='tel'
									input-width='7-char-width'
								></ontario-input>`,
			});

			expect(page.rootInstance.describedBy).toBe('input-hint-id')
			expect(page.rootInstance.name).toBe('input-name');
			expect(page.rootInstance.required).toBe(true);
			expect(page.rootInstance.value).toBe('input value');
			expect(page.rootInstance.inputId).toBe('input-id');
			expect(page.rootInstance.type).toBe('tel');
			expect(page.rootInstance.inputWidth).toBe('7-char-width');
			expect(page.rootInstance.focused).toBe(false);
		});
	})

	describe('events/methods', () => {
		it('should handle focus with right focused state', async () => {
			const input = new OntarioInput();
			input.handleFocus();
			expect(input.focused).toBeTruthy();
		});

		it('should handle blur with right focused state', async () => {
			const input = new OntarioInput();
			input.focused = true;
			input.handleBlur();
			expect(input.focused).toBeFalsy();
		});

		it('should emit a keyboard event on change', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
									name="input-name"
									input-id="input-id"
								></ontario-input>`,
			});

			const emitSpy = jest.fn();
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('changeEvent', emitSpy);
			page.rootInstance.handleChange(new KeyboardEvent('keydown', {
				'keyCode': leftArrowKeyCode
			}));
			await page.waitForChanges();
			expect(emitSpy).toHaveBeenCalled();
		});

		it('should update the input value on a change event', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
									name="input-name"
									input-id="input-id"
								></ontario-input>`,
			});

			const emitSpy = jest.fn();
			const testValue = 'This is a test'
			const leftArrowKeyCode = 37;
			page.doc.addEventListener('changeEvent', emitSpy);
			page.rootInstance.value = testValue;
			page.rootInstance.handleChange(new KeyboardEvent('keydown', {
				'keyCode': leftArrowKeyCode
			}));
			await page.waitForChanges();
			expect(page.rootInstance.value).toBe(testValue);
		})

		it('should return the input id when using the getId method', async () => {
			const page = await newSpecPage({
				components: [OntarioInput],
				html: `<ontario-input
									name="input-name"
									input-id="input-id"
								></ontario-input>`,
			});

			expect(page.rootInstance.getId()).toEqual('input-id');
		});
	})

});
