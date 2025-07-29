import { test, expect } from '@playwright/test';

test.describe('Ontario Button - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	test('ontario-button primary button', async ({ page }) => {
		const primaryButton = page.locator('#ontario-button-primary');
		await expect(primaryButton).toHaveScreenshot('ontarioButtonPrimary.png');
	});

	test('ontario-button secondary button', async ({ page }) => {
		const secondaryButton = page.locator('#ontario-button-secondary');
		await expect(secondaryButton).toHaveScreenshot('ontarioButtonSecondary.png');
	});

	test('ontario-button tertiary button', async ({ page }) => {
		const tertiaryButton = page.locator('#ontario-button-tertiary');
		await expect(tertiaryButton).toHaveScreenshot('ontarioButtonTertiary.png');
	});
});

// Additional tests for focus, hover and active states to be added here
