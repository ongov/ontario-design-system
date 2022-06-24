import {
	newE2EPage
} from '@stencil/core/testing';

describe('ontario-textarea', () => {
	describe('render', () => {
		it('renders', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea' label-caption='Ontario Textarea' label-type='default'></ontario-textarea>");
			const component = await page.find('ontario-textarea');
			const element = await page.find('ontario-textarea >>> textarea');

			expect(component).toHaveClass('hydrated');
			expect(element).toHaveClass('ontario-textarea');
			expect(element).toEqualAttributes({
				'name': 'ontario-textarea'
			});
		});
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent("<ontario-textarea name='ontario-textarea' label-caption='Ontario Textarea'  label-type='default'></ontario-textarea>");
			component = await page.find('ontario-textarea');
			element = await page.find('ontario-textarea >>> textarea');
		});

		it('renders changes to the aria-describedby property', async () => {
			component.setProperty('describedBy', 'ontario-textarea-hint');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				'name': 'ontario-textarea',
				'aria-describedby': 'ontario-textarea-hint'
			});
		});

		it('renders changes to the id property', async () => {
			component.setProperty('elementId', 'ontario-textarea-id');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				'name': 'ontario-textarea',
				'id': 'ontario-textarea-id'
			});
		})

		it('renders changes to the value attribute', async () => {
			component.setAttribute('value', 'This is a test');
			await page.waitForChanges();
			const value = component.getAttribute('value');
			expect(value).toEqual('This is a test');
		});

		it('renders changes to the required attribute', async () => {
			component.setAttribute('required', true);
			await page.waitForChanges();
			const required = component.getAttribute('required');
			expect(required).toBeTruthy();
		});
	});
});

describe('events/methods', () => {
	it('fires the onBlur event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' label-caption='Ontario Textarea'  label-type='default'></ontario-textarea>");
		const blurEvent = await page.spyOnEvent('onBlur');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('onBlur');
		await page.waitForChanges();
		expect(blurEvent).toHaveReceivedEventTimes(1);
	});

	it('fires the onFocus event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' label-caption='Ontario Textarea'  label-type='default'></ontario-textarea>");
		const focusEvent = await page.spyOnEvent('onFocus');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('onFocus');
		await page.waitForChanges();
		expect(focusEvent).toHaveReceivedEventTimes(1);
	});

	it('fires the onChange event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-textarea name='ontario-textarea' label-caption='Ontario Textarea'  label-type='default'></ontario-textarea>");
		const changeEvent = await page.spyOnEvent('onChange');
		const component = await page.find('ontario-textarea');

		component.triggerEvent('onChange');
		await page.waitForChanges();
		expect(changeEvent).toHaveReceivedEventTimes(1);
	});
});
