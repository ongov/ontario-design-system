import { expect, type Page } from '@playwright/test';

/**
 * Navigates to the ontario-search-box demo page and waits until the
 * component is hydrated and its `performSearch`/`getSuggestions` function
 * props have been assigned by React.
 *
 * Shared by the e2e and VRT suites so both wait on the same readiness
 * conditions before interacting with the component.
 */
export const gotoSearchBoxPage = async (page: Page) => {
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

	const searchBox = page.locator('ontario-search-box').first();

	await Promise.all([
		expect
			.poll(() =>
				searchBox.evaluate((element) => typeof (element as HTMLElement & { performSearch?: unknown }).performSearch),
			)
			.toBe('function'),
		expect
			.poll(() =>
				searchBox.evaluate((element) => typeof (element as HTMLElement & { getSuggestions?: unknown }).getSuggestions),
			)
			.toBe('function'),
	]);
};
