import { expect, Locator } from '@playwright/test';
import { test, EventSpy } from '@stencil/playwright';

test.describe('ontario-checkboxes', () => {
	let host: Locator;
	let checkboxes: Locator;
	let labels: Locator;
	let changeSpy: EventSpy;
	let checkboxOnChangeSpy: EventSpy;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-checkboxes
				name="checkbox-group"
				options='[
					{ "value": "checkbox-option-1", "elementId": "checkbox-1", "label": "Checkbox option 1 label" },
					{ "value": "checkbox-option-2", "elementId": "checkbox-2", "label": "Checkbox option 2 label" }
				]'
			></ontario-checkboxes>
		`);
		await page.waitForChanges();

		host = page.locator('ontario-checkboxes').first();
		checkboxes = host.locator('input[type="checkbox"]');
		labels = host.locator('.ontario-checkboxes__label');
		changeSpy = await page.spyOnEvent('change');
		checkboxOnChangeSpy = await page.spyOnEvent('checkboxOnChange');
	});

	test('updates the component value and emits host/custom change details when checkboxes are toggled', async ({
		page,
	}) => {
		await labels.nth(0).click();
		await page.waitForChanges();
		await labels.nth(1).click();
		await page.waitForChanges();

		expect(await host.evaluate((element: HTMLOntarioCheckboxesElement) => element.value)).toEqual([
			'checkbox-option-1',
			'checkbox-option-2',
		]);
		await expect(changeSpy).toHaveReceivedEventDetail({
			value: ['checkbox-option-1', 'checkbox-option-2'],
		});
		expect(checkboxOnChangeSpy.events.length).toBeGreaterThan(0);
		expect(checkboxOnChangeSpy.events[checkboxOnChangeSpy.events.length - 1].detail).toEqual({
			checked: true,
			id: 'checkbox-2',
			value: 'checkbox-option-2',
		});
	});

	test('updates the component value and emits host/custom change details when a checkbox is unchecked', async ({
		page,
	}) => {
		await labels.nth(0).click();
		await page.waitForChanges();
		await labels.nth(1).click();
		await page.waitForChanges();
		await labels.nth(1).click();
		await page.waitForChanges();

		expect(await host.evaluate((element: HTMLOntarioCheckboxesElement) => element.value)).toEqual([
			'checkbox-option-1',
		]);
		await expect(changeSpy).toHaveReceivedEventDetail({
			value: ['checkbox-option-1'],
		});
		expect(checkboxOnChangeSpy.events.length).toBeGreaterThan(0);
		expect(checkboxOnChangeSpy.events[checkboxOnChangeSpy.events.length - 1].detail).toEqual({
			checked: false,
			id: 'checkbox-2',
			value: 'checkbox-option-2',
		});
	});

	test('applies external value updates to the rendered checkbox selection', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioCheckboxesElement) => {
			element.value = ['checkbox-option-2'];
		});
		await page.waitForChanges();

		await expect(checkboxes.nth(0)).not.toBeChecked();
		await expect(checkboxes.nth(1)).toBeChecked();
	});
});

// import { newE2EPage } from '@stencil/core/testing';

// describe('ontario-checkboxes', () => {
// 	it('renders checkbox', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-checkboxes></ontario-checkboxes>');
// 		const component = await page.find('ontario-checkboxes');
// 		expect(component).toHaveClass('hydrated');
// 	});
// });

// describe('events', () => {
// 	it('fires the onChange event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-checkboxes></ontario-checkboxes>');
// 		const changeEvent = await page.spyOnEvent('change');
// 		const component = await page.find('ontario-checkboxes');

// 		component.triggerEvent('change');
// 		await page.waitForChanges();
// 		expect(changeEvent).toHaveReceivedEventTimes(1);
// 	});
// });
