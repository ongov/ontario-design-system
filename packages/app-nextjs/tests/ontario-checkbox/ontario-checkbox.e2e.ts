import { test, expect, Page, Locator } from '@playwright/test';
import { CHECKBOX_SELECTORS } from './ontario-checkbox.selectors';

// ----- Small locator helpers -----
const getCheckboxComponent = (page: Page, selector: string) => page.locator(selector);
const getNativeInput = (component: Locator) => component.locator('input');
const getLabel = (component: Locator) => component.locator('.ontario-checkbox__label');
const getHintText = (component: Locator) => component.locator('ontario-hint-text');
const getHintExpander = (component: Locator) => component.locator('ontario-hint-expander');

// WebKit on macOS skips checkboxes when tabbing unless Option is held.
const getTabKey = (browserName: string) =>
	browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';

test.describe('Ontario Checkbox', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	// -----------------------------
	// Test for default rendering
	// -----------------------------
	test('should render the default checkbox unchecked', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);
		const input = getNativeInput(component);

		await expect(component).toBeVisible();
		await expect(input).toHaveAttribute('type', 'checkbox');
		await expect(input).toHaveAttribute('name', 'checkbox-default');
		await expect(input).not.toBeChecked();
	});

	test('should render large and heading label variants', async ({ page }) => {
		const largeLabel = getCheckboxComponent(page, CHECKBOX_SELECTORS.labelLarge);
		const headingLabel = getCheckboxComponent(page, CHECKBOX_SELECTORS.labelHeading);

		await expect(largeLabel).toContainText('I have read and agree to the Terms and Conditions (large)');
		await expect(headingLabel).toContainText('I have read and agree to the Terms and Conditions (heading)');
	});

	test('should render pre-checked when `checked` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.checked);
		const input = getNativeInput(component);

		await expect(input).toBeChecked();
	});

	// -----------------------------
	// Test for required / optional state
	// -----------------------------
	test('should set the native `required` attribute when `required` is true', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.required);
		const input = getNativeInput(component);

		await expect(input).toHaveAttribute('required', '');
	});

	test('should not set the native `required` attribute when `required` is false', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.notRequired);
		const input = getNativeInput(component);

		await expect(input).not.toHaveAttribute('required', '');
	});

	test('should render the required and optional flags', async ({ page }) => {
		const required = getCheckboxComponent(page, CHECKBOX_SELECTORS.required);
		const notRequired = getCheckboxComponent(page, CHECKBOX_SELECTORS.notRequired);

		await expect(required).toContainText('required');
		await expect(notRequired).toContainText('optional');
	});

	// -----------------------------
	// Test for error message handling
	// -----------------------------
	test('should render an error message when `errorMessage` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.error);

		await expect(component).toContainText('Please accept the Terms and Conditions to proceed.');
	});

	test('should show the automatic required error when a required checkbox is unchecked', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.required);

		await expect(component).toContainText('You must select this checkbox to continue.');
	});

	test('should clear the automatic required error once the checkbox is checked', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.required);

		await expect(component).toHaveClass(/hydrated/);
		await getLabel(component).click();

		await expect(component).not.toContainText('You must select this checkbox to continue.');
	});

	test('should not show an automatic error when the checkbox is not required', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.notRequired);

		await expect(component).not.toContainText('You must select this checkbox to continue.');
	});

	// -----------------------------
	// Test for hint text handling
	// -----------------------------
	test('should render hint text when `hintText` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.hintText);

		await expect(getHintText(component)).toBeVisible();
		await expect(component).toContainText('This is hint text.');
	});

	// -----------------------------
	// Test for hint expander handling
	// -----------------------------
	test('should render a hint expander when `hintExpander` is provided', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.hintExpander);
		const expanderButton = getHintExpander(component).getByRole('button');

		await expect(getHintExpander(component)).toBeVisible();
		await expect(expanderButton).toBeVisible();
	});

	test('should expand the hint expander content when clicked', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.hintExpander);
		const expanderButton = getHintExpander(component).getByRole('button');

		await expanderButton.click();

		await expect(component).toContainText('This is expander content.');
	});

	// -----------------------------
	// Test for language prop
	// -----------------------------
	test('should render the correct language translations', async ({ page }) => {
		const english = getCheckboxComponent(page, CHECKBOX_SELECTORS.languageEnglish);
		const french = getCheckboxComponent(page, CHECKBOX_SELECTORS.languageFrench);

		await expect(english).toContainText('optional');
		await expect(french).toContainText('facultative');
	});

	// -----------------------------
	// Test for interactions
	// -----------------------------
	test('should toggle when the label is clicked', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);
		const input = getNativeInput(component);

		await expect(component).toHaveClass(/hydrated/);
		await expect(input).not.toBeChecked();
		await getLabel(component).click();
		await expect(input).toBeChecked();
	});

	test('should uncheck when the label is clicked twice', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);
		const input = getNativeInput(component);
		const label = getLabel(component);

		await expect(component).toHaveClass(/hydrated/);
		await label.click();
		await expect(input).toBeChecked();

		await label.click();
		await expect(input).not.toBeChecked();
	});

	test('should uncheck a pre-checked checkbox when the label is clicked', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.checked);
		const input = getNativeInput(component);

		await expect(component).toHaveClass(/hydrated/);
		await getLabel(component).click();
		await expect(input).not.toBeChecked();
	});

	test('should receive focus when tabbed to', async ({ page, browserName }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);
		const input = getNativeInput(component);

		await page.keyboard.press(getTabKey(browserName));
		await expect(input).toBeFocused();
	});

	test('should toggle when the Space key is pressed while focused', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);
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
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);

		await expect(component).toHaveClass(/hydrated/);
	});

	test('should associate the label with the native input', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.default);
		const input = getNativeInput(component);

		const inputId = await input.getAttribute('id');

		expect(inputId).toBeTruthy();
		await expect(getLabel(component)).toHaveAttribute('for', inputId as string);
	});

	test('should link the hint text to the native input with `aria-describedby`', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.hintText);
		const input = getNativeInput(component);

		await expect(input).toHaveAttribute('aria-describedby', /.+/);
	});
});

test.describe('Ontario Checkbox - client side', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/client-side');
	});

	// The server-rendered checkbox is replaced by a client-rendered one shortly after load, and the
	// `hydrated` class is already in the server HTML, so each interaction is retried with `toPass` until
	// it reaches the client-rendered checkbox.

	// -----------------------------
	// Test for custom event props
	// -----------------------------
	test('should call `customOnChange` when the checkbox is toggled', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.customEvents);
		const output = page.locator(CHECKBOX_SELECTORS.customOnChangeOutput);

		await expect(async () => {
			await getLabel(component).click();
			await expect(output).toHaveAttribute('data-value', 'true', { timeout: 1000 });
		}).toPass();
	});

	test('should call `customOnFocus` when the checkbox gains focus', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.customEvents);
		const output = page.locator(CHECKBOX_SELECTORS.customOnFocusOutput);

		await expect(async () => {
			await getNativeInput(component).focus();
			await expect(output).toHaveAttribute('data-value', 'agreed', { timeout: 1000 });
		}).toPass();
	});

	test('should call `customOnBlur` when the checkbox loses focus', async ({ page }) => {
		const component = getCheckboxComponent(page, CHECKBOX_SELECTORS.customEvents);
		const input = getNativeInput(component);
		const output = page.locator(CHECKBOX_SELECTORS.customOnBlurOutput);

		await expect(async () => {
			await input.focus();
			await input.blur();
			await expect(output).not.toHaveAttribute('data-count', '0', { timeout: 1000 });
		}).toPass();
	});
});
