import { test, expect } from '@playwright/test';

test.describe('Ontario Button - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - default state', async ({ page }) => {
		const primaryButton = page.locator('#ontario-button-primary');
		await expect(primaryButton).toHaveScreenshot('ontarioButtonPrimary.png');
	});

	test('secondary button - default state', async ({ page }) => {
		const secondaryButton = page.locator('#ontario-button-secondary');
		await expect(secondaryButton).toHaveScreenshot('ontarioButtonSecondary.png');
	});

	test('tertiary button - default state', async ({ page }) => {
		const tertiaryButton = page.locator('#ontario-button-tertiary');
		await expect(tertiaryButton).toHaveScreenshot('ontarioButtonTertiary.png');
	});
});

test.describe('Ontario Button - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - focus state', async ({ page }) => {
		await page.keyboard.press('Tab');

		const button = page.locator('#ontario-button-primary');
		await expect(button).toBeFocused();
		await expect(button).toHaveScreenshot('ontarioButtonPrimary-focus.png');
	});

	test('secondary button - focus state', async ({ page }) => {
		// Two tabs to ensure second button is focused
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');

		const button = page.locator('#ontario-button-secondary');
		await expect(button).toBeFocused();
		await expect(button).toHaveScreenshot('ontarioButtonSecondary-focus.png');
	});

	test('tertiary button - focus state', async ({ page }) => {
		// Three tabs to ensure third button is focused
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');

		const button = page.locator('#ontario-button-tertiary');
		await expect(button).toBeFocused();
		await expect(button).toHaveScreenshot('ontarioButtonTertiary-focus.png');
	});
});

test.describe('Ontario Button - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - hover state', async ({ page }) => {
		const button = page.locator('#ontario-button-primary');
		await button.hover();
		await expect(button).toHaveScreenshot('ontarioButtonPrimary-hover.png');
	});

	test('secondary button - hover state', async ({ page }) => {
		const button = page.locator('#ontario-button-secondary');
		await button.hover();
		await expect(button).toHaveScreenshot('ontarioButtonSecondary-hover.png');
	});

	test('tertiary button - hover state', async ({ page }) => {
		const button = page.locator('#ontario-button-tertiary');
		await button.hover();
		await expect(button).toHaveScreenshot('ontarioButtonTertiary-hover.png');
	});
});

test.describe('Ontario Button - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - active state', async ({ page }) => {
		const button = page.locator('#ontario-button-primary');
		await button.hover(); // to ensure it's "pressable"
		await page.mouse.down();
		await expect(button).toHaveScreenshot('ontarioButtonPrimary-active.png');
		await page.mouse.up(); // cleanup
	});

	test('secondary button - active state', async ({ page }) => {
		const button = page.locator('#ontario-button-secondary');
		await button.hover(); // to ensure it's "pressable"
		await page.mouse.down();
		await expect(button).toHaveScreenshot('ontarioButtonSecondary-active.png');
		await page.mouse.up(); // cleanup
	});

	test('tertiary button - active state', async ({ page }) => {
		const button = page.locator('#ontario-button-tertiary');
		await button.hover(); // to ensure it's "pressable"
		await page.mouse.down();
		await expect(button).toHaveScreenshot('ontarioButtonTertiary-active.png');
		await page.mouse.up(); // cleanup
	});
});
