import { test, expect, type Locator } from '@playwright/test';

/**
 * Regression tests for `patches/@stencil__ssr@0.4.0.patch`.
 *
 * `@stencil/ssr` wraps every Stencil component in a `display:contents` div. The browser only slots the
 * direct children of a shadow host, so a `slot` prop on a Stencil component only works if that wrapper
 * div carries the `slot` attribute as well. Without the patch the wrapper has no `slot`, the named slot
 * stays empty, and the slotted component is never rendered.
 *
 * The first three tests fail without the patch. The last two are controls that pass either way, so a
 * failure in the first three can only point at the wrapper.
 */
const countAssigned = (host: Locator, slot: string) =>
	host.locator(slot).evaluate((element) => (element as HTMLSlotElement).assignedElements({ flatten: true }).length);

test.describe('Stencil SSR slot forwarding - Next.js E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/stencil-ssr-slot-forwarding');
		// Wait for hydration so slot assignment and the host's reaction to it have settled.
		await expect(page.locator('#ssr-slot-stencil-item')).toHaveClass(/hydrated/);
		await expect(page.locator('#ssr-slot-stencil-button')).toHaveClass(/hydrated/);
	});

	test('assigns a Stencil component with a slot prop to the named slot', async ({ page }) => {
		const item = page.locator('#ssr-slot-stencil-item');
		expect(await countAssigned(item, 'slot[name="action"]')).toBe(1);
	});

	test('renders a Stencil component with a slot prop', async ({ page }) => {
		await expect(page.locator('#ssr-slot-stencil-button')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Edit last name' })).toBeVisible();
	});

	test('lets the host react to the slotted Stencil component', async ({ page }) => {
		const container = page.locator('#ssr-slot-stencil-item').locator('.ontario-summary-list-item__button-container');
		await expect(container).not.toHaveClass(/ontario-summary-list-item__button-container--hidden/);
	});

	test('assigns a plain element with a slot prop to the named slot (control)', async ({ page }) => {
		const item = page.locator('#ssr-slot-plain-item');
		expect(await countAssigned(item, 'slot[name="action"]')).toBe(1);
		await expect(page.locator('#ssr-slot-plain-link')).toBeVisible();
	});

	test('keeps Stencil components without a slot prop in the default slot (control)', async ({ page }) => {
		const list = page.locator('#ssr-slot-default-list');
		expect(await countAssigned(list, 'slot:not([name])')).toBe(2);
		await expect(list.getByText('gsmith@example.com')).toBeVisible();
		await expect(list.getByText('555-0100')).toBeVisible();
	});
});
