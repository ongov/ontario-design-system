import { test, expect, Page } from '@playwright/test';
import { gotoWithHtmlLang } from './helpers';

const footerLinks = (page: Page) => page.locator('#language-sync-footer .ontario-footer__links-container--inline a');

const headerLanguageToggle = (page: Page) =>
	page
		.locator('#language-sync-header ontario-language-toggle a, #language-sync-header ontario-language-toggle button')
		.first();

test.describe('Language sync - initial page language', () => {
	test('footer renders English links when `<html lang>` is `en`', async ({ page }) => {
		await gotoWithHtmlLang(page, 'en');

		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(footerLinks(page).first()).toHaveText('Accessibility');
	});

	test('footer renders French links when `<html lang>` is `fr` and no `language` prop is set', async ({ page }) => {
		await gotoWithHtmlLang(page, 'fr');

		await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect(footerLinks(page).first()).toHaveText('Accessibilité');
		await expect(footerLinks(page).nth(1)).toHaveText('Confidentialité');
	});

	test('header toggle offers English when `<html lang>` is `fr`', async ({ page }) => {
		await gotoWithHtmlLang(page, 'fr');

		await expect(headerLanguageToggle(page)).toContainText('English');
	});
});

test.describe('Language sync - toggling the language', () => {
	test('footer follows the header language toggle from English to French and back', async ({ page }) => {
		await gotoWithHtmlLang(page, 'en');
		await expect(footerLinks(page).first()).toHaveText('Accessibility');

		await headerLanguageToggle(page).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect(footerLinks(page).first()).toHaveText('Accessibilité');

		await headerLanguageToggle(page).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(footerLinks(page).first()).toHaveText('Accessibility');
	});
});
