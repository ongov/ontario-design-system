import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Visual regression tests for ontario-summary-list.
 *
 * Companion to the E2E suite: these assert pixel-level rendering of the summary
 * list variants. Baselines are generated in (or matched against) the CI Playwright
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

test.describe('ontario-summary-list - default variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list caption="Personal information">
					<ontario-summary-list-item
						name="Full name"
						description="Jane Doe"
						action-link='{"href":"#name"}'
					></ontario-summary-list-item>
					<ontario-summary-list-item
						name="Date of birth"
						description="January 1, 1990"
						action-link='{"href":"#dob"}'
					></ontario-summary-list-item>
					<ontario-summary-list-item
						name="Email address"
						description="jane.doe@example.com"
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('default variant - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryList-default.png', SNAPSHOT_OPTS);
	});
});

test.describe('ontario-summary-list - full-width variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list caption="Detailed responses" full-width>
					<ontario-summary-list-item
						name="Address"
						description="111 Wellington St., Ottawa, ON K1A 0A9"
						action-link='{"href":"#address"}'
					></ontario-summary-list-item>
					<ontario-summary-list-item
						name="Additional comments"
						description="No additional comments at this time."
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('full-width variant - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryList-fullWidth.png', SNAPSHOT_OPTS);
	});
});

test.describe('ontario-summary-list - with captionActionLink', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list
					caption="Contact details"
					caption-action-link='{"href":"#contact"}'
				>
					<ontario-summary-list-item
						name="Phone number"
						description="416-555-0100"
						action-link='{"href":"#phone"}'
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('with captionActionLink - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryList-captionActionLink.png', SNAPSHOT_OPTS);
	});

	test('with captionActionLink - focus state on section change link', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		const changeLink = host.locator('a.ontario-summary-list__change-button');
		await changeLink.focus();
		await expect(host).toHaveScreenshot('ontarioSummaryList-captionActionLink-focus.png', SNAPSHOT_OPTS);
	});
});

test.describe('ontario-summary-list - French variant', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(
			withStyles(`
				<ontario-summary-list
					caption="Renseignements personnels"
					language="fr"
					caption-action-link='{"href":"#info"}'
				>
					<ontario-summary-list-item
						name="Nom complet"
						description="Jean Dupont"
						language="fr"
						action-link='{"href":"#nom"}'
					></ontario-summary-list-item>
					<ontario-summary-list-item
						name="Date de naissance"
						description="1er janvier 1990"
						language="fr"
					></ontario-summary-list-item>
				</ontario-summary-list>
			`),
		);
		await page.waitForChanges();
	});

	test('French variant - default state', async ({ page }) => {
		const host = page.locator('ontario-summary-list');
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot('ontarioSummaryList-french.png', SNAPSHOT_OPTS);
	});
});
