import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-error-alert', () => {
	test('renders and is hydrated', async ({ page }) => {
		await page.setContent('<ontario-error-alert message="A first name is required."></ontario-error-alert>');
		await page.waitForChanges();

		const host = page.locator('ontario-error-alert');
		await expect(host).toHaveClass('hydrated');
		await expect(host.locator('[role="alert"]')).toContainText('A first name is required.');
	});
});
