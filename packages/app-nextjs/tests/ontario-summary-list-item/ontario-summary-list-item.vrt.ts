import { test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

const ACTION_LINK_SELECTOR = 'a.ontario-summary-list-item__change-button';

const interactiveVariants = [
	{ label: 'with action', id: 'ontario-summary-list-item-with-action', maxDiffPixels: { focus: 600, active: 700 } },
	{ label: 'custom label', id: 'ontario-summary-list-item-custom-label', maxDiffPixels: { focus: 400, active: 400 } },
] as const;

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

	for (const { label, id, maxDiffPixels } of interactiveVariants) {
		test(`${label} - focus`, async ({ page }) => {
			const summaryListItem = page.locator(`#${id}`);
			const actionLink = summaryListItem.locator(ACTION_LINK_SELECTOR);

			await actionLink.focus();
			await waitForInteractionPaint(page);
			await expectVrtScreenshot(summaryListItem, { maxDiffPixels: maxDiffPixels.focus });
		});
	}
});

test.describe('Summary List Item - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	for (const { label, id } of interactiveVariants) {
		test(`${label} - hover`, async ({ page }) => {
			const summaryListItem = page.locator(`#${id}`);
			const actionLink = summaryListItem.locator(ACTION_LINK_SELECTOR);

			await actionLink.hover();
			await expectVrtScreenshot(summaryListItem);
		});
	}
});

test.describe('Summary List Item - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	for (const { label, id, maxDiffPixels } of interactiveVariants) {
		test(`${label} - active`, async ({ page }) => {
			const summaryListItem = page.locator(`#${id}`);
			const actionLink = summaryListItem.locator(ACTION_LINK_SELECTOR);

			await actionLink.hover();
			await page.mouse.down();
			await waitForInteractionPaint(page);
			await expectVrtScreenshot(summaryListItem, { maxDiffPixels: maxDiffPixels.active });
			await page.mouse.up();
		});
	}
});
