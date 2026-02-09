import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

//import translations from '../../../translations/global.i18n.json' assert { type: 'json' };

/**
 * ***** DEVELOPER NOTES *****
 *
 * TESTING EVENTS
 *
 * By default, Stencil's `toHaveReceivedEventDetail({})` method will grab the details
 * from the latest fired event of the specified type.
 *
 * This is powerful, but can be cumbersome in medium to large events, especially if
 * you only care about a sub-set of values within an Event's details.
 *
 * If you only want to check a subset of event details, you can do:
 *
 * expect(eventSpy.events[eventSpy.events.length - 1].detail)
 *   .toEqual(expect.objectContaining({ changedIndex: 0 }));
 *
 */

test.describe('ontario-aside', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`
      <ontario-aside
              heading-type="h4"
              heading-content-type="string"
              heading-content="This is an aside heading"
              highlight-colour="purple"
      >
              <p>
                  As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of
                  global emissions.
              </p>
              <p><a href="#">Learn more about Canada's global missions.</a></p>
              </ontario-aside>
                  `);

		await page.waitForChanges();

		host = page.locator('ontario-aside');
	});

	test('renders and is hydrated', async () => {
		await expect(host).toBeAttached();
		await expect(host).toHaveClass('hydrated');
	});

	test('renders correct initial highlight colour', async () => {
		const aside = host;
		await expect(aside).toHaveAttribute('highlight-colour', 'purple');
	});

	test('applies and updates border-highlight class when highlight-colour changes', async ({ page }) => {
		// initial class on inner <aside>
		const hasPurple = await host.evaluate(
			(el: any) => !!el.shadowRoot?.querySelector('aside')?.classList.contains('ontario-border-highlight--purple'),
		);
		expect(hasPurple).toBe(true);

		// update prop to lime and wait for component to re-render
		await host.evaluate(() => {
			document.querySelector('ontario-aside')?.setAttribute('highlight-colour', 'lime');
		});
		await page.waitForChanges();

		const hasLime = await host.evaluate(
			(el: any) => !!el.shadowRoot?.querySelector('aside')?.classList.contains('ontario-border-highlight--lime'),
		);
		expect(hasLime).toBe(true);
	});

	test('invalid highlight-colour falls back to teal', async ({ page }) => {
		await host.evaluate(() => {
			document.querySelector('ontario-aside')?.setAttribute('highlight-colour', 'banana');
		});
		await page.waitForChanges();

		const hasTeal = await host.evaluate(
			(el: any) => !!el.shadowRoot?.querySelector('aside')?.classList.contains('ontario-border-highlight--teal'),
		);
		expect(hasTeal).toBe(true);
	});

	test('updates heading level when heading-type changes', async ({ page }) => {
		// initial heading-type is h4 per fixture
		await expect(host.locator('h4')).toHaveCount(1);

		// change heading-type to h3
		await host.evaluate(() => {
			document.querySelector('ontario-aside')?.setAttribute('heading-type', 'h3');
		});
		await page.waitForChanges();

		await expect(host.locator('h3')).toHaveCount(1);
	});

	test('renders content prop inside a paragraph when content is provided', async ({ page }) => {
		await host.evaluate(() => {
			document.querySelector('ontario-aside')?.setAttribute('content', 'This is content passed via prop');
		});
		await page.waitForChanges();

		await expect(host.locator('p').filter({ hasText: 'This is content passed via prop' })).toBeVisible();
	});

	test('updates heading content when headingContentType changes', async ({ page }) => {
		const heading = host.locator('h4');

		// Initial state (matches fixture heading-content)
		await expect(heading).toHaveText('This is an aside heading');

		// Switch to HTML content via attributes
		await host.evaluate(() => {
			const el = document.querySelector('ontario-aside') as any;
			if (el) {
				el.setAttribute('heading-content-type', 'html');
				el.setAttribute('heading-content', '<a href="#">Quick fact:</a>');
			}
		});
		await page.waitForChanges();

		const link = host.locator('h4 a');
		await expect(link).toHaveAttribute('href', '#');
		await expect(link).toHaveText('Quick fact:');
	});
});
