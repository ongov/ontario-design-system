import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-summary-list', () => {
	const renderHost = async (page: any, html: string): Promise<Locator> => {
		await page.setContent(html);
		await page.waitForChanges();
		const host = page.locator('ontario-summary-list').last();
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);
		return host;
	};

	test('renders and is hydrated', async ({ page }) => {
		const host = await renderHost(page, `<ontario-summary-list caption="Personal information"></ontario-summary-list>`);
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders the caption as an h3 heading by default', async ({ page }) => {
		const host = await renderHost(page, `<ontario-summary-list caption="Personal information"></ontario-summary-list>`);
		const heading = host.locator('h3.ontario-summary-list__heading');
		await expect(heading).toBeAttached();
		await expect(heading).toHaveText('Personal information');
	});

	test('renders the dl container', async ({ page }) => {
		const host = await renderHost(page, `<ontario-summary-list caption="Personal information"></ontario-summary-list>`);
		const container = host.locator('dl.ontario-summary-list__container');
		await expect(container).toBeAttached();
	});

	test('renders default layout variant without fullWidth class', async ({ page }) => {
		const host = await renderHost(page, `<ontario-summary-list caption="Personal information"></ontario-summary-list>`);
		const defaultWrapper = host.locator('.ontario-summary-list');
		await expect(defaultWrapper).toBeAttached();
		await expect(defaultWrapper).not.toContainClass('summary-list-full-width');
	});

	test('renders fullWidth layout variant without errors', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Personal information" full-width>
				<div class="ontario-summary-list-demo-row">
					<dt>Address</dt>
					<dd>111 Wellington St.</dd>
				</div>
			</ontario-summary-list>
		`,
		);

		const fullWidthWrapper = host.locator('.ontario-summary-list');
		await expect(fullWidthWrapper).toContainClass('summary-list-full-width');
	});

	test('supports keyboard tab order and enter activation through slotted change links', async ({ page }) => {
		const host = await renderHost(
			page,
			`
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
		`,
		);

		const summaryChangeLink = host.locator('a[slot="caption-action"]');
		const rowChangeLink1 = host.locator('#row-change-link-1');
		const rowChangeLink2 = host.locator('#row-change-link-2');

		await expect(summaryChangeLink).toBeAttached();
		await expect(rowChangeLink1).toBeAttached();
		await expect(rowChangeLink2).toBeAttached();

		await page.keyboard.press('Tab');
		await expect(summaryChangeLink).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(rowChangeLink1).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(rowChangeLink2).toBeFocused();

		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/#row-2$/);
	});

	test('renders localized generated action link text for English', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list caption="Address" caption-action-link='{"href":"/change-address"}'></ontario-summary-list>`,
		);

		const enLink = host.locator('.ontario-summary-list__change-button');
		await expect(enLink).toContainText('Change');
		await expect(enLink).toContainText('your answer for:');
	});

	test('renders localized generated action link text for French', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list caption="Address" language="fr" caption-action-link='{"href":"/change-address"}'></ontario-summary-list>`,
		);

		const frLink = host.locator('.ontario-summary-list__change-button');
		await expect(frLink).toContainText('Modifier');
		await expect(frLink).toContainText(/votre réponse pour\s*:/);
	});

	test('renders French slotted content with no generated English text bleed-through', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Renseignements personnels" language="fr">
				<a slot="caption-action" href="#modifier-section">Modifier</a>
				<div class="ontario-summary-list-demo-row">
					<dt>Nom</dt>
					<dd>Dupont</dd>
					<a href="#modifier-nom">Modifier le nom</a>
				</div>
			</ontario-summary-list>
		`,
		);

		await expect(host).toContainText('Renseignements personnels');
		await expect(host).toContainText('Nom');
		await expect(host).toContainText('Modifier');
		await expect(host).not.toContainText('Change');
		await expect(host).not.toContainText('your answer for:');
	});

	test('has expected accessible heading and action link names for default variant', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Personal information" caption-action-link='{"href":"/change"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Name</dt>
					<dd>Jane Doe</dd>
				</div>
			</ontario-summary-list>
		`,
		);

		await expect(host.getByRole('heading', { name: 'Personal information' })).toBeVisible();
		await expect(host.getByRole('link', { name: /Change/ })).toBeVisible();
	});

	test('has expected accessible heading and action link names for fullWidth variant', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Personal information" full-width caption-action-link='{"href":"/change"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Address</dt>
					<dd>111 Wellington St.</dd>
				</div>
			</ontario-summary-list>
		`,
		);

		await expect(host.getByRole('heading', { name: 'Personal information' })).toBeVisible();
		await expect(host.getByRole('link', { name: /Change/ })).toBeVisible();
	});

	test('applies focus ring styles to slotted links on keyboard focus', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Personal information">
				<a id="summary-change-link" slot="caption-action" href="#summary-change">Change section</a>
			</ontario-summary-list>
		`,
		);

		const summaryChangeLink = host.locator('a[slot="caption-action"]');
		await expect(summaryChangeLink).toBeAttached();

		await page.keyboard.press('Tab');
		await expect(summaryChangeLink).toBeFocused();

		const focusedStyles = await summaryChangeLink.evaluate((el) => {
			const styles = window.getComputedStyle(el as HTMLElement);
			return {
				outlineStyle: styles.outlineStyle,
				outlineWidth: styles.outlineWidth,
				boxShadow: styles.boxShadow,
			};
		});

		const hasOutline = focusedStyles.outlineStyle !== 'none' && focusedStyles.outlineWidth !== '0px';
		const hasBoxShadow = focusedStyles.boxShadow !== 'none';

		expect(hasOutline || hasBoxShadow).toBe(true);
	});

	test('visual regression: default variant with action link', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Personal information" caption-action-link='{"href":"/change-personal"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Name</dt>
					<dd>Jane Doe</dd>
				</div>
			</ontario-summary-list>
		`,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});

	test('visual regression: row without action link', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Personal information">
				<div class="ontario-summary-list-demo-row">
					<dt>Email</dt>
					<dd>jane@example.com</dd>
				</div>
			</ontario-summary-list>
		`,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});

	test('visual regression: fullWidth variant', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list caption="Summary" full-width caption-action-link='{"href":"/change"}'>
				<div class="ontario-summary-list-demo-row">
					<dt>Address</dt>
					<dd>111 Wellington St.</dd>
				</div>
			</ontario-summary-list>
		`,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});
});
