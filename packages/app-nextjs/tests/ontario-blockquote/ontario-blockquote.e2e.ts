import { test, expect } from '@playwright/test';

test.describe('Ontario Blockquote - quote rendering', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-blockquote');
	});

	test('should render the short quote class when the quote is 140 characters or less', async ({ page }) => {
		const shortQuote = page.locator('#ontario-blockquote-short');

		await expect(shortQuote.locator('blockquote')).toHaveClass(/ontario-blockquote--short/);
		await expect(shortQuote.locator('p')).toHaveText('This is an example of a short quote.');
	});

	test('should not render the short quote class when the quote exceeds 140 characters', async ({ page }) => {
		const longQuote = page.locator('#ontario-blockquote-long');

		await expect(longQuote.locator('blockquote')).not.toHaveClass(/ontario-blockquote--short/);
	});
});

test.describe('Ontario Blockquote - attribution and byline', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-blockquote');
	});

	test('should render attribution when provided without a byline', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-attribution');

		await expect(blockquote.locator('cite.ontario-blockquote__attribution')).toHaveText('Mahatma Gandhi');
		await expect(blockquote.locator('cite.ontario-blockquote__byline')).toHaveCount(0);
	});

	test('should render both attribution and byline when both are provided', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-attribution-byline');

		await expect(blockquote.locator('cite.ontario-blockquote__attribution')).toHaveText('Homer Simpson');
		await expect(blockquote.locator('cite.ontario-blockquote__byline')).toHaveText('Ontario Digital Service');
	});
});

test.describe('Ontario Blockquote - slotted content', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-blockquote');
	});

	test('should render slotted content when the `quote` prop is not provided', async ({ page }) => {
		const blockquote = page.locator('#ontario-blockquote-slotted');

		await expect(blockquote.locator('p')).toContainText(
			'This quote is provided via slotted content instead of the quote prop.',
		);
	});
});
