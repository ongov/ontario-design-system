import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

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

/**
 * Wraps component markup with the global stylesheet so that @font-face
 * declarations (Raleway Modified, Open Sans) are available to shadow-DOM
 * components that inherit typography from the document root.
 */
test.describe('ontario-summary-list', () => {
	test.describe('default', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
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

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});
	});

	test.describe('full width', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
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

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});
	});

	test.describe('caption action', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
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

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});

		test('focus', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			const changeLink = host.locator('a.ontario-summary-list__change-button');
			await changeLink.focus();
			await expectVrtScreenshot(host);
		});
	});

	test.describe('french', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
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

		test('default', async ({ page }) => {
			const host = page.locator('ontario-summary-list');
			await expect(host).toHaveClass(/hydrated/);
			await expectVrtScreenshot(host);
		});
	});
});
