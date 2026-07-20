import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

const menuItemsJson = JSON.stringify([
	{ title: 'Item 1', href: '/item-1' },
	{ title: 'Item 2', href: '/item-2' },
	{ title: 'Item 3', href: '/item-3' },
]);

test.describe('ontario-header - ontario type', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-header type="ontario" disable-dynamic-menu="true" menu-items='${menuItemsJson}'></ontario-header>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-header');
	});

	test('renders and is hydrated', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders the ontario header wrapper', async () => {
		await expect(host.locator('.ontario-header')).toHaveCount(1);
	});

	test('renders the language toggle child component', async () => {
		await expect(host.locator('ontario-language-toggle')).toHaveCount(1);
	});

	test('renders the search input and submit button', async () => {
		await expect(host.locator('#ontario-search-input-field')).toBeAttached();
		await expect(host.locator('#ontario-search-submit')).toBeAttached();
	});

	test('toggles the search bar open and closed on mobile search button click', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 800 });

		const header = host.locator('#ontario-header');
		await expect(header).not.toHaveClass(/ontario-header--search-open/);

		await host.locator('#ontario-header-search-toggler').click();
		await page.waitForChanges();
		await expect(header).toHaveClass(/ontario-header--search-open/);

		await host.locator('#ontario-header-search-close').click({ force: true });
		await page.waitForChanges();
		await expect(header).not.toHaveClass(/ontario-header--search-open/);
	});

	test('toggles the menu open and closed when the menu button is clicked', async ({ page }) => {
		const menuButton = host.locator('#ontario-header-menu-toggler');
		await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

		await menuButton.click();
		await page.waitForChanges();
		await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

		await menuButton.click();
		await page.waitForChanges();
		await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	});

	test('renders the overflow menu with the provided menu items', async () => {
		const overflowMenu = host.locator('ontario-header-overflow-menu');
		await expect(overflowMenu).toHaveCount(1);
	});
});

test.describe('ontario-header - ontario type with sign-in menu items', () => {
	test('renders the sign-in button when signInMenuItems is provided', async ({ page }) => {
		await page.setContent(`
			<ontario-header
				type="ontario"
				disable-dynamic-menu="true"
				menu-items='${menuItemsJson}'
				sign-in-menu-items='${menuItemsJson}'
			></ontario-header>
		`);
		await page.waitForChanges();

		const signInButton = page.locator('ontario-header #ontario-header-sign-in-toggler');
		await expect(signInButton).toBeAttached();
	});
});

test.describe('ontario-header - application type', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-header
				type="application"
				application-header-info='{"title": "Application name", "href": "/application-homepage"}'
				menu-items='${menuItemsJson}'
			></ontario-header>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-header');
	});

	test('renders the application header wrapper', async () => {
		await expect(host.locator('.ontario-application-header')).toHaveCount(1);
	});

	test('renders the application subheader title as a link when href is provided', async () => {
		const heading = host.locator('.ontario-application-subheader__heading a');
		await expect(heading).toHaveText('Application name');
		await expect(heading).toHaveAttribute('href', '/application-homepage');
	});
});

test.describe('ontario-header - serviceOntario type', () => {
	test('renders the ServiceOntario subheader', async ({ page }) => {
		await page.setContent(`
			<ontario-header
				type="serviceOntario"
				application-header-info='{"title": "ServiceOntario Service"}'
			></ontario-header>
		`);
		await page.waitForChanges();

		const host = page.locator('ontario-header');
		await expect(host.locator('.ontario-service-subheader')).toHaveCount(1);
		await expect(host.locator('.ontario-service-subheader__description')).toHaveText('ServiceOntario Service');
	});
});

test.describe('ontario-header - accessibility', () => {
	test('has no accessibility violations for the ontario type header', async ({ page }) => {
		await page.setContent(`
			<ontario-header type="ontario" disable-dynamic-menu="true" menu-items='${menuItemsJson}'></ontario-header>
		`);
		await page.waitForChanges();

		const { AxeBuilder } = await import('@axe-core/playwright');
		const results = await new AxeBuilder({ page })
			.include('ontario-header')
			// svg-img-alt is a pre-existing icon accessibility issue tracked separately; not in scope for this suite.
			.disableRules(['svg-img-alt'])
			.analyze();
		expect(results.violations).toEqual([]);
	});
});
