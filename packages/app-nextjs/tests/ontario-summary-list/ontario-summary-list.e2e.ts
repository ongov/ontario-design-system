import { test, expect } from '@playwright/test';

test.describe('Ontario Summary List - Next.js E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('renders page heading and default summary caption', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1, name: 'ontario-summary-list' })).toBeVisible();
		await expect(page.locator('h3.ontario-summary-list__heading', { hasText: 'Personal information' })).toBeVisible();
	});

	test('default list has no caption action link when prop is omitted', async ({ page }) => {
		const defaultList = page.locator('ontario-summary-list').first();
		await expect(defaultList.locator('a.ontario-summary-list__change-button')).toHaveCount(0);
	});

	test('renders expected row count for personal information list', async ({ page }) => {
		const defaultList = page.locator('ontario-summary-list').first();
		await expect(defaultList.locator('ontario-summary-list-item')).toHaveCount(5);
	});

	test('renders caption action link for contact details variant', async ({ page }) => {
		const contactList = page.locator('ontario-summary-list', {
			has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Contact details' }),
		});
		await expect(contactList.locator('a.ontario-summary-list__change-button')).toBeVisible();
	});

	test('supports custom action slot row with screen-reader text', async ({ page }) => {
		const mixedList = page.locator('ontario-summary-list', {
			has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Mixed rows (action slot override)' }),
		});
		await expect(mixedList.getByRole('link', { name: /Change\s+your answer for: First name/i })).toBeVisible();
	});

	test('renders semantic definition list structure', async ({ page }) => {
		const defaultList = page.locator('ontario-summary-list').first();
		await expect(defaultList.locator('dl.ontario-summary-list__container')).toBeVisible();
	});

	test('renders full-width variant class in Next page output', async ({ page }) => {
		const fullWidthList = page.locator('ontario-summary-list', {
			has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Full width (12-column)' }),
		});
		await expect(fullWidthList.locator('.ontario-summary-list')).toHaveClass(/summary-list-full-width/);
	});
});
