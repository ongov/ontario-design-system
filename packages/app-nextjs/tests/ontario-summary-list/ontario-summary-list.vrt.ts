import { test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

test.describe('Summary List - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('default', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		await expectVrtScreenshot(summaryList);
	});

	test('heading action', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		await expectVrtScreenshot(summaryList);
	});

	test('no action', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-no-action');
		await expectVrtScreenshot(summaryList);
	});

	test('full width', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-full-width');
		await expectVrtScreenshot(summaryList);
	});
});

test.describe('Summary List - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action - focus', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 750 });
	});

	test('heading action - focus', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 750 });
	});
});

test.describe('Summary List - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action - hover', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.hover();
		await expectVrtScreenshot(summaryList);
	});

	test('heading action - hover', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.hover();
		await expectVrtScreenshot(summaryList);
	});
});

test.describe('Summary List - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action - active', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 750 });
		await page.mouse.up();
	});

	test('heading action - active', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 900 });
		await page.mouse.up();
	});
});
