import { test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

test.describe('Summary List Item - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('with action', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		await expectVrtScreenshot(summaryListItem);
	});

	test('no action', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-no-action');
		await expectVrtScreenshot(summaryListItem);
	});

	test('compact', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-compact');
		await expectVrtScreenshot(summaryListItem);
	});

	test('custom label', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		await expectVrtScreenshot(summaryListItem);
	});

	test('compact no action', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-compact-no-action');
		await expectVrtScreenshot(summaryListItem);
	});
});

test.describe('Summary List Item - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('with action - focus', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryListItem, { maxDiffPixels: 600 });
	});

	test('custom label - focus', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryListItem, { maxDiffPixels: 400 });
	});
});

test.describe('Summary List Item - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('with action - hover', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await expectVrtScreenshot(summaryListItem);
	});

	test('custom label - hover', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await expectVrtScreenshot(summaryListItem);
	});
});

test.describe('Summary List Item - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('with action - active', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryListItem, { maxDiffPixels: 700 });
		await page.mouse.up();
	});

	test('custom label - active', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryListItem, { maxDiffPixels: 400 });
		await page.mouse.up();
	});
});
