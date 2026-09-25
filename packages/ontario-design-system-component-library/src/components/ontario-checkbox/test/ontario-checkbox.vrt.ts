import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Visual regression tests for ontario-checkbox.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the default,
 * hover, checked, focus, required and error states. Baselines are generated in (or
 * matched against) the CI Playwright Linux image - see `Stencil-VRT-CI-Plan.md`.
 */
test.describe('ontario-checkbox - default states', () => {
	test('unchecked - default state', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioCheckbox-unchecked.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('checked state', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" checked></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioCheckbox-checked.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('hover state', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');
		await host.locator('.ontario-checkbox__label').hover();
		await expect(host).toHaveScreenshot('ontarioCheckbox-hover.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-checkbox - focus state', () => {
	test('focus state', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed"></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');
		await host.locator('input').focus();
		await expect(host).toHaveScreenshot('ontarioCheckbox-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-checkbox - required state', () => {
	test('required - default state', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" required></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');
		await expect(host).toHaveScreenshot('ontarioCheckbox-required.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-checkbox - error state', () => {
	test('error state', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" error-message="You must agree to continue"></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');
		await expect(host).toHaveScreenshot('ontarioCheckbox-error.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	// A required, unchecked checkbox always shows the red error state automatically,
	// with no `error-message` prop set and no interaction needed.
	test('required - automatic error state when unchecked', async ({ page }) => {
		await page.setContent(
			`<ontario-checkbox element-id="terms" label="I agree to the terms and conditions" name="terms" value="agreed" required></ontario-checkbox>`,
		);
		await page.waitForChanges();

		const host = page.locator('ontario-checkbox');

		await expect(host).toHaveScreenshot('ontarioCheckbox-required-auto-error.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});
