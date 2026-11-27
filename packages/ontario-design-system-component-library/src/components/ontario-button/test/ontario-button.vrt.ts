import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';
import { ButtonTypes } from '../ontario-button.types';

/**
 * Visual regression tests for ontario-button.
 *
 * These tests cover the button types, their interaction states, link rendering and the minimum width. A screenshot
 * below the small breakpoint is not included yet: the button does not fill its container there (DS-2973), so a baseline
 * would record the current layout as the expected one. It can be added together with the fix.
 */

/**
 * The hover, focus and active colours of each button type are close to the default colour of the same type (for
 * example `$ontario-colour-link--hover` against `$ontario-colour-link` on `primary`). Playwright's default pixel
 * `threshold` (`0.2`) treats colours that close as identical, so a button with no hover style at all would still match
 * its hover baseline. A low `threshold` makes those colour differences count.
 */
const stateOptions = { threshold: 0.02, maxDiffPixels: 100 };

test.describe('ontario-button', () => {
	/**
	 * Renders the button with the global styles in a wrapper with padding, so the focus ring (a box shadow drawn outside
	 * the button) is inside the screenshot.
	 */
	const renderButton = async (page: E2EPage, attributes: string): Promise<{ wrapper: Locator; button: Locator }> => {
		await page.setContent(
			withGlobalStyles(`
				<div id="vrt-button" style="display: inline-block; padding: 16px;">
					<ontario-button ${attributes}></ontario-button>
				</div>
			`),
		);
		await page.waitForChanges();
		await expect(page.locator('ontario-button')).toHaveClass(/hydrated/);
		await page.evaluate(async () => {
			await document.fonts.ready;
		});

		return { wrapper: page.locator('#vrt-button'), button: page.locator('ontario-button').locator('button') };
	};

	test.describe('interaction states', () => {
		for (const buttonType of ButtonTypes) {
			test(`${buttonType} button - default state`, async ({ page }) => {
				const { wrapper, button } = await renderButton(page, `type="${buttonType}" label="${buttonType} button"`);

				await expect(button).toBeVisible();
				await expectVrtScreenshot(wrapper, stateOptions);
			});

			test(`${buttonType} button - hover state`, async ({ page }) => {
				const { wrapper, button } = await renderButton(page, `type="${buttonType}" label="${buttonType} button"`);

				await button.hover();
				await expectVrtScreenshot(wrapper, stateOptions);
			});

			test(`${buttonType} button - focus state`, async ({ page }) => {
				const { wrapper, button } = await renderButton(page, `type="${buttonType}" label="${buttonType} button"`);

				await button.focus();
				await expect(button).toBeFocused();
				await expectVrtScreenshot(wrapper, stateOptions);
			});

			test(`${buttonType} button - active state`, async ({ page }) => {
				const { wrapper, button } = await renderButton(page, `type="${buttonType}" label="${buttonType} button"`);

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

	test('link mode', async ({ page }) => {
		const { wrapper } = await renderButton(page, 'href="/details" label="View details"');

		await expect(page.locator('ontario-button').locator('a')).toBeVisible();
		await expectVrtScreenshot(wrapper, stateOptions);
	});

	test('a short label keeps the minimum button width', async ({ page }) => {
		const { wrapper, button } = await renderButton(page, 'type="primary" label="OK"');

		// `min-width: 10rem` (160px) is wider than the label needs
		expect((await button.boundingBox())?.width).toBeGreaterThanOrEqual(160);
		await expectVrtScreenshot(wrapper, stateOptions);
	});
});

test.describe('ontario-button - icon variants (default state)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-button type="primary" element-id="ontario-button-icon-only-primary" aria-label-text="Open map">
				<ontario-icon-map colour="inherit" is-decorative="true"></ontario-icon-map>
			</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-icon-only-secondary" aria-label-text="Open map">
				<ontario-icon-map colour="inherit" is-decorative="true"></ontario-icon-map>
			</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-icon-only-tertiary" aria-label-text="Open map">
				<ontario-icon-map colour="inherit" is-decorative="true"></ontario-icon-map>
			</ontario-button>

			<ontario-button type="primary" element-id="ontario-button-leading-icon-primary" label="Add item">
				<ontario-icon-add slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
			</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-leading-icon-secondary" label="Add item">
				<ontario-icon-add slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
			</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-leading-icon-tertiary" label="Add item">
				<ontario-icon-add slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
			</ontario-button>

			<ontario-button type="primary" element-id="ontario-button-trailing-icon-primary" label="Add item">
				<ontario-icon-add slot="trailing-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
			</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-trailing-icon-secondary" label="Add item">
				<ontario-icon-add slot="trailing-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
			</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-trailing-icon-tertiary" label="Add item">
				<ontario-icon-add slot="trailing-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
			</ontario-button>

			<ontario-button type="primary" element-id="ontario-button-both-icons-primary" label="Download report">
				<ontario-icon-download slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-download>
				<ontario-icon-chevron-right slot="trailing-icon" colour="inherit" is-decorative="true"></ontario-icon-chevron-right>
			</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-both-icons-secondary" label="Download report">
				<ontario-icon-download slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-download>
				<ontario-icon-chevron-right slot="trailing-icon" colour="inherit" is-decorative="true"></ontario-icon-chevron-right>
			</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-both-icons-tertiary" label="Download report">
				<ontario-icon-download slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-download>
				<ontario-icon-chevron-right slot="trailing-icon" colour="inherit" is-decorative="true"></ontario-icon-chevron-right>
			</ontario-button>
		`);
		await page.waitForChanges();
	});

	test('primary icon-only button', async ({ page }) => {
		const host = page.locator('#ontario-button-icon-only-primary');
		await expect(host).toHaveScreenshot('ontarioButtonIconOnlyPrimary.png');
	});

	test('secondary icon-only button', async ({ page }) => {
		const host = page.locator('#ontario-button-icon-only-secondary');
		await expect(host).toHaveScreenshot('ontarioButtonIconOnlySecondary.png');
	});

	test('tertiary icon-only button', async ({ page }) => {
		const host = page.locator('#ontario-button-icon-only-tertiary');
		await expect(host).toHaveScreenshot('ontarioButtonIconOnlyTertiary.png');
	});

	test('primary button with a leading icon', async ({ page }) => {
		const host = page.locator('#ontario-button-leading-icon-primary');
		await expect(host).toHaveScreenshot('ontarioButtonLeadingIconPrimary.png');
	});

	test('secondary button with a leading icon', async ({ page }) => {
		const host = page.locator('#ontario-button-leading-icon-secondary');
		await expect(host).toHaveScreenshot('ontarioButtonLeadingIconSecondary.png');
	});

	test('tertiary button with a leading icon', async ({ page }) => {
		const host = page.locator('#ontario-button-leading-icon-tertiary');
		await expect(host).toHaveScreenshot('ontarioButtonLeadingIconTertiary.png');
	});

	test('primary button with a trailing icon', async ({ page }) => {
		const host = page.locator('#ontario-button-trailing-icon-primary');
		await expect(host).toHaveScreenshot('ontarioButtonTrailingIconPrimary.png');
	});

	test('secondary button with a trailing icon', async ({ page }) => {
		const host = page.locator('#ontario-button-trailing-icon-secondary');
		await expect(host).toHaveScreenshot('ontarioButtonTrailingIconSecondary.png');
	});

	test('tertiary button with a trailing icon', async ({ page }) => {
		const host = page.locator('#ontario-button-trailing-icon-tertiary');
		await expect(host).toHaveScreenshot('ontarioButtonTrailingIconTertiary.png');
	});

	test('primary button with leading and trailing icons', async ({ page }) => {
		const host = page.locator('#ontario-button-both-icons-primary');
		await expect(host).toHaveScreenshot('ontarioButtonBothIconsPrimary.png');
	});

	test('secondary button with leading and trailing icons', async ({ page }) => {
		const host = page.locator('#ontario-button-both-icons-secondary');
		await expect(host).toHaveScreenshot('ontarioButtonBothIconsSecondary.png');
	});

	test('tertiary button with leading and trailing icons', async ({ page }) => {
		const host = page.locator('#ontario-button-both-icons-tertiary');
		await expect(host).toHaveScreenshot('ontarioButtonBothIconsTertiary.png');
	});
});

test.describe('ontario-button - button group spacing', () => {
	const group = `
		<div id="vrt-button-group" style="padding: 16px; width: 100%; box-sizing: border-box;"><ontario-button type="primary" label="Save"></ontario-button><ontario-button type="secondary" label="Cancel"></ontario-button><ontario-button type="tertiary" label="Reset"></ontario-button></div>
	`;

	for (const [name, viewport] of [
		['desktop', { width: 1280, height: 400 }],
		['mobile', { width: 375, height: 600 }],
	] as const) {
		test(`adjacent buttons on ${name}`, async ({ page }) => {
			await page.setViewportSize(viewport);
			await page.setContent(withGlobalStyles(group));
			await page.waitForChanges();
			await expect(page.locator('ontario-button').first()).toHaveClass(/hydrated/);
			await page.evaluate(async () => {
				await document.fonts.ready;
			});

			await expectVrtScreenshot(page.locator('#vrt-button-group'), stateOptions);
		});
	}
});
