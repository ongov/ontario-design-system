import { test, expect, Locator } from '@playwright/test';

import { gotoSearchPage, searchBox } from './search-box-helpers';

const fillAutocomplete = async (search: Locator, value: string) => {
	const input = search.locator('input[type="search"]');

	await expect(async () => {
		await input.fill(value);
		await expect(input).toHaveValue(value);
		await expect(search.locator('ontario-search-result-item').first()).toBeVisible();
	}).toPass();
};

test.describe('Ontario Search Box - Next.js E2E', () => {
	test.beforeEach(async ({ page }) => {
		await gotoSearchPage(page);
	});

	test('renders the autocomplete search box', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1, name: 'ontario-search-box' })).toBeVisible();
		await expect(page.getByText('Autocomplete with Ontario cities (async)')).toBeVisible();
		await expect(searchBox(page)).toHaveCount(1);
	});

	test('search box has caption and hint text', async ({ page }) => {
		const search = searchBox(page);
		await expect(search.getByText('Search Ontario cities')).toBeVisible();
		await expect(search.getByText('Start typing to see city suggestions.')).toBeVisible();
	});

	test('submitting invokes the React search callback with the entered value', async ({ page }) => {
		const search = searchBox(page);
		const searchMessage = page.waitForEvent('console', {
			predicate: (message) => message.text() === 'Performing search with value: Toronto',
		});

		await search.locator('input[type="search"]').fill('Toronto');
		await search.getByRole('button', { name: 'Submit' }).click();

		expect((await searchMessage).text()).toBe('Performing search with value: Toronto');
	});

	test('async autocomplete shows suggestions and supports keyboard selection', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await fillAutocomplete(search, 'tor');
		await expect(search.locator('ontario-search-result-item')).toHaveCount(1);

		await input.press('ArrowDown');
		await input.press('Enter');

		await expect(input).toHaveValue('Toronto');
		await expect(search.locator('.ontario-search-autocomplete__suggestion-list')).toHaveAttribute(
			'aria-hidden',
			'true',
		);
	});

	test('async autocomplete supports pointer selection', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await fillAutocomplete(search, 'tor');
		const suggestion = search.locator('ontario-search-result-item').filter({ hasText: 'Toronto' });
		await expect(suggestion).toBeVisible();
		await suggestion.click();

		await expect(input).toHaveValue('Toronto');
		await expect(search.locator('.ontario-search-autocomplete__suggestion-list')).toHaveAttribute(
			'aria-hidden',
			'true',
		);
	});

	test('autocomplete supports Escape to close suggestion list', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await fillAutocomplete(search, 'wa');
		const suggestions = search.locator('.ontario-search-autocomplete__suggestion-list');
		await expect(suggestions).toHaveAttribute('aria-hidden', 'false');

		await input.press('Escape');
		await expect(suggestions).toHaveAttribute('aria-hidden', 'true');
	});

	test('reset clears entered text and returns focus to the input', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await input.fill('Toronto');
		await search.getByRole('button', { name: 'Clear field' }).click();

		await expect(input).toHaveValue('');
		await expect(input).toBeFocused();
	});
});
