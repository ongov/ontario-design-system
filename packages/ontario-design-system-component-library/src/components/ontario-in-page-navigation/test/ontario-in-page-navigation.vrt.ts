import { expect, Locator } from '@playwright/test';
import { E2EPage, test } from '@stencil/playwright';

type OntarioInPageNavigationHostElement = HTMLElement & {
	noTopBorder?: boolean;
};

const screenshotOptions = {
	animations: 'disabled' as const,
	caret: 'hide' as const,
	// Allow minor anti-aliasing/font raster differences across CI browsers.
	maxDiffPixelRatio: 0.012,
};

test.describe('ontario-in-page-navigation visual regression', () => {
	let host: Locator;

	const setHostContent = async (page: E2EPage) => {
		await page.setContent(`
			<main id="main-content" tabindex="-1">
				<ontario-in-page-navigation heading="On this page" skip-link-target="main-content">
					<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
					<ontario-in-page-navigation-item label="Section 2" href="#section-2"></ontario-in-page-navigation-item>
				</ontario-in-page-navigation>
				<section id="section-1" tabindex="-1">Section 1 content</section>
				<section id="section-2" tabindex="-1">Section 2 content</section>
			</main>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-in-page-navigation').first();
	};

	test.beforeEach(async ({ page }) => {
		await setHostContent(page);
	});

	test('default variant', async () => {
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot(screenshotOptions);
	});

	test('no-top-border variant', async ({ page }) => {
		await host.evaluate((el: Element) => {
			(el as OntarioInPageNavigationHostElement).noTopBorder = true;
		});
		await page.waitForChanges();
		await expect(host).toHaveScreenshot(screenshotOptions);
	});

	test('focus-visible state on first navigation link', async ({ page }) => {
		const firstItemLink = page
			.locator('ontario-in-page-navigation-item')
			.first()
			.locator('a.ontario-in-page-navigation-item__link');
		await firstItemLink.focus();
		await page.waitForChanges();

		await expect(host).toHaveScreenshot(screenshotOptions);
	});
});
