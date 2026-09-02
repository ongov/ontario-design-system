import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';

test.describe('ontario-badge', () => {
	/* =========================
     Helpers
    ========================== */

	const renderHost = async (page: E2EPage, html: string): Promise<Locator> => {
		await page.setContent(html);
		await page.waitForChanges();

		const host = page.locator('ontario-badge').last();
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);

		return host;
	};

	/* =========================
     Positive Tests
    ========================== */

	test('renders and is hydrated', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Active"></ontario-badge>`);

		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
		await expect(host).toHaveScreenshot();
	});

	test('renders label text', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Active"></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('Active');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('renders slot text when label not provided', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge>Pending</ontario-badge>`);

		await expect(host.locator('span')).toHaveText('Pending');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('label typography', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Status"></ontario-badge>`);
		const badgeSpan = host.locator('span').first();
		await expect(badgeSpan).toHaveCSS('display', 'inline-block');
		await expect(badgeSpan).toHaveCSS('font-weight', '700');
		await expect(badgeSpan).toHaveCSS('text-transform', 'uppercase');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('applies correct styles for red badge', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Alert" colour="red"></ontario-badge>`);
		const span = host.locator('span');

		// Check class mapping for alert colour
		await expect(span).toContainClass('ontario-badge--red');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('updates colour dynamically', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Dynamic"></ontario-badge>`);

		await host.evaluate((el: HTMLOntarioBadgeElement) => {
			el.colour = 'red';
		});

		const span = host.locator('span');

		await expect(span).toContainClass('ontario-badge--red');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	/* =========================
     Negative Tests
    ========================== */

	test('falls back to teal for invalid colour', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Test" colour="invalid"></ontario-badge>`);

		await expect(host.locator('span')).toContainClass('ontario-badge--teal');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('maps legacy colour values', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Test" colour="lightTeal"></ontario-badge>`);

		await expect(host.locator('span')).toContainClass('ontario-badge--light-teal');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('handles empty string label', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label=""></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('');
		await expect(host).toHaveScreenshot();
	});

	test('defaults to teal when colour not provided', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Default"></ontario-badge>`);

		await expect(host.locator('span')).toContainClass('ontario-badge--teal');
		await expect(host).toHaveScreenshot();
	});

	test('handles rapid updates', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Stress"></ontario-badge>`);

		await host.evaluate((el: HTMLOntarioBadgeElement) => {
			el.colour = 'grey';
			el.colour = 'teal';
			el.colour = 'yellow';
		});

		await page.waitForChanges();

		await expect(host.locator('span')).toBeAttached();
		await expect(host.locator('span')).toContainClass('ontario-badge--yellow');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('supports unicode label', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="✅ Done"></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('✅ Done');
		await expect(host.locator('span')).toHaveScreenshot();
	});

	test('has correct semantic structure', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Semantic"></ontario-badge>`);

		const span = host.locator('span');
		await expect(span).toBeAttached();
		await expect(span).not.toHaveAttribute('role');
		await expect(host).toHaveScreenshot();
	});

	test('visual regression: colour variants', async ({ page }) => {
		await page.setContent(
			`
      <div id="colour-variants" style="display: inline-flex; flex-direction: column;">
        <ontario-badge label="One" colour="teal"></ontario-badge>
        <ontario-badge label="Two" colour="green"></ontario-badge>
      </div>
      `,
		);
		await page.waitForChanges();

		const container = page.locator('#colour-variants');
		const badges = container.locator('ontario-badge');

		await expect(badges).toHaveCount(2);
		await expect(badges.last()).toHaveClass(/hydrated/);

		await expect(container).toHaveScreenshot();
	});

	/* =========================
     Performance Tests
    ========================== */

	test('renders multiple badges', async ({ page }) => {
		const badgeCount = 50;
		const html = Array.from({ length: badgeCount })
			.map((_, i) => `<ontario-badge label="Badge ${i}"></ontario-badge>`)
			.join('');

		await page.setContent(`<div id="multiple-badges" style="display: inline-flex; flex-wrap: wrap;">${html}</div>`);
		await page.waitForChanges();

		const container = page.locator('#multiple-badges');
		const badges = container.locator('ontario-badge');
		await expect(badges).toHaveCount(badgeCount);
		await expect(container).toHaveScreenshot();
	});

	test('handles rapid re-rendering', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Perf"></ontario-badge>`);

		await host.evaluate((el: HTMLOntarioBadgeElement) => {
			for (let i = 0; i < 10; i++) {
				el.colour = i % 2 ? 'red' : 'teal';
			}
		});

		const start = performance.now();
		await page.waitForChanges();

		const end = performance.now();
		console.log(`Applied 10 rapid colour updates in ${(end - start).toFixed(2)} ms`);

		await expect(host).toBeAttached();
		await expect(host.locator('span')).toHaveScreenshot();
	});
});
