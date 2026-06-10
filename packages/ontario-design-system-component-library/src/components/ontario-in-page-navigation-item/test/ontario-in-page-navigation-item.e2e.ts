import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

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
		await host.evaluate((el: HTMLOntarioInPageNavigationItemElement) => {
			el.label = 'Section un';
			el.href = '#section-1';
		});
		await page.waitForChanges();

		const link = host.locator('a.ontario-page-navigation-item__link');

		await expect(link).toHaveText('Section un');
		await expect(host).not.toContainText('Section 1');
	});

	test('sets aria-current when item is marked as current', async ({ page }) => {
		await host.evaluate((el: HTMLOntarioInPageNavigationItemElement) => {
			el.label = 'Current section';
			el.href = '#section-1';
			el.isCurrent = true;
		});
		await page.waitForChanges();

		const link = host.locator('a.ontario-page-navigation-item__link');
		await expect(link).toHaveAttribute('aria-current', 'true');
	});

	test('supports custom slot content projection', async ({ page }) => {
		await host.evaluate((el: HTMLOntarioInPageNavigationItemElement) => {
			el.innerHTML = '<a class="custom-item-link" href="#section-2">Custom section</a>';
		});
		await page.waitForChanges();

		await expect(host.locator('a.custom-item-link')).toHaveAttribute('href', '#section-2');
		await expect(host.locator('a.custom-item-link')).toHaveText('Custom section');
	});

	test('has expected accessibility semantics in default variant', async ({ page }) => {
		const tree = await page.accessibility.snapshot({ interestingOnly: false });
		const serializedTree = JSON.stringify(tree);

		expect(serializedTree).toContain('"role":"link"');
		expect(serializedTree).toContain('"name":"Section 1"');
	});

	test('has expected accessibility semantics when marked current', async ({ page }) => {
		await host.evaluate((el: HTMLOntarioInPageNavigationItemElement) => {
			el.label = 'Current section';
			el.href = '#section-1';
			el.isCurrent = true;
		});
		await page.waitForChanges();

		const tree = await page.accessibility.snapshot({ interestingOnly: false });
		const serializedTree = JSON.stringify(tree);

		expect(serializedTree).toContain('"role":"link"');
		expect(serializedTree).toContain('"name":"Current section"');
		await expect(host.locator('a.ontario-page-navigation-item__link')).toHaveAttribute('aria-current', 'true');
	});
});
