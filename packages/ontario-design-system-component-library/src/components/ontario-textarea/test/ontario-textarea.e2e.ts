import { newE2EPage } from '@stencil/core/testing';

describe('ontario-textarea', () => {
	describe('render', () => {
		it('renders', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea'></ontario-textarea>");
			const component = await page.find('ontario-textarea');
			const element = await page.find('ontario-textarea >>> textarea');

			expect(component).toHaveClass('hydrated');
			expect(element).toHaveClass('ontario-textarea');
			expect(element).toEqualAttributes({
				'name': 'ontario-textarea'
			});
		});

		it('renders changes to the textarea', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea'></ontario-textarea>");
			const component = await page.find('ontario-textarea');
			const element = await page.find('ontario-textarea >>> textarea');

			component.setProperty('describedBy', 'ontario-textarea-hint');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				'name': 'ontario-textarea',
				'aria-describedby': 'ontario-textarea-hint'
			});

			component.setProperty('textareaId', 'ontario-textarea-id');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				'name': 'ontario-textarea',
				'aria-describedby': 'ontario-textarea-hint',
				'id': 'ontario-textarea-id'
			});

			component.setAttribute('value', 'This is a test');
			await page.waitForChanges();
			const value = component.getAttribute('value');
			expect(value).toEqual('This is a test');

			component.setAttribute('required', true);
			await page.waitForChanges();
			const required = component.getAttribute('required');
			expect(required).toBeTruthy();
		});
	});

	describe('events/methods', () => {
		it('fires the onBlur event', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea'></ontario-textarea>");
			const blurEvent = await page.spyOnEvent('onBlur');
			const component = await page.find('ontario-textarea');

			component.triggerEvent('onBlur');
			await page.waitForChanges();
			expect(blurEvent).toHaveReceivedEventTimes(1);
		});

		it('fires the onFocus event', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea'></ontario-textarea>");
			const focusEvent = await page.spyOnEvent('onFocus');
			const component = await page.find('ontario-textarea');

			component.triggerEvent('onFocus');
			await page.waitForChanges();
			expect(focusEvent).toHaveReceivedEventTimes(1);
		});

		it('fires the onChange event', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea'></ontario-textarea>");
			const changeEvent = await page.spyOnEvent('onChange');
			const component = await page.find('ontario-textarea');

			component.triggerEvent('onChange');
			await page.waitForChanges();
			expect(changeEvent).toHaveReceivedEventTimes(1);
		});
	});ß
});
