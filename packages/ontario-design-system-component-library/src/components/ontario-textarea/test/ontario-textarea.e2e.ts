import { newE2EPage } from '@stencil/core/testing';

describe('ontario-textarea', () => {
	describe('render', () => {
		it('renders', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
			const component = await page.find('ontario-textarea');
			const element = await page.find('ontario-textarea >>> textarea');

			expect(component).toHaveClass('hydrated');
			expect(element).toHaveClass('ontario-textarea');
			expect(element).toEqualAttributes({
				name: 'ontario-textarea',
			});
		});
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
			component = await page.find('ontario-textarea');
			element = await page.find('ontario-textarea >>> textarea');
		});

		it('renders changes to the id property', async () => {
			component.setProperty('elementId', 'ontario-textarea-id');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				name: 'ontario-textarea',
				id: 'ontario-textarea-id',
			});
		});

		it('renders changes to the value attribute', async () => {
			component.setAttribute('value', 'This is a test');
			await page.waitForChanges();
			const value = component.getAttribute('value');
			expect(value).toEqual('This is a test');
		});
	});
});

describe('events/methods', () => {
	it('fires the inputOnBlur event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
		const blurEvent = await page.spyOnEvent('inputOnBlur');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('inputOnBlur');
		await page.waitForChanges();
		expect(blurEvent).toHaveReceivedEventTimes(1);
	});

	it('fires the inputOnFocus event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
		const focusEvent = await page.spyOnEvent('inputOnFocus');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('inputOnFocus');
		await page.waitForChanges();
		expect(focusEvent).toHaveReceivedEventTimes(1);
	});

	it('fires the inputOnChange event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
		const changeEvent = await page.spyOnEvent('inputOnChange');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('inputOnChange');
		await page.waitForChanges();
		expect(changeEvent).toHaveReceivedEventTimes(1);
	});

	it('fires the onChange event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' caption='Ontario Textarea'></ontario-textarea>");
		const changeEvent = await page.spyOnEvent('change');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('change');
		await page.waitForChanges();
		expect(changeEvent).toHaveReceivedEventTimes(1);
	});
});
