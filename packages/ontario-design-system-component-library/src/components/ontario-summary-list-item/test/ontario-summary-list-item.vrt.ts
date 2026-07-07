import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Visual regression tests for ontario-summary-list-item.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the summary
 * list item variants. Baselines are generated in (or matched against) the CI Playwright
 * Linux image - see `Stencil-VRT-CI-Plan.md`.
 *
 * Snapshots target the component host (a stable element) rather than inner
 * shadow nodes, with animations disabled and the caret hidden for determinism.
 */

const SNAPSHOT_OPTS = { animations: 'disabled' as const, caret: 'hide' as const };

/**
 * Wraps component markup with the global stylesheet so that @font-face
 * declarations (Raleway Modified, Open Sans) are available to shadow-DOM
 * components that inherit typography from the document root.
 */
const withStyles = (body: string) => `
	<html>
		<head>
			<link rel="stylesheet" href="/build/ontario-design-system-components.css">
		</head>
		<body>${body}</body>
	</html>
`;

test.describe('ontario-summary-list-item - with actionLink', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list caption="Row variants">
					<ontario-summary-list-item
						name="Full name"
						description="Jane Doe"
						action-link='{"href":"#name"}'
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('row with actionLink - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryListItem-withAction.png', SNAPSHOT_OPTS);
	});

	test('row with actionLink - focus state on change link', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		const changeLink = host.locator('ontario-summary-list-item').locator('a.ontario-summary-list-item__change-button');
		await changeLink.focus();
		await expect(host).toHaveScreenshot('ontarioSummaryListItem-withAction-focus.png', SNAPSHOT_OPTS);
	});
});

test.describe('ontario-summary-list-item - without actionLink', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list caption="Row variants">
					<ontario-summary-list-item
						name="Email address"
						description="jane.doe@example.com"
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('row without actionLink - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryListItem-noAction.png', SNAPSHOT_OPTS);
	});
});

test.describe('ontario-summary-list-item - compact variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list caption="Compact rows">
					<ontario-summary-list-item
						name="Full name"
						description="Jane Doe"
						compact
						action-link='{"href":"#name"}'
					></ontario-summary-list-item>
					<ontario-summary-list-item
						name="Date of birth"
						description="January 1, 1990"
						compact
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('compact rows - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryListItem-compact.png', SNAPSHOT_OPTS);
	});
});
