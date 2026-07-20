import { test, expect } from '@playwright/test';

test.describe('Ontario Blockquote - quote variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-blockquote');
	});

	test('short quote - default state', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-short');
		await expect(blockquote).toHaveScreenshot('ontarioBlockquote-short.png');
	});

	test('long quote - default state', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-long');
		await expect(blockquote).toHaveScreenshot('ontarioBlockquote-long.png');
	});
});

test.describe('Ontario Blockquote - attribution and byline variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-blockquote');
	});

	test('attribution only - default state', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-attribution');
		await expect(blockquote).toHaveScreenshot('ontarioBlockquote-attribution.png');
	});

	test('attribution and byline - default state', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-attribution-byline');
		await expect(blockquote).toHaveScreenshot('ontarioBlockquote-attributionByline.png');
	});
});

test.describe('Ontario Blockquote - slotted content variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-blockquote');
	});

	test('slotted content - default state', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-slotted');
		await expect(blockquote).toHaveScreenshot('ontarioBlockquote-slotted.png');
	});
});
