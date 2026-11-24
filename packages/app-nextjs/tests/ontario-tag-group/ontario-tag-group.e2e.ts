import { test, expect, Page } from '@playwright/test';
import { TAG_GROUP_SELECTORS } from './ontario-tag-group.selectors';

const getHeading = (page: Page) =>
	page.locator(TAG_GROUP_SELECTORS.appliedFilters).locator('.ontario-tag-group__heading');
const getStatus = (page: Page, selector: string) => page.locator(selector).locator('.ontario-tag-group__status');

test.describe('Ontario Tag Group', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-tag-group');
		// Wait for the client bundles so React handles tagDismissed and the group reacts to the removal.
		await page.waitForLoadState('networkidle');
	});

	test('should count the tags, including the ones Next.js wraps in a div', async ({ page }) => {
		await expect(getHeading(page)).toHaveText('Applied filters (2)');
	});

	test('should name the groups by their heading or groupLabel', async ({ page }) => {
		await expect(page.getByRole('group', { name: 'Applied filters (2)' })).toBeVisible();
		await expect(page.getByRole('group', { name: 'Topics' })).toBeVisible();
		await expect(page.getByRole('group', { name: 'Sujets' })).toBeVisible();
	});

	test('should describe the applied filters group with its hint text', async ({ page }) => {
		await expect(page.getByRole('group', { name: 'Applied filters (2)' })).toHaveAccessibleDescription(
			'Hint text example.',
		);
	});

	test('should announce each removal and move focus to the next tag, then the heading', async ({ page }) => {
		const status = getStatus(page, TAG_GROUP_SELECTORS.appliedFilters);

		await page.getByRole('button', { name: 'Remove Category: Health' }).focus();
		await page.keyboard.press('Enter');

		await expect(getHeading(page)).toHaveText('Applied filters (1)');
		await expect(status).toHaveText('Removed: Category: Health. 1 remaining.');
		await expect(page.getByRole('button', { name: 'Remove Region: Northern Ontario' })).toBeFocused();

		await page.keyboard.press('Enter');

		await expect(getHeading(page)).toHaveText('Applied filters (0)');
		await expect(status).toHaveText('Removed: Region: Northern Ontario. No tags remaining.');
		await expect(getHeading(page)).toBeFocused();
	});

	test('should move focus to the previous tag when the last tag is removed', async ({ page }) => {
		await page.getByRole('button', { name: 'Remove Region: Northern Ontario' }).click();

		await expect(getStatus(page, TAG_GROUP_SELECTORS.appliedFilters)).toHaveText(
			'Removed: Region: Northern Ontario. 1 remaining.',
		);
		await expect(page.getByRole('button', { name: 'Remove Category: Health' })).toBeFocused();
	});

	test('should announce removals in French', async ({ page }) => {
		await page.getByRole('button', { name: 'Supprimer Santé et bien-être' }).click();

		await expect(getStatus(page, TAG_GROUP_SELECTORS.french)).toHaveText(
			'Supprimé\u00a0: Santé et bien-être. 1 restante.',
		);
		await expect(page.getByRole('button', { name: 'Supprimer Éducation et formation' })).toBeFocused();
	});
});
