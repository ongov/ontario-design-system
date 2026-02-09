import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-header-overflow-menu', () => {
	let host: Locator;
	let nav: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent('<ontario-header-overflow-menu></ontario-header-overflow-menu>');
		await page.waitForChanges();

		host = page.locator('ontario-header-overflow-menu').first();
		nav = host.locator('nav#ontario-application-navigation');

		await host.evaluate((element: HTMLOntarioHeaderOverflowMenuElement) => {
			element.menuItems = [
				{ title: 'Link 1', href: '/link-1', linkIsActive: false },
				{ title: 'Link 2', href: '/link-2', linkIsActive: false },
			];
		});
		await page.waitForChanges();
	});

	test('opens menu when menuButtonToggled detail is true', async ({ page }) => {
		await page.evaluate(() => {
			window.dispatchEvent(new CustomEvent('menuButtonToggled', { detail: true }));
		});
		await page.waitForChanges();
		await expect(nav).toContainClass('ontario-navigation--open');
		await expect(nav).toHaveAttribute('aria-hidden', 'false');
	});

	test('closes menu when menuButtonToggled detail is false', async ({ page }) => {
		await page.evaluate(() => {
			window.dispatchEvent(new CustomEvent('menuButtonToggled', { detail: true }));
		});
		await page.waitForChanges();

		await page.evaluate(() => {
			window.dispatchEvent(new CustomEvent('menuButtonToggled', { detail: false }));
		});
		await page.waitForChanges();
		await expect(nav).not.toContainClass('ontario-navigation--open');
		await expect(nav).toHaveAttribute('aria-hidden', 'true');
	});

	test('closes menu when focus leaves in standalone mode', async ({ page }) => {
		await page.setContent(
			'<button id="outside-target">Outside</button><ontario-header-overflow-menu></ontario-header-overflow-menu>',
		);
		await page.waitForChanges();
		host = page.locator('ontario-header-overflow-menu').first();
		nav = host.locator('nav#ontario-application-navigation');

		await host.evaluate((element: HTMLOntarioHeaderOverflowMenuElement) => {
			element.menuItems = [
				{ title: 'Link 1', href: '/link-1', linkIsActive: false },
				{ title: 'Link 2', href: '/link-2', linkIsActive: false },
			];
		});
		await page.waitForChanges();

		await page.evaluate(() => {
			window.dispatchEvent(new CustomEvent('menuButtonToggled', { detail: true }));
		});
		await page.waitForChanges();

		await page.evaluate(() => {
			const outsideTarget = document.getElementById('outside-target');
			window.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: outsideTarget }));
		});
		await page.waitForChanges();
		await expect(nav).not.toContainClass('ontario-navigation--open');
		await expect(nav).toHaveAttribute('aria-hidden', 'true');
	});
});
