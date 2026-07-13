import { test, expect } from '@playwright/test';

test.describe('Ontario Summary List Item - React Framework Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	// React prop binding tests
	test('should render name prop as key text', async ({ page }) => {
		const keyText = page.locator('#ontario-summary-list-item-with-action').locator('dt.ontario-summary-list-item__key');
		await expect(keyText).toHaveText('Address');
	});

	test('should render description prop as value text', async ({ page }) => {
		const valueText = page
			.locator('#ontario-summary-list-item-with-action')
			.locator('dd.ontario-summary-list-item__value');
		await expect(valueText).toHaveText('111 Wellington St.');
	});

	test('should render action link from actionLink prop', async ({ page }) => {
		const actionLink = page
			.locator('#ontario-summary-list-item-with-action')
			.locator('a.ontario-summary-list-item__change-button');
		await expect(actionLink).toBeVisible();
		await expect(actionLink).toHaveAttribute('href', '/change-address');
	});

	test('should not render action link when actionLink prop is omitted', async ({ page }) => {
		const noActionItem = page.locator('#ontario-summary-list-item-no-action');
		const actionLink = noActionItem.locator('a.ontario-summary-list-item__change-button');
		await expect(actionLink).toHaveCount(0);
	});

	test('should apply compact class when compact prop is true', async ({ page }) => {
		const compactRow = page.locator('#ontario-summary-list-item-compact').locator('.ontario-summary-list-item__row');
		await expect(compactRow).toHaveClass(/ontario-summary-list-item__row--compact/);
	});

	test('should not apply compact class when compact prop is false', async ({ page }) => {
		const defaultRow = page
			.locator('#ontario-summary-list-item-with-action')
			.locator('.ontario-summary-list-item__row');
		await expect(defaultRow).not.toHaveClass(/ontario-summary-list-item__row--compact/);
	});

	// Accessibility tests
	test('should have accessible change button with descriptive text', async ({ page }) => {
		const changeButton = page
			.locator('#ontario-summary-list-item-with-action')
			.locator('a.ontario-summary-list-item__change-button');
		const accessibleName = await changeButton.textContent();
		expect(accessibleName).toContain('Change');
		expect(accessibleName).toContain('your answer for:');
		expect(accessibleName).toContain('Address');
	});

	test('should have semantic definition list structure', async ({ page }) => {
		const item = page.locator('#ontario-summary-list-item-with-action');
		const dt = item.locator('dt.ontario-summary-list-item__key');
		const dd = item.locator('dd.ontario-summary-list-item__value');
		await expect(dt).toBeAttached();
		await expect(dd).toBeAttached();
	});

	// Hydration & Client-side rendering tests
	test('should be hydrated and interactive after page load', async ({ page }) => {
		const container = page.locator('#ontario-summary-list-item-with-action');
		await expect(container).toBeAttached();
		// Verify web component is hydrated
		const classList = await container.evaluate((el) => Array.from(el.classList));
		expect(classList.length).toBeGreaterThan(0);
	});

	// Layout variant tests
	test('should display no-actions class when no action is provided', async ({ page }) => {
		const noActionRow = page.locator('#ontario-summary-list-item-no-action').locator('.ontario-summary-list-item__row');
		await expect(noActionRow).toHaveClass(/ontario-summary-list-item__row--no-actions/);
	});

	test('should not display no-actions class when action is provided', async ({ page }) => {
		const withActionRow = page
			.locator('#ontario-summary-list-item-with-action')
			.locator('.ontario-summary-list-item__row');
		await expect(withActionRow).not.toHaveClass(/ontario-summary-list-item__row--no-actions/);
	});

	// Keyboard navigation tests
	test('should be focusable', async ({ page }) => {
		const item = page.locator('#ontario-summary-list-item-with-action');
		await expect(item).toBeVisible();

		const actionLink = item.locator('a.ontario-summary-list-item__change-button');
		await expect(actionLink).toBeVisible();
		await actionLink.focus();
		await expect(actionLink).toBeFocused();
	});

	test('should navigate when action link is clicked', async ({ page }) => {
		const actionLink = page
			.locator('#ontario-summary-list-item-with-action')
			.locator('a.ontario-summary-list-item__change-button');
		await Promise.all([page.waitForURL('**/change-address'), actionLink.click()]);
		await expect(page).toHaveURL(/\/change-address$/);
	});
});
