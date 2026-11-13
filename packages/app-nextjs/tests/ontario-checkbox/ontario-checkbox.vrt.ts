import { test, expect } from '@playwright/test';
import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';
import { CHECKBOX_SELECTORS } from './ontario-checkbox.selectors';

test.describe('Ontario Checkbox - label variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('default label - unchecked state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.default);
		await expectVrtScreenshot(checkbox);
	});

	test('default label - focus state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.default);
		await checkbox.locator('input').focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(checkbox);
	});

	test('default label - hover state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.default);
		await checkbox.locator('.ontario-checkbox__label').hover();
		await expectVrtScreenshot(checkbox);
	});

	test('large label', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.labelLarge);
		await expectVrtScreenshot(checkbox);
	});

	test('heading label', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.labelHeading);
		await expectVrtScreenshot(checkbox);
	});
});

test.describe('Ontario Checkbox - state variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('checked state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.checked);
		await expectVrtScreenshot(checkbox);
	});

	test('required state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.required);
		await expectVrtScreenshot(checkbox);
	});

	test('not required state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.notRequired);
		await expectVrtScreenshot(checkbox);
	});

	test('error state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.error);
		await expectVrtScreenshot(checkbox);
	});
});

test.describe('Ontario Checkbox - hint-text variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('hint text set', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.hintText);
		await expectVrtScreenshot(checkbox);
	});
});

test.describe('Ontario Checkbox - hint-expander variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('hint expander - default state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.hintExpander);
		await expectVrtScreenshot(checkbox);
	});

	test('hint expander - expanded state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.hintExpander);
		await checkbox.locator('ontario-hint-expander').getByRole('button').click();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(checkbox);
	});
});

test.describe('Ontario Checkbox - language variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('english - default state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.languageEnglish);
		await expectVrtScreenshot(checkbox);
	});

	test('french - default state', async ({ page }) => {
		const checkbox = page.locator(CHECKBOX_SELECTORS.languageFrench);
		await expectVrtScreenshot(checkbox);
	});
});
