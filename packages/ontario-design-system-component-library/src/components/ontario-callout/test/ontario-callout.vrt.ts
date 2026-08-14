import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ontario-callout', () => {
	test('renders', async ({ page }) => {
		await page.setContent('<ontario-callout></ontario-callout>');

		const component = page.locator('ontario-callout');
		const element = component.locator('div').first();

		await expect(component).toBeVisible();
		await expect(component).toHaveClass(/hydrated/);
		await expect(element).toHaveClass(/ontario-callout/);
		await expect(element).toHaveClass(/ontario-border-highlight--teal/);
		await expect(page).toHaveScreenshot();
	});

	test.describe('render changes', () => {
		test('renders changes to the headingType property', async ({ page }) => {
			await page.setContent('<ontario-callout heading-content="Get notified"></ontario-callout>');

			const component = page.locator('ontario-callout');

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.headingType = 'h3';
			});

			await expect(component.locator('h3')).toBeVisible();
			await expect(page).toHaveScreenshot();
			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.headingType = 'h4';
			});

			await expect(component.locator('h4')).toBeVisible();
			await expect(page).toHaveScreenshot();
		});

		test('renders changes to the class names when the highlightColour is changed', async ({ page }) => {
			await page.setContent('<ontario-callout></ontario-callout>');

			const component = page.locator('ontario-callout');

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.highlightColour = 'gold';
			});

			const goldElement = component.locator('.ontario-callout');
			await expect(goldElement).toHaveClass(/ontario-border-highlight--gold/);

			await component.evaluate((el: HTMLOntarioCalloutElement) => {
				el.highlightColour = 'lime';
			});

			await expect(goldElement).toHaveClass(/ontario-border-highlight--lime/);
			await expect(page).toHaveScreenshot();
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
				el.headingContent = '#';
				el.headingContent = '<a href="#">Get notified</a>';
			});

			await expect(heading.locator('a')).toHaveText('Get notified');
			await expect(page).toHaveScreenshot();
		});
	});
});
