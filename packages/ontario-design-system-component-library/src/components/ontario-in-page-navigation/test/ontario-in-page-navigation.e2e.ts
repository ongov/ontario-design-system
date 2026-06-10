import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-in-page-navigation', () => {
	let host: Locator;

	const setHostContent = async (page: any, hostAttributes = '') => {
		await page.setContent(`
			<main id="main-content" tabindex="-1">
				<ontario-in-page-navigation ${hostAttributes} heading="On this page" skip-link-target="main-content">
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

	const clickItemLink = async (page: any, index: number) => {
		await page
			.locator('ontario-in-page-navigation-item')
			.nth(index)
			.evaluate((el: Element) => {
				const anchor = el.shadowRoot?.querySelector('a.ontario-page-navigation-item__link') as HTMLAnchorElement | null;
				anchor?.click();
			});
		await page.waitForChanges();
	};

	test('renders and is hydrated in default variant', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);
		await expect(host.locator('.ontario-page-navigation')).not.toContainClass('ontario-page-navigation--no-top-border');
	});

	test('renders no-top-border variant', async ({ page }) => {
		await setHostContent(page);
		await host.evaluate((el: HTMLOntarioInPageNavigationElement) => {
			el.noTopBorder = true;
		});
		await page.waitForChanges();
		await expect(host.locator('.ontario-page-navigation')).toContainClass('ontario-page-navigation--no-top-border');
	});

	test('renders skip link with expected target', async () => {
		const skipLink = host.locator('.ontario-page-navigation__skip-link');
		await expect(skipLink).toHaveAttribute('href', '#main-content');
		await expect(skipLink).toHaveText('Skip this page navigation');
	});

	test('supports keyboard focus order and Enter navigation', async ({ page }) => {
		const firstItem = page.locator('ontario-in-page-navigation-item').nth(0);
		const secondItem = page.locator('ontario-in-page-navigation-item').nth(1);

		await page.evaluate(() => {
			(window as any).__lastScrollTarget = null;
			const originalScrollIntoView = Element.prototype.scrollIntoView;
			Element.prototype.scrollIntoView = function () {
				(window as any).__lastScrollTarget = (this as HTMLElement).id || null;
				return originalScrollIntoView.apply(this);
			};
		});

		await firstItem.evaluate((el) => {
			(el.shadowRoot?.querySelector('a.ontario-page-navigation-item__link') as HTMLAnchorElement | null)?.focus();
		});

		const firstFocused = await firstItem.evaluate(
			(el) => el.shadowRoot?.activeElement?.getAttribute('href') || document.activeElement?.getAttribute('href'),
		);
		expect(firstFocused).toBe('#section-1');

		await page.keyboard.press('Tab');
		const secondFocused = await secondItem.evaluate(
			(el) => el.shadowRoot?.activeElement?.getAttribute('href') || document.activeElement?.getAttribute('href'),
		);
		expect(secondFocused).toBe('#section-2');

		await page.keyboard.press('Shift+Tab');
		const firstFocusedAgain = await firstItem.evaluate(
			(el) => el.shadowRoot?.activeElement?.getAttribute('href') || document.activeElement?.getAttribute('href'),
		);
		expect(firstFocusedAgain).toBe('#section-1');

		await page.keyboard.press('Enter');
		await page.waitForChanges();

		await expect(page).toHaveURL(/#section-1$/);
		const lastScrollTarget = await page.evaluate(() => (window as any).__lastScrollTarget);
		expect(lastScrollTarget).toBe('section-1');
	});

	test('updates history state for in-page links and supports browser back navigation', async ({ page }) => {
		await clickItemLink(page, 0);
		await expect(page).toHaveURL(/#section-1$/);

		await clickItemLink(page, 1);
		await expect(page).toHaveURL(/#section-2$/);

		await page.goBack();
		await expect(page).toHaveURL(/#section-1$/);
	});

	test('renders French consumer content without English fallback strings', async ({ page }) => {
		await page.setContent(`
			<ontario-in-page-navigation skip-link-target="main-content">
				<ontario-in-page-navigation-item label="Section un" href="#section-1"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section deux" href="#section-2"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>
			<section id="section-1">Contenu un</section>
			<section id="section-2">Contenu deux</section>
		`);
		await page.waitForChanges();

		host = page.locator('ontario-in-page-navigation').first();
		await host.evaluate((el: HTMLOntarioInPageNavigationElement) => {
			el.heading = 'Dans cette page';
			el.language = 'fr';
		});
		await page.waitForChanges();

		await expect(host.locator('.ontario-page-navigation-header')).toHaveText('Dans cette page');
		await expect(host.locator('.ontario-page-navigation__skip-link')).toHaveText('Sauter cette navigation');
		await expect(host).not.toContainText('On this page');
		await expect(host).not.toContainText('Skip this page navigation');
	});

	test('has expected navigation semantics in the accessibility tree', async ({ page }) => {
		const tree = await page.accessibility.snapshot({ interestingOnly: false });
		const serializedTree = JSON.stringify(tree);

		expect(serializedTree).toContain('"role":"navigation"');
		expect(serializedTree).toContain('"name":"On this page"');
		expect(serializedTree).toContain('"name":"Section 1"');
		expect(serializedTree).toContain('"name":"Section 2"');
	});

	test('matches default visual rendering', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await expect(host).toHaveScreenshot('ontario-in-page-navigation-default.png');
	});

	test('matches no-top-border visual rendering', async ({ page }) => {
		await setHostContent(page);
		await host.evaluate((el: HTMLOntarioInPageNavigationElement) => {
			el.noTopBorder = true;
		});
		await page.waitForChanges();
		await page.setViewportSize({ width: 1280, height: 800 });
		await expect(host).toHaveScreenshot('ontario-in-page-navigation-no-top-border.png');
	});

	test('matches focus-visible state on a navigation link', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await page
			.locator('ontario-in-page-navigation-item')
			.first()
			.evaluate((el) => {
				(el.shadowRoot?.querySelector('a.ontario-page-navigation-item__link') as HTMLAnchorElement | null)?.focus();
			});
		await expect(host).toHaveScreenshot('ontario-in-page-navigation-focus-visible.png');
	});

	test('matches mobile rendering', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await expect(host).toHaveScreenshot('ontario-in-page-navigation-mobile.png');
	});

	test('matches mobile rendering with long list', async ({ page }) => {
		await page.setContent(`
			<ontario-in-page-navigation heading="On this page" skip-link-target="main-content">
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section 2" href="#section-2"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section 3" href="#section-3"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section 4" href="#section-4"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section 5" href="#section-5"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section 6" href="#section-6"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>
			<section id="section-1">Section 1 content</section>
			<section id="section-2">Section 2 content</section>
			<section id="section-3">Section 3 content</section>
			<section id="section-4">Section 4 content</section>
			<section id="section-5">Section 5 content</section>
			<section id="section-6">Section 6 content</section>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-in-page-navigation').first();

		await page.setViewportSize({ width: 375, height: 812 });
		await expect(host).toHaveScreenshot('ontario-in-page-navigation-mobile-long-list.png');
	});
});
