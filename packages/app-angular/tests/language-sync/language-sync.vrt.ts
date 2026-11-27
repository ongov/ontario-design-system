import { test, expect } from '@playwright/test';
import { gotoWithHtmlLang } from './helpers';

for (const lang of ['en', 'fr'] as const) {
	test.describe(`Language sync - ${lang}`, () => {
		test.beforeEach(async ({ page }) => {
			// The footer copyright shows the current year, so fix the date to keep the baselines stable.
			await page.clock.setFixedTime(new Date('2026-06-30T12:00:00Z'));
			await gotoWithHtmlLang(page, lang);
		});

		test(`header - ${lang}`, async ({ page }) => {
			await expect(page.locator('#language-sync-header')).toHaveScreenshot({ animations: 'disabled' });
		});

		test(`content - ${lang}`, async ({ page }) => {
			await expect(page.locator('#language-sync-content')).toHaveScreenshot({ animations: 'disabled' });
		});

		test(`footer - ${lang}`, async ({ page }) => {
			await expect(page.locator('#language-sync-footer')).toHaveScreenshot({ animations: 'disabled' });
		});
	});
}
