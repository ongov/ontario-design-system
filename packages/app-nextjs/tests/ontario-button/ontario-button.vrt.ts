import { test, expect } from '@playwright/test';

test.describe('Ontario Button - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - default state', async ({ page }) => {
		const primaryButton = page.locator('#ontario-button-primary');
		await expect(primaryButton).toHaveScreenshot();
	});

	test('secondary button - default state', async ({ page }) => {
		const secondaryButton = page.locator('#ontario-button-secondary');
		await expect(secondaryButton).toHaveScreenshot();
	});

	test('tertiary button - default state', async ({ page }) => {
		const tertiaryButton = page.locator('#ontario-button-tertiary');
		await expect(tertiaryButton).toHaveScreenshot();
	});
});

test.describe('Ontario Button - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - focus state', async ({ page }) => {
		await page.waitForSelector('#ontario-button-primary.hydrated');
		await page.waitForSelector('#ontario-button-primary >>> button');

		const host = page.locator('#ontario-button-primary');
		const inner = page.locator('#ontario-button-primary >>> button');

		await inner.focus();

		// Snap the HOST (stable target) while inner button is focused
		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('secondary button - focus state', async ({ page }) => {
		await page.waitForSelector('#ontario-button-secondary.hydrated');
		await page.waitForSelector('#ontario-button-secondary >>> button');

		const host = page.locator('#ontario-button-secondary');
		const inner = page.locator('#ontario-button-secondary >>> button');

		await inner.focus();

		// Snap the HOST (stable target) while inner button is focused
		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('tertiary button - focus state', async ({ page }) => {
		await page.waitForSelector('#ontario-button-tertiary.hydrated');
		await page.waitForSelector('#ontario-button-tertiary >>> button');

		const host = page.locator('#ontario-button-tertiary');
		const inner = page.locator('#ontario-button-tertiary >>> button');

		await inner.focus();

		// Snap the HOST (stable target) while inner button is focused
		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Button - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary button - hover state', async ({ page }) => {
		const button = page.locator('#ontario-button-primary');
		await button.hover();
		await expect(button).toHaveScreenshot();
	});

	test('secondary button - hover state', async ({ page }) => {
		const button = page.locator('#ontario-button-secondary');
		await button.hover();
		await expect(button).toHaveScreenshot();
	});

	test('tertiary button - hover state', async ({ page }) => {
		const button = page.locator('#ontario-button-tertiary');
		await button.hover();
		await expect(button).toHaveScreenshot();
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
		await expect(button).toHaveScreenshot();
		await page.mouse.up(); // cleanup
	});

	test('secondary button - active state', async ({ page }) => {
		const button = page.locator('#ontario-button-secondary');
		await button.hover(); // to ensure it's "pressable"
		await page.mouse.down();
		await expect(button).toHaveScreenshot();
		await page.mouse.up(); // cleanup
	});

	test('tertiary button - active state', async ({ page }) => {
		const button = page.locator('#ontario-button-tertiary');
		await button.hover(); // to ensure it's "pressable"
		await page.mouse.down();
		await expect(button).toHaveScreenshot();
		await page.mouse.up(); // cleanup
	});
});

test.describe('Ontario Button - icon variants (default state)', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('primary icon-only button', async ({ page }) => {
		const button = page.locator('#ontario-button-icon-only-primary');
		await expect(button).toHaveScreenshot();
	});

	test('secondary icon-only button', async ({ page }) => {
		const button = page.locator('#ontario-button-icon-only-secondary');
		await expect(button).toHaveScreenshot();
	});

	test('tertiary icon-only button', async ({ page }) => {
		const button = page.locator('#ontario-button-icon-only-tertiary');
		await expect(button).toHaveScreenshot();
	});

	test('primary button with a leading icon', async ({ page }) => {
		const button = page.locator('#ontario-button-leading-icon-primary');
		await expect(button).toHaveScreenshot();
	});

	test('secondary button with a leading icon', async ({ page }) => {
		const button = page.locator('#ontario-button-leading-icon-secondary');
		await expect(button).toHaveScreenshot();
	});

	test('tertiary button with a leading icon', async ({ page }) => {
		const button = page.locator('#ontario-button-leading-icon-tertiary');
		await expect(button).toHaveScreenshot();
	});

	test('primary button with a trailing icon', async ({ page }) => {
		const button = page.locator('#ontario-button-trailing-icon-primary');
		await expect(button).toHaveScreenshot();
	});

	test('secondary button with a trailing icon', async ({ page }) => {
		const button = page.locator('#ontario-button-trailing-icon-secondary');
		await expect(button).toHaveScreenshot();
	});

	test('tertiary button with a trailing icon', async ({ page }) => {
		const button = page.locator('#ontario-button-trailing-icon-tertiary');
		await expect(button).toHaveScreenshot();
	});

	test('primary button with leading and trailing icons', async ({ page }) => {
		const button = page.locator('#ontario-button-both-icons-primary');
		await expect(button).toHaveScreenshot();
	});

	test('secondary button with leading and trailing icons', async ({ page }) => {
		const button = page.locator('#ontario-button-both-icons-secondary');
		await expect(button).toHaveScreenshot();
	});

	test('tertiary button with leading and trailing icons', async ({ page }) => {
		const button = page.locator('#ontario-button-both-icons-tertiary');
		await expect(button).toHaveScreenshot();
	});
});
