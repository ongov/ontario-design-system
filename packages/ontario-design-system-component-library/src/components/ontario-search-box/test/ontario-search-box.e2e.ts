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
		await page.waitForTimeout(20);

		const list = page.locator('ontario-search-box').locator('.ontario-search-autocomplete__suggestion-list');
		await expect(list).toHaveAttribute('aria-hidden', 'false');

		const firstOption = page
			.locator('ontario-search-box')
			.locator('.ontario-search-autocomplete__suggestion-option')
			.first();
		await firstOption.click();

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

		const option = page.locator('ontario-search-box > ontario-search-result-item').first();
		await expect(option).toHaveAttribute('slot', 'suggestions');
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
		await page.waitForTimeout(20);

		await input.press('ArrowDown');
		await input.press('Enter');

		await expect(input).toHaveValue('Toronto');
	});
});
