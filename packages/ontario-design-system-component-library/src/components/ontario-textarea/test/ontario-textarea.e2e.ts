import { expect, Locator } from '@playwright/test';
import { test, EventSpy } from '@stencil/playwright';

test.describe('ontario-textarea', () => {
	let host: Locator;
	let textarea: Locator;
	let inputSpy: EventSpy;
	let changeSpy: EventSpy;
	let inputOnInputSpy: EventSpy;
	let inputOnChangeSpy: EventSpy;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-textarea
				name="ontario-textarea"
				element-id="ontario-textarea"
				caption='{"captionText": "Ontario Textarea"}'
			></ontario-textarea>
		`);
		await page.waitForChanges();

		host = page.locator('ontario-textarea').first();
		textarea = host.locator('textarea').first();
		inputSpy = await page.spyOnEvent('input');
		changeSpy = await page.spyOnEvent('change');
		inputOnInputSpy = await page.spyOnEvent('inputOnInput');
		inputOnChangeSpy = await page.spyOnEvent('inputOnChange');
	});

	test('keeps the host value in sync and emits input detail while typing', async ({ page }) => {
		await textarea.click();
		await textarea.pressSequentially('Typed into the textarea');
		await page.waitForChanges();

		await expect(inputSpy).toHaveReceivedEvent();
		await expect(inputOnInputSpy).toHaveReceivedEvent();
		expect(inputOnInputSpy.events.length).toBeGreaterThan(0);
		expect(inputOnInputSpy.events[inputOnInputSpy.events.length - 1].detail).toEqual(
			expect.objectContaining({
				inputType: 'insertText',
			}),
		);
		expect(await host.evaluate((element: HTMLOntarioTextareaElement) => element.value)).toBe('Typed into the textarea');
	});

	test('emits a host change event with the committed value', async ({ page }) => {
		await textarea.click();
		await textarea.pressSequentially('Committed textarea value');
		await page.keyboard.press('Tab');
		await page.waitForChanges();

		await expect(changeSpy).toHaveReceivedEvent();
		await expect(inputOnChangeSpy).toHaveReceivedEvent();
		expect(inputOnChangeSpy.events[inputOnChangeSpy.events.length - 1].detail).toEqual({
			id: 'ontario-textarea',
			value: 'Committed textarea value',
		});
		expect(await host.evaluate((element: HTMLOntarioTextareaElement) => element.value)).toBe(
			'Committed textarea value',
		);
	});

	test('applies external value updates to the rendered textarea', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioTextareaElement) => {
			element.value = 'Updated externally';
		});
		await page.waitForChanges();

		await expect(textarea).toHaveValue('Updated externally');
		expect(await host.evaluate((element: HTMLOntarioTextareaElement) => element.value)).toBe('Updated externally');
	});
});

// import { newE2EPage } from '@stencil/core/testing';

// describe('ontario-textarea', () => {
// 	describe('render', () => {
// 		it('renders', async () => {
// 			const page = await newE2EPage();
// 			await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
// 			const component = await page.find('ontario-textarea');
// 			const element = await page.find('ontario-textarea >>> textarea');

// 			expect(component).toHaveClass('hydrated');
// 			expect(element).toHaveClass('ontario-textarea');
// 			expect(element).toEqualAttributes({
// 				name: 'ontario-textarea',
// 			});
// 		});
// 	});

// 	describe('render changes', () => {
// 		let page: any;
// 		let component: any;
// 		let element: any;

// 		beforeEach(async () => {
// 			page = await newE2EPage();
// 			await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
// 			component = await page.find('ontario-textarea');
// 			element = await page.find('ontario-textarea >>> textarea');
// 		});

// 		it('renders changes to the id property', async () => {
// 			component.setProperty('elementId', 'ontario-textarea-id');
// 			await page.waitForChanges();
// 			expect(element).toEqualAttributes({
// 				name: 'ontario-textarea',
// 				id: 'ontario-textarea-id',
// 			});
// 		});

// 		it('renders changes to the value attribute', async () => {
// 			component.setAttribute('value', 'This is a test');
// 			await page.waitForChanges();
// 			const value = component.getAttribute('value');
// 			expect(value).toEqual('This is a test');
// 		});
// 	});
// });

// describe('events/methods', () => {
// 	it('fires the inputOnBlur event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
// 		const blurEvent = await page.spyOnEvent('inputOnBlur');
// 		const component = await page.find('ontario-textarea');

// 		component.triggerEvent('inputOnBlur');
// 		await page.waitForChanges();
// 		expect(blurEvent).toHaveReceivedEventTimes(1);
// 	});

// 	it('fires the inputOnFocus event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
// 		const focusEvent = await page.spyOnEvent('inputOnFocus');
// 		const component = await page.find('ontario-textarea');

// 		component.triggerEvent('inputOnFocus');
// 		await page.waitForChanges();
// 		expect(focusEvent).toHaveReceivedEventTimes(1);
// 	});

// 	it('fires the inputOnChange event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
// 		const changeEvent = await page.spyOnEvent('inputOnChange');
// 		const component = await page.find('ontario-textarea');

// 		component.triggerEvent('inputOnChange');
// 		await page.waitForChanges();
// 		expect(changeEvent).toHaveReceivedEventTimes(1);
// 	});

// 	it('fires the onChange event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
// 		const changeEvent = await page.spyOnEvent('change');
// 		const component = await page.find('ontario-textarea');

// 		component.triggerEvent('change');
// 		await page.waitForChanges();
// 		expect(changeEvent).toHaveReceivedEventTimes(1);
// 	});
// });
