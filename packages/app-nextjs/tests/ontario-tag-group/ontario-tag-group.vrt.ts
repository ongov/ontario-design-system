import { test } from '@playwright/test';
import { expectVrtScreenshot } from '../vrt-helpers';
import { TAG_GROUP_SELECTORS } from './ontario-tag-group.selectors';

test.describe('Ontario Tag Group - variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-tag-group');
		await page.waitForSelector(`${TAG_GROUP_SELECTORS.appliedFilters}.hydrated`);
	});

	test('applied filters - heading, count, hint text and dismissible tags', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_GROUP_SELECTORS.appliedFilters));
	});

	test('filter set - groupLabel and non-dismissible tags', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_GROUP_SELECTORS.filterSet));
	});

	test('French group', async ({ page }) => {
		await expectVrtScreenshot(page.locator(TAG_GROUP_SELECTORS.french));
	});
});
