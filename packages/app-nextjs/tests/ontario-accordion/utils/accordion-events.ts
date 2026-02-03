import type { Page } from '@playwright/test';

/**
 * Starts listening for `accordionChange` events on an ontario-accordion
 * inside a specific section of the page.
 *
 * Why this exists:
 * - Playwright doesn't have built-in helpers for CustomEvents
 * - We want to assert event payloads without relying on Stencil test utils
 * - This keeps Next.js E2E tests framework-agnostic
 *
 * Supports two selector patterns:
 * 1) `within` is a wrapper that CONTAINS an <ontario-accordion>
 * 2) `within` IS the <ontario-accordion> itself (e.g. you target by id)
 */
export async function startListeningForAccordionChanges(
	page: Page,
	options: {
		within: string; // selector scoping where to find the accordion
	},
) {
	await page.evaluate(({ within }) => {
		// Reset captured events for this test run
		(window as any).accordionChangeEvents = [];

		const root = document.querySelector(within);
		if (!root) return;

		// If `within` points directly to the accordion, use it.
		// Otherwise, look for an accordion inside the container.
		const accordion =
			root.tagName.toLowerCase() === 'ontario-accordion' ? root : root.querySelector('ontario-accordion');

		if (!accordion) return;

		accordion.addEventListener('accordionChange', (event: Event) => {
			(window as any).accordionChangeEvents.push((event as CustomEvent).detail);
		});
	}, options);
}

/**
 * Returns all captured accordionChange event details.
 */
export async function getAccordionChangeEvents(page: Page) {
	return await page.evaluate(() => {
		return (window as any).accordionChangeEvents ?? [];
	});
}

/**
 * Convenience helper for the most recent accordionChange event.
 */
export async function getLastAccordionChangeEvent(page: Page) {
	const events = await getAccordionChangeEvents(page);
	return events.at(-1);
}
