import { test, expect } from '@playwright/test';

test.describe('Ontario Header - type rendering', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('should render the ontario header wrapper for the ontario type', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await expect(header.locator('.ontario-header')).toHaveCount(1);
	});

	test('should render the application header wrapper for the application type', async ({ page }) => {
		const header = page.locator('#ontario-header-application');
		await expect(header.locator('.ontario-application-header')).toHaveCount(1);
	});

	test('should render the ServiceOntario subheader for the serviceOntario type', async ({ page }) => {
		const header = page.locator('#ontario-header-service-ontario');
		await expect(header.locator('.ontario-service-subheader')).toHaveCount(1);
	});
});

test.describe('Ontario Header - ontario type content', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('should render the language toggle', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await expect(header.locator('ontario-language-toggle')).toHaveCount(1);
	});

	test('should render the search input and submit button', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await expect(header.locator('#ontario-search-input-field')).toBeAttached();
		await expect(header.locator('#ontario-search-submit')).toBeAttached();
	});

	test('should render the overflow menu', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await expect(header.locator('ontario-header-overflow-menu')).toHaveCount(1);
	});

	test('should render the sign-in button when signInMenuItems is provided', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario-signin');
		await expect(header.locator('#ontario-header-sign-in-toggler')).toBeAttached();
	});

	test('should not render the sign-in button when signInMenuItems is not provided', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		await expect(header.locator('#ontario-header-sign-in-toggler')).toHaveCount(0);
	});
});

test.describe('Ontario Header - menu toggle behaviour', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('toggles the menu open and closed when the menu button is clicked', async ({ page }) => {
		const header = page.locator('#ontario-header-ontario');
		const menuButton = header.locator('#ontario-header-menu-toggler');

		await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

		await menuButton.click();
		await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

		await menuButton.click();
		await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	});
});

test.describe('Ontario Header - application type content', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('should render the application subheader title as a link', async ({ page }) => {
		const header = page.locator('#ontario-header-application');
		const heading = header.locator('.ontario-application-subheader__heading a');

		await expect(heading).toHaveText('Application name');
		await expect(heading).toHaveAttribute('href', '/application-homepage');
	});
});

test.describe('Ontario Header - serviceOntario type content', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-header');
	});

	test('should render the service name in the subheader description', async ({ page }) => {
		const header = page.locator('#ontario-header-service-ontario');
		await expect(header.locator('.ontario-service-subheader__description')).toHaveText('ServiceOntario Service');
	});
});
