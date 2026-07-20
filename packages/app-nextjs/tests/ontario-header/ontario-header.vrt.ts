import { test, expect } from '@playwright/test';

test.describe('Ontario Header - type variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('ontario header - default state', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await expect(header).toHaveScreenshot('ontarioHeader-ontario.png');
	});

	test('ontario header with sign-in - default state', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario-signin');
		await expect(header).toHaveScreenshot('ontarioHeader-ontario-signin.png');
	});

	test('application header - default state', async ({ page }) => {
		const header = page.locator('#ontario-header-application');
		await expect(header).toHaveScreenshot('ontarioHeader-application.png');
	});

	test('serviceOntario header - default state', async ({ page }) => {
		const header = page.locator('#ontario-header-service-ontario');
		await expect(header).toHaveScreenshot('ontarioHeader-service-ontario.png');
	});
});

test.describe('Ontario Header - menu open state', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('ontario header - menu open', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await header.locator('#ontario-header-menu-toggler').click();

		await expect(header).toHaveScreenshot('ontarioHeader-ontario-menu-open.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});
