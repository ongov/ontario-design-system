import { test, expect, Page, Locator } from '@playwright/test';

// ----- Small locator helpers -----
const getInputComponent = (page: Page, id: string) => page.locator(id);
const getNativeInput = (component: Locator) => component.locator('input');
const getHintText = (component: Locator) => component.locator('ontario-hint-text');
const getHintExpander = (component: Locator) => component.locator('ontario-hint-expander');
const getErrorMessage = (component: Locator) =>
	component.locator('.ontario-error-message, [class*="error-message"], [id*="error"]');

test.describe('Ontario Input', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-input');
	});

	// -----------------------------
	// Test for default rendering
	// -----------------------------
	test('should render the input with default caption', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-default-caption');
		const input = getNativeInput(component);

		await expect(component).toBeVisible();
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute('type', 'text');
		await expect(input).toHaveAttribute('name', 'input-caption-default');
	});

	test('should render large and heading caption variants', async ({ page }) => {
		const largeCaption = getInputComponent(page, '#ontario-input-large-caption');
		const headingCaption = getInputComponent(page, '#ontario-input-heading-caption');

		await expect(largeCaption).toContainText('Label (large)');
		await expect(headingCaption).toContainText('Label (heading)');
	});

	test('should render a pre-filled value when `value` is provided', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-value');
		const input = getNativeInput(component);

		await expect(input).toHaveValue('Toronto');
	});

	test('should render an error message when `errorMessage` is provided', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-error-message');

		await expect(component).toContainText("You must enter a driver's licence number.");
	});

	// -----------------------------
	// Test for input width variants
	// -----------------------------
	test('should apply the correct class for 2 character width', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-2-char-width');
		const input = getNativeInput(component);

		await expect(input).toHaveClass(/ontario-input--2-char-width/);
	});

	test('should apply the correct class for 20 character width', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-20-char-width');
		const input = getNativeInput(component);

		await expect(input).toHaveClass(/ontario-input--20-char-width/);
	});

	// -----------------------------
	// Test for required / optional state
	// -----------------------------
	test('should set the native `required` attribute when `required` is true', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-required');
		const input = getNativeInput(component);

		await expect(input).toHaveAttribute('required', '');
	});

	test('should not set the native `required` attribute when `required` is false', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-not-required');
		const input = getNativeInput(component);

		await expect(input).not.toHaveAttribute('required', '');
	});

	// -----------------------------
	// Test for hint text handling
	// -----------------------------
	test('should render string hint text when `hintText.hintContentType` is `string`', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-string-hint-text');

		await expect(getHintText(component)).toBeVisible();
		await expect(component).toContainText('Street and number or P.O. box.');
	});

	test('should render HTML hint text when `hintText.hintContentType` is `html`', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-html-hint-text');

		await expect(getHintText(component)).toBeVisible();
		await expect(component).toContainText('Standard message and data rates may apply');
		await expect(component).toContainText('For example (123) 456-7890');
	});

	// -----------------------------
	// Test for hint expander handling
	// -----------------------------
	test('should render hint expander when `hintExpander` is provided', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-string-hint-expander');
		const input = getNativeInput(component);

		await expect(getHintExpander(component)).toBeVisible();
		await expect(component).toContainText('Help: where is my Ontario photo card number?');
		await expect(input).toHaveClass(/ontario-input-hint-expander--true/);
	});

	test('should expand string hint expander content when clicked', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-string-hint-expander');
		const expanderButton = component.locator('ontario-hint-expander').getByRole('button');

		await expanderButton.click();

		await expect(component).toContainText('The Ontario photo card number is a unique identifier');
	});

	test('should expand html hint expander content when clicked', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-with-html-hint-expander');
		const expanderButton = component.locator('ontario-hint-expander').getByRole('button');

		await expanderButton.click();

		await expect(component).toContainText('You can find your RIN by contacting the Ministry');
		await expect(component.locator('ontario-hint-expander a')).toHaveCount(1);
	});

	// -----------------------------
	// Test for language prop
	// -----------------------------
	test('should render French content when `language="fr"` is provided', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-language-french');

		await expect(component).toContainText('Code postal');
	});

	test('should fallback safely when an invalid language is provided', async ({ page }) => {
		const component = page.locator('#ontario-input-invalid-language');
		const input = getNativeInput(component);

		await expect(component).toBeVisible();
		await expect(input).toBeVisible();
		await expect(component).toContainText('Invalid language');
	});

	// -----------------------------
	// Test for interactions
	// -----------------------------
	test('should allow the user to type into the input', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-default-caption');
		const input = getNativeInput(component);

		await input.fill('Test value');
		await expect(input).toHaveValue('Test value');
	});

	test('should receive focus when clicked', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-default-caption');
		const input = getNativeInput(component);

		await input.click();
		await expect(input).toBeFocused();
	});

	// -----------------------------
	// Test for edge / negative cases
	// -----------------------------
	test('should still render when the `name` prop is missing', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-missing-name');
		const input = getNativeInput(component);

		await expect(component).toBeVisible();
		await expect(input).toBeVisible();
	});

	test('should still render when caption text is empty', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-empty-caption');
		const input = getNativeInput(component);

		await expect(component).toBeVisible();
		await expect(input).toBeVisible();
	});

	test('should not show a required error on blur when live validation is enabled but no interaction has occurred', async ({
		page,
	}) => {
		const component = getInputComponent(page, '#ontario-input-required-no-interaction');
		const input = getNativeInput(component);

		await input.click();
		await input.blur();

		await expect(component).not.toContainText('Please fill this out.');
	});

	test('should show the fallback required validation message after typing and clearing the value', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-required-translation-fallback');
		const input = getNativeInput(component);

		await input.fill('abc');
		await input.clear();
		await input.blur();

		// Avoid hardcoding exact translation if you want this to remain stable
		await expect(component).not.toHaveCount(0);
		await expect(component).toContainText(/required|obligatoire|field/i);
	});

	test('should render both hint text and hint expander when both props are provided', async ({ page }) => {
		const component = getInputComponent(page, '#ontario-input-hint-text-and-expander');
		const expanderButton = component.locator('ontario-hint-expander').getByRole('button');

		await expect(getHintText(component)).toBeVisible();
		await expect(getHintExpander(component)).toBeVisible();
		await expect(component).toContainText('This is hint text.');

		await expanderButton.click();
		await expect(component).toContainText('This is expander content.');
	});
});
