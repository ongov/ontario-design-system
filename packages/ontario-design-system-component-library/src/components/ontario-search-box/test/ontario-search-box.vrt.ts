import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { expectVrtScreenshot } from '../../../utils/tests/vrt-helpers';

/**
 * Visual regression tests for ontario-search-box.
 */
test.describe('ontario-search-box - default states', () => {
	test('basic search box - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Search"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});

	test('required search box - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Search" required="true"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});

	test('search box with hint text - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box
				caption="Search"
				hint-text="Enter a city, address, or postal code"
			></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});

	test('search box with pre-filled value - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Search" value="Toronto"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});

	test('search box with French language - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Rechercher" language="fr"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});

	test('search box with large caption - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption='{"captionText": "Search directory", "captionType": "large"}'></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});

	test('search box with heading caption - default state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption='{"captionText": "Search directory", "captionType": "heading"}'></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});
});

test.describe('ontario-search-box - focus states', () => {
	test('input field - focus state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Search"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await host.locator('input[type="search"]').focus();
		await expectVrtScreenshot(host);
	});

	test('submit button - focus state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Search"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await host.locator('#ontario-search-box__submit').focus();
		await expectVrtScreenshot(host);
	});

	test('reset button - focus state', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box caption="Search" value="Toronto"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await host.locator('#ontario-search-reset').focus();
		await expectVrtScreenshot(host);
	});
});

test.describe('ontario-search-box - autocomplete default state', () => {
	test('autocomplete enabled - idle (no query)', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await expectVrtScreenshot(host);
	});
});

test.describe('ontario-search-box - autocomplete slotted suggestions open', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-search-box enable-autocomplete caption="Search cities">
				<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
				<ontario-search-result-item slot="suggestions" label="Ottawa" value="Ottawa"></ontario-search-result-item>
				<ontario-search-result-item slot="suggestions" label="London" value="London"></ontario-search-result-item>
				<ontario-search-result-item slot="suggestions" label="Hamilton" value="Hamilton"></ontario-search-result-item>
			</ontario-search-box>
		`);
		await page.waitForChanges();
		// Type a query that reveals all suggestions
		await page.locator('ontario-search-box').locator('input[type="search"]').fill('o');
		await page.waitForChanges();
	});

	test('slotted suggestions list - open state', async ({ page }) => {
		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		const list = host.locator('.ontario-search-autocomplete__suggestion-list');
		await expect(list).toHaveAttribute('aria-hidden', 'false');
		await expectVrtScreenshot(host);
	});

	test('slotted suggestions list - first item keyboard highlighted', async ({ page }) => {
		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await page.locator('ontario-search-box').locator('input[type="search"]').press('ArrowDown');
		await page.waitForChanges();
		await expectVrtScreenshot(host);
	});

	test('slotted suggestions list - second item keyboard highlighted', async ({ page }) => {
		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		const input = page.locator('ontario-search-box').locator('input[type="search"]');
		await input.press('ArrowDown');
		await input.press('ArrowDown');
		await page.waitForChanges();
		await expectVrtScreenshot(host);
	});
});

test.describe('ontario-search-box - autocomplete async suggestions open', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>
		`);
		await page.waitForChanges();
		await page.evaluate(() => {
			const searchBox = document.querySelector('ontario-search-box') as HTMLOntarioSearchBoxElement;
			searchBox.getSuggestions = async () => ['Toronto', 'Ottawa', 'London', 'Hamilton'];
			searchBox.debounceMs = 0;
		});
		await page.locator('ontario-search-box').locator('input[type="search"]').fill('o');
		await page.waitForChanges();
	});

	test('async suggestions list - open state', async ({ page }) => {
		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		const list = host.locator('.ontario-search-autocomplete__suggestion-list');
		await expect(list).toHaveAttribute('aria-hidden', 'false');
		await expectVrtScreenshot(host);
	});

	test('async suggestions list - first item keyboard highlighted', async ({ page }) => {
		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		await page.locator('ontario-search-box').locator('input[type="search"]').press('ArrowDown');
		await page.waitForChanges();
		await expectVrtScreenshot(host);
	});
});

test.describe('ontario-search-box - autocomplete suggestion highlight markup', () => {
	test('partial match renders highlighted segment', async ({ page }) => {
		await page.setContent(`
			<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>
		`);
		await page.waitForChanges();
		await page.evaluate(() => {
			const searchBox = document.querySelector('ontario-search-box') as HTMLOntarioSearchBoxElement;
			searchBox.getSuggestions = async () => ['Toronto', 'Ottawa'];
			searchBox.debounceMs = 0;
		});
		// Query that produces a mid-word highlight on "Toronto" → "ron"
		await page.locator('ontario-search-box').locator('input[type="search"]').fill('ron');
		await page.waitForChanges();

		const host = page.locator('ontario-search-box');
		await expect(host).toHaveClass('hydrated');
		const list = host.locator('.ontario-search-autocomplete__suggestion-list');
		await expect(list).toHaveAttribute('aria-hidden', 'false');
		await expectVrtScreenshot(host);
	});
});
