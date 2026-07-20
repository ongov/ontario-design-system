import { test, expect } from '@playwright/test';

test.describe('Ontario Footer - type rendering', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-footer');
	});

	test('should render the default footer wrapper for the default type', async ({ page }) => {
		const footer = page.locator('#ontario-footer-default');
		await expect(footer.locator('footer')).toHaveClass(/ontario-footer--default/);
	});

	test('should render the expanded footer wrapper for the twoColumn type', async ({ page }) => {
		const footer = page.locator('#ontario-footer-two-column');
		await expect(footer.locator('footer')).toHaveClass(/ontario-footer--expanded/);
	});

	test('should render the expanded footer wrapper for the threeColumn type', async ({ page }) => {
		const footer = page.locator('#ontario-footer-three-column');
		await expect(footer.locator('footer')).toHaveClass(/ontario-footer--expanded/);
	});
});

test.describe('Ontario Footer - links and content', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-footer');
	});

	test('should render the inline links with correct text for the default footer', async ({ page }) => {
		const footer = page.locator('#ontario-footer-default');
		const links = footer.locator('.ontario-footer__links-container--inline .ontario-footer__link');

		await expect(links).toHaveCount(3);
		await expect(links.nth(0)).toHaveText('Accessibility');
		await expect(links.nth(1)).toHaveText('Privacy');
		await expect(links.nth(2)).toHaveText('Contact');
	});

	test('should render the copyright link with the printer link href', async ({ page }) => {
		const footer = page.locator('#ontario-footer-default');
		const copyrightLink = footer.locator('.ontario-footer__copyright .ontario-footer__link');

		await expect(copyrightLink).toHaveAttribute('href', 'https://www.ontario.ca/page/copyright-information');
	});

	test('should render both column titles for the twoColumn footer', async ({ page }) => {
		const footer = page.locator('#ontario-footer-two-column');
		const headings = footer.locator('.ontario-h4');

		await expect(headings).toHaveCount(2);
		await expect(headings.nth(0)).toHaveText('Ontario Design System');
		await expect(headings.nth(1)).toHaveText('Help us improve the design system');
	});

	test('should render three column titles for the threeColumn footer', async ({ page }) => {
		const footer = page.locator('#ontario-footer-three-column');
		const headings = footer.locator('.ontario-h4');

		await expect(headings).toHaveCount(3);
		await expect(headings.nth(0)).toHaveText('Ontario Design System');
		await expect(headings.nth(1)).toHaveText('Latest release');
		await expect(headings.nth(2)).toHaveText('Help us improve the design system');
	});

	test('should render social links when provided', async ({ page }) => {
		const footer = page.locator('#ontario-footer-two-column-social');
		const socialLinks = footer.locator('.ontario-footer__links-container--social .ontario-footer__link');

		await expect(socialLinks).toHaveCount(4);
		await expect(socialLinks.nth(0)).toHaveAttribute('aria-label', 'Facebook');
		await expect(socialLinks.nth(1)).toHaveAttribute('aria-label', 'Twitter');
		await expect(socialLinks.nth(2)).toHaveAttribute('aria-label', 'Instagram');
		await expect(socialLinks.nth(3)).toHaveAttribute('aria-label', 'Youtube');
	});

	test('should not render social links when not provided', async ({ page }) => {
		const footer = page.locator('#ontario-footer-two-column');
		const socialLinks = footer.locator('.ontario-footer__links-container--social');

		await expect(socialLinks).toHaveCount(0);
	});
});

test.describe('Ontario Footer - topMargin prop', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-footer');
	});

	test('should apply the no-top-margin class when topMargin is false', async ({ page }) => {
		const footer = page.locator('#ontario-footer-no-top-margin');
		await expect(footer.locator('footer')).toHaveClass(/ontario-margin-top-0-!/);
	});

	test('should not apply the no-top-margin class by default', async ({ page }) => {
		const footer = page.locator('#ontario-footer-default');
		await expect(footer.locator('footer')).not.toHaveClass(/ontario-margin-top-0-!/);
	});
});
