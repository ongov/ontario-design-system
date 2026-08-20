import { test, expect } from '@playwright/test';

test.describe('Ontario Input - caption variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('default input caption - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-default-caption');
		await expect(input).toHaveScreenshot('ontarioInput-defaultCaption.png');
	});

	test('default input caption - focus state', async ({ page }) => {
		const input = page.locator('#ontario-input-default-caption');
		const inputField = input.locator('input');
		await inputField.focus();

		await expect(input).toHaveScreenshot('ontarioInput-defaultCaptionFocus.png');
	});

	test('large input caption - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-large-caption');
		await expect(input).toHaveScreenshot('ontarioInput-largeCaption.png');
	});

	test('heading input caption - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-heading-caption');
		await expect(input).toHaveScreenshot('ontarioInput-headingCaption.png');
	});
});

test.describe('Ontario Input - input-width variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('2 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-2-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-2CharWidth.png');
	});

	test('3 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-3-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-3CharWidth.png');
	});

	test('4 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-4-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-4CharWidth.png');
	});

	test('5 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-5-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-5CharWidth.png');
	});

	test('7 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-7-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-7CharWidth.png');
	});

	test('10 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-10-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-10CharWidth.png');
	});

	test('20 character width', async ({ page }) => {
		const input = page.locator('#ontario-input-20-char-width');
		await expect(input).toHaveScreenshot('ontarioInput-20CharWidth.png');
	});
});

test.describe('Ontario Input - required variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('required input - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-required');
		await expect(input).toHaveScreenshot('ontarioInput-required.png');
	});
});

test.describe('Ontario Input - value variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('input with value set - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-with-value');
		await expect(input).toHaveScreenshot('ontarioInput-withValueSet.png');
	});
});

test.describe('Ontario Input - hint-text variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('hint text set - string', async ({ page }) => {
		const input = page.locator('#ontario-input-with-string-hint-text');
		await expect(input).toHaveScreenshot('ontarioInput-stringHintTextSet.png');
	});

	test('hint text set - html', async ({ page }) => {
		const input = page.locator('#ontario-input-with-html-hint-text');
		await expect(input).toHaveScreenshot('ontarioInput-htmlHintTextSet.png');
	});
});

test.describe('Ontario Input - hint-expander variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('string hint expander - default state', async ({ page }) => {
		const component = page.locator('#ontario-input-with-string-hint-expander');
		await expect(component).toBeVisible();

		await expect(component).toHaveScreenshot('ontarioInput-hintExpanderStringDefault.png');
	});

	test('string hint expander - expanded state', async ({ page }) => {
		const component = page.locator('#ontario-input-with-string-hint-expander');
		await expect(component).toBeVisible();

		const hintExpanderTrigger = component.locator('ontario-hint-expander').getByRole('button');
		await hintExpanderTrigger.click();

		await expect(component).toHaveScreenshot('ontarioInput-hintExpanderStringExpanded.png');
	});

	test('html hint expander - default state', async ({ page }) => {
		const component = page.locator('#ontario-input-with-html-hint-expander');
		await expect(component).toBeVisible();

		await expect(component).toHaveScreenshot('ontarioInput-hintExpanderHtmlDefault.png');
	});

	test('html hint expander - expanded state', async ({ page }) => {
		const component = page.locator('#ontario-input-with-html-hint-expander');
		await expect(component).toBeVisible();

		const hintExpanderTrigger = component.locator('ontario-hint-expander').getByRole('button');
		await hintExpanderTrigger.click();

		await expect(component).toHaveScreenshot('ontarioInput-hintExpanderHtmlExpanded.png');
	});
});

test.describe('Ontario Input - language variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('french (not required) - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-language-french');
		await expect(input).toHaveScreenshot('ontarioInput-languageFrench.png');
	});

	test('french (required) - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-language-french-required');
		await expect(input).toHaveScreenshot('ontarioInput-languageFrenchRequired.png');
	});
});

test.describe('Ontario Input - error-message variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	test('error message set - default state', async ({ page }) => {
		const input = page.locator('#ontario-input-with-error-message');
		await expect(input).toHaveScreenshot('ontarioInput-withErrorMessage.png');
	});

	test('error message set - focus state', async ({ page }) => {
		const input = page.locator('#ontario-input-with-error-message');

		const inputField = input.locator('input');
		await inputField.focus();

		await expect(input).toHaveScreenshot('ontarioInput-withErrorMessageFocus.png');
	});
});
