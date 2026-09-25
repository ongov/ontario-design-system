import { test, expect } from '@playwright/test';

test.describe('Ontario Checkbox', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('should render the default checkbox unchecked', async ({ page }) => {
		const component = page.locator('#ontario-checkbox-default');
		const input = component.locator('input');

		await expect(component).toBeVisible();
		await expect(input).toHaveAttribute('type', 'checkbox');
		await expect(input).toHaveAttribute('name', 'checkbox-default');
		await expect(input).not.toBeChecked();
	});

	test('should render large and heading label variants', async ({ page }) => {
		const largeLabel = page.locator('#ontario-checkbox-label-large');
		const headingLabel = page.locator('#ontario-checkbox-label-heading');

		await expect(largeLabel).toContainText('I agree to the terms and conditions (large)');
		await expect(headingLabel).toContainText('I agree to the terms and conditions (heading)');
	});

	test('should render pre-checked when `checked` is provided', async ({ page }) => {
		const component = page.locator('#ontario-checkbox-checked');
		const input = component.locator('input');

		await expect(input).toBeChecked();
	});

	test('should mark the input as required when `required` is provided', async ({ page }) => {
		const required = page.locator('#ontario-checkbox-required').locator('input');
		const notRequired = page.locator('#ontario-checkbox-not-required').locator('input');

		await expect(required).toHaveAttribute('required', '');
		await expect(notRequired).not.toHaveAttribute('required', '');
	});

	test('should render hint text when `hintText` is provided', async ({ page }) => {
		const component = page.locator('#ontario-checkbox-hint-text');

		await expect(component).toContainText('You must agree before you can continue.');
	});

	test('should render a hint expander when `hintExpander` is provided', async ({ page }) => {
		const component = page.locator('#ontario-checkbox-hint-expander');
		const expanderButton = component.locator('ontario-hint-expander button');

		await expect(expanderButton).toBeVisible();
		await expanderButton.click();
		await expect(component).toContainText(
			'We need your agreement to the terms and conditions before we can process your request.',
		);
	});

	test('should render an error message when `errorMessage` is provided', async ({ page }) => {
		const component = page.locator('#ontario-checkbox-error');

		await expect(component).toContainText('You must agree to the terms and conditions to continue');
	});

	test('should render the correct language translations', async ({ page }) => {
		const english = page.locator('#ontario-checkbox-language-english');
		const french = page.locator('#ontario-checkbox-language-french');

		await expect(english).toContainText('optional');
		await expect(french).toContainText('facultative');
	});

	test('toggles when the label is clicked', async ({ page }) => {
		const component = page.locator('#ontario-checkbox-default');
		const input = component.locator('input');
		const label = component.locator('.ontario-checkbox__label');

		await expect(input).not.toBeChecked();
		await label.click();
		await expect(input).toBeChecked();
	});
});
