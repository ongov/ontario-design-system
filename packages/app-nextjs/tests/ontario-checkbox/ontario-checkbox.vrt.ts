import { test, expect } from '@playwright/test';
import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';

test.describe('Ontario Checkbox - label variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('default label - unchecked state', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-default');
		await expectVrtScreenshot(checkbox);
	});

	test('default label - focus state', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-default');
		await checkbox.locator('input').focus();
		await waitForInteractionPaint(page);
		await expectVrtScreenshot(checkbox);
	});

	test('large label', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-label-large');
		await expectVrtScreenshot(checkbox);
	});

	test('heading label', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-label-heading');
		await expectVrtScreenshot(checkbox);
	});
});

test.describe('Ontario Checkbox - state variants', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-checkbox/server-side');
	});

	test('checked state', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-checked');
		await expectVrtScreenshot(checkbox);
	});

	test('required state', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-required');
		await expectVrtScreenshot(checkbox);
	});

	test('error state', async ({ page }) => {
		const checkbox = page.locator('#ontario-checkbox-error');
		await expectVrtScreenshot(checkbox);
	});
});
