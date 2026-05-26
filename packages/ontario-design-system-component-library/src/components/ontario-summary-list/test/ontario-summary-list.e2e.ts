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
});
