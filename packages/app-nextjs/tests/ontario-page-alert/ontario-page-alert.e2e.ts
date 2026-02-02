import { test, expect } from '@playwright/test';

test.describe('Ontario Page Alert - type rendering', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-page-alert');
	});

	test('should display the informational page alert when the type is set to `informational`', async ({ page }) => {
		const informationalPageAlert = await page.locator('#ontario-page-alert-informational');

		await expect(informationalPageAlert).toBeVisible();
		await expect(informationalPageAlert.locator('.ontario-alert')).toHaveClass(/ontario-alert--informational/);
	});

	test('should display the warning page alert when the type is set to `warning`', async ({ page }) => {
		const warningPageAlert = await page.locator('#ontario-page-alert-warning');

		await expect(warningPageAlert).toBeVisible();
		await expect(warningPageAlert.locator('.ontario-alert')).toHaveClass(/ontario-alert--warning/);
	});

	test('should display the success page alert when the type is set to `success`', async ({ page }) => {
		const successpPageAlert = await page.locator('#ontario-page-alert-success');

		await expect(successpPageAlert).toBeVisible();
		await expect(successpPageAlert.locator('.ontario-alert')).toHaveClass(/ontario-alert--success/);
	});

	test('should display the error page alert when the type is set to `error`', async ({ page }) => {
		const errorPageAlert = await page.locator('#ontario-page-alert-error');

		await expect(errorPageAlert.locator('.ontario-alert')).toHaveClass(/ontario-alert--error/);
	});
});

test.describe('Ontario Page Alert - content and structure', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-page-alert');
	});

	test('renders heading in header title', async ({ page }) => {
		const pageAlert = await page.locator('#ontario-page-alert-warning');

		await expect(pageAlert.locator('.ontario-alert__header-title')).toHaveText('Service wait times');
	});

	test('should render the slot content when the `content` prop is not provided', async ({ page }) => {
		await page.waitForSelector('#ontario-page-alert-informational.hydrated');

		const pageAlert = await page.locator('#ontario-page-alert-informational');

		// Text from slotted content should appear in the rendered component
		await expect(pageAlert).toContainText('ServiceOntario centres may issue either a blue licence plate');

		// The <a> is LIGHT DOM (child of the host), not shadow DOM
		const slottedLink = pageAlert.locator('a');
		await expect(slottedLink).toHaveCount(1);
	});

	test('should render the `content` prop inside a <p> tag when provided', async ({ page }) => {
		const pageAlert = await page.locator('#ontario-page-alert-success');
		const alertContent = await pageAlert.locator('.ontario-alert__body p');

		await expect(alertContent).toContainText('Please look out for an email confirmation');
	});

	test('should render a list of links when provided', async ({ page }) => {
		await page.waitForSelector('#ontario-page-alert-error.hydrated');

		const pageAlert = await page.locator('#ontario-page-alert-error');

		// The <a> is LIGHT DOM (child of the host), not shadow DOM
		const slottedLink = pageAlert.locator('a');
		await expect(slottedLink).toHaveCount(3);
	});

	test('should have keyboard focusable links when links are focused', async ({ page }) => {
		await page.waitForSelector('#ontario-page-alert-informational.hydrated');

		const pageAlert = await page.locator('#ontario-page-alert-informational');

		await pageAlert.locator('a').focus();
		await expect(pageAlert.locator('a')).toBeFocused();
	});
});

test.describe('Ontario Page Alert - edge cases', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-page-alert');
	});

	test('should default to type `informational` when no type prop is provided', async ({ page }) => {
		const pageAlert = await page.locator('#ontario-page-alert-default');

		await expect(pageAlert.locator('.ontario-alert')).toHaveClass(/ontario-alert--informational/);
	});

	test('should log a warning and fall back to `informational` when an invalid type prop is passed', async ({
		page,
	}) => {
		const messages: string[] = [];
		page.on('console', (msg) => messages.push(msg.text()));

		await page.goto('/components/ontario-page-alert');

		const pageAlert = page.locator('#ontario-page-alert-invalid-type');

		await expect(pageAlert.locator('.ontario-alert')).toHaveClass(/ontario-alert--informational/);
		expect(messages.join('\n')).toMatch(/not a valid type/i);
	});

	test('should have `content` prop override slot content when both are provided', async ({ page }) => {
		const pageAlert = await page.locator('#ontario-page-alert-content-prop-vs-slot');

		await expect(pageAlert.locator('.ontario-alert__body')).toContainText('This should render, not the slot.');
		await expect(pageAlert.locator('.ontario-alert__body')).not.toContainText('This slot should NOT appear.');
	});
});
