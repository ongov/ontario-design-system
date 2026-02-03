import { test, expect, Page, Locator } from '@playwright/test';
import { startListeningForAccordionChanges, getLastAccordionChangeEvent } from './utils/accordion-events';

// ----- Small locator helpers (keep tests readable) -----
const getAccordion = (page: Page, id: string) => page.locator(id);
const getExpandAllButton = (accordion: Locator) => accordion.locator('.ontario-accordion__button--expand-all');
const getAccordionItems = (accordion: Locator) => accordion.locator('.ontario-accordion');
const getAccordionItem = (accordion: Locator, index: number) => getAccordionItems(accordion).nth(index);
const getAccordionItemToggle = (accordionItem: Locator) => accordionItem.locator('.ontario-accordion__button');
const getAccordionItemHeading = (accordionItem: Locator) => accordionItem.locator('.ontario-accordion__heading');
const getAccordionItemContent = (accordionItem: Locator) => accordionItem.locator('.ontario-accordion__content');

test.describe('Ontario Accordion', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-accordion');
	});

	// -----------------------------
	// Test for default rendering
	// -----------------------------
	test('should display the accordion items when `accordionData` is provided', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-name-variant');

		// Items exist
		await expect(getAccordionItems(accordion)).toHaveCount(2);

		// Labels exist on toggles
		const firstAccordionItem = getAccordionItem(accordion, 0);
		const secondAccordionItem = getAccordionItem(accordion, 1);

		await expect(getAccordionItemToggle(firstAccordionItem)).toContainText('Accordion 1');
		await expect(getAccordionItemToggle(secondAccordionItem)).toContainText('Accordion 2');
	});

	test('should display the "Expand all" button by default', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-name-variant');
		const expandAllButton = getExpandAllButton(accordion);

		await expect(expandAllButton).toBeVisible();
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'false');
		await expect(expandAllButton).toContainText('Expand all');
	});

	test('should display all accordion items as open when `isOpen` is true for every item', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-open-variant');

		const accordionItems = await getAccordionItems(accordion).all();
		await expect(getAccordionItems(accordion)).toHaveCount(2);

		for (const item of accordionItems) {
			await expect(item).toHaveClass(/open/);
			await expect(getAccordionItemHeading(item)).toHaveClass(/ontario-expander--active/);
			await expect(getAccordionItemToggle(item)).toHaveAttribute('aria-expanded', 'true');
			await expect(getAccordionItemContent(item)).toHaveAttribute('aria-hidden', 'false');
		}
	});

	test('should display all accordion items as closed when `isOpen` is false for every item', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');

		const accordionItems = await getAccordionItems(accordion).all();
		await expect(getAccordionItems(accordion)).toHaveCount(2);

		for (const item of accordionItems) {
			await expect(item).not.toHaveClass(/open/);
			await expect(getAccordionItemHeading(item)).not.toHaveClass(/ontario-expander--active/);
			await expect(getAccordionItemToggle(item)).toHaveAttribute('aria-expanded', 'false');
			await expect(getAccordionItemContent(item)).toHaveAttribute('aria-hidden', 'true');
		}
	});

	// -----------------------------
	// Test for aria-attributes
	// -----------------------------
	test('should have a button with `aria-controls` and `aria-expanded` for each accordion item', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-name-variant');

		const accordionItems = await getAccordionItems(accordion).all();
		for (const item of accordionItems) {
			const accordionToggle = getAccordionItemToggle(item);

			await expect(accordionToggle).toHaveAttribute('aria-expanded', /true|false/);
			await expect(accordionToggle).toHaveAttribute('aria-controls', /ontario-accordion-/);
		}
	});

	test('should set the content region `aria-labelledby` to the toggle button id', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-name-variant');
		const firstAccordionItem = getAccordionItem(accordion, 0);

		const accordionToggle = getAccordionItemToggle(firstAccordionItem);
		const accordionContent = getAccordionItemContent(firstAccordionItem);

		const accordionButtonId = await accordionToggle.getAttribute('id');
		expect(accordionButtonId).toBeTruthy();

		await expect(accordionContent).toHaveAttribute('aria-labelledby', accordionButtonId!);
		await expect(accordionContent).toHaveAttribute('role', 'region');
	});

	// -----------------------------
	// Test for interactions
	// -----------------------------
	test('should expand the first accordion item when its toggle is clicked', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		const firstAccordionItem = getAccordionItem(accordion, 0);

		await getAccordionItemToggle(firstAccordionItem).click();

		await expect(firstAccordionItem).toHaveClass(/open/);
		await expect(getAccordionItemToggle(firstAccordionItem)).toHaveAttribute('aria-expanded', 'true');
		await expect(getAccordionItemContent(firstAccordionItem)).toHaveAttribute('aria-hidden', 'false');
	});

	test('should collapse the first accordion item when its toggle is clicked again', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		const firstAccordionItem = getAccordionItem(accordion, 0);

		// open
		await getAccordionItemToggle(firstAccordionItem).click();

		// close
		await getAccordionItemToggle(firstAccordionItem).click();

		await expect(firstAccordionItem).not.toHaveClass(/open/);
		await expect(getAccordionItemToggle(firstAccordionItem)).toHaveAttribute('aria-expanded', 'false');
		await expect(getAccordionItemContent(firstAccordionItem)).toHaveAttribute('aria-hidden', 'true');
	});

	test('should expand all accordion items when the "Expand all" button is clicked', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		const expandAllButton = getExpandAllButton(accordion);

		await expandAllButton.click();

		const accordionItems = await getAccordionItems(accordion).all();
		for (const item of accordionItems) {
			await expect(item).toHaveClass(/open/);
			await expect(getAccordionItemToggle(item)).toHaveAttribute('aria-expanded', 'true');
			await expect(getAccordionItemContent(item)).toHaveAttribute('aria-hidden', 'false');
		}
	});

	test('should collapse all accordion items when the "Collapse all" button is clicked', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		const expandAllButton = getExpandAllButton(accordion);

		// expand all
		await expandAllButton.click();

		// collapse all
		await expandAllButton.click();

		const accordionItems = await getAccordionItems(accordion).all();
		for (const item of accordionItems) {
			await expect(item).not.toHaveClass(/open/);
			await expect(getAccordionItemToggle(item)).toHaveAttribute('aria-expanded', 'false');
			await expect(getAccordionItemContent(item)).toHaveAttribute('aria-hidden', 'true');
		}
	});

	// -----------------------------
	// Test for expand/collapse button label behaviour
	// -----------------------------
	test('should show "Expand all" when not all items are open, and "Collapse all" when all items are open', async ({
		page,
	}) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		const expandAllButton = getExpandAllButton(accordion);

		// Initial: none open => Expand All
		await expect(expandAllButton).toContainText('Expand all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'false');

		// Open one item => still not all open => Expand All
		await getAccordionItemToggle(getAccordionItem(accordion, 0)).click();
		await expect(expandAllButton).toContainText('Expand all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'false');

		// Open second item => all open => Collapse All
		await getAccordionItemToggle(getAccordionItem(accordion, 1)).click();
		await expect(expandAllButton).toContainText('Collapse all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'true');

		// Close one item => not all open anymore => back to Expand All
		await getAccordionItemToggle(getAccordionItem(accordion, 0)).click();
		await expect(expandAllButton).toContainText('Expand all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'false');
	});

	test('should show custom expand/collapse labels when `expandCollapseButton` labels are provided', async ({
		page,
	}) => {
		const accordion = getAccordion(page, '#ontario-accordion-custom-expand-collapse');
		const expandAllButton = getExpandAllButton(accordion);

		await expect(expandAllButton).toContainText('Open all accordions');

		await expandAllButton.click();
		await expect(expandAllButton).toContainText('Close all accordions');

		// Close one accordion item -> should switch back to "Open all accordions"
		await getAccordionItemToggle(getAccordionItem(accordion, 0)).click();
		await expect(expandAllButton).toContainText('Open all accordions');
	});

	// -----------------------------
	// Test for event emission
	// -----------------------------
	test('should emit `accordionChange` with reason `toggle-one` when a single item is toggled', async ({ page }) => {
		await startListeningForAccordionChanges(page, {
			within: '[id="ontario-accordion-closed-variant"]',
		});

		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		await getAccordionItemToggle(getAccordionItem(accordion, 1)).click();

		const lastEvent = await getLastAccordionChangeEvent(page);
		expect(lastEvent).toEqual(
			expect.objectContaining({
				reason: 'toggle-one',
				changedIndex: 1,
			}),
		);
		expect(lastEvent.openIndexes).toEqual(expect.arrayContaining([1]));
	});

	test('should emit `accordionChange` with reason `toggle-all` when Expand all is clicked', async ({ page }) => {
		await startListeningForAccordionChanges(page, {
			within: '[id="ontario-accordion-closed-variant"]',
		});

		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		await getExpandAllButton(accordion).click();

		const lastEvent = await getLastAccordionChangeEvent(page);
		expect(lastEvent).toEqual(
			expect.objectContaining({
				reason: 'toggle-all',
				isBulk: true,
			}),
		);
		expect(lastEvent.openIndexes).toEqual(expect.arrayContaining([0, 1]));
	});

	// -----------------------------
	// Test for content type handling
	// -----------------------------
	test('should render HTML content when `accordionContentType` is set to `html`', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-name-variant');
		const firstAccordionItem = getAccordionItem(accordion, 0);

		await getAccordionItemToggle(firstAccordionItem).click();

		await expect(getAccordionItemContent(firstAccordionItem).locator('ul li')).toHaveCount(3);
	});

	test('should render plain text when `accordionContentType` is set to `string`', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-closed-variant');
		const firstAccordionItem = getAccordionItem(accordion, 0);

		await getAccordionItemToggle(firstAccordionItem).click();

		await expect(getAccordionItemContent(firstAccordionItem)).toContainText('We choose to go to the moon.');
		await expect(getAccordionItemContent(firstAccordionItem).locator('ul')).toHaveCount(0);
	});

	// -----------------------------
	// Test for edge / negative cases
	// -----------------------------
	test('should render no accordion items when `accordionData` is invalid JSON', async ({ page }) => {
		const accordion = page.locator('#ontario-accordion-invalid-data');

		// If parsing fails, component should not crash — it should render 0 items
		await expect(accordion.locator('.ontario-accordion')).toHaveCount(0);

		// Controls still render (fails gracefully)
		await expect(accordion.locator('button.ontario-accordion__button--expand-all')).toBeVisible();
	});

	test('should render no accordion items when `accordionData` is empty', async ({ page }) => {
		const accordion = getAccordion(page, '#ontario-accordion-empty-data');

		await expect(getAccordionItems(accordion)).toHaveCount(0);

		const expandAllButton = getExpandAllButton(accordion);
		await expect(expandAllButton).toBeVisible();
	});

	test('should default to "Expand all" / "Collapse all" when the `expandCollapseButton` prop is invalid JSON', async ({
		page,
	}) => {
		const accordion = getAccordion(page, '#ontario-accordion-invalid-expand-collapse-button');
		const expandAllButton = getExpandAllButton(accordion);

		// Initial state (not all open)
		await expect(expandAllButton).toBeVisible();
		await expect(expandAllButton).toContainText('Expand all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'false');

		// Click expand all button to open all buttons, label should flip
		await expandAllButton.click();
		await expect(expandAllButton).toContainText('Collapse all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'true');

		// Click collapse all button to close all buttons, label should flip back
		await expandAllButton.click();
		await expect(expandAllButton).toContainText('Expand all');
		await expect(expandAllButton).toHaveAttribute('aria-expanded', 'false');
	});
});
