import { expect, Locator, Page, test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

const searchBox = (page: Page) => page.locator('ontario-search-box').first();

const searchForm = (search: ReturnType<typeof searchBox>) => search.locator('form.ontario-search__container');

const focusControl = async (control: Locator) => {
	await expect(async () => {
		await control.focus();
		await expect(control).toBeFocused();
	}).toPass();
};

const fillAutocomplete = async (page: Page, search: Locator, value: string) => {
	const input = search.locator('input[type="search"]');
	const suggestions = search.locator('.ontario-search-autocomplete__suggestion-list');

	await expect(async () => {
		await input.fill(value);
		await expect(input).toHaveValue(value);
		await expect(suggestions).toHaveAttribute('aria-hidden', 'false');
		await expect(search.locator('ontario-search-result-item').first()).toBeVisible();
		await waitForInteractionPaint(page);
		await expect(suggestions).toHaveAttribute('aria-hidden', 'false');
	}).toPass();
};

const includeSuggestionsInScreenshot = async (search: Locator) => {
	const suggestions = search.locator('.ontario-search-autocomplete__suggestion-list');
	const listHeight = await suggestions.evaluate((element) => element.scrollHeight);

	await search.locator('.ontario-search__input-suggestion-container').evaluate((container, height) => {
		container.style.paddingBottom = `${height}px`;
	}, listHeight);
};

const gotoSearchPage = async (page: Page) => {
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
			.poll(() => searchBox(page).evaluate((element) => typeof (element as HTMLElement & { performSearch?: unknown }).performSearch))
			.toBe('function'),
		expect
			.poll(() => searchBox(page).evaluate((element) => typeof (element as HTMLElement & { getSuggestions?: unknown }).getSuggestions))
			.toBe('function'),
	]);
};

test.describe('Search Box - default states', () => {
	test.beforeEach(async ({ page }) => {
		await gotoSearchPage(page);
	});

	test('search box default', async ({ page }) => {
		await expectVrtScreenshot(searchForm(searchBox(page)));
	});

	test('autocomplete with suggestions list open', async ({ page }) => {
		const search = searchBox(page);

		await fillAutocomplete(page, search, 'to');
		await expect(search.locator('.ontario-search-autocomplete__suggestion-list')).toHaveAttribute('aria-hidden', 'false');
		await expect(search.locator('ontario-search-result-item').first()).toBeVisible();
		await includeSuggestionsInScreenshot(search);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search), { maxDiffPixels: 900 });
	});

	test('search box with entered value', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await fillAutocomplete(page, search, 'Toronto');
		await expect(input).toHaveValue('Toronto');
		await includeSuggestionsInScreenshot(search);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search));
	});

	test('autocomplete with first suggestion keyboard highlighted', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await expect(async () => {
			await fillAutocomplete(page, search, 'to');
			await input.press('ArrowDown');
			await expect(search.locator('ontario-search-result-item').first()).toHaveAttribute('aria-selected', 'true');
		}).toPass();
		await includeSuggestionsInScreenshot(search);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search), { maxDiffPixels: 900 });
	});

	test('autocomplete with matched input highlighted', async ({ page }) => {
		const search = searchBox(page);

		await fillAutocomplete(page, search, 'ron');
		await expect(search.locator('.ontario-search-result-item__match').filter({ hasText: 'ron' })).toBeVisible();
		await includeSuggestionsInScreenshot(search);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search), { maxDiffPixels: 900 });
	});
});

test.describe('Search Box - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await gotoSearchPage(page);
	});

	test('search input focused', async ({ page }) => {
		const search = searchBox(page);
		const input = search.locator('input[type="search"]');

		await focusControl(input);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search), { maxDiffPixels: 700 });
	});

	test('reset button focused with entered value', async ({ page }) => {
		const search = searchBox(page);
		const resetButton = search.locator('input[type="reset"]');

		await search.evaluate((element) => {
			(element as HTMLElement & { value: string }).value = 'Toronto';
		});
		await expect(search.locator('input[type="search"]')).toHaveValue('Toronto');
		await focusControl(resetButton);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search));
	});

	test('submit button focused', async ({ page }) => {
		const search = searchBox(page);
		const submitButton = search.getByRole('button', { name: 'Submit' });

		await focusControl(submitButton);
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search));
	});
});

test.describe('Search Box - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await gotoSearchPage(page);
	});

	test('search button hovered', async ({ page }) => {
		const search = searchBox(page);
		const button = search.getByRole('button', { name: 'Submit' });

		await button.hover();
		await expectVrtScreenshot(searchForm(search));
	});
});

test.describe('Search Box - active states', () => {
	test.beforeEach(async ({ page }) => {
		await gotoSearchPage(page);
	});

	test('search button active', async ({ page }) => {
		const search = searchBox(page);
		const button = search.getByRole('button', { name: 'Submit' });

		await button.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(searchForm(search), { maxDiffPixels: 900 });
		await page.mouse.up();
	});
});
