import { test, expect, Page } from '@playwright/test';

const waitForInteractionPaint = async (page: Page) => {
	await page.evaluate(
		() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
	);
};

test.describe('Ontario Summary List - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('default variant with action link', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-default.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('heading action link variant', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-heading-action.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('row without action link', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-no-action');
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-no-action.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('full width variant', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-full-width');
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-full-width.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Summary List - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action link - focus state', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-default-focus.png', {
			animations: 'disabled',
			caret: 'hide',
			maxDiffPixels: 750,
		});
	});

	test('heading action link - focus state', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.focus();
		await waitForInteractionPaint(page);
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-heading-action-focus.png', {
			animations: 'disabled',
			caret: 'hide',
			maxDiffPixels: 750,
		});
	});
});

test.describe('Ontario Summary List - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action link - hover state', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.hover();
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-default-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('heading action link - hover state', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.hover();
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-heading-action-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Summary List - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row action link - active state', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-default');
		const actionLink = summaryList.locator('a.ontario-summary-list-item__change-button').first();

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-default-active.png', {
			animations: 'disabled',
			caret: 'hide',
			maxDiffPixels: 750,
		});
		await page.mouse.up();
	});

	test('heading action link - active state', async ({ page }) => {
		const summaryList = page.locator('#ontario-summary-list-heading-action');
		const actionLink = summaryList.locator('a.ontario-summary-list__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expect(summaryList).toHaveScreenshot('ontarioSummaryList-heading-action-active.png', {
			animations: 'disabled',
			caret: 'hide',
			maxDiffPixels: 900,
		});
		await page.mouse.up();
	});
});
