import { Page, test } from '@playwright/test';

import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

const defaultNav = (page: Page) => page.locator('ontario-in-page-navigation').first();

const noBorderNav = (page: Page) => page.locator('ontario-in-page-navigation').nth(1);

test.describe('In-Page Navigation - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('default variant', async ({ page }) => {
		await expectVrtScreenshot(defaultNav(page));
	});

	test('no top border variant', async ({ page }) => {
		await expectVrtScreenshot(noBorderNav(page));
	});
});

test.describe('In-Page Navigation - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('default variant with focused link', async ({ page }) => {
		const nav = defaultNav(page);
		const firstLink = nav.getByRole('link', { name: 'About the program' });

		await firstLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(nav, { maxDiffPixels: 700 });
	});

	test('no top border variant with focused link', async ({ page }) => {
		const nav = noBorderNav(page);
		const firstLink = nav.getByRole('link', { name: 'Overview' });

		await firstLink.focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(nav, { maxDiffPixels: 700 });
	});
});

test.describe('In-Page Navigation - hover states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('default variant with hovered link', async ({ page }) => {
		const nav = defaultNav(page);
		const firstLink = nav.getByRole('link', { name: 'About the program' });

		await firstLink.hover();
		await expectVrtScreenshot(nav, { maxDiffPixels: 700 });
	});

	test('no top border variant with hovered link', async ({ page }) => {
		const nav = noBorderNav(page);
		const firstLink = nav.getByRole('link', { name: 'Overview' });

		await firstLink.hover();
		await expectVrtScreenshot(nav, { maxDiffPixels: 700 });
	});
});

test.describe('In-Page Navigation - active states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('default variant with active link', async ({ page }) => {
		const nav = defaultNav(page);
		const firstLink = nav.getByRole('link', { name: 'About the program' });

		await firstLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(nav, { maxDiffPixels: 800 });
		await page.mouse.up();
	});

	test('no top border variant with active link', async ({ page }) => {
		const nav = noBorderNav(page);
		const firstLink = nav.getByRole('link', { name: 'Overview' });

		await firstLink.hover();
		await page.mouse.down();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(nav, { maxDiffPixels: 800 });
		await page.mouse.up();
	});
});
