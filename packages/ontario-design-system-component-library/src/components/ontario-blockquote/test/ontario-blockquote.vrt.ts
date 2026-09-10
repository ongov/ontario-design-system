import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

const quoteText = 'This is the quote';
const longQuoteText =
	'When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one that has opened for us.';
const attributionText = 'Homer Simpson';
const bylineText = 'Ontario Digital Service';
const slottedQuoteText = 'Quote from slotted content';

test.describe('ontario-blockquote', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-blockquote quote="${quoteText}"></ontario-blockquote>
		`);

		await page.waitForChanges();

		host = page.locator('ontario-blockquote');
	});

	test('renders and is hydrated', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders the quote text content', async () => {
		const blockquote = host.locator('blockquote');
		await expect(blockquote).toContainText(quoteText);
		await expect(host).toHaveScreenshot();
	});

	test('applies the short quote class when the quote is 140 characters or less', async () => {
		const blockquote = host.locator('blockquote');
		await expect(blockquote).toHaveClass('ontario-blockquote ontario-blockquote--short');
		await expect(host).toHaveScreenshot();
	});

	test('does not apply the short quote class when the quote exceeds 140 characters', async ({ page }) => {
		await host.evaluate(
			(el: HTMLOntarioBlockquoteElement, value: string) => el.setAttribute('quote', value),
			longQuoteText,
		);
		await page.waitForChanges();

		const blockquote = host.locator('blockquote');
		await expect(blockquote).toHaveClass('ontario-blockquote');
		await expect(host).toHaveScreenshot();
	});

	test('renders no attribution or byline when not provided', async () => {
		const attribution = host.locator('cite.ontario-blockquote__attribution');
		const byline = host.locator('cite.ontario-blockquote__byline');

		await expect(attribution).toHaveCount(0);
		await expect(byline).toHaveCount(0);
		await expect(host).toHaveScreenshot();
	});

	test('renders the attribution when provided', async ({ page }) => {
		await host.evaluate(
			(el: HTMLOntarioBlockquoteElement, value: string) => el.setAttribute('attribution', value),
			attributionText,
		);
		await page.waitForChanges();

		const attribution = host.locator('cite.ontario-blockquote__attribution');
		await expect(attribution).toContainText(attributionText);
		await expect(host).toHaveScreenshot();
	});

	test('renders the byline when provided', async ({ page }) => {
		await host.evaluate(
			(el: HTMLOntarioBlockquoteElement, value: string) => el.setAttribute('byline', value),
			bylineText,
		);
		await page.waitForChanges();

		const byline = host.locator('cite.ontario-blockquote__byline');
		await expect(byline).toContainText(bylineText);
		await expect(host).toHaveScreenshot();
	});

	test('renders both attribution and byline when both are provided', async ({ page }) => {
		await host.evaluate(
			(el: HTMLOntarioBlockquoteElement, values: { attribution: string; byline: string }) => {
				el.setAttribute('attribution', values.attribution);
				el.setAttribute('byline', values.byline);
			},
			{ attribution: attributionText, byline: bylineText },
		);
		await page.waitForChanges();

		const attribution = host.locator('cite.ontario-blockquote__attribution');
		const byline = host.locator('cite.ontario-blockquote__byline');

		await expect(attribution).toContainText(attributionText);
		await expect(byline).toContainText(bylineText);
		await expect(host).toHaveScreenshot();
	});
});

test.describe('ontario-blockquote - slotted content fallback', () => {
	test('falls back to host textContent when quote prop is not provided', async ({ page }) => {
		await page.setContent(`<ontario-blockquote>${slottedQuoteText}</ontario-blockquote>`);
		await page.waitForChanges();

		const blockquoteHost = page.locator('ontario-blockquote');
		const blockquote = blockquoteHost.locator('blockquote');

		await expect(blockquote).toContainText(slottedQuoteText);
		await expect(blockquoteHost).toHaveScreenshot();
	});
});
