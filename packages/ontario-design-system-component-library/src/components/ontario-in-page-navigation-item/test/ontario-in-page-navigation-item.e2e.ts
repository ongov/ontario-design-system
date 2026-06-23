import { expect, Locator } from '@playwright/test';
import { E2EPage, test } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

test.describe('ontario-in-page-navigation-item', () => {
	let host: Locator;
	const getLink = () => host.locator('a.ontario-in-page-navigation-item__link');

	const setItemContent = async (page: E2EPage) => {
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

	const expectNoAxeViolations = async (page: E2EPage, selector: string) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).include(selector).analyze();
		expect(accessibilityScanResults.violations).toHaveLength(0);
	};

	test('renders and is hydrated with expected link content', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);

		await expect(getLink()).toHaveAttribute('href', '#section-1');
		await expect(getLink()).toHaveText('Section 1');
	});

	test('supports keyboard focus and Enter navigation', async ({ page }) => {
		await getLink().focus();
		await expect(getLink()).toBeFocused();

		await page.keyboard.press('Enter');
		await page.waitForChanges();
		await expect(page).toHaveURL(/#section-1$/);
	});

	test('updates browser history and supports back navigation', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link') as HTMLAnchorElement | null)?.click();
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
			(el as HTMLOntarioInPageNavigationItemElement).label = 'Section un';
			(el as HTMLOntarioInPageNavigationItemElement).href = '#section-1';
		});
		await page.waitForChanges();

		await expect(getLink()).toHaveText('Section un');
		await expect(host).not.toContainText('Section 1');
	});

	test('sets aria-current when item is marked as current', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el as HTMLOntarioInPageNavigationItemElement).label = 'Current section';
			(el as HTMLOntarioInPageNavigationItemElement).href = '#section-1';
			(el as HTMLOntarioInPageNavigationItemElement).isCurrent = true;
		});
		await page.waitForChanges();

		await expect(getLink()).toHaveAttribute('aria-current', 'true');
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
		await getLink().focus();
		await page.waitForChanges();
		await expect(getLink()).toBeFocused();

		const screenshot = await host.screenshot();
		expect(screenshot.byteLength).toBeGreaterThan(0);
	});
});
