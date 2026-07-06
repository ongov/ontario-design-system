import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-search-box autocomplete', () => {
	test('renders async suggestions and selects by mouse', async ({ page }) => {
		await page.setContent(
			`<ontario-search-box enable-autocomplete caption="Search Ontario cities"></ontario-search-box>`,
		);

		await page.evaluate(() => {
			const searchBox = document.querySelector('ontario-search-box') as HTMLOntarioSearchBoxElement;
			searchBox.getSuggestions = async () => ['Toronto', 'Ottawa', 'London'];
			searchBox.debounceMs = 0;
		});

		const input = page.locator('ontario-search-box').locator('input[type="search"]');
		await input.fill('to');

		const list = page.locator('ontario-search-box').locator('.ontario-search-autocomplete__suggestion-list');
		await expect(list).toHaveAttribute('aria-hidden', 'false');
		await expect(page.locator('ontario-search-box').locator('ontario-search-result-item')).toHaveCount(3);

		const firstOption = page.locator('ontario-search-box').locator('ontario-search-result-item').first();
		await firstOption.dispatchEvent('mousedown');

		await expect(input).toHaveValue('Toronto');
		await expect(list).toHaveAttribute('aria-hidden', 'true');
	});

	test('uses slot suggestions when provided', async ({ page }) => {
		await page.setContent(`<ontario-search-box enable-autocomplete caption="Search cities">
			<ontario-search-result-item slot="suggestions" label="Ajax" value="Ajax"></ontario-search-result-item>
			<ontario-search-result-item slot="suggestions" label="Barrie" value="Barrie"></ontario-search-result-item>
		</ontario-search-box>`);

		const input = page.locator('ontario-search-box').locator('input[type="search"]');
		await input.fill('a');

		const list = page.locator('ontario-search-box').locator('.ontario-search-autocomplete__suggestion-list');
		await expect(list).toHaveAttribute('aria-hidden', 'false');

		await expect(page.locator('ontario-search-box > ontario-search-result-item')).toHaveCount(2);
	});

	test('filters semantic slot suggestions by input query', async ({ page }) => {
		await page.setContent(`<ontario-search-box autocomplete caption="Search cities">
			<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
			<ontario-search-result-item slot="suggestions" label="Waterloo" value="Waterloo"></ontario-search-result-item>
		</ontario-search-box>`);

		const input = page.locator('ontario-search-box').locator('input[type="search"]');
		await input.fill('wat');

		const torontoOption = page.locator('ontario-search-box > ontario-search-result-item[slot="suggestions"]').nth(0);
		const waterlooOption = page.locator('ontario-search-box > ontario-search-result-item[slot="suggestions"]').nth(1);

		await expect(torontoOption).toHaveAttribute('hidden', '');
		await expect(waterlooOption).not.toHaveAttribute('hidden', '');
	});

	test('supports keyboard navigation and Enter selection', async ({ page }) => {
		await page.setContent(
			`<ontario-search-box enable-autocomplete caption="Search Ontario cities"></ontario-search-box>`,
		);
		await page.evaluate(() => {
			const searchBox = document.querySelector('ontario-search-box') as HTMLOntarioSearchBoxElement;
			searchBox.getSuggestions = async () => ['Toronto', 'Ottawa', 'London'];
			searchBox.debounceMs = 0;
		});

		const input = page.locator('ontario-search-box').locator('input[type="search"]');
		await input.fill('o');
		await expect(page.locator('ontario-search-box').locator('ontario-search-result-item')).toHaveCount(3);

		await input.press('ArrowDown');
		await input.press('Enter');

		await expect(input).toHaveValue('Toronto');
	});
});
