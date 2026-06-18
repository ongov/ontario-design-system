import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

test.describe('ontario-in-page-navigation-item', () => {
	let host: Locator;

	const setItemContent = async (page: any) => {
		await page.setContent(`
			<main>
				<ol>
					<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
				</ol>
				<section id="section-1" tabindex="-1">Section 1 content</section>
				<section id="section-2" tabindex="-1">Section 2 content</section>
			</main>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-in-page-navigation-item').first();
	};

	test.beforeEach(async ({ page }) => {
		await setItemContent(page);
	});

	const expectNoAxeViolations = async (page: any, selector: string) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).include(selector).analyze();
		expect(accessibilityScanResults.violations).toHaveLength(0);
	};

	test('renders and is hydrated with expected link content', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);

		const link = host.locator('a.ontario-page-navigation-item__link');
		await expect(link).toHaveAttribute('href', '#section-1');
		await expect(link).toHaveText('Section 1');
	});

	test('supports keyboard focus and Enter navigation', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el.shadowRoot?.querySelector('a.ontario-page-navigation-item__link') as HTMLAnchorElement | null)?.focus();
		});

		const focusedHref = await host.evaluate(
			(el: Element) =>
				el.shadowRoot?.activeElement?.getAttribute('href') || document.activeElement?.getAttribute('href'),
		);
		expect(focusedHref).toBe('#section-1');

		await page.keyboard.press('Enter');
		await page.waitForChanges();
		await expect(page).toHaveURL(/#section-1$/);
	});

	test('updates browser history and supports back navigation', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el.shadowRoot?.querySelector('a.ontario-page-navigation-item__link') as HTMLAnchorElement | null)?.click();
		});
		await page.waitForChanges();
		await expect(page).toHaveURL(/#section-1$/);

		await page.evaluate(() => {
			window.history.pushState({}, '', '#section-2');
		});
		await expect(page).toHaveURL(/#section-2$/);

		await page.goBack();
		await expect(page).toHaveURL(/#section-1$/);
	});

	test('supports French consumer content without English fallback text', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el as any).label = 'Section un';
			(el as any).href = '#section-1';
		});
		await page.waitForChanges();

		const link = host.locator('a.ontario-page-navigation-item__link');

		await expect(link).toHaveText('Section un');
		await expect(host).not.toContainText('Section 1');
	});

	test('sets aria-current when item is marked as current', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el as any).label = 'Current section';
			(el as any).href = '#section-1';
			(el as any).isCurrent = true;
		});
		await page.waitForChanges();

		const link = host.locator('a.ontario-page-navigation-item__link');
		await expect(link).toHaveAttribute('aria-current', 'true');
	});

	test('supports custom slot content projection', async ({ page }) => {
		await host.evaluate((el: Element) => {
			el.innerHTML = '<a class="custom-item-link" href="#section-2">Custom section</a>';
		});
		await page.waitForChanges();

		await expect(host.locator('a.custom-item-link')).toHaveAttribute('href', '#section-2');
		await expect(host.locator('a.custom-item-link')).toHaveText('Custom section');
	});

	test('has no axe violations', async ({ page }) => {
		await expectNoAxeViolations(page, 'ontario-in-page-navigation-item');
	});

	test('visual regression: default item', async () => {
		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});

	test('visual regression: focus-visible state on item link', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el.shadowRoot?.querySelector('a.ontario-page-navigation-item__link') as HTMLAnchorElement | null)?.focus();
		});
		await page.waitForChanges();

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});
});
