import { test, expect } from '@playwright/test';

test.describe('Ontario Summary List Item - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row with action link', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-with-action.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('row without action link', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-no-action');
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-no-action.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('compact variant', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-compact');
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-compact.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('custom action label variant', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-custom-label.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('compact variant without action link', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-compact-no-action');
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-compact-no-action.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Summary List Item - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row with action link - focus state', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.focus();
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-with-action-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('custom action label - focus state', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.focus();
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-custom-label-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Summary List Item - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row with action link - hover state', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-with-action-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('custom action label - hover state', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-custom-label-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Summary List Item - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	test('row with action link - active state', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-with-action');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-with-action-active.png', {
			animations: 'disabled',
			caret: 'hide',
		});
		await page.mouse.up();
	});

	test('custom action label - active state', async ({ page }) => {
		const summaryListItem = page.locator('#ontario-summary-list-item-custom-label');
		const actionLink = summaryListItem.locator('a.ontario-summary-list-item__change-button');

		await actionLink.hover();
		await page.mouse.down();
		await expect(summaryListItem).toHaveScreenshot('ontarioSummaryListItem-custom-label-active.png', {
			animations: 'disabled',
			caret: 'hide',
		});
		await page.mouse.up();
	});
});
