import { test } from '@playwright/test';
import { expectVrtScreenshot } from '../vrt-helpers';
import { TAG_SELECTORS } from './ontario-tag.selectors';

test.describe('Ontario Tag - variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-tag');
		await page.waitForSelector(`${TAG_SELECTORS.dismissible}.hydrated`);
	});

	test('unselected - default state', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_SELECTORS.unselected));
	});

	test('selected - default state', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_SELECTORS.selected));
	});

	test('dismissible - default state', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_SELECTORS.dismissible));
	});

	test('dismissible - French', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_SELECTORS.dismissibleFrench));
	});
});
