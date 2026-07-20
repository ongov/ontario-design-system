import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

test.describe('ontario-blockquote', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-blockquote quote="This is the quote"></ontario-blockquote>
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
		await expect(blockquote).toContainText('This is the quote');
	});

	test('applies the short quote class when the quote is 140 characters or less', async () => {
		const blockquote = host.locator('blockquote');
		await expect(blockquote).toHaveClass('ontario-blockquote ontario-blockquote--short');
	});

	test('does not apply the short quote class when the quote exceeds 140 characters', async ({ page }) => {
		const longQuote =
			'When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one that has opened for us.';

		await host.evaluate((el: Element, value: string) => el.setAttribute('quote', value), longQuote);
		await page.waitForChanges();

		const blockquote = host.locator('blockquote');
		await expect(blockquote).toHaveClass('ontario-blockquote');
	});

	test('renders no attribution or byline when not provided', async () => {
		const attribution = host.locator('cite.ontario-blockquote__attribution');
		const byline = host.locator('cite.ontario-blockquote__byline');

		await expect(attribution).toHaveCount(0);
		await expect(byline).toHaveCount(0);
	});

	test('renders the attribution when provided', async ({ page }) => {
		await host.evaluate((el: Element) => el.setAttribute('attribution', 'Homer Simpson'));
		await page.waitForChanges();

		const attribution = host.locator('cite.ontario-blockquote__attribution');
		await expect(attribution).toContainText('Homer Simpson');
	});

	test('renders the byline when provided', async ({ page }) => {
		await host.evaluate((el: Element) => el.setAttribute('byline', 'Ontario Digital Service'));
		await page.waitForChanges();

		const byline = host.locator('cite.ontario-blockquote__byline');
		await expect(byline).toContainText('Ontario Digital Service');
	});

	test('renders both attribution and byline when both are provided', async ({ page }) => {
		await host.evaluate((el: Element) => {
			el.setAttribute('attribution', 'Homer Simpson');
			el.setAttribute('byline', 'Ontario Digital Service');
		});
		await page.waitForChanges();

		const attribution = host.locator('cite.ontario-blockquote__attribution');
		const byline = host.locator('cite.ontario-blockquote__byline');

		await expect(attribution).toContainText('Homer Simpson');
		await expect(byline).toContainText('Ontario Digital Service');
	});
});

test.describe('ontario-blockquote - slotted content fallback', () => {
	test('falls back to host textContent when quote prop is not provided', async ({ page }) => {
		await page.setContent(`<ontario-blockquote>Quote from slotted content</ontario-blockquote>`);
		await page.waitForChanges();

		const blockquoteHost = page.locator('ontario-blockquote');
		const blockquote = blockquoteHost.locator('blockquote');

		await expect(blockquote).toContainText('Quote from slotted content');
	});
});

test.describe('ontario-blockquote - accessibility', () => {
	test('has no axe violations', async ({ page }) => {
		await page.setContent(`
			<ontario-blockquote quote="This is the quote" attribution="Homer Simpson" byline="Ontario Digital Service"></ontario-blockquote>
		`);
		await page.waitForChanges();

		const accessibilityScanResults = await new AxeBuilder({ page }).include('ontario-blockquote').analyze();
		expect(accessibilityScanResults.violations).toHaveLength(0);
	});
});
