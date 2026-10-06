import { test, expect, Page, Locator } from '@playwright/test';

// ----- Small locator helpers -----
const getCheckboxComponent = (page: Page, id: string) => page.locator(id);
const getNativeInput = (component: Locator) => component.locator('input');
const getLabel = (component: Locator) => component.locator('.ontario-checkbox__label');
const getHintText = (component: Locator) => component.locator('ontario-hint-text');
const getHintExpander = (component: Locator) => component.locator('ontario-hint-expander');

test.describe('Ontario Checkbox', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	// -----------------------------
	// Test for default rendering
	// -----------------------------
	test('should render the default checkbox unchecked', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');
		const input = getNativeInput(component);

		await expect(component).toBeVisible();
		await expect(input).toHaveAttribute('type', 'checkbox');
		await expect(input).toHaveAttribute('name', 'checkbox-default');
		await expect(input).not.toBeChecked();
	});

	test('should render large and heading label variants', async ({ page }) => {
		const largeLabel = getCheckboxComponent(page, '#ontario-checkbox-label-large');
		const headingLabel = getCheckboxComponent(page, '#ontario-checkbox-label-heading');

		await expect(largeLabel).toContainText('I agree to the terms and conditions (large)');
		await expect(headingLabel).toContainText('I agree to the terms and conditions (heading)');
	});

	test('should render pre-checked when `checked` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-checked');
		const input = getNativeInput(component);

		await expect(input).toBeChecked();
	});

	// -----------------------------
	// Test for required / optional state
	// -----------------------------
	test('should set the native `required` attribute when `required` is true', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-required');
		const input = getNativeInput(component);

		await expect(input).toHaveAttribute('required', '');
	});

	test('should not set the native `required` attribute when `required` is false', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-not-required');
		const input = getNativeInput(component);

		await expect(input).not.toHaveAttribute('required', '');
	});

	test('should render the required and optional flags', async ({ page }) => {
		const required = getCheckboxComponent(page, '#ontario-checkbox-required');
		const notRequired = getCheckboxComponent(page, '#ontario-checkbox-not-required');

		await expect(required).toContainText('required');
		await expect(notRequired).toContainText('optional');
	});

	// -----------------------------
	// Test for error message handling
	// -----------------------------
	test('should render an error message when `errorMessage` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-error');

		await expect(component).toContainText('You must agree to the terms and conditions to continue');
	});

	test('should show the automatic required error when a required checkbox is unchecked', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-required');

		await expect(component).toContainText('You must select this checkbox to continue.');
	});

	test('should clear the automatic required error once the checkbox is checked', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-required');

		await expect(component).toHaveClass(/hydrated/);
		await getLabel(component).click();

		await expect(component).not.toContainText('You must select this checkbox to continue.');
	});

	test('should not show an automatic error when the checkbox is not required', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-not-required');

		await expect(component).not.toContainText('You must select this checkbox to continue.');
	});

	// -----------------------------
	// Test for hint text handling
	// -----------------------------
	test('should render hint text when `hintText` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-hint-text');

		await expect(getHintText(component)).toBeVisible();
		await expect(component).toContainText('You must agree before you can continue.');
	});

	// -----------------------------
	// Test for hint expander handling
	// -----------------------------
	test('should render a hint expander when `hintExpander` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-hint-expander');
		const expanderButton = getHintExpander(component).getByRole('button');

		await expect(getHintExpander(component)).toBeVisible();
		await expect(expanderButton).toBeVisible();
	});

	test('should expand the hint expander content when clicked', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-hint-expander');
		const expanderButton = getHintExpander(component).getByRole('button');

		await expanderButton.click();

		await expect(component).toContainText(
			'We need your agreement to the terms and conditions before we can process your request.',
		);
	});

	// -----------------------------
	// Test for language prop
	// -----------------------------
	test('should render the correct language translations', async ({ page }) => {
		const english = getCheckboxComponent(page, '#ontario-checkbox-language-english');
		const french = getCheckboxComponent(page, '#ontario-checkbox-language-french');

		await expect(english).toContainText('optional');
		await expect(french).toContainText('facultative');
	});

	// -----------------------------
	// Test for interactions
	// -----------------------------
	test('should toggle when the label is clicked', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');
		const input = getNativeInput(component);

		await expect(component).toHaveClass(/hydrated/);
		await expect(input).not.toBeChecked();
		await getLabel(component).click();
		await expect(input).toBeChecked();
	});

	test('should uncheck when the label is clicked twice', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');
		const input = getNativeInput(component);
		const label = getLabel(component);

		await expect(component).toHaveClass(/hydrated/);
		await label.click();
		await expect(input).toBeChecked();

		await label.click();
		await expect(input).not.toBeChecked();
	});

	test('should uncheck a pre-checked checkbox when the label is clicked', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-checked');
		const input = getNativeInput(component);

		await expect(component).toHaveClass(/hydrated/);
		await getLabel(component).click();
		await expect(input).not.toBeChecked();
	});

	test('should receive focus when focused', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');
		const input = getNativeInput(component);

		await input.focus();
		await expect(input).toBeFocused();
	});

	test('should toggle when the Space key is pressed while focused', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');
		const input = getNativeInput(component);

		await expect(component).toHaveClass(/hydrated/);
		await input.focus();
		await page.keyboard.press('Space');
		await expect(input).toBeChecked();

		await page.keyboard.press('Space');
		await expect(input).not.toBeChecked();
	});

	// -----------------------------
	// Test for edge cases
	// -----------------------------
	test('should be hydrated after page load', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');

		await expect(component).toHaveClass(/hydrated/);
	});

	test('should associate the label with the native input', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-default');
		const input = getNativeInput(component);

		const inputId = await input.getAttribute('id');

		expect(inputId).toBeTruthy();
		await expect(getLabel(component)).toHaveAttribute('for', inputId as string);
	});

	test('should link the hint text to the native input with `aria-describedby`', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-hint-text');
		const input = getNativeInput(component);

		await expect(input).toHaveAttribute('aria-describedby', /.+/);
	});
});

test.describe('Ontario Checkbox - client side', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/client-side');
	});

	// -----------------------------
	// Test for custom event props
	// -----------------------------
	test('should call `customOnChange` when the checkbox is toggled', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-custom-events');

		await Promise.all([
			page.waitForEvent('console', (msg) => msg.text() === 'customOnChange → true'),
			getLabel(component).click(),
		]);
	});

	test('should call `customOnFocus` when the checkbox gains focus', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-custom-events');

		await Promise.all([
			page.waitForEvent('console', (msg) => msg.text() === 'customOnFocus → agreed'),
			getNativeInput(component).focus(),
		]);
	});

	test('should call `customOnBlur` when the checkbox loses focus', async ({ page }) => {
		const component = getCheckboxComponent(page, '#ontario-checkbox-custom-events');
		const input = getNativeInput(component);

		await input.focus();

		await Promise.all([page.waitForEvent('console', (msg) => msg.text() === 'customOnBlur'), input.blur()]);
	});
});
