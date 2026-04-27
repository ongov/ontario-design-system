import { expect, Locator } from '@playwright/test';
import { test, EventSpy } from '@stencil/playwright';

test.describe('ontario-radio-buttons', () => {
	let host: Locator;
	let radios: Locator;
	let labels: Locator;
	let changeSpy: EventSpy;
	let radioOnChangeSpy: EventSpy;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-radio-buttons
				name="radio-group"
				options='[
					{ "value": "radio-option-1", "elementId": "radio-1", "label": "Radio option 1 label" },
					{ "value": "radio-option-2", "elementId": "radio-2", "label": "Radio option 2 label" }
				]'
			></ontario-radio-buttons>
		`);
		await page.waitForChanges();

		host = page.locator('ontario-radio-buttons').first();
		radios = host.locator('input[type="radio"]');
		labels = host.locator('.ontario-radios__label');
		changeSpy = await page.spyOnEvent('change');
		radioOnChangeSpy = await page.spyOnEvent('radioOnChange');
	});

	test('updates the component value and emits host/custom change details when a radio is selected', async ({
		page,
	}) => {
		await labels.nth(1).click();
		await page.waitForChanges();

		await expect(changeSpy).toHaveReceivedEventDetail({
			value: 'radio-option-2',
		});
		await expect(radioOnChangeSpy).toHaveReceivedEventDetail({
			checked: true,
			id: 'radio-2',
			value: 'radio-option-2',
		});
		expect(await host.evaluate((element: HTMLOntarioRadioButtonsElement) => element.value)).toBe('radio-option-2');
	});

	test('applies external value updates to the rendered radio selection', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioRadioButtonsElement) => {
			element.value = 'radio-option-2';
		});
		await page.waitForChanges();

		await expect(radios.nth(0)).not.toBeChecked();
		await expect(radios.nth(1)).toBeChecked();
	});
});

// import { newE2EPage } from '@stencil/core/testing';

// describe('ontario-radio-buttons', () => {
// 	it('renders', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-radio-buttons></ontario-radio-buttons>');

// 		const element = await page.find('ontario-radio-buttons');
// 		expect(element).toHaveClass('hydrated');
// 	});
// });

// describe('events', () => {
// 	it('fires the onChange event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-radio-buttons></ontario-radio-buttons>');
// 		const changeEvent = await page.spyOnEvent('change');
// 		const component = await page.find('ontario-radio-buttons');

// 		component.triggerEvent('change');
// 		await page.waitForChanges();
// 		expect(changeEvent).toHaveReceivedEventTimes(1);
// 	});
// });
