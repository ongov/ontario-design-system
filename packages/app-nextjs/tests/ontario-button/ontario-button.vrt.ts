import { test, expect } from '@playwright/test';

test('ontario-button primary button', async ({ page }) => {
	await page.goto('/components/ontario-button');
	const primaryButton = page.locator('#ontario-button-primary');
	await expect(primaryButton).toHaveScreenshot('ontarioButtonPrimary.png');
});

test('ontario-button secondary button', async ({ page }) => {
	await page.goto('/components/ontario-button');
	const secondaryButton = page.locator('#ontario-button-secondary');
	await expect(secondaryButton).toHaveScreenshot('ontarioButtonSecondary.png');
});

test('ontario-button tertiary button', async ({ page }) => {
	await page.goto('/components/ontario-button');
	const tertiaryButton = page.locator('#ontario-button-tertiary');
	await expect(tertiaryButton).toHaveScreenshot('ontarioButtonTertiary.png');
});
