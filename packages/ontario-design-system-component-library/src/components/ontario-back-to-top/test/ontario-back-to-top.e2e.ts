import { expect, Locator } from '@playwright/test';
import { test, type E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { mockBTTContent } from './mock-page-content';

const EN_ARIA_LABEL = 'Scroll back to the top';
const FR_ARIA_LABEL = 'Retour en haut de la page';

// Ontario Design System breakpoints: small = 40em (640px), medium = 73em (1168px).
// The medium breakpoint (>640px, <=1168px) renders the icon stacked above the
// text - the exact layout the customer's axe scan was taken in - and the small
// breakpoint (<=640px) renders the icon-only variant.
const TABLET_VIEWPORT = { width: 900, height: 800 };
const MOBILE_VIEWPORT = { width: 375, height: 700 };

const scrollDown = async (page: E2EPage) => {
	await page.evaluate(async () => {
		window.scrollTo(0, 500);
		await new Promise((resolve) => setTimeout(resolve, 100));
	});
	await page.waitForChanges();
};

test.describe('ontario-back-to-top', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent('<ontario-back-to-top></ontario-back-to-top>');
		await page.waitForChanges();
		host = page.locator('ontario-back-to-top');
	});

	test('renders and hydrates', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);
	});

	test('is hidden on page load', async () => {
		const button = host.locator('button');
		await expect(button).toHaveClass('ontario-back-to-top');
		await expect(button).not.toHaveClass(/active/);
		await expect(button).toHaveCSS('visibility', 'hidden');
	});

	test('exposes the English aria-label by default', async () => {
		await expect(host.locator('button')).toHaveAttribute('aria-label', EN_ARIA_LABEL);
	});

	test('exposes the French aria-label when language is fr', async ({ page }) => {
		await host.evaluate((el) => el.setAttribute('language', 'fr'));
		await page.waitForChanges();
		await expect(host.locator('button')).toHaveAttribute('aria-label', FR_ARIA_LABEL);
	});

	test('marks the icon as decorative (aria-hidden)', async () => {
		await expect(host.locator('span[aria-hidden="true"]')).toHaveCount(1);
	});
});

test.describe('ontario-back-to-top - scroll behaviour', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(mockBTTContent);
		await page.waitForChanges();
	});

	test('becomes visible after scrolling past 200px', async ({ page }) => {
		await scrollDown(page);

		const button = page.locator('ontario-back-to-top').locator('button');
		await expect(button).toHaveClass('ontario-back-to-top active');
		await expect(button).toHaveCSS('visibility', 'visible');
	});

	test('scrolls the window back to the top and re-hides when clicked', async ({ page }) => {
		await scrollDown(page);

		const button = page.locator('ontario-back-to-top').locator('button');
		await expect(button).toHaveClass('ontario-back-to-top active');

		await button.click();

		// The click triggers a smooth scroll to the top; wait for it to settle.
		await page.waitForFunction(() => window.scrollY === 0);
		await page.waitForChanges();

		await expect(button).toHaveClass('ontario-back-to-top');
		await expect(button).not.toHaveClass(/active/);
		await expect(button).toHaveCSS('visibility', 'hidden');
	});

	test('activates via the Enter key and scrolls to the top', async ({ page }) => {
		await scrollDown(page);

		const button = page.locator('ontario-back-to-top').locator('button');
		await expect(button).toHaveClass(/active/);

		await button.focus();
		await expect(button).toBeFocused();
		await page.keyboard.press('Enter');

		await page.waitForFunction(() => window.scrollY === 0);
		expect(await page.evaluate(() => window.scrollY)).toBe(0);
	});

	test('activates via the Space key and scrolls to the top', async ({ page }) => {
		await scrollDown(page);

		const button = page.locator('ontario-back-to-top').locator('button');
		await expect(button).toHaveClass(/active/);

		await button.focus();
		await expect(button).toBeFocused();
		await page.keyboard.press('Space');

		await page.waitForFunction(() => window.scrollY === 0);
		expect(await page.evaluate(() => window.scrollY)).toBe(0);
	});
});

/**
 * Accessibility coverage.
 *
 * This suite was added following an investigation into a customer-reported axe
 * DevTools "insufficient colour contrast" finding on ontario-back-to-top. That
 * finding referenced a background colour (#808080) that does not exist anywhere
 * in this component's CSS; it was traced to a known axe-core limitation with
 * overlapping/stacked foreground elements (the SVG icon sitting adjacent to /
 * above the text label), not a real defect. All defined colour states pass
 * WCAG AA by a wide margin (13.94:1, 10.84:1, 8.21:1). See:
 *   - https://dequeuniversity.com/rules/axe/4.10/color-contrast
 *   - axe-core issues #3464, #4542, #4629
 *
 * These scans are expected to report 0 violations. That is the point: they give
 * us CI regression coverage documenting that the report was tool-side, and cover
 * the hidden state, the visible desktop state, and - critically - the visible
 * tablet (icon-stacked-above-text) and mobile (icon-only) breakpoints, which is
 * the layout the customer's scan was taken in.
 */
test.describe('ontario-back-to-top - accessibility', () => {
	test('has no axe violations in the hidden (default) state', async ({ page }) => {
		await page.setContent('<ontario-back-to-top></ontario-back-to-top>');
		await page.waitForChanges();

		const results = await new AxeBuilder({ page }).include('ontario-back-to-top').analyze();
		expect(results.violations).toHaveLength(0);
	});

	test('has no axe violations in the visible desktop state', async ({ page }) => {
		await page.setContent(mockBTTContent);
		await page.waitForChanges();
		await scrollDown(page);

		await expect(page.locator('ontario-back-to-top').locator('button')).toHaveClass(/active/);

		const results = await new AxeBuilder({ page }).include('ontario-back-to-top').analyze();
		expect(results.violations).toHaveLength(0);
	});

	test('has no axe violations in the visible tablet (stacked) breakpoint', async ({ page }) => {
		await page.setViewportSize(TABLET_VIEWPORT);
		await page.setContent(mockBTTContent);
		await page.waitForChanges();
		await scrollDown(page);

		await expect(page.locator('ontario-back-to-top').locator('button')).toHaveClass(/active/);

		const results = await new AxeBuilder({ page }).include('ontario-back-to-top').analyze();
		expect(results.violations).toHaveLength(0);
	});

	test('has no axe violations in the visible mobile (icon-only) breakpoint', async ({ page }) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.setContent(mockBTTContent);
		await page.waitForChanges();
		await scrollDown(page);

		await expect(page.locator('ontario-back-to-top').locator('button')).toHaveClass(/active/);

		const results = await new AxeBuilder({ page }).include('ontario-back-to-top').analyze();
		expect(results.violations).toHaveLength(0);
	});
});
