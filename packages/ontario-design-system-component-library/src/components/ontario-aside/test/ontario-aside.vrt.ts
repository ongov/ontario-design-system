import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';

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
		expect(page).toHaveScreenshot();
	});

	test('applies and updates border-highlight class when highlight-colour changes', async ({ page }) => {
		// initial class on inner <aside>
		const hasPurple = await host.evaluate(
			(el: Element) => !!el.shadowRoot?.querySelector('aside')?.classList.contains('ontario-border-highlight--purple'),
		);
		expect(hasPurple).toBe(true);

		// update prop to lime and wait for component to re-render

		await host.evaluate((el) => el.setAttribute('highlight-colour', 'lime'));
		await page.waitForChanges();

		const hasLime = await host.evaluate(
			(el: Element) => !!el.shadowRoot?.querySelector('aside')?.classList.contains('ontario-border-highlight--lime'),
		);
		console.log('hasLime:', hasLime);
		expect(hasLime).toBe(true);
		await expect(page).toHaveScreenshot();
	});

	test('renders content prop inside a paragraph when content is provided', async ({ page }) => {
		await host.evaluate((el) => {
			el.setAttribute('content', 'This is content passed via prop');
		});
		await page.waitForChanges();

		await expect(host.locator('p').filter({ hasText: 'This is content passed via prop' })).toBeVisible();
		await expect(page).toHaveScreenshot();
	});

	test('updates heading content when heading-content-type changes', async ({ page }) => {
		const heading = host.locator('h4');

		// Initial state (matches fixture heading-content)
		await expect(heading).toHaveText('This is an aside heading');

		// Switch to HTML content via attributes
		await host.evaluate((el: HTMLElement) => {
			el.setAttribute('heading-content-type', 'html');
			el.setAttribute('heading-content', '<a href="#">Quick fact:</a>');
		});
		await page.waitForChanges();

		const link = host.locator('h4 a');
		await expect(link).toHaveAttribute('href', '#');
		await expect(link).toHaveText('Quick fact:');
		await expect(page).toHaveScreenshot();
	});

	// ============== CSS VALIDATION TESTS ==============

	test('combines all highlight colour classes correctly', async ({ page }) => {
		const colours = ['teal', 'gold', 'yellow', 'taupe', 'green', 'lime', 'sky', 'blue', 'purple'];

		for (const colour of colours) {
			await host.evaluate((el: HTMLElement, col: string) => {
				el.setAttribute('highlight-colour', col);
			}, colour);
			await page.waitForChanges();

			const hasColourClass = await host.evaluate((el: Element, col: string) => {
				return !!el.shadowRoot?.querySelector(`aside.ontario-border-highlight--${col}`);
			}, colour);
			expect(hasColourClass).toBe(true);
			console.log(`Verified highlight colour class for: ${colour} - ${hasColourClass}`);
			await expect(page).toHaveScreenshot();
		}
	});

	test('applies teal border colour by default', async ({ page }) => {
		await host.evaluate((el: HTMLOntarioAsideElement) => {
			const newAside = document.createElement('ontario-aside');
			newAside.setAttribute('heading-type', 'h4');
			newAside.setAttribute('heading-content-type', 'string');
			newAside.setAttribute('heading-content', 'Default colour test');
			el.parentNode?.replaceChild(newAside, el);
		});
		await page.waitForChanges();

		const hasTealClass = await host.evaluate(
			(el: Element) => !!el.shadowRoot?.querySelector('aside.ontario-border-highlight--teal'),
		);
		expect(hasTealClass).toBe(true);

		// take screenshot after replacing the element to verify default teal border colour
		await expect(page).toHaveScreenshot();
	});

	test('border colour changes immediately when highlight-colour prop updates', async ({ page }) => {
		// Get initial border colour (should be purple from fixture)
		let borderColour = await host.evaluate((el: Element) => {
			const aside = el.shadowRoot?.querySelector('aside');
			if (!aside) return null;
			return window.getComputedStyle(aside).borderLeftColor;
		});
		expect(borderColour).toBeTruthy();
		const initialColour = borderColour;
		await expect(page).toHaveScreenshot();
		// Change to gold
		await host.evaluate((el) => {
			el.setAttribute('highlight-colour', 'gold');
			console.log('highlight-colour:', el.getAttribute('highlight-colour'));
		});
		await page.waitForChanges();

		borderColour = await host.evaluate((el: Element) => {
			const aside = el.shadowRoot?.querySelector('aside');
			if (!aside) return null;
			return window.getComputedStyle(aside).borderLeftColor;
		});

		// Verify the colour has changed
		expect(borderColour).not.toBe(initialColour);
		await expect(page).toHaveScreenshot();
	});

	test('border is solid left border only', async ({ page }) => {
		const borderStyles = await host.evaluate((el: Element) => {
			const aside = el.shadowRoot?.querySelector('aside');
			if (!aside) return null;
			const computedStyle = window.getComputedStyle(aside);
			return {
				borderTopWidth: computedStyle.borderTopWidth,
				borderRightWidth: computedStyle.borderRightWidth,
				borderBottomWidth: computedStyle.borderBottomWidth,
				borderLeftWidth: computedStyle.borderLeftWidth,
				borderLeftStyle: computedStyle.borderLeftStyle,
			};
		});

		// Only left border should be visible
		expect(borderStyles?.borderTopWidth).toBe('0px');
		expect(borderStyles?.borderRightWidth).toBe('0px');
		expect(borderStyles?.borderBottomWidth).toBe('0px');
		expect(borderStyles?.borderLeftWidth).not.toBe('0px');
		expect(borderStyles?.borderLeftStyle).toBe('solid');
		await expect(page).toHaveScreenshot();
	});
});
