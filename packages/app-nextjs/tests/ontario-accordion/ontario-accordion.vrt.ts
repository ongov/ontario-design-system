import { test, expect } from '@playwright/test';

test.describe('Ontario Accordion - default states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-accordion');
	});

	test('name prop variant - default state', async ({ page }) => {
		const accordionExample = await page.locator('#ontario-accordion-name-variant');

		await expect(accordionExample).toHaveScreenshot('ontarioAccordion-name-default.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('isOpen prop variant - default state', async ({ page }) => {
		const accordionExample = await page.locator('#ontario-accordion-open-variant');

		await expect(accordionExample).toHaveScreenshot('ontarioAccordion-open-initial.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Accordion - interaction states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-accordion');
	});

	test('closed variant - first item expanded state', async ({ page }) => {
		const accordionExample = await page.locator('#ontario-accordion-closed-variant');

		// click first accordion item toggle
		const firstItemToggle = await accordionExample.locator('.ontario-accordion__button').first();
		await firstItemToggle.click();

		await expect(accordionExample).toHaveScreenshot('ontarioAccordion-closed-first-open.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('closed variant - second item expanded state', async ({ page }) => {
		const accordionExample = await page.locator('#ontario-accordion-closed-variant');

		// click first accordion item toggle
		const secondItemToggle = await accordionExample.locator('.ontario-accordion__button').nth(1);
		await secondItemToggle.click();

		await expect(accordionExample).toHaveScreenshot('ontarioAccordion-closed-second-open.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('custom expand/collapse labels - expand all state', async ({ page }) => {
		const accordion = page.locator('#ontario-accordion-custom-expand-collapse');
		const expandCollapseAllButton = accordion.locator('button.ontario-accordion__button--expand-all');

		await expandCollapseAllButton.click();

		await expect(accordion).toHaveScreenshot('ontarioAccordionCustom-expandAll.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});

	test('custom expand/collapse labels - collapse all state', async ({ page }) => {
		const accordion = page.locator('#ontario-accordion-custom-expand-collapse');
		const expandCollapseAllButton = accordion.locator('button.ontario-accordion__button--expand-all');

		// Expand all -> then collapse all (so we capture the "collapse all" state after toggling back)
		await expandCollapseAllButton.click();
		await expandCollapseAllButton.click();

		await expect(accordion).toHaveScreenshot('ontarioAccordionCustom-collapseAll.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});

test.describe('Ontario Accordion - focus states', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-accordion');
	});

	test('focus state - expand/collapse all button', async ({ page }) => {
		const accordionExample = await page.locator('#ontario-accordion-name-variant');
		const expandAllButton = accordionExample.locator('button.ontario-accordion__button--expand-all');

		await expandAllButton.focus();

		await expect(accordionExample).toHaveScreenshot('ontarioAccordion-expandAll-focus.png', {
			animations: 'disabled',
			caret: 'hide',
		});
	});
});
