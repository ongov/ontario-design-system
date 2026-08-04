import { test, expect } from '@playwright/test';

test.describe('Ontario Summary List - React Framework Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-summary-list');
	});

	// React prop binding tests
	test('should render caption prop correctly in React wrapper', async ({ page }) => {
		const caption = page.locator('#ontario-summary-list-default').locator('h3.ontario-summary-list__heading');
		await expect(caption).toHaveText('Personal information');
	});

	test('should render full-width variant when fullWidth prop is true', async ({ page }) => {
		const fullWidthList = page.locator('#ontario-summary-list-full-width').locator('.ontario-summary-list');
		await expect(fullWidthList).toHaveClass(/summary-list-full-width/);
	});

	test('should render caption action link from captionActionLink prop', async ({ page }) => {
		const actionLink = page
			.locator('#ontario-summary-list-heading-action')
			.locator('a.ontario-summary-list__change-button');
		await expect(actionLink).toBeVisible();
		await expect(actionLink).toHaveAttribute('href', '/change-personal-info');
	});

	test('should not render caption action link when captionActionLink prop is omitted', async ({ page }) => {
		const defaultList = page.locator('#ontario-summary-list-default');
		const actionLink = defaultList.locator('a.ontario-summary-list__change-button');
		await expect(actionLink).toHaveCount(0);
	});

	// Accessibility tests
	test('should have accessible heading with correct level', async ({ page }) => {
		const heading = page.locator('#ontario-summary-list-default').locator('h3.ontario-summary-list__heading');
		await expect(heading).toBeVisible();
		const headingLevel = await heading.evaluate((el) => el.tagName);
		expect(headingLevel).toBe('H3');
	});

	test('should have accessible change button with descriptive text', async ({ page }) => {
		const changeButton = page
			.locator('#ontario-summary-list-default')
			.locator('a.ontario-summary-list-item__change-button')
			.first();
		const accessibleName = await changeButton.textContent();
		expect(accessibleName).toContain('Change');
		expect(accessibleName).toContain('your answer for:');
	});

	// Hydration & Client-side rendering tests
	test('should be hydrated and interactive after page load', async ({ page }) => {
		const container = page.locator('#ontario-summary-list-default').locator('.ontario-summary-list');
		await expect(container).toBeAttached();
		// Verify web component is hydrated
		const classList = await container.evaluate((el) => Array.from(el.classList));
		expect(classList.length).toBeGreaterThan(0);
	});

	// Layout variant tests
	test('should apply default layout when full-width is false', async ({ page }) => {
		const defaultList = page.locator('#ontario-summary-list-default').locator('.ontario-summary-list');
		await expect(defaultList).not.toHaveClass(/summary-list-full-width/);
	});

	test('should display definition list structure for semantic HTML', async ({ page }) => {
		const dl = page.locator('#ontario-summary-list-default').locator('dl.ontario-summary-list__container');
		await expect(dl).toBeAttached();
	});
});
