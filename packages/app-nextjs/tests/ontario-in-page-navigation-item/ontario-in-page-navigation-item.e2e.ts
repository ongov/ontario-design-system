import { test, expect } from '@playwright/test';

test.describe('Ontario In-Page Navigation Item - Next.js E2E', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-in-page-navigation');
	});

	test('renders expected item links for the default variant', async ({ page }) => {
		const defaultItems = page.locator('ontario-in-page-navigation').first().locator('ontario-in-page-navigation-item');

		await expect(defaultItems).toHaveCount(5);
		await expect(defaultItems.nth(0).getByRole('link', { name: 'About the program' })).toHaveAttribute('href', '#about-program');
		await expect(defaultItems.nth(1).getByRole('link', { name: 'Eligibility' })).toHaveAttribute('href', '#eligibility');
		await expect(defaultItems.nth(4).getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '#contact-us');
	});

	test('applies list semantics to projected item hosts', async ({ page }) => {
		const firstDefaultItem = page
			.locator('ontario-in-page-navigation')
			.first()
			.locator('ontario-in-page-navigation-item')
			.first();

		await expect(firstDefaultItem).toHaveAttribute('role', 'listitem');
	});

	test('renders expected item links for the no-top-border variant', async ({ page }) => {
		const borderlessItems = page.locator('ontario-in-page-navigation').nth(1).locator('ontario-in-page-navigation-item');

		await expect(borderlessItems).toHaveCount(4);
		await expect(borderlessItems.nth(0).getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '#overview');
		await expect(borderlessItems.nth(1).getByRole('link', { name: 'The law (cancellations)' })).toHaveAttribute('href', '#the-law');
		await expect(borderlessItems.nth(3).getByRole('link', { name: 'Before you buy' })).toHaveAttribute('href', '#before-you-buy');
	});

	test('clicking an item link updates the URL hash', async ({ page }) => {
		const targetItem = page
			.locator('ontario-in-page-navigation')
			.first()
			.locator('ontario-in-page-navigation-item')
			.nth(2)
			.getByRole('link', { name: 'Available funding' });

		await targetItem.click();
		await expect(page).toHaveURL(/#available-funding$/);
		await expect(page.locator('#available-funding')).toBeVisible();
	});
});
