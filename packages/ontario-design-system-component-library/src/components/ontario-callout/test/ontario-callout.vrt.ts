import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

test.describe('ontario-callout', () => {
	test('renders', async ({ page }) => {
		await page.setContent('<ontario-callout></ontario-callout>');

		const component = page.locator('ontario-callout');
		const element = component.locator('div').first();

		await expect(component).toBeVisible();
		await expect(component).toHaveClass(/hydrated/);
		await expect(element).toHaveClass(/ontario-callout/);
		await expect(element).toHaveClass(/ontario-border-highlight--teal/);
		await expectVrtScreenshot(component);
	});

	test.describe('render changes', () => {
		test('renders changes to the headingType property', async ({ page }) => {
			await page.setContent('<ontario-callout heading-content="Get notified"></ontario-callout>');

			const component = page.locator('ontario-callout');

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.headingType = 'h3';
			});

			await expect(component.locator('h3')).toBeVisible();
			await expectVrtScreenshot(component);
			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.headingType = 'h4';
			});

			await expect(component.locator('h4')).toBeVisible();
			await expectVrtScreenshot(component);
		});

		test('renders changes to the class names when the highlightColour is changed', async ({ page }) => {
			await page.setContent('<ontario-callout></ontario-callout>');

			const component = page.locator('ontario-callout');

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.highlightColour = 'gold';
			});

			const goldElement = component.locator('.ontario-callout');
			await expect(goldElement).toHaveClass(/ontario-border-highlight--gold/);
			await expectVrtScreenshot(component);

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.highlightColour = 'lime';
			});

			await expect(goldElement).toHaveClass(/ontario-border-highlight--lime/);
			await expectVrtScreenshot(component);
		});

		test('renders changes to the HTML through the headingContentType property', async ({ page }) => {
			await page.setContent('<ontario-callout></ontario-callout>');

			const component = page.locator('ontario-callout');

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.headingContentType = 'string';
				el.headingContent = 'Get notified';
			});

			const heading = component.locator('h2');

			await expect(heading).toHaveText('Get notified');
			await expect(heading).toHaveClass(/ontario-callout__title/);

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.headingContentType = 'html';
				el.headingContent = '<a href="#">Get notified</a>';
			});

			await expect(heading.locator('a')).toHaveText('Get notified');
			await expectVrtScreenshot(component);
		});
	});

	test.describe('content', () => {
		test('renders content passed through the content property', async ({ page }) => {
			await page.setContent(
				withGlobalStyles(
					'<ontario-callout heading-content="Get notified" content="Sign up to get an email when this service changes, so you always have the latest information."></ontario-callout>',
				),
			);

			const component = page.locator('ontario-callout');

			await expect(component.locator('p')).toHaveText(/Sign up to get an email/);
			await expectVrtScreenshot(component);
		});

		test('renders slotted paragraphs and links as the content', async ({ page }) => {
			await page.setContent(
				withGlobalStyles(`
					<ontario-callout heading-content="Get notified">
						<p>Sign up to get an email when this service changes.</p>
						<p>You can <a href="#">change your preferences</a> at any time.</p>
					</ontario-callout>
				`),
			);

			const component = page.locator('ontario-callout');

			await expect(component.locator('p')).toHaveCount(2);
			await expectVrtScreenshot(component);
		});
	});
});
