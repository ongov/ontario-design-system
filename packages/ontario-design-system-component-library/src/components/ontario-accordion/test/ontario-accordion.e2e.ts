import { expect, Locator } from '@playwright/test';
import { test, EventSpy } from '@stencil/playwright';

import translations from '../../../translations/global.i18n.json' assert { type: 'json' };

/**
 * ***** DEVELOPER NOTES *****
 *
 * TESTING EVENTS
 *
 * By default, Stencil's `toHaveReceivedEventDetail({})` method will grab the details from the latest fired event of the specified type.
 * However, it is also a strict deep check against the Event object, meaning you need to pass in every expected field and value within the Event.
 *
 * e.g.
 *
 * await expect(eventSpy).toHaveReceivedEventDetail({
 * 	openIndexes: [],
 * 	isBulk: true,
 * 	reason: 'toggle-all',
 * });
 *
 * This is powerful, but can be cumbersome in medium to large events, especially if you only care about a sub-set of values within an Event's details.
 *
 * Due to the `accordionChange` event not being overly large, this is the method used for checking against Events in this test suite.
 *
 * However, if you are only interested in checking a subset of the Event details, you can do so outside of Stencil's built in helper.
 *
 * e.g.
 *
 * `expect(eventSpy.events[`${event_index}`].detail).toEqual(expect.objectContaining({ changedIndex: 0 }));`
 *
 * This is flexible but does have a drawback - you have to manually specify the event index you are checking against (see the `${event_index}` value that acts as a placeholder indicator).
 *
 * To make this a little easier, you could grab the index with a line like:
 *
 * (eventSpy.events.length - 1)
 *
 * Or, if you want something cleaner, you'd need to make a custom helper.
 *
 */

test.describe('ontario-accordion', () => {
	let host: Locator;
	let eventSpy: EventSpy;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<ontario-accordion
				title="My Accordion"
				accordion-data='[
					{"label": "Accordion data 1", "content": "Example content 1"},
					{"label": "Accordion data 2", "content": "Example content 2"},
					{"label": "Accordion data 3", "content": "Example content 3"}
				]'
			></ontario-accordion>
		`);

		await page.waitForChanges();

		host = page.locator('ontario-accordion').first();

		// Spy on the event (Stencil spies listen at the page level and handle shadow nicely)
		eventSpy = await page.spyOnEvent('accordionChange');
	});

	test('renders and is hydrated', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('initial DOM states', async () => {
		const accordionElements = await host.locator('.ontario-accordion').all();
		const groupToggle = await host.locator('.ontario-accordion__button--expand-all').first();

		await expect(groupToggle).toHaveAttribute('aria-expanded', 'false');
		await expect(groupToggle).toHaveText(translations.accordion.expand['en']);

		for (const accordionElement of accordionElements) {
			const accordionHeading = await accordionElement.locator('h3.ontario-accordion__heading');
			const accordionToggleBtn = await accordionElement.locator('button.ontario-accordion__button');
			const accordionContent = await accordionElement.locator('section.ontario-accordion__content');

			await expect(accordionElement).not.toContainClass('open');
			await expect(accordionHeading).not.toContainClass('ontario-expander--active');
			await expect(accordionToggleBtn).toHaveAttribute('aria-expanded', 'false');

			await expect(accordionContent).toHaveAttribute('aria-hidden', 'true');
			await expect(accordionContent).toContainClass('ontario-accordion__content--closed');
			await expect(accordionContent).not.toContainClass('ontario-expander__content--opened');
		}
	});

	test('expands and collapses first accordion element', async ({ page }) => {
		const firstElement = host.locator('.ontario-accordion').first();
		const firstElementHeading = firstElement.locator('h3.ontario-accordion__heading');
		const firstElementToggleBtn = firstElement.locator('button.ontario-accordion__button');
		const firstElementContent = firstElement.locator('section.ontario-accordion__content');

		/********** TEST SINGLE ACCORDION EXPAND **********/

		// Click to expand
		await firstElementToggleBtn.click();
		await page.waitForChanges();

		// Confirm the accordionChange event fired
		await expect(eventSpy).toHaveReceivedEvent();

		// Confirm the accordionChange event details
		await expect(eventSpy).toHaveReceivedEventDetail({
			openIndexes: [0],
			changedIndex: 0,
			reason: 'toggle-one',
		});

		// Verify after click that "open" values change as expected
		await expect(firstElementToggleBtn).toHaveAttribute('aria-expanded', 'true');
		await expect(firstElementHeading).toContainClass('ontario-expander--active');
		await expect(firstElement).toContainClass('open');

		await expect(firstElementContent).toHaveAttribute('aria-hidden', 'false');
		await expect(firstElementContent).toContainClass('ontario-expander__content--opened');
		await expect(firstElementContent).not.toContainClass('ontario-accordion__content--closed');

		/********** TEST SINGLE ACCORDION COLLAPSE **********/

		// Click to collapse
		await firstElementToggleBtn.click();
		await page.waitForChanges();

		// Confirm the accordionChange event fired
		await expect(eventSpy).toHaveReceivedEvent();

		// Confirm the accordionChange event details
		await expect(eventSpy).toHaveReceivedEventDetail({
			openIndexes: [],
			changedIndex: 0,
			reason: 'toggle-one',
		});

		// Verify after click that "closed" values change as expected
		await expect(firstElementToggleBtn).toHaveAttribute('aria-expanded', 'false');
		await expect(firstElementHeading).not.toContainClass('ontario-expander--active');
		await expect(firstElement).not.toContainClass('open');

		await expect(firstElementContent).toHaveAttribute('aria-hidden', 'true');
		await expect(firstElementContent).toContainClass('ontario-accordion__content--closed');
		await expect(firstElementContent).not.toContainClass('ontario-expander__content--opened');
	});

	test('expands and collapses all accordion elements', async ({ page }) => {
		const accordionElements = await host.locator('.ontario-accordion').all();
		const groupToggle = await host.locator('.ontario-accordion__button--expand-all').first();

		/********** TEST ALL ACCORDIONS EXPAND **********/

		// Click to expand
		await groupToggle.click();
		await page.waitForChanges();

		// Verify after click that "open" values change as expected
		await expect(groupToggle).toHaveAttribute('aria-expanded', 'true');
		await expect(groupToggle).toHaveText(translations.accordion.collapse['en']);

		for (const accordionElement of accordionElements) {
			const accordionElementHeading = await accordionElement.locator('h3.ontario-accordion__heading');
			const accordionElementToggleBtn = await accordionElement.locator('button.ontario-accordion__button');
			const accordionElementContent = await accordionElement.locator('section.ontario-accordion__content');

			await expect(accordionElement).toContainClass('open');
			await expect(accordionElementHeading).toContainClass('ontario-expander--active');
			await expect(accordionElementToggleBtn).toHaveAttribute('aria-expanded', 'true');

			await expect(accordionElementContent).toHaveAttribute('aria-hidden', 'false');
			await expect(accordionElementContent).toContainClass('ontario-expander__content--opened');
			await expect(accordionElementContent).not.toContainClass('ontario-accordion__content--closed');
		}

		// Confirm the accordionChange event fired
		await expect(eventSpy).toHaveReceivedEvent();

		// Confirm the accordionChange event details
		await expect(eventSpy).toHaveReceivedEventDetail({
			openIndexes: [0, 1, 2],
			isBulk: true,
			reason: 'toggle-all',
		});

		/********** TEST ALL ACCORDIONS COLLAPSE **********/

		// Click to collapse
		await groupToggle.click();
		await page.waitForChanges();

		// Verify after click that "closed" values change as expected
		await expect(groupToggle).toHaveAttribute('aria-expanded', 'false');
		await expect(groupToggle).toHaveText(translations.accordion.expand['en']);

		for (const accordionElement of accordionElements) {
			const accordionElementHeading = await accordionElement.locator('h3.ontario-accordion__heading');
			const accordionElementToggleBtn = await accordionElement.locator('button.ontario-accordion__button');
			const accordionElementContent = await accordionElement.locator('section.ontario-accordion__content');

			await expect(accordionElement).not.toContainClass('open');
			await expect(accordionElementHeading).not.toContainClass('ontario-expander--active');
			await expect(accordionElementToggleBtn).toHaveAttribute('aria-expanded', 'false');

			await expect(accordionElementContent).toHaveAttribute('aria-hidden', 'true');
			await expect(accordionElementContent).toContainClass('ontario-accordion__content--closed');
			await expect(accordionElementContent).not.toContainClass('ontario-expander__content--opened');
		}

		// Confirm the accordionChange event fired
		await expect(eventSpy).toHaveReceivedEvent();

		// Confirm the accordionChange event details
		await expect(eventSpy).toHaveReceivedEventDetail({
			openIndexes: [],
			isBulk: true,
			reason: 'toggle-all',
		});
	});
});
