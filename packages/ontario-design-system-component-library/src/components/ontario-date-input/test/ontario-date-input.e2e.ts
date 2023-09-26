import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('ontario-date-input', () => {
	describe('renders in default state', () => {
		let page: E2EPage;
		let component: E2EElement;
		let fieldSet: E2EElement;
		let inputFields: E2EElement[];

		beforeEach(async () => {
			page = await newE2EPage();
			await page.setContent('<ontario-date-input element-id="date-id-example"></ontario-date-input>');

			component = await page.find('ontario-date-input');
			fieldSet = await page.find('ontario-date-input >>> fieldset');
			inputFields = await page.findAll('ontario-date-input >>> input');
		});

		it('should render all three date input fields (i.e day, month and year)', async () => {
			expect(component).toHaveClass('hydrated');
			expect(inputFields.length).toEqual(3);
			expect(inputFields[0].id).toEqual('year-date-id-example');
			expect(inputFields[1].id).toEqual('month-date-id-example');
			expect(inputFields[2].id).toEqual('day-date-id-example');
		});

		it('should render error message in hidden state', async () => {
			const errorContainer = await fieldSet.find('.ontario-error__hidden');
			expect(errorContainer).not.toBeNull();
		});
	});

	describe('testing events/methods', () => {
		it('fires the onBlur event', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-date-input></ontario-date-input>');
			const blurEvent = await page.spyOnEvent('inputOnBlur');
			const component = await page.find('ontario-date-input');

			component.triggerEvent('inputOnBlur');
			await page.waitForChanges();
			expect(blurEvent).toHaveReceivedEventTimes(1);
		});

		it('fires the onFocus event', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-date-input></ontario-date-input>');
			const focusEvent = await page.spyOnEvent('inputOnFocus');
			const component = await page.find('ontario-date-input');

			component.triggerEvent('inputOnFocus');
			await page.waitForChanges();
			expect(focusEvent).toHaveReceivedEventTimes(1);
		});

		it('fires the onChange event', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-date-input></ontario-date-input>');
			const changeEvent = await page.spyOnEvent('inputOnChange');
			const component = await page.find('ontario-date-input');

			component.triggerEvent('inputOnChange');
			await page.waitForChanges();
			expect(changeEvent).toHaveReceivedEventTimes(1);
		});
	});
});
