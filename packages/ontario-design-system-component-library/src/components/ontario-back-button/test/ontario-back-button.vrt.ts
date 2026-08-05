import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Visual regression tests for ontario-back-button.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the
 * button and link render paths, and their disabled states. Baselines are
 * generated in (or matched against) the CI Playwright Linux image - see
 * `Stencil-VRT-CI-Plan.md`.
 *
 * Snapshots target the component host (a stable element) rather than inner
 * shadow nodes, with animations disabled and the caret hidden for determinism.
 */
test.describe('ontario-back-button - default states', () => {
	test('button mode - default state', async ({ page }) => {
		await page.setContent(`<ontario-back-button></ontario-back-button>`);
		await page.waitForChanges();

		const host = page.locator('ontario-back-button');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioBackButton-default.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('href mode - default state', async ({ page }) => {
		await page.setContent(`<ontario-back-button href="/previous-page" back-mode="href"></ontario-back-button>`);
		await page.waitForChanges();

		const host = page.locator('ontario-back-button');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioBackButton-href.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-back-button - disabled states', () => {
	test('button mode - disabled state', async ({ page }) => {
		await page.setContent(`<ontario-back-button disabled></ontario-back-button>`);
		await page.waitForChanges();

		const host = page.locator('ontario-back-button');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioBackButton-disabled.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('href mode - disabled state', async ({ page }) => {
		await page.setContent(
			`<ontario-back-button href="/previous-page" back-mode="href" disabled></ontario-back-button>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-back-button');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioBackButton-href-disabled.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-back-button - focus state', () => {
	test('button mode - focus state', async ({ page }) => {
		await page.setContent(`<ontario-back-button></ontario-back-button>`);
		await page.waitForChanges();

		const host = page.locator('ontario-back-button');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioBackButton-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});
