import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

/**
 * Visual regression tests for ontario-tag.
 *
 * These cover the default, hover, focus and active states of the unselected, selected and dismissible tags (DS-2841),
 * and a long label that wraps inside the tag.
 */

/**
 * The hover and active fills and borders are close to the default colours (for example `#E0F0FF` against `#C2E0FF` on a
 * selected tag). Playwright's default pixel `threshold` (`0.2`) treats colours that close as identical, so a low
 * `threshold` makes those differences count.
 */
const stateOptions = { threshold: 0.02, maxDiffPixels: 100 };

const variants = [
	{ name: 'unselected', attributes: 'label="Health"' },
	{ name: 'selected', attributes: 'label="Education" selected' },
	{ name: 'dismissible', attributes: 'label="Category: Filter" value="category-filter" dismissible' },
];

/**
 * Renders the tag with the global styles in a wrapper with padding, so the focus ring (a box shadow drawn outside the
 * tag) is inside the screenshot.
 */
const renderTag = async (
	page: E2EPage,
	attributes: string,
	wrapperStyle = 'display: inline-block;',
): Promise<{ wrapper: Locator; button: Locator }> => {
	await page.setContent(
		withGlobalStyles(`
			<div id="vrt-tag" style="${wrapperStyle} padding: 16px;">
				<ontario-tag ${attributes}></ontario-tag>
			</div>
		`),
	);
	await page.waitForChanges();
	await expect(page.locator('ontario-tag')).toHaveClass(/hydrated/);
	await page.evaluate(async () => {
		await document.fonts.ready;
	});

	return { wrapper: page.locator('#vrt-tag'), button: page.locator('ontario-tag').locator('button') };
};

test.describe('ontario-tag - interaction states', () => {
	for (const { name, attributes } of variants) {
		test(`${name} - default state`, async ({ page }) => {
			const { wrapper, button } = await renderTag(page, attributes);

			await expect(button).toBeVisible();
			await expectVrtScreenshot(wrapper, stateOptions);
		});

		test(`${name} - hover state`, async ({ page }) => {
			const { wrapper, button } = await renderTag(page, attributes);

			await button.hover();
			await expectVrtScreenshot(wrapper, stateOptions);
		});

		test(`${name} - focus state`, async ({ page }) => {
			const { wrapper, button } = await renderTag(page, attributes);

			await button.focus();
			await expect(button).toBeFocused();
			await expectVrtScreenshot(wrapper, stateOptions);
		});

		test(`${name} - active state`, async ({ page }) => {
			const { wrapper, button } = await renderTag(page, attributes);

			await button.hover();
			await page.mouse.down();
			try {
				await expectVrtScreenshot(wrapper, stateOptions);
			} finally {
				await page.mouse.up();
			}
		});
	}
});

test.describe('ontario-tag - long label', () => {
	// A narrow container forces the label to wrap, with the close icon staying centred and pinned to the right.
	test('dismissible - label wraps inside the tag', async ({ page }) => {
		const { wrapper } = await renderTag(
			page,
			'label="Region: Northern Ontario" value="north" dismissible',
			'width: 200px;',
		);

		await expectVrtScreenshot(wrapper, stateOptions);
	});

	test('non-dismissible - label wraps inside the tag', async ({ page }) => {
		const { wrapper } = await renderTag(page, 'label="Region: Northern Ontario"', 'width: 200px;');

		await expectVrtScreenshot(wrapper, stateOptions);
	});
});
