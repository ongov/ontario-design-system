import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-summary-list', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Personal information"></ontario-summary-list>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-summary-list').first();
	});

	test('renders and is hydrated', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders the caption as an h3 heading by default', async () => {
		const heading = host.locator('h3.ontario-summary-list__heading');
		await expect(heading).toBeAttached();
		await expect(heading).toHaveText('Personal information');
	});

	test('renders the dl container', async () => {
		const container = host.locator('dl.ontario-summary-list__container');
		await expect(container).toBeAttached();
	});

	test('renders default and fullWidth layout variants without errors', async ({ page }) => {
		const defaultWrapper = host.locator('.ontario-summary-list');
		await expect(defaultWrapper).toBeAttached();
		await expect(defaultWrapper).not.toContainClass('summary-list-full-width');

		await page.setContent(`
			<ontario-summary-list caption="Personal information" full-width="true">
				<div class="ontario-summary-list-demo-row">
					<dt>Address</dt>
					<dd>111 Wellington St.</dd>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		const fullWidthWrapper = page.locator('ontario-summary-list .ontario-summary-list').first();
		await expect(fullWidthWrapper).toContainClass('summary-list-full-width');
	});

	test('supports keyboard tab order and enter activation through slotted change links', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Personal information">
				<a id="summary-change-link" slot="caption-action" href="#summary-change">Change section</a>
				<div class="ontario-summary-list-demo-row">
					<dt>Name</dt>
					<dd>Jane Doe</dd>
					<a id="row-change-link-1" href="#row-1">Change name</a>
				</div>
				<div class="ontario-summary-list-demo-row">
					<dt>Email</dt>
					<dd>jane@example.com</dd>
					<a id="row-change-link-2" href="#row-2">Change email</a>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await page.keyboard.press('Tab');
		await expect(page.locator('#summary-change-link')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('#row-change-link-1')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('#row-change-link-2')).toBeFocused();

		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/#row-2$/);
	});

	test('renders localized generated action link text for English and French', async ({ page }) => {
		await page.setContent(
			`<ontario-summary-list caption="Address" caption-action-link='{"href":"/change-address"}'></ontario-summary-list>`,
		);
		await page.waitForChanges();

		const enLink = page.locator('ontario-summary-list .ontario-summary-list__change-button').first();
		await expect(enLink).toContainText('Change');
		await expect(enLink).toContainText('your answer for:');

		await page.setContent(
			`<ontario-summary-list caption="Address" language="fr" caption-action-link='{"href":"/change-address"}'></ontario-summary-list>`,
		);
		await page.waitForChanges();

		const frLink = page.locator('ontario-summary-list .ontario-summary-list__change-button').first();
		await expect(frLink).toContainText('Modifier');
		await expect(frLink).toContainText(/votre réponse pour\s*:/);
	});

	test('renders French slotted content with no generated English text bleed-through', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Renseignements personnels" language="fr">
				<a slot="caption-action" href="#modifier-section">Modifier</a>
				<div class="ontario-summary-list-demo-row">
					<dt>Nom</dt>
					<dd>Dupont</dd>
					<a href="#modifier-nom">Modifier le nom</a>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		const summaryList = page.locator('ontario-summary-list').first();
		await expect(summaryList).toContainText('Renseignements personnels');
		await expect(summaryList).toContainText('Nom');
		await expect(summaryList).toContainText('Modifier');
		await expect(summaryList).not.toContainText('Change');
		await expect(summaryList).not.toContainText('your answer for:');
	});

	test('has expected accessible heading and action link names for default and fullWidth variants', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Personal information" caption-action-link='{"href":"/change"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Name</dt>
					<dd>Jane Doe</dd>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await expect(page.getByRole('heading', { name: 'Personal information' })).toBeVisible();
		await expect(page.getByRole('link', { name: /Change/ })).toBeVisible();

		await page.setContent(`
			<ontario-summary-list caption="Personal information" full-width="true" caption-action-link='{"href":"/change"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Address</dt>
					<dd>111 Wellington St.</dd>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await expect(page.getByRole('heading', { name: 'Personal information' })).toBeVisible();
		await expect(page.getByRole('link', { name: /Change/ })).toBeVisible();
	});

	test('applies focus ring styles to slotted links on keyboard focus', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Personal information">
				<a id="summary-change-link" slot="caption-action" href="#summary-change">Change section</a>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await page.keyboard.press('Tab');
		await expect(page.locator('#summary-change-link')).toBeFocused();

		const focusedStyles = await page.locator('#summary-change-link').evaluate((el) => {
			const styles = window.getComputedStyle(el as HTMLElement);
			return {
				outlineStyle: styles.outlineStyle,
				boxShadow: styles.boxShadow,
			};
		});

		expect(focusedStyles.boxShadow).not.toBe('none');
		expect(focusedStyles.outlineStyle).not.toBe('none');
	});

	test('visual regression: default variant with action link', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Personal information" caption-action-link='{"href":"/change-personal"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Name</dt>
					<dd>Jane Doe</dd>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await expect(page.locator('ontario-summary-list').first()).toHaveScreenshot(
			'ontario-summary-list-default-action-link.png',
		);
	});

	test('visual regression: row without action link', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Personal information">
				<div class="ontario-summary-list-demo-row">
					<dt>Email</dt>
					<dd>jane@example.com</dd>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await expect(page.locator('ontario-summary-list').first()).toHaveScreenshot(
			'ontario-summary-list-row-without-action-link.png',
		);
	});

	test('visual regression: fullWidth variant', async ({ page }) => {
		await page.setContent(`
			<ontario-summary-list caption="Summary" full-width="true" caption-action-link='{"href":"/change"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Address</dt>
					<dd>111 Wellington St.</dd>
				</div>
			</ontario-summary-list>
		`);
		await page.waitForChanges();

		await expect(page.locator('ontario-summary-list').first()).toHaveScreenshot('ontario-summary-list-full-width.png');
	});
});
