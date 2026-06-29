import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Visual regression tests for ontario-button.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the button
 * variants and their focus states. Baselines are generated in (or matched
 * against) the CI Playwright Linux image - see `Stencil-VRT-CI-Plan.md`.
 *
 * Snapshots target the component host (a stable element) rather than inner
 * shadow nodes, with animations disabled and the caret hidden for determinism.
 */
test.describe('ontario-button - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-button type="primary" element-id="ontario-button-primary">Primary</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-secondary">Secondary</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-tertiary">Tertiary</ontario-button>
		`);
		await page.waitForChanges();
	});

	test('primary button - default state', async ({ page }) => {
		const host = page.locator('ontario-button[type="primary"]');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioButtonPrimary.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('secondary button - default state', async ({ page }) => {
		const host = page.locator('ontario-button[type="secondary"]');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioButtonSecondary.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('tertiary button - default state', async ({ page }) => {
		const host = page.locator('ontario-button[type="tertiary"]');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioButtonTertiary.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-button - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-button type="primary" element-id="ontario-button-primary">Primary</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-secondary">Secondary</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-tertiary">Tertiary</ontario-button>
		`);
		await page.waitForChanges();
	});

	test('primary button - focus state', async ({ page }) => {
		const host = page.locator('ontario-button[type="primary"]');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioButtonPrimary-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('secondary button - focus state', async ({ page }) => {
		const host = page.locator('ontario-button[type="secondary"]');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioButtonSecondary-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('tertiary button - focus state', async ({ page }) => {
		const host = page.locator('ontario-button[type="tertiary"]');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioButtonTertiary-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});
