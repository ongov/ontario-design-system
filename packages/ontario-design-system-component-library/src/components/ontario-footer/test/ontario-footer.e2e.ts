import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

const footerLinksJson = JSON.stringify({
	accessibilityLink: { text: 'Accessibility', href: 'https://www.ontario.ca/page/accessibility' },
	privacyLink: { href: 'https://www.ontario.ca/page/privacy-statement' },
	contactLink: { text: 'Contact', href: 'https://www.ontario.ca/feedback/contact-us' },
	printerLink: { href: 'https://www.ontario.ca/page/copyright-information' },
});

const twoColumnOptionsJson = JSON.stringify({
	column1: {
		title: 'Ontario Design System',
		content: [{ type: 'text', text: 'The Ontario Design System provides principles, guidance and code.' }],
	},
	column2: {
		title: 'Help us improve the design system',
		content: [{ type: 'html', html: 'You can check our <a href="#">help and feedback page</a>.' }],
		button: { text: 'Send us an email', link: '#' },
	},
});

const threeColumnOptionsJson = JSON.stringify({
	column1: {
		title: 'Ontario Design System',
		content: [{ type: 'text', text: 'The Ontario Design System provides principles, guidance and code.' }],
	},
	column2: {
		title: 'Latest release',
		content: [{ type: 'list', list: ['Built on: June 3, 2022', 'Distribution package version 0.12.10'] }],
	},
	column3: {
		title: 'Help us improve the design system',
		content: [{ type: 'html', html: 'You can check our <a href="#">help and feedback page</a>.' }],
		button: { text: 'Send us an email', link: '#' },
	},
});

const socialLinksJson = JSON.stringify({
	facebook: 'https://www.facebook.com/ONgov',
	twitter: 'https://twitter.com/ONgov',
	instagram: 'https://www.instagram.com/ongov',
	youtube: 'https://www.youtube.com/ongov',
});

test.describe('ontario-footer - default type', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-footer type="default" footer-links='${footerLinksJson}'></ontario-footer>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-footer');
	});

	test('renders and is hydrated', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders the default footer wrapper', async () => {
		const footer = host.locator('footer');
		await expect(footer).toHaveClass(/ontario-footer--default/);
	});

	test('renders the inline links with correct text', async () => {
		const links = host.locator('.ontario-footer__links-container--inline .ontario-footer__link');
		await expect(links).toHaveCount(3);
		await expect(links.nth(0)).toHaveText('Accessibility');
		await expect(links.nth(1)).toHaveText('Privacy');
		await expect(links.nth(2)).toHaveText('Contact');
	});

	test('renders the copyright link using the printer link href', async () => {
		const copyrightLink = host.locator('.ontario-footer__copyright .ontario-footer__link');
		await expect(copyrightLink).toHaveAttribute('href', 'https://www.ontario.ca/page/copyright-information');
	});
});

test.describe('ontario-footer - topMargin prop', () => {
	test('applies the no-top-margin class when topMargin is false', async ({ page }) => {
		await page.setContent(`
			<ontario-footer type="default" top-margin="false" footer-links='${footerLinksJson}'></ontario-footer>
		`);
		await page.waitForChanges();

		const footer = page.locator('ontario-footer footer');
		await expect(footer).toHaveClass(/ontario-margin-top-0-!/);
	});
});

test.describe('ontario-footer - twoColumn type', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-footer
				type="twoColumn"
				footer-links='${footerLinksJson}'
				two-column-options='${twoColumnOptionsJson}'
			></ontario-footer>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-footer');
	});

	test('renders the expanded footer wrapper', async () => {
		const footer = host.locator('footer');
		await expect(footer).toHaveClass(/ontario-footer--expanded/);
	});

	test('renders both column titles', async () => {
		const headings = host.locator('.ontario-h4');
		await expect(headings).toHaveCount(2);
		await expect(headings.nth(0)).toHaveText('Ontario Design System');
		await expect(headings.nth(1)).toHaveText('Help us improve the design system');
	});

	test('renders the inline links in the expanded bottom section', async () => {
		const links = host.locator('.ontario-footer__links-container--inline .ontario-footer__link');
		await expect(links).toHaveCount(3);
	});
});

test.describe('ontario-footer - twoColumn type with social links', () => {
	test('renders social links in the second column', async ({ page }) => {
		await page.setContent(`
			<ontario-footer
				type="twoColumn"
				footer-links='${footerLinksJson}'
				social-links='${socialLinksJson}'
				two-column-options='${twoColumnOptionsJson}'
			></ontario-footer>
		`);
		await page.waitForChanges();

		const socialLinks = page.locator('ontario-footer .ontario-footer__links-container--social .ontario-footer__link');
		await expect(socialLinks).toHaveCount(4);
		await expect(socialLinks.nth(0)).toHaveAttribute('aria-label', 'Facebook');
		await expect(socialLinks.nth(1)).toHaveAttribute('aria-label', 'Twitter');
		await expect(socialLinks.nth(2)).toHaveAttribute('aria-label', 'Instagram');
		await expect(socialLinks.nth(3)).toHaveAttribute('aria-label', 'Youtube');
	});
});

test.describe('ontario-footer - threeColumn type', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-footer
				type="threeColumn"
				footer-links='${footerLinksJson}'
				social-links='${socialLinksJson}'
				three-column-options='${threeColumnOptionsJson}'
			></ontario-footer>
		`);
		await page.waitForChanges();
		host = page.locator('ontario-footer');
	});

	test('renders the expanded footer wrapper', async () => {
		const footer = host.locator('footer');
		await expect(footer).toHaveClass(/ontario-footer--expanded/);
	});

	test('renders three column titles', async () => {
		const headings = host.locator('.ontario-h4');
		await expect(headings).toHaveCount(3);
		await expect(headings.nth(0)).toHaveText('Ontario Design System');
		await expect(headings.nth(1)).toHaveText('Latest release');
		await expect(headings.nth(2)).toHaveText('Help us improve the design system');
	});

	test('renders social links in the third column', async () => {
		const socialLinks = host.locator('.ontario-footer__links-container--social .ontario-footer__link');
		await expect(socialLinks).toHaveCount(4);
	});
});

test.describe('ontario-footer - accessibility', () => {
	test('has no accessibility violations for the default footer', async ({ page }) => {
		await page.setContent(`
			<ontario-footer type="default" footer-links='${footerLinksJson}'></ontario-footer>
		`);
		await page.waitForChanges();

		const { AxeBuilder } = await import('@axe-core/playwright');
		const results = await new AxeBuilder({ page }).include('ontario-footer').analyze();
		expect(results.violations).toEqual([]);
	});
});
