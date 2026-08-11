import { Page, test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

const personalInfoList = (page: Page) =>
	page.locator('ontario-summary-list', {
		has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Personal information' }),
	});

const contactDetailsList = (page: Page) =>
	page.locator('ontario-summary-list', {
		has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Contact details' }),
	});

const mixedRowsList = (page: Page) =>
	page.locator('ontario-summary-list', {
		has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Mixed rows (action slot override)' }),
	});

const fullWidthList = (page: Page) =>
	page.locator('ontario-summary-list', {
		has: page.locator('h3.ontario-summary-list__heading', { hasText: 'Full width (12-column)' }),
	});

test.describe('Summary List - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('default', async ({ page }) => {
		const summaryList = personalInfoList(page);
		await expectVrtScreenshot(summaryList);
	});

	test('heading action', async ({ page }) => {
		const summaryList = contactDetailsList(page);
		await expectVrtScreenshot(summaryList);
	});

	test('no action', async ({ page }) => {
		const summaryList = mixedRowsList(page);
		await expectVrtScreenshot(summaryList);
	});

	test('full width', async ({ page }) => {
		const summaryList = fullWidthList(page);
		await expectVrtScreenshot(summaryList);
	});
});

test.describe('Summary List - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action - focus', async ({ page }) => {
		const summaryList = personalInfoList(page);
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 750 });
	});

	test('heading action - focus', async ({ page }) => {
		const summaryList = contactDetailsList(page);
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
		const summaryList = personalInfoList(page);
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.hover();
		await expectVrtScreenshot(summaryList);
	});

	test('heading action - hover', async ({ page }) => {
		const summaryList = contactDetailsList(page);
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
		const summaryList = personalInfoList(page);
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 750 });
		await page.mouse.up();
	});

	test('heading action - active', async ({ page }) => {
		const summaryList = contactDetailsList(page);
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(summaryList, { maxDiffPixels: 900 });
		await page.mouse.up();
	});
});
