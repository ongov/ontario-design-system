import { test, expect, Page } from '@playwright/test';
import { gotoWithHtmlLang } from './helpers';

const footerLinks = (page: Page) => page.locator('#language-sync-footer .ontario-footer__links-container--inline a');

// The copyright link is the footer's own text. The other links are passed in by the page, so only the copyright
// line proves that the footer itself picked up the page language.
const footerCopyright = (page: Page) => page.locator('#language-sync-footer .ontario-footer__copyright');

const pageHeading = (page: Page) => page.locator('#language-sync-content h2');

const headerLanguageToggle = (page: Page) =>
	page
		.locator('#language-sync-header ontario-language-toggle a, #language-sync-header ontario-language-toggle button')
		.first();

test.describe('Language sync - initial page language', () => {
	test('renders in English when `<html lang>` is `en`', async ({ page }) => {
		await gotoWithHtmlLang(page, 'en');

		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(pageHeading(page)).toHaveText('How to start an Angular POC with the Design System');
		await expect(footerLinks(page).first()).toHaveText('Accessibility');
		await expect(footerCopyright(page)).toContainText("King's Printer for Ontario");
	});

	test('renders in French when `<html lang>` is `fr` and no `language` prop is set', async ({ page }) => {
		await gotoWithHtmlLang(page, 'fr');

		await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect(pageHeading(page)).toContainText('Comment démarrer une preuve de concept avec Angular');
		await expect(footerLinks(page).first()).toHaveText('Accessibilité');
		await expect(footerCopyright(page)).toContainText('Imprimeur du Roi pour l’Ontario');
	});

	test('header toggle offers English when `<html lang>` is `fr`', async ({ page }) => {
		await gotoWithHtmlLang(page, 'fr');

		await expect(headerLanguageToggle(page)).toContainText('English');
	});
});

test.describe('Language sync - toggling the language', () => {
	test('page and footer follow the header language toggle from English to French and back', async ({ page }) => {
		await gotoWithHtmlLang(page, 'en');
		await expect(footerCopyright(page)).toContainText("King's Printer for Ontario");

		await headerLanguageToggle(page).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
		await expect(pageHeading(page)).toContainText('Comment démarrer une preuve de concept avec Angular');
		await expect(footerLinks(page).first()).toHaveText('Accessibilité');
		await expect(footerCopyright(page)).toContainText('Imprimeur du Roi pour l’Ontario');

		await headerLanguageToggle(page).click();
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(pageHeading(page)).toHaveText('How to start an Angular POC with the Design System');
		await expect(footerLinks(page).first()).toHaveText('Accessibility');
		await expect(footerCopyright(page)).toContainText("King's Printer for Ontario");
	});
});
