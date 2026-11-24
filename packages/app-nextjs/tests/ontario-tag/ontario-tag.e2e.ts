import { test, expect } from '@playwright/test';
import { TAG_SELECTORS } from './ontario-tag.selectors';

test.describe('Ontario Tag', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-tag');
		// Wait for the client bundles so the tags respond to interaction.
		await page.waitForLoadState('networkidle');
	});

	test('should render the unselected, selected and dismissible tags', async ({ page }) => {
		await expect(page.locator(TAG_SELECTORS.unselected).locator('button')).toHaveAttribute('aria-pressed', 'false');
		await expect(page.locator(TAG_SELECTORS.selected).locator('button')).toHaveAttribute('aria-pressed', 'true');
		await expect(page.locator(TAG_SELECTORS.dismissible).locator('button')).not.toHaveAttribute('aria-pressed');
	});

	test('should toggle a non-dismissible tag when clicked', async ({ page }) => {
		const button = page.locator(TAG_SELECTORS.unselected).locator('button');

		await button.click();
		await expect(button).toHaveAttribute('aria-pressed', 'true');

		await button.click();
		await expect(button).toHaveAttribute('aria-pressed', 'false');
	});

	test('should toggle a non-dismissible tag with the keyboard', async ({ page }) => {
		const button = page.locator(TAG_SELECTORS.selected).locator('button');

		await button.focus();
		await page.keyboard.press('Space');
		await expect(button).toHaveAttribute('aria-pressed', 'false');

		await page.keyboard.press('Enter');
		await expect(button).toHaveAttribute('aria-pressed', 'true');
	});

	test('should name the dismissible tag "Remove {label}"', async ({ page }) => {
		await expect(page.locator(TAG_SELECTORS.dismissible).locator('button')).toHaveAccessibleName(
			'Remove Category: Filter',
		);
	});

	test('should name the French dismissible tag "Supprimer {label}"', async ({ page }) => {
		await expect(page.locator(TAG_SELECTORS.dismissibleFrench).locator('button')).toHaveAccessibleName(
			'Supprimer Santé et bien-être',
		);
	});

	test('should not remove a dismissible tag that has no tagDismissed handler', async ({ page }) => {
		await page.locator(TAG_SELECTORS.dismissible).locator('button').click();

		await expect(page.locator(TAG_SELECTORS.dismissible)).toBeVisible();
	});

	test('should make each tag its own Tab stop, in DOM order', async ({ page }) => {
		await page.locator(TAG_SELECTORS.unselected).locator('button').focus();

		await page.keyboard.press('Tab');
		await expect(page.locator(TAG_SELECTORS.selected).locator('button')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator(TAG_SELECTORS.dismissible).locator('button')).toBeFocused();
	});
});
