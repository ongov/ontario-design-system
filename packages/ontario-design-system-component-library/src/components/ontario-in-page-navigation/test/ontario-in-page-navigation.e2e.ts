import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-in-page-navigation', () => {
	test('renders', async ({ page }) => {
		await page.setContent('<ontario-in-page-navigation></ontario-in-page-navigation>');
		await page.waitForChanges();

		const host = page.locator('ontario-in-page-navigation').first();
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);
	});
});
