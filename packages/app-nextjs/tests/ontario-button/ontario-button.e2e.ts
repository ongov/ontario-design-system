import { test, expect } from '@playwright/test';

test.describe('Ontario Button', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-button');
	});

	// Test for default rendering
	test('should display the primary button when the type is set to `primary`', async ({ page }) => {
		const primaryButton = await page.locator('#ontario-button-primary');
		const internalButton = await primaryButton.locator('button');
		await expect(primaryButton).toBeVisible();
		await expect(primaryButton).toHaveText('Primary Button');
		await expect(primaryButton.locator('button')).toHaveClass(/ontario-button--primary/);
	});

	test('should display the secondary button when the type is set to `secondary`', async ({ page }) => {
		const secondaryButton = await page.locator('#ontario-button-secondary');
		await expect(secondaryButton).toBeVisible();
		await expect(secondaryButton).toHaveText('Secondary Button');
		await expect(secondaryButton.locator('button')).toHaveClass(/ontario-button--secondary/);
	});

	test('should display the tertiary button when the type is set to `tertiary`', async ({ page }) => {
		const tertiaryButton = await page.locator('#ontario-button-tertiary');
		await expect(tertiaryButton).toBeVisible();
		await expect(tertiaryButton).toHaveText('Tertiary Button');
		await expect(tertiaryButton.locator('button')).toHaveClass(/ontario-button--tertiary/);
	});

	// Test for aria-attributes
	test('should have the expected aria-label when `aria-label-text` prop is set', async ({ page }) => {
		const primaryButton = await page.locator('#ontario-button-primary');
		await expect(primaryButton.locator('button')).toHaveAttribute('aria-label', 'Click to perform primary action');
	});

	test('should have an empty aria label when `aria-label-text` prop is not set', async ({ page }) => {
		const secondaryButton = await page.locator('#ontario-button-secondary');
		await expect(secondaryButton.locator('button')).toHaveAttribute('aria-label', '');
	});

	// Test for click event
	test('should trigger alert on button click', async ({ page }) => {
		page.once('dialog', async (dialog) => {
			expect(dialog.message()).toBe('Clicked!');
			await dialog.dismiss();
		});

		await page.click('#ontario-button-secondary');
	});

	// Test for keyboard interaction
	test('should trigger alert when Enter key is pressed on button', async ({ page }) => {
		page.once('dialog', async (dialog) => {
			expect(dialog.message()).toBe('Clicked!');
			await dialog.dismiss();
		});

		const button = page.locator('#ontario-button-secondary');
		await button.focus();
		await page.keyboard.press('Enter');
	});
});
