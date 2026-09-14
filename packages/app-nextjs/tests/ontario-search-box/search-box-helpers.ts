import { expect, type Page } from '@playwright/test';

/**
 * The autocomplete demo on the search box page is wrapped in `#autocomplete-demo`, since the
 * page also renders several other `ontario-search-box` prop-variant demos alongside it.
 */
export const searchBox = (page: Page) => page.locator('#autocomplete-demo ontario-search-box');

/**
 * Navigates to the search box demo page and waits for the autocomplete search box to be
 * hydrated and fully wired up (its `performSearch`/`getSuggestions` callbacks assigned)
 * before tests interact with it.
 */
export const gotoSearchPage = async (page: Page) => {
	await page.goto('/components/ontario-search-box');
	await page.evaluate(() => customElements.whenDefined('ontario-search-box'));
	await page
		.locator('ontario-search-box')
		.evaluateAll((elements) =>
			Promise.all(
				elements.map((element) =>
					(element as HTMLElement & { componentOnReady: () => Promise<HTMLElement> }).componentOnReady(),
				),
			),
		);
	await Promise.all([
		expect
			.poll(() =>
				searchBox(page).evaluate(
					(element) => typeof (element as HTMLElement & { performSearch?: unknown }).performSearch,
				),
			)
			.toBe('function'),
		expect
			.poll(() =>
				searchBox(page).evaluate(
					(element) => typeof (element as HTMLElement & { getSuggestions?: unknown }).getSuggestions,
				),
			)
			.toBe('function'),
	]);
};
