import { expect, Locator } from '@playwright/test';
import { test, EventSpy } from '@stencil/playwright';

test.describe('ontario-dropdown-list', () => {
	let host: Locator;
	let select: Locator;
	let changeSpy: EventSpy;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-dropdown-list
				name="dropdown-options"
				element-id="dropdown-list"
				options='[
					{ "value": "dropdown-option-1", "label": "Option 1" },
					{ "value": "dropdown-option-2", "label": "Option 2" }
				]'
			></ontario-dropdown-list>
		`);
		await page.waitForChanges();

		host = page.locator('ontario-dropdown-list').first();
		select = host.locator('select').first();
		changeSpy = await page.spyOnEvent('change');
	});

	test('updates the component value and emits change detail when an option is selected', async ({ page }) => {
		await select.selectOption('dropdown-option-2');
		await page.waitForChanges();

		await expect(changeSpy).toHaveReceivedEvent();
		await expect(changeSpy).toHaveReceivedEventDetail({
			value: 'dropdown-option-2',
		});
		expect(await host.evaluate((element: HTMLOntarioDropdownListElement) => element.value)).toBe('dropdown-option-2');
	});

	test('applies external value updates to the rendered selection', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioDropdownListElement) => {
			element.value = 'dropdown-option-2';
		});
		await page.waitForChanges();

		await expect(select).toHaveValue('dropdown-option-2');
		expect(await host.evaluate((element: HTMLOntarioDropdownListElement) => element.value)).toBe('dropdown-option-2');
	});
});

test.describe('ontario-dropdown-list - ontario-dropdown-option children', () => {
	test('renders ontario-dropdown-option children as native option elements', async ({ page }) => {
		await page.setContent(`
			<ontario-dropdown-list name="dropdown-options" element-id="dropdown-list">
				<ontario-dropdown-option value="dropdown-option-1">Option 1</ontario-dropdown-option>
				<ontario-dropdown-option value="dropdown-option-2">Option 2</ontario-dropdown-option>
			</ontario-dropdown-list>
		`);
		await page.waitForChanges();

		const select = page.locator('ontario-dropdown-list select').first();
		const options = select.locator('option');

		await expect(options).toHaveCount(2);
		await expect(options.nth(0)).toHaveText('Option 1');
		await expect(options.nth(1)).toHaveText('Option 2');
	});

	test('respects the selected attribute on an ontario-dropdown-option child', async ({ page }) => {
		await page.setContent(`
			<ontario-dropdown-list name="dropdown-options" element-id="dropdown-list">
				<ontario-dropdown-option value="dropdown-option-1">Option 1</ontario-dropdown-option>
				<ontario-dropdown-option value="dropdown-option-2" selected>Option 2</ontario-dropdown-option>
			</ontario-dropdown-list>
		`);
		await page.waitForChanges();

		const select = page.locator('ontario-dropdown-list select').first();
		await expect(select).toHaveValue('dropdown-option-2');
	});

	test('options prop takes precedence over ontario-dropdown-option children', async ({ page }) => {
		await page.setContent(`
			<ontario-dropdown-list
				name="dropdown-options"
				element-id="dropdown-list"
				options='[{ "value": "prop-option-1", "label": "Prop Option 1" }]'
			>
				<ontario-dropdown-option value="dropdown-option-1">Option 1</ontario-dropdown-option>
			</ontario-dropdown-list>
		`);
		await page.waitForChanges();

		const select = page.locator('ontario-dropdown-list select').first();
		const options = select.locator('option');

		await expect(options).toHaveCount(1);
		await expect(options.nth(0)).toHaveText('Prop Option 1');
	});
});

// import { newE2EPage } from '@stencil/core/testing';

// describe('ontario-dropdown-list', () => {
// 	it('renders dropdown-list', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-dropdown-list></ontario-dropdown-list>');
// 		const component = await page.find('ontario-dropdown-list');
// 		const element = await page.find('ontario-dropdown-list >>> select');

// 		expect(component).toHaveClass('hydrated');
// 		expect(element).toHaveClasses(['ontario-input', 'ontario-dropdown']);
// 	});

// 	describe('render changes', () => {
// 		let page: any;
// 		let component: any;
// 		let element: any;

// 		beforeEach(async () => {
// 			page = await newE2EPage();
// 			await page.setContent(
// 				`<ontario-dropdown-list
//                   name="dropdown-options"
//                   element-id="dropdown-list",
//                   is-empty-start-option="Please select"
//                   caption='{"captionText": "Label"}'
// 				  options='[{ "value": "dropdown-option-1", "label": "Option 1" }]'
// 				></ontario-dropdown-list>`,
// 			);
// 			component = await page.find('ontario-dropdown-list');
// 			element = await page.find('ontario-dropdown-list >>> select');
// 		});

// 		it('renders changes to the name property', async () => {
// 			component.setProperty('name', 'ontario-dropdown-name');
// 			await page.waitForChanges();
// 			expect(element).toEqualAttributes({
// 				name: 'ontario-dropdown-name',
// 			});
// 		});
// 	});
// });

// describe('events', () => {
// 	it('fires the onChange event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-dropdown-list></ontario-dropdown-list>');
// 		const changeEvent = await page.spyOnEvent('change');
// 		const component = await page.find('ontario-dropdown-list');

// 		component.triggerEvent('change');
// 		await page.waitForChanges();
// 		expect(changeEvent).toHaveReceivedEventTimes(1);
// 	});
// });
