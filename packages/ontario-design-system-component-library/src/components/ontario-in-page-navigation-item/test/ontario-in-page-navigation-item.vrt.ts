import { expect, Locator } from '@playwright/test';
import { E2EPage, test } from '@stencil/playwright';

const screenshotOptions = {
	animations: 'disabled' as const,
	caret: 'hide' as const,
	// Allow minor anti-aliasing/font raster differences across CI browsers.
	maxDiffPixelRatio: 0.012,
};

test.describe('ontario-in-page-navigation-item visual regression', () => {
	let host: Locator;
	const getLink = () => host.locator('a.ontario-in-page-navigation-item__link');

	const setHostContent = async (page: E2EPage) => {
		await page.setContent(`
			<main>
				<ol>
					<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
				</ol>
				<section id="section-1" tabindex="-1">Section 1 content</section>
			</main>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-in-page-navigation-item').first();
	};

	test.beforeEach(async ({ page }) => {
		await setHostContent(page);
	});

	test('default item', async () => {
		await expect(host).toHaveClass(/hydrated/);
		await expect(host).toHaveScreenshot(screenshotOptions);
	});

	test('focus-visible state on item link', async ({ page }) => {
		await getLink().focus();
		await page.waitForChanges();
		await expect(getLink()).toBeFocused();
		await expect(host).toHaveScreenshot(screenshotOptions);
	});
});
