import { test, expect, Locator } from '@playwright/test';

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
		await page.goto('/components/ontario-search-box');
		await page.evaluate(() => customElements.whenDefined('ontario-search-box'));
		await page.locator('ontario-search-box').evaluateAll((elements) =>
			Promise.all(
				elements.map((element) =>
					(element as HTMLElement & { componentOnReady: () => Promise<HTMLElement> }).componentOnReady(),
				),
			),
		);
		await Promise.all([
			expect
				.poll(() =>
					page
						.locator('ontario-search-box')
						.first()
						.evaluate((element) => typeof (element as HTMLElement & { performSearch?: unknown }).performSearch),
				)
				.toBe('function'),
			expect
				.poll(() =>
					page
						.locator('ontario-search-box')
							.first()
						.evaluate((element) => typeof (element as HTMLElement & { getSuggestions?: unknown }).getSuggestions),
				)
				.toBe('function'),
		]);
	});

	test('renders the autocomplete search box', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1, name: 'ontario-search-box' })).toBeVisible();
		await expect(page.getByText('Autocomplete with Ontario cities (async)')).toBeVisible();
		await expect(page.locator('ontario-search-box')).toHaveCount(1);
	});

	test('search box has caption and hint text', async ({ page }) => {
		const search = page.locator('ontario-search-box');
		await expect(search.getByText('Search Ontario cities')).toBeVisible();
		await expect(search.getByText('Start typing to see city suggestions.')).toBeVisible();
	});

	test('submitting invokes the React search callback with the entered value', async ({ page }) => {
		const defaultSearch = page.locator('ontario-search-box').first();
		const searchMessage = page.waitForEvent('console', {
			predicate: (message) => message.text() === 'Performing search with value: Toronto',
		});

		await defaultSearch.locator('input[type="search"]').fill('Toronto');
		await defaultSearch.getByRole('button', { name: 'Submit' }).click();

		expect((await searchMessage).text()).toBe('Performing search with value: Toronto');
	});

	test('async autocomplete shows suggestions and supports keyboard selection', async ({ page }) => {
		const autoSearch = page.locator('ontario-search-box');
		const input = autoSearch.locator('input[type="search"]');

		await fillAutocomplete(autoSearch, 'tor');
		await expect(autoSearch.locator('ontario-search-result-item')).toHaveCount(1);

		await input.press('ArrowDown');
		await input.press('Enter');

		await expect(input).toHaveValue('Toronto');
		await expect(autoSearch.locator('.ontario-search-autocomplete__suggestion-list')).toHaveAttribute('aria-hidden', 'true');
	});

	test('async autocomplete supports pointer selection', async ({ page }) => {
		const autoSearch = page.locator('ontario-search-box');
		const input = autoSearch.locator('input[type="search"]');

		await fillAutocomplete(autoSearch, 'tor');
		const suggestion = autoSearch.locator('ontario-search-result-item').filter({ hasText: 'Toronto' });
		await expect(suggestion).toBeVisible();
		await suggestion.click();

		await expect(input).toHaveValue('Toronto');
		await expect(autoSearch.locator('.ontario-search-autocomplete__suggestion-list')).toHaveAttribute('aria-hidden', 'true');
	});

	test('autocomplete supports Escape to close suggestion list', async ({ page }) => {
		const autoSearch = page.locator('ontario-search-box');
		const input = autoSearch.locator('input[type="search"]');

		await fillAutocomplete(autoSearch, 'wa');
		const suggestions = autoSearch.locator('.ontario-search-autocomplete__suggestion-list');
		await expect(suggestions).toHaveAttribute('aria-hidden', 'false');

		await input.press('Escape');
		await expect(suggestions).toHaveAttribute('aria-hidden', 'true');
	});

	test('reset clears entered text and returns focus to the input', async ({ page }) => {
		const defaultSearch = page.locator('ontario-search-box').first();
		const input = defaultSearch.locator('input[type="search"]');

		await input.fill('Toronto');
		await defaultSearch.getByRole('button', { name: 'Clear field' }).click();

		await expect(input).toHaveValue('');
		await expect(input).toBeFocused();
	});
});
