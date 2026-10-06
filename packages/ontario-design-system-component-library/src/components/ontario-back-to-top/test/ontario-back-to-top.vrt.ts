import { test } from '@stencil/playwright';
import { expect, Locator } from '@playwright/test';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

/**
 * Visual regression tests for ontario-back-to-top.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the button's
 * interaction states (neutral/hover/focus/active) and its responsive layouts
 * (tablet stacked, mobile icon-only). Baselines are generated in (or matched
 * against) the CI Playwright Linux image - see `Stencil-VRT-CI-Plan.md`.
 *
 * The component is `position: fixed`, so the custom-element host itself has no
 * box (it collapses to 0x0 since its only child is taken out of normal flow).
 * Screenshots therefore target the shadow `<button>` directly rather than the
 * host, unlike most other component VRT suites in this library.
 *
 * The button is also `visibility: hidden` / `opacity: 0` until `window.scrollY
 * > 200` toggles the `active` class. To keep screenshots deterministic (no
 * scrolling/animation), we add the `active` class directly to the shadow
 * button so it renders visible.
 *
 * `:active` cannot be captured by hovering/focusing alone - Playwright releases
 * the press before the screenshot. We reproduce it by holding `page.mouse.down()`
 * over the element, capturing, then releasing with `page.mouse.up()`.
 */

const activate = async (host: Locator) => {
	await host.evaluate((el) => el.shadowRoot?.querySelector('button')?.classList.add('active'));
};

test.describe('ontario-back-to-top - interaction states', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(withGlobalStyles('<ontario-back-to-top></ontario-back-to-top>'));
		await page.waitForChanges();
		await expect(page.locator('ontario-back-to-top')).toHaveClass(/hydrated/);
	});

	test('neutral', async ({ page }) => {
		const host = page.locator('ontario-back-to-top');
		await activate(host);
		await expectVrtScreenshot(host.locator('button'));
	});

	test('hover', async ({ page }) => {
		const host = page.locator('ontario-back-to-top');
		await activate(host);
		const button = host.locator('button');
		await button.hover();
		await expectVrtScreenshot(button);
	});

	test('focus', async ({ page }) => {
		const host = page.locator('ontario-back-to-top');
		await activate(host);
		const button = host.locator('button');
		await button.focus();
		await expectVrtScreenshot(button);
	});

	test('active', async ({ page }) => {
		const host = page.locator('ontario-back-to-top');
		await activate(host);
		const button = host.locator('button');

		// Hold the press so the :active pseudo-class is engaged during capture.
		await button.hover();
		await page.mouse.down();
		await expectVrtScreenshot(button);
		await page.mouse.up();
	});
});

test.describe('ontario-back-to-top - responsive layouts', () => {
	test('tablet - icon stacked above text', async ({ page }) => {
		// Medium breakpoint = 73em (1168px); 900px renders the stacked layout.
		await page.setViewportSize({ width: 900, height: 800 });
		await page.setContent(withGlobalStyles('<ontario-back-to-top></ontario-back-to-top>'));
		await page.waitForChanges();

		const host = page.locator('ontario-back-to-top');
		await expect(host).toHaveClass(/hydrated/);
		await activate(host);
		await expectVrtScreenshot(host.locator('button'));
	});

	test('mobile - icon only', async ({ page }) => {
		// Small breakpoint = 40em (640px); 375px renders the icon-only layout.
		await page.setViewportSize({ width: 375, height: 700 });
		await page.setContent(withGlobalStyles('<ontario-back-to-top></ontario-back-to-top>'));
		await page.waitForChanges();

		const host = page.locator('ontario-back-to-top');
		await expect(host).toHaveClass(/hydrated/);
		await activate(host);
		await expectVrtScreenshot(host.locator('button'));
	});
});
