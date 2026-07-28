import { test, expect } from '@playwright/test';

test.describe('Ontario Footer - type variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-footer');
	});

	test('default footer - default state', async ({ page }) => {
		const footer = page.locator('#ontario-footer-default');
		await expect(footer).toHaveScreenshot();
	});

	test('twoColumn footer - default state', async ({ page }) => {
		const footer = page.locator('#ontario-footer-two-column');
		await expect(footer).toHaveScreenshot();
	});

	test('twoColumn footer with social links - default state', async ({ page }) => {
		const footer = page.locator('#ontario-footer-two-column-social');
		await expect(footer).toHaveScreenshot();
	});

	test('threeColumn footer with social links - default state', async ({ page }) => {
		const footer = page.locator('#ontario-footer-three-column');
		await expect(footer).toHaveScreenshot();
	});

	test('footer with no top margin - default state', async ({ page }) => {
		const footer = page.locator('#ontario-footer-no-top-margin');
		await expect(footer).toHaveScreenshot();
	});
});

test.describe('Ontario Footer - link interaction states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-footer');
	});

	test('default footer - inline link hover', async ({ page }) => {
		const host = page.locator('#ontario-footer-default');
		const link = host.locator('.ontario-footer__links-container--inline .ontario-footer__link').first();

		await link.hover();

		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('default footer - inline link focus', async ({ page }) => {
		const host = page.locator('#ontario-footer-default');
		const link = host.locator('.ontario-footer__links-container--inline .ontario-footer__link').first();

		await link.focus();

		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('default footer - inline link active', async ({ page }) => {
		const host = page.locator('#ontario-footer-default');
		const link = host.locator('.ontario-footer__links-container--inline .ontario-footer__link').first();

		await link.hover();
		await page.mouse.down();

		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});

		await page.mouse.up();
	});

	test('twoColumn footer with social links - social link hover', async ({ page }) => {
		const host = page.locator('#ontario-footer-two-column-social');
		const link = host.locator('.ontario-footer__links-container--social .ontario-footer__link').first();

		await link.hover();

		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('twoColumn footer with social links - social link focus', async ({ page }) => {
		const host = page.locator('#ontario-footer-two-column-social');
		const link = host.locator('.ontario-footer__links-container--social .ontario-footer__link').first();

		await link.focus();

		await expect(host).toHaveScreenshot({
			animations: 'disabled',
			caret: 'hide',
		});
	});
});
