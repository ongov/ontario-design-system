import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-back-button', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent('<ontario-back-button id="back-btn"></ontario-back-button>');
		await page.waitForChanges();
		host = page.locator('ontario-back-button');
	});

	test('renders and hydrates', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass(/hydrated/);
	});

	test('renders button in history mode by default', async () => {
		const button = host.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toContainText('Back');
		await expect(host.locator('a')).toHaveCount(0);
	});

	test('renders French label when language is fr', async ({ page }) => {
		await host.evaluate((el) => el.setAttribute('language', 'fr'));
		await page.waitForChanges();
		await expect(host.locator('button')).toContainText('Retour');
	});

	test('renders custom label when label prop is set', async ({ page }) => {
		await host.evaluate((el) => el.setAttribute('label', 'Go to Step 1'));
		await page.waitForChanges();
		await expect(host.locator('button')).toContainText('Go to Step 1');
	});

	test('renders href mode as anchor with href', async ({ page }) => {
		await host.evaluate((el) => {
			el.setAttribute('back-mode', 'href');
			el.setAttribute('href', '/step-1');
		});
		await page.waitForChanges();

		const anchor = host.locator('a');
		await expect(anchor).toHaveCount(1);
		await expect(anchor).toHaveAttribute('href', '/step-1');
		await expect(host.locator('button')).toHaveCount(0);
	});

	test('falls back to button when href mode has no href', async ({ page }) => {
		await host.evaluate((el) => el.setAttribute('back-mode', 'href'));
		await page.waitForChanges();

		await expect(host.locator('button')).toHaveCount(1);
		await expect(host.locator('a')).toHaveCount(0);
	});

	test('href mode anchor activates with Space key', async ({ page }) => {
		await host.evaluate((el) => {
			el.setAttribute('back-mode', 'href');
			el.setAttribute('href', '#step-1');
		});
		await page.waitForChanges();

		await page.evaluate(() => {
			(window as any).backClickCount = 0;
			document.querySelector('ontario-back-button')?.addEventListener('backClick', () => {
				(window as any).backClickCount += 1;
			});
		});

		await host.locator('a').focus();
		await page.keyboard.press('Space');

		const count = await page.evaluate(() => (window as any).backClickCount);
		expect(count).toBe(1);
	});

	test('event mode emits backClick on click', async ({ page }) => {
		await host.evaluate((el) => el.setAttribute('back-mode', 'event'));
		await page.waitForChanges();

		await page.evaluate(() => {
			(window as any).backClickCount = 0;
			document.querySelector('ontario-back-button')?.addEventListener('backClick', () => {
				(window as any).backClickCount += 1;
			});
		});

		await host.locator('button').click();

		const count = await page.evaluate(() => (window as any).backClickCount);
		expect(count).toBe(1);
	});

	test('property-assigned backMode takes precedence over href', async ({ page }) => {
		await host.evaluate((el: any) => {
			el.href = '/step-1';
			el.backMode = 'event';
		});
		await page.waitForChanges();

		await expect(host.locator('button')).toHaveCount(1);
		await expect(host.locator('a')).toHaveCount(0);

		await page.evaluate(() => {
			(window as any).backClickCount = 0;
			document.querySelector('ontario-back-button')?.addEventListener('backClick', () => {
				(window as any).backClickCount += 1;
			});
		});

		await host.locator('button').click();

		const count = await page.evaluate(() => (window as any).backClickCount);
		expect(count).toBe(1);
	});

	test('disabled button blocks event emission', async ({ page }) => {
		await host.evaluate((el) => {
			el.setAttribute('back-mode', 'event');
			el.setAttribute('disabled', 'true');
		});
		await page.waitForChanges();

		await page.evaluate(() => {
			(window as any).backClickCount = 0;
			document.querySelector('ontario-back-button')?.addEventListener('backClick', () => {
				(window as any).backClickCount += 1;
			});
		});

		await host.locator('button').click({ force: true });

		const count = await page.evaluate(() => (window as any).backClickCount);
		expect(count).toBe(0);
	});

	test('marks icon as decorative', async () => {
		const icon = host.locator('ontario-icon-chevron-left');
		await expect(icon).toHaveAttribute('aria-hidden', 'true');
	});

	test('applies disabled semantics in href mode', async ({ page }) => {
		await host.evaluate((el) => {
			el.setAttribute('back-mode', 'href');
			el.setAttribute('href', '/step-1');
			el.setAttribute('disabled', 'true');
		});
		await page.waitForChanges();

		const anchor = host.locator('a');
		await expect(anchor).toHaveAttribute('aria-disabled', 'true');
		await expect(anchor).toHaveAttribute('tabindex', '-1');
	});
});

test.describe('ontario-back-button - keyboard focus', () => {
	test('supports keyboard focus via Tab', async ({ page }) => {
		await page.setContent('<input id="first" /><ontario-back-button id="back-btn"></ontario-back-button>');
		await page.waitForChanges();

		await page.locator('#first').focus();
		await expect(page.locator('#first')).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.locator('#back-btn').locator('button')).toBeFocused();
	});
});
