import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Visual regression tests for ontario-button.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the button
 * variants and their focus states. Baselines are generated in (or matched
 * against) the CI Playwright Linux image - see `Stencil-VRT-CI-Plan.md`.
 *
 * Snapshots target the component host (a stable element) rather than inner
 * shadow nodes, with animations disabled and the caret hidden for determinism.
 */
test.describe('ontario-button - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-button type="primary" element-id="ontario-button-primary">Primary</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-secondary">Secondary</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-tertiary">Tertiary</ontario-button>
		`);
		await page.waitForChanges();
	});

	test('primary button - default state', async ({ page }) => {
		const host = page.locator('ontario-button[type="primary"]');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioButtonPrimary.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('secondary button - default state', async ({ page }) => {
		const host = page.locator('ontario-button[type="secondary"]');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioButtonSecondary.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('tertiary button - default state', async ({ page }) => {
		const host = page.locator('ontario-button[type="tertiary"]');
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot('ontarioButtonTertiary.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('ontario-button - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-button type="primary" element-id="ontario-button-primary">Primary</ontario-button>
			<ontario-button type="secondary" element-id="ontario-button-secondary">Secondary</ontario-button>
			<ontario-button type="tertiary" element-id="ontario-button-tertiary">Tertiary</ontario-button>
		`);
		await page.waitForChanges();
	});

	test('primary button - focus state', async ({ page }) => {
		const host = page.locator('ontario-button[type="primary"]');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioButtonPrimary-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('secondary button - focus state', async ({ page }) => {
		const host = page.locator('ontario-button[type="secondary"]');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioButtonSecondary-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('tertiary button - focus state', async ({ page }) => {
		const host = page.locator('ontario-button[type="tertiary"]');
		await expect(host).toHaveClass('hydrated');
		await host.locator('button').focus();
		await expect(host).toHaveScreenshot('ontarioButtonTertiary-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
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
