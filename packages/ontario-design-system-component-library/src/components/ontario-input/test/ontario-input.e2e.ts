import { newE2EPage } from '@stencil/core/testing';

describe('ontario-input', () => {
	describe('render', () => {
		it('renders', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
			const component = await page.find('ontario-input');
			const element = await page.find('ontario-input >>> input');

			expect(component).toHaveClass('hydrated');
			expect(element).toHaveClass('ontario-input');
			expect(element).toEqualAttributes({
				name: 'ontario-input',
			});
		});
	});

	describe('render changes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
			component = await page.find('ontario-input');
			element = await page.find('ontario-input >>> input');
		});

		it('renders changes to the id property', async () => {
			component.setProperty('elementId', 'ontario-input-id');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				name: 'ontario-input',
				type: 'text',
				id: 'ontario-input-id',
			});
		});

		it('renders changes to the type property', async () => {
			component.setProperty('type', 'tel');
			await page.waitForChanges();
			expect(element).toEqualAttributes({
				name: 'ontario-input',
				type: 'tel',
			});
		});

		it('renders changes to the value attribute', async () => {
			component.setAttribute('value', 'This is a test');
			await page.waitForChanges();
			const value = component.getAttribute('value');
			expect(value).toEqual('This is a test');
		});
	});

	describe('render CSS classes', () => {
		let page: any;
		let component: any;
		let element: any;

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
			component = await page.find('ontario-input');
			element = await page.find('ontario-input >>> input');
		});

		it('should render the 2-char-width class when the inputWidth prop is two characters', async () => {
			component.setProperty('inputWidth', '2-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--2-char-width']);
		});

		it('should render the 3-char-width class when the inputWidth prop is three characters', async () => {
			component.setProperty('inputWidth', '3-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--3-char-width']);
		});

		it('should render the 4-char-width class when the inputWidth prop is four characters', async () => {
			component.setProperty('inputWidth', '4-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--4-char-width']);
		});

		it('should render the 5-char-width class when the inputWidth prop is five characters', async () => {
			component.setProperty('inputWidth', '5-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--5-char-width']);
		});

		it('should render the 7-char-width class when the inputWidth prop is seven characters', async () => {
			component.setProperty('inputWidth', '7-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--7-char-width']);
		});

		it('should render the 10-char-width class when the inputWidth prop is ten characters', async () => {
			component.setProperty('inputWidth', '10-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--10-char-width']);
		});

		it('should render the 20-char-width class when the inputWidth prop is twenty characters', async () => {
			component.setProperty('inputWidth', '20-char-width');
			await page.waitForChanges();
			expect(element).toHaveClasses(['ontario-input', 'ontario-input--20-char-width']);
		});

		it('should render only the `ontario-input` class when no inputWidth prop is defined', async () => {
			await page.waitForChanges();
			expect(element).toHaveClass('ontario-input');
		});
	});

	describe('events/methods', () => {
		it('fires the onBlur event', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
			const blurEvent = await page.spyOnEvent('inputOnBlur');
			const component = await page.find('ontario-input');

			component.triggerEvent('inputOnBlur');
			await page.waitForChanges();
			expect(blurEvent).toHaveReceivedEventTimes(1);
		});

		it('fires the onFocus event', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
			const focusEvent = await page.spyOnEvent('inputOnFocus');
			const component = await page.find('ontario-input');

			component.triggerEvent('inputOnFocus');
			await page.waitForChanges();
			expect(focusEvent).toHaveReceivedEventTimes(1);
		});

		it('fires the onChange event', async () => {
			const page = await newE2EPage();
			await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
			const changeEvent = await page.spyOnEvent('inputOnChange');
			const component = await page.find('ontario-input');

			component.triggerEvent('inputOnChange');
			await page.waitForChanges();
			expect(changeEvent).toHaveReceivedEventTimes(1);
		});
	});
});

describe('events', () => {
	it('fires the onChange event', async () => {
		const page = await newE2EPage();
		await page.setContent("<ontario-input name='ontario-input'></ontario-input>");
		const changeEvent = await page.spyOnEvent('change');
		const component = await page.find('ontario-input');

		component.triggerEvent('change');
		await page.waitForChanges();
		expect(changeEvent).toHaveReceivedEventTimes(1);
	});
});
