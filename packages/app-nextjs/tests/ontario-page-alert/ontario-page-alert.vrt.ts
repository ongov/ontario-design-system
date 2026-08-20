import { test, expect } from '@playwright/test';

test.describe('Ontario Page Alert - type variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-page-alert');
	});

	test('informational page alert - default state', async ({ page }) => {
		const alert = page.locator('#ontario-page-alert-informational');
		await expect(alert).toHaveScreenshot('ontarioPageAlert-informational.png');
	});

	test('warning page alert - default state', async ({ page }) => {
		const alert = page.locator('#ontario-page-alert-warning');
		await expect(alert).toHaveScreenshot('ontarioPageAlert-warning.png');
	});

	test('success page alert - default state', async ({ page }) => {
		const alert = page.locator('#ontario-page-alert-success');
		await expect(alert).toHaveScreenshot('ontarioPageAlert-success.png');
	});

	test('error page alert - default state', async ({ page }) => {
		const alert = page.locator('#ontario-page-alert-error');
		await expect(alert).toHaveScreenshot('ontarioPageAlert-error.png');
	});
});

test.describe('Ontario Page Alert - link interaction states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-page-alert');
	});

	test('informational page alert - link hover', async ({ page }) => {
		const host = page.locator('#ontario-page-alert-informational');
		const link = host.locator('a').first();

		await link.hover();

		// snap host (stable target) while inner link is hovered
		await expect(host).toHaveScreenshot('ontarioPageAlert-informational-link-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('informational page alert - link focus', async ({ page }) => {
		const host = page.locator('#ontario-page-alert-informational');
		const link = host.locator('a').first();

		await link.focus();

		await expect(host).toHaveScreenshot('ontarioPageAlert-informational-link-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('informational page alert - link active', async ({ page }) => {
		const host = page.locator('#ontario-page-alert-informational');
		const link = host.locator('a').first();

		await link.hover();
		await page.mouse.down();

		await expect(host).toHaveScreenshot('ontarioPageAlert-informational-link-active.png', {
			animations: 'disabled',
			caret: 'hide',
		});

		await page.mouse.up();
	});
});

test.describe('Ontario Page Alert - error link states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-page-alert');
	});

	test('error - link hover', async ({ page }) => {
		const host = page.locator('#ontario-page-alert-error');
		const link = host.locator('a').first();

		await link.hover();

		await expect(host).toHaveScreenshot('ontarioPageAlert-error-link-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('error - link focus', async ({ page }) => {
		const host = page.locator('#ontario-page-alert-error');
		const link = host.locator('a').first();

		await link.focus();

		await expect(host).toHaveScreenshot('ontarioPageAlert-error-link-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('error - link active', async ({ page }) => {
		const host = page.locator('#ontario-page-alert-error');
		const link = host.locator('a').first();

		await link.hover();
		await page.mouse.down();

		await expect(host).toHaveScreenshot('ontarioPageAlert-error-link-active.png', {
			animations: 'disabled',
			caret: 'hide',
		});

		await page.mouse.up(); // cleanup
	});
});
