import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

/**
 * Visual regression tests for ontario-tag-group.
 *
 * These cover the Figma "Tags – Group" layout: the heading with a count, the hint text, the 16px spacing between the
 * heading, hint and tags, and tags wrapping on desktop and mobile. They also cover a group with no visible heading, a
 * French group, and the focus ring on the heading after the last tag is removed.
 */

const appliedFilters = (attributes = '') => `
	<ontario-tag-group heading="Applied filters" hint-text="Hint text example." ${attributes}>
		<ontario-tag label="Category: Health" value="health" dismissible></ontario-tag>
		<ontario-tag label="Region: Northern Ontario" value="north" dismissible></ontario-tag>
		<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>
	</ontario-tag-group>
`;

/**
 * Renders the group with the global styles in a wrapper with padding, so the focus ring (a box shadow drawn outside the
 * focused element) is inside the screenshot.
 */
const renderGroup = async (page: E2EPage, markup: string): Promise<Locator> => {
	await page.setContent(withGlobalStyles(`<div id="vrt-tag-group" style="padding: 16px;">${markup}</div>`));
	await page.waitForChanges();
	await expect(page.locator('ontario-tag-group').first()).toHaveClass(/hydrated/);
	await page.evaluate(async () => {
		await document.fonts.ready;
	});

	return page.locator('#vrt-tag-group');
};

test.describe('ontario-tag-group - layout', () => {
	test('applied filters - heading, count, hint text and tags on desktop', async ({ page }) => {
		const wrapper = await renderGroup(page, appliedFilters());

		await expectVrtScreenshot(wrapper);
	});

	test('applied filters - tags wrap on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 360, height: 640 });
		const wrapper = await renderGroup(page, appliedFilters());

		await expectVrtScreenshot(wrapper);
	});

	test('filter set - no visible heading, using groupLabel', async ({ page }) => {
		const wrapper = await renderGroup(
			page,
			`
				<ontario-tag-group group-label="Topics">
					<ontario-tag label="Health"></ontario-tag>
					<ontario-tag label="Education" selected></ontario-tag>
				</ontario-tag-group>
			`,
		);

		await expectVrtScreenshot(wrapper);
	});

	test('French group', async ({ page }) => {
		const wrapper = await renderGroup(
			page,
			`
				<ontario-tag-group group-label="Sujets" language="fr">
					<ontario-tag label="Santé et bien-être" value="health" language="fr" dismissible></ontario-tag>
					<ontario-tag label="Éducation et formation" value="education" language="fr" dismissible></ontario-tag>
				</ontario-tag-group>
			`,
		);

		await expectVrtScreenshot(wrapper);
	});
});

test.describe('ontario-tag-group - focus after removal', () => {
	test('heading focus state after the last tag is removed', async ({ page }) => {
		const wrapper = await renderGroup(
			page,
			`
				<ontario-tag-group heading="Applied filters">
					<ontario-tag label="Category: Health" value="health" dismissible></ontario-tag>
				</ontario-tag-group>
				<script>
					document.addEventListener('tagDismissed', (event) => event.target.remove());
				</script>
			`,
		);

		await page.getByRole('button', { name: 'Remove Category: Health' }).click();
		await page.waitForChanges();

		const heading = page.locator('ontario-tag-group').locator('.ontario-tag-group__heading');
		await expect(heading).toBeFocused();
		await expect(heading).toHaveText('Applied filters (0)');
		await expectVrtScreenshot(wrapper);
	});
});
