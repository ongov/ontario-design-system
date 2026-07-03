import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

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

		// Ensure the page has finished loading resources and fonts are ready
		try {
			await page.waitForLoadState('networkidle');
			// Wait for fonts to be ready to avoid visual diffs due to late font load
			const hasFonts = await page.evaluate(() => typeof (document as any).fonts !== 'undefined');
			if (hasFonts) {
				// `document.fonts.ready` resolves when fonts are loaded
				await page.evaluate(() => (document as any).fonts.ready);
			}
		} catch (e) {
			// Non-fatal; proceed even if these waits are not supported in some environments
			console.warn('Non-fatal: resource/font readiness wait failed', e);
		}

		return host;
	};

	const expectNoAxeViolations = async (page: E2EPage, selector: string) => {
		const results = await new AxeBuilder({ page }).include(selector).analyze();

		expect(results.violations).toHaveLength(0);
	};

	/* =========================
     Positive Tests
    ========================== */

	test('renders and is hydrated', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Active"></ontario-badge>`);

		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
		await expect(host.locator('span')).toHaveScreenshot('default-badge.png');
	});

	test('renders label text', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Active"></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('Active');
	});

	test('renders slot text when label not provided', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge>Pending</ontario-badge>`);

		await expect(host.locator('span')).toHaveText('Pending');
	});

	test('label typography', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Status"></ontario-badge>`);
		const badgeSpan = host.locator('span').first();
		await expect(badgeSpan).toHaveCSS('display', 'inline-block');
		await expect(badgeSpan).toHaveCSS('font-weight', '700');
		await expect(badgeSpan).toHaveCSS('text-transform', 'uppercase');
	});

	test('applies correct styles for red badge', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Alert" colour="red"></ontario-badge>`);
		const span = host.locator('span');

		// Check class mapping for alert colour
		await expect(span).toContainClass('ontario-badge--red');
		await expect(span).toHaveScreenshot('red-badge.png');
	});

	test('updates colour dynamically', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Dynamic"></ontario-badge>`);

		await host.evaluate((el: any) => {
			el.colour = 'red';
		});

		const span = host.locator('span');

		await expect(span).toContainClass('ontario-badge--red');
	});

	test('sets aria-label correctly', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Test" aria-label-text="Accessible"></ontario-badge>`);

		await expect(host.locator('span')).toHaveAttribute('aria-label', 'Accessible');
	});

	/* =========================
     Negative Tests
    ========================== */

	test('falls back to teal for invalid colour', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Test" colour="invalid"></ontario-badge>`);

		await expect(host.locator('span')).toContainClass('ontario-badge--teal');
	});

	test('renders empty when no label and no slot', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('');
	});

	test('handles empty aria-label', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Test" aria-label-text=""></ontario-badge>`);

		await expect(host.locator('span')).toHaveAttribute('aria-label', '');
	});

	test('maps legacy colour values', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Test" colour="lightTeal"></ontario-badge>`);

		await expect(host.locator('span')).toContainClass('ontario-badge--light-teal');
	});

	/* ==============================================
     Boundary Tests with longer than 15 characters
    ================================================= */
	/* ==============================================
    Curretly skipped because the badge component is not designed to handle long text 
    and will overflow horizontally. 
    This test is included for future reference if the component is updated 
    to support long text wrapping.
    ================================================= */
	test.skip('wraps long text without horizontal overflow', async ({ page }) => {
		const host = await renderHost(
			page,
			`<div style="width: 200px;">
                <ontario-badge label="This label is longer than fifteen characters"></ontario-badge>
            </div>`,
		);

		const badgeText = host.locator('span');
		await expect(badgeText).toBeVisible();

		const overflowX = await badgeText.evaluate((el) => getComputedStyle(el).overflowX);
		expect(overflowX).not.toBe('visible');

		const scrollWidth = await badgeText.evaluate((el) => el.scrollWidth);
		const clientWidth = await badgeText.evaluate((el) => el.clientWidth);
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	});

	test('handles empty string label', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label=""></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('');
	});

	test('defaults to teal when colour not provided', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Default"></ontario-badge>`);

		await expect(host.locator('span')).toContainClass('ontario-badge--teal');
	});

	test('handles rapid updates', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Stress"></ontario-badge>`);

		await host.evaluate((el: any) => {
			el.colour = 'grey';
			el.colour = 'teal';
			el.colour = 'yellow';
		});

		await page.waitForChanges();

		await expect(host.locator('span')).toBeAttached();
		await expect(host.locator('span')).toContainClass('ontario-badge--yellow');
	});

	test('supports unicode label', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="✅ Done"></ontario-badge>`);

		await expect(host.locator('span')).toHaveText('✅ Done');
		await expect(host.locator('span')).toHaveScreenshot('unicode-badge.png');
	});

	/* =========================
     Accessibility Tests
    ========================== */

	test('has no accessibility violations', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Accessible"></ontario-badge>`);

		await expectNoAxeViolations(page, 'ontario-badge');
		await expect(host).toBeVisible();
	});

	test('uses aria-label for screen readers', async ({ page }) => {
		const host = await renderHost(
			page,
			`<ontario-badge label="Visible" aria-label-text="Screen reader text"></ontario-badge>`,
		);

		await expect(host.locator('span')).toHaveAttribute('aria-label', 'Screen reader text');
	});

	test('falls back to visible text without aria-label', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Fallback"></ontario-badge>`);
		const label = host.locator('span');

		await expect(label).toBeVisible();
		await expect(label).not.toHaveAttribute('aria-label');
		await expect(label).toHaveText('Fallback');
		await expect(host).toBeVisible();
	});

	test('has correct semantic structure', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Semantic"></ontario-badge>`);

		const span = host.locator('span');
		await expect(span).toBeAttached();
		await expect(span).not.toHaveAttribute('role', /.+/);
	});

	/* =========================
     Visual Regression Tests -- currently skipped due to Playwright screenshot not implemented in Stencil E2E testing
    ========================== */

	/* test('visual regression: default badge', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Snapshot"></ontario-badge>`);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});

	test('visual regression: colour variants', async ({ page }) => {
		const host = await renderHost(
			page,
			`
      <ontario-badge label="One" colour="teal"></ontario-badge>
      <ontario-badge label="Two" colour="alert"></ontario-badge>
      `,
		);

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	}); */

	/* =========================
     Performance Tests
    ========================== */

	test('renders multiple badges', async ({ page }) => {
		const html = Array.from({ length: 50 })
			.map((_, i) => `<ontario-badge label="Badge ${i}"></ontario-badge>`)
			.join('');

		await page.setContent(html);
		await page.waitForChanges();

		const badges = page.locator('ontario-badge');
		await expect(badges).toHaveCount(50);
	});

	test('handles rapid re-rendering', async ({ page }) => {
		const host = await renderHost(page, `<ontario-badge label="Perf"></ontario-badge>`);

		await host.evaluate((el: any) => {
			for (let i = 0; i < 10; i++) {
				el.colour = i % 2 ? 'red' : 'teal';
			}
		});

		await page.waitForChanges();

		await expect(host).toBeAttached();
	});
});
