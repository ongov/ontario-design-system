import { test, expect } from '@playwright/test';

test.describe('Ontario In-Page Navigation - Next.js E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('renders page heading and both navigation variants', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1, name: 'ontario-in-page-navigation' })).toBeVisible();
		await expect(page.getByText('In-page navigation - default')).toBeVisible();
		await expect(page.getByText('In-page navigation - no top border')).toBeVisible();
		await expect(page.locator('ontario-in-page-navigation')).toHaveCount(2);
	});

	test('default variant exposes expected anchor links', async ({ page }) => {
		const defaultNav = page.locator('ontario-in-page-navigation').first();
		await expect(defaultNav.getByRole('link', { name: 'About the program' })).toHaveAttribute('href', '#about-program');
		await expect(defaultNav.getByRole('link', { name: 'Eligibility' })).toHaveAttribute('href', '#eligibility');
		await expect(defaultNav.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '#contact-us');
	});

	test('clicking a nav link updates hash and target heading is present', async ({ page }) => {
		const defaultNav = page.locator('ontario-in-page-navigation').first();
		await defaultNav.getByRole('link', { name: 'Program guide' }).click();
		await expect(page).toHaveURL(/#program-guide$/);
		await expect(page.locator('#program-guide')).toBeVisible();
	});

	test('no-top-border variant has expected class in rendered output', async ({ page }) => {
		const borderlessNav = page.locator('ontario-in-page-navigation').nth(1);
		await expect(borderlessNav.locator('.ontario-page-navigation')).toHaveClass(/ontario-page-navigation--no-top-border/);
	});
});
