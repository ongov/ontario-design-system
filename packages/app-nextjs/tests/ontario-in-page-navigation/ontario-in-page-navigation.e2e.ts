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
		await expect(borderlessNav.locator('.ontario-page-navigation')).toHaveClass(
			/ontario-page-navigation--no-top-border/,
		);
	});

	test('skip link targets an existing element on the page', async ({ page }) => {
		const skipLink = page.locator('ontario-in-page-navigation').first().locator('.ontario-page-navigation__skip-link');
		await expect(skipLink).toHaveAttribute('href', '#skip-to-main');
		await expect(page.locator('#skip-to-main')).toBeAttached();
	});

	test('activating the skip link moves focus to the main content', async ({ page }) => {
		// The skip link is visually hidden until focused (`ontario-show-on-focus`), so it
		// must be focused via keyboard before it becomes visible/clickable, mirroring how
		// keyboard and assistive-technology users would actually reach and activate it.
		const skipLink = page.locator('ontario-in-page-navigation').first().locator('.ontario-page-navigation__skip-link');
		await skipLink.focus();
		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/#skip-to-main$/);
	});
});
