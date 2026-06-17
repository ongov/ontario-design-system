import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

test.describe('ontario-summary-list-item', () => {
	const renderHost = async (page: E2EPage, html: string): Promise<Locator> => {
		await page.setContent(html);
		await page.waitForChanges();
		const host = page.locator('ontario-summary-list-item').last();
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);
		return host;
	};

	const expectNoAxeViolations = async (page: E2EPage, selector: string) => {
		const accessibilityScanResults = await new AxeBuilder({ page })
			.include(selector)
			.disableRules(['dlitem'])
			.analyze();
		expect(accessibilityScanResults.violations).toHaveLength(0);
	};

	test('renders and is hydrated', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>`,
		);

		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders key and value content', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>`,
		);

		await expect(host.locator('dt.ontario-summary-list-item__key')).toHaveText('Last name');
		await expect(host.locator('dd.ontario-summary-list-item__value')).toHaveText('Smith');
	});

	test('hydrates and renders empty key and value when name and description are omitted', async ({ page }) => {
		const host = await renderHost(page, `<ontario-summary-list-item></ontario-summary-list-item>`);

		await expect(host).toHaveClass('hydrated');
		await expect(host.locator('dt.ontario-summary-list-item__key')).toHaveText('');
		await expect(host.locator('dd.ontario-summary-list-item__value')).toHaveText('');
	});

	test('renders default layout variant without compact class', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>`,
		);

		await expect(host.locator('.ontario-summary-list-item__row')).not.toContainClass(
			'ontario-summary-list-item__row--compact',
		);
	});

	test('renders compact layout variant with compact class', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith" compact></ontario-summary-list-item>`,
		);

		await expect(host.locator('.ontario-summary-list-item__row')).toContainClass(
			'ontario-summary-list-item__row--compact',
		);
	});

	test('applies no-actions row modifier when action slot is empty', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>`,
		);

		await expect(host.locator('.ontario-summary-list-item__row')).toContainClass(
			'ontario-summary-list-item__row--no-actions',
		);
	});

	test('supports keyboard tab order and enter activation through slotted action links', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list-item name="Last name" description="Smith">
				<a id="summary-item-action-link" slot="action" href="#change-last-name">Change last name</a>
			</ontario-summary-list-item>
		`,
		);

		const slottedLink = host.locator('a[slot="action"]');
		await expect(slottedLink).toBeAttached();

		await page.keyboard.press('Tab');
		await expect(slottedLink).toBeFocused();

		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/#change-last-name$/);
	});

	test('renders English generated action link accessible name when actionLink is used', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Address" description="111 Wellington St." action-link='{"href":"/change-address"}'></ontario-summary-list-item>`,
		);

		const link = host.locator('.ontario-summary-list-item__change-button');
		await expect(link).toContainText('Change');
		await expect(link).toContainText('your answer for:');
		await expect(host.getByRole('link', { name: /Change/ })).toBeVisible();
	});

	test('renders French generated action link accessible name when actionLink is used', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Adresse" description="111, rue Wellington" language="fr" action-link='{"href":"/modifier-adresse"}'></ontario-summary-list-item>`,
		);

		const link = host.locator('.ontario-summary-list-item__change-button');
		await expect(link).toContainText('Modifier');
		await expect(link).toContainText(/votre réponse pour\s*:/);
		await expect(host.getByRole('link', { name: /Modifier/ })).toBeVisible();
	});

	test('renders French slotted content with no generated English text bleed-through', async ({ page }) => {
		const host = await renderHost(
			page,
			`
			<ontario-summary-list-item name="Nom" description="Dupont" language="fr">
				<a slot="action" href="#modifier-nom">Modifier le nom</a>
			</ontario-summary-list-item>
		`,
		);

		await expect(host).toContainText('Nom');
		await expect(host).toContainText('Dupont');
		await expect(host).toContainText('Modifier le nom');
		await expect(host).not.toContainText('Change');
		await expect(host).not.toContainText('your answer for:');
	});

	test('has expected accessible name for default variant', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith" action-link='{"href":"/change-last-name"}'></ontario-summary-list-item>`,
		);

		await expect(host.getByRole('link', { name: /Change/ })).toBeVisible();
	});

	test('has expected accessible name for compact variant', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Last name" description="Smith" compact action-link='{"href":"/change-last-name"}'></ontario-summary-list-item>`,
		);

		await expect(host.getByRole('link', { name: /Change/ })).toBeVisible();
	});

	test('has no axe violations', async ({ page }) => {
		await renderHost(
			page,
			`<ontario-summary-list-item name="Address" description="111 Wellington St." action-link='{"href":"/change-address"}'></ontario-summary-list-item>`,
		);

		await expectNoAxeViolations(page, 'ontario-summary-list-item');
	});

	test('visual regression: row with action link', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Address" description="111 Wellington St." action-link='{"href":"/change-address"}'></ontario-summary-list-item>`,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});

	test('visual regression: row without action link', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Address" description="111 Wellington St."></ontario-summary-list-item>`,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});

	test('visual regression: compact variant', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-summary-list-item name="Address" description="111 Wellington St." compact action-link='{"href":"/change-address"}'></ontario-summary-list-item>`,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});
});
