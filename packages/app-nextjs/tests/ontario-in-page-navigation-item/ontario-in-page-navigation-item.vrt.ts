import { expect, Page, test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

const defaultFirstItem = (page: Page) =>
	page.locator('ontario-in-page-navigation').first().locator('ontario-in-page-navigation-item').first();

const borderlessFirstItem = (page: Page) =>
	page.locator('ontario-in-page-navigation').nth(1).locator('ontario-in-page-navigation-item').first();

test.describe('In-Page Navigation Item - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('default item in default variant', async ({ page }) => {
		await expectVrtScreenshot(defaultFirstItem(page));
	});

	test('default item in no-top-border variant', async ({ page }) => {
		await expectVrtScreenshot(borderlessFirstItem(page));
	});
});

test.describe('In-Page Navigation Item - interaction states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('focused item link', async ({ page }) => {
		const item = defaultFirstItem(page);
		const link = item.getByRole('link', { name: 'About the program' });

		await link.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(item, { maxDiffPixels: 700 });
	});

	test('hovered item link', async ({ page }) => {
		const item = defaultFirstItem(page);
		const link = item.getByRole('link', { name: 'About the program' });

		await link.hover();
		await expectVrtScreenshot(item, { maxDiffPixels: 700 });
	});

	test('clicked item link after reload with hash', async ({ page }) => {
		const link = defaultFirstItem(page).getByRole('link', { name: 'About the program' });

		await link.click();
		await expect(page).toHaveURL(/#about-program$/);
		await page.reload();
		await expect(page).toHaveURL(/#about-program$/);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(defaultFirstItem(page), { maxDiffPixels: 800 });
	});
});
