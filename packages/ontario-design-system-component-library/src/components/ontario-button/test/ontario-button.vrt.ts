import { expect, type Locator } from '@playwright/test';
import { test } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';
import { ButtonTypes } from '../ontario-button.types';
/**
 * Visual regression tests for ontario-button.
 *
 * These tests cover the button variants, interaction states, link rendering,
 * and mobile layout using the shared VRT helpers.
 */
const setButtonContent = async (host: Locator, type: (typeof ButtonTypes)[number]) => {
	await host.evaluate((button: HTMLOntarioButtonElement, buttonType) => {
		button.label = `${buttonType} button`;
		button.ariaLabelText = `${buttonType} button`;
		button.type = buttonType;
	}, type);
};

test.describe('ontario-button - interaction states', () => {
	for (const buttonType of ButtonTypes) {
		test(`${buttonType} button - default state`, async ({ page }) => {
			await page.setContent(withGlobalStyles('<ontario-button></ontario-button>'));
			await page.waitForChanges();
			const host = page.locator('ontario-button');
			await setButtonContent(host, buttonType);
			await page.waitForChanges();

			const button = host.locator('button');
			await expect(button).toBeVisible();
			await expectVrtScreenshot(button);
		});

		test(`${buttonType} button - hover state`, async ({ page }) => {
			await page.setContent(withGlobalStyles('<ontario-button></ontario-button>'));
			await page.waitForChanges();
			const host = page.locator('ontario-button');
			await setButtonContent(host, buttonType);
			await page.waitForChanges();

			const button = host.locator('button');
			await button.hover();
			await expectVrtScreenshot(button);
		});

		test(`${buttonType} button - focus state`, async ({ page }) => {
			await page.setContent(withGlobalStyles('<ontario-button></ontario-button>'));
			await page.waitForChanges();
			const host = page.locator('ontario-button');
			await setButtonContent(host, buttonType);
			await page.waitForChanges();

			const button = host.locator('button');
			await button.focus();
			await expectVrtScreenshot(button);
		});

		test(`${buttonType} button - active state`, async ({ page }) => {
			await page.setContent(withGlobalStyles('<ontario-button></ontario-button>'));
			await page.waitForChanges();
			const host = page.locator('ontario-button');
			await setButtonContent(host, buttonType);
			await page.waitForChanges();

			const button = host.locator('button');
			await button.hover();
			await page.mouse.down();
			try {
				await expectVrtScreenshot(button);
			} finally {
				await page.mouse.up();
			}
		});
	}
});

test.describe('ontario-button - link and responsive states', () => {
	test('link mode', async ({ page }) => {
		await page.setContent(withGlobalStyles('<ontario-button href="/details" label="View details"></ontario-button>'));
		await page.waitForChanges();

		const link = page.locator('ontario-button').locator('a');
		await expect(link).toBeVisible();
		await expectVrtScreenshot(link);
	});

	test('primary button - mobile layout', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.setContent(withGlobalStyles('<ontario-button type="primary" label="Continue"></ontario-button>'));
		await page.waitForChanges();

		const button = page.locator('ontario-button').locator('button');
		await expect(button).toBeVisible();
		await expectVrtScreenshot(button);
	});

	test('primary button - tablet layout', async ({ page }) => {
		await page.setViewportSize({ width: 900, height: 800 });
		await page.setContent(withGlobalStyles('<ontario-button type="primary" label="Réviser reçu"></ontario-button>'));
		await page.waitForChanges();

		const button = page.locator('ontario-button').locator('button');
		await expect(button).toBeVisible();
		await expectVrtScreenshot(button);
	});
});
