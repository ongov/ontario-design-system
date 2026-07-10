import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

/**
 * Visual regression tests for ontario-summary-list-item.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the summary
 * list item variants. Baselines are generated in (or matched against) the CI Playwright
 * Linux image - see `Stencil-VRT-CI-Plan.md`.
 *
 * Snapshots target the component host (a stable element) rather than inner
 * shadow nodes, with animations disabled and the caret hidden for determinism.
 */

/**
 * Wraps component markup with the global stylesheet so that @font-face
 * declarations (Raleway Modified, Open Sans) are available to shadow-DOM
 * components that inherit typography from the document root.
 */
test.describe('ontario-summary-list-item', () => {
	test.describe('with action', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
				<ontario-summary-list caption="Row variants">
					<ontario-summary-list-item
						name="Full name"
						description="Jane Doe"
						action-link='{"href":"#name"}'
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
			);
			await page.waitForChanges();
		});

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});

		test('focus', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			const changeLink = host
				.locator('ontario-summary-list-item')
				.locator('a.ontario-summary-list-item__change-button');
			await changeLink.focus();
			await expectVrtScreenshot(host);
		});
	});

	test.describe('without action', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
				<ontario-summary-list caption="Row variants">
					<ontario-summary-list-item
						name="Email address"
						description="jane.doe@example.com"
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
			);
			await page.waitForChanges();
		});

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});
	});

	test.describe('compact', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
				<ontario-summary-list caption="Compact rows">
					<ontario-summary-list-item
						name="Full name"
						description="Jane Doe"
						compact
						action-link='{"href":"#name"}'
					></ontario-summary-list-item>
					<ontario-summary-list-item
						name="Date of birth"
						description="January 1, 1990"
						compact
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
			);
			await page.waitForChanges();
		});

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});
	});
});
