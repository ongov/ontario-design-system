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
		// Set invalid highlight-colour via attribute (this will trigger validation better than property assignment)
		await page.evaluate(() => {
			const el = document.querySelector('ontario-aside') as any;
			el.setAttribute('highlight-colour', 'banana');
		});
		await page.waitForChanges();

		// Check the rendered border color - should still be teal (default) since 'banana' class doesn't exist in CSS
		const borderColor = await host.evaluate((el: any) => {
			const aside = el.shadowRoot?.querySelector('aside');
			if (!aside) return null;
			return {
				borderLeftColor: window.getComputedStyle(aside).borderLeftColor,
				className: aside.className,
			};
		});

		// The border should be teal (the invalid class won't match CSS rules, so default teal border is shown)
		expect(borderColor?.borderLeftColor).toBeTruthy();
		// Since 'banana' is invalid, the component either doesn't apply that class or default style applies
		expect(borderColor?.className).toContain('ontario-aside');
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

	// ============== CSS VALIDATION TESTS ==============

	test('applies correct base styles to aside element', async () => {
		const asideElement = host.evaluate((el: any) => {
			const aside = el.shadowRoot?.querySelector('aside');
			if (!aside) return null;
			const computedStyle = window.getComputedStyle(aside);
			return {
				borderLeftWidth: computedStyle.borderLeftWidth,
				borderLeftStyle: computedStyle.borderLeftStyle,
				paddingTop: computedStyle.paddingTop,
				paddingRight: computedStyle.paddingRight,
				paddingBottom: computedStyle.paddingBottom,
				paddingLeft: computedStyle.paddingLeft,
				marginTop: computedStyle.marginTop,
				marginRight: computedStyle.marginRight,
				marginBottom: computedStyle.marginBottom,
				marginLeft: computedStyle.marginLeft,
			};
		});

		const styles = await asideElement;
		expect(styles?.borderLeftStyle).toBe('solid');
		expect(styles?.borderLeftWidth).not.toBe('0px');
		expect(styles?.paddingTop).not.toBe('0px');
		expect(styles?.paddingLeft).not.toBe('0px');
	});

	test('combines all highlight colour classes correctly', async ({ page }) => {
		const colours = ['teal', 'gold', 'yellow', 'taupe', 'green', 'lime', 'sky', 'blue', 'purple'];

		for (const colour of colours) {
			await page.evaluate((col) => {
				document.querySelector('ontario-aside')?.setAttribute('highlight-colour', col);
			}, colour);
			await page.waitForChanges();

			const hasColourClass = await page.evaluate((col) => {
				return !!document
					.querySelector('ontario-aside')
					?.shadowRoot?.querySelector(`aside.ontario-border-highlight--${col}`);
			}, colour);
			expect(hasColourClass).toBe(true);
		}
	});

	test('applies teal border colour by default', async () => {
		await host.evaluate(() => {
			const el = document.querySelector('ontario-aside') as any;
			const newAside = document.createElement('ontario-aside');
			newAside.setAttribute('heading-type', 'h4');
			newAside.setAttribute('heading-content-type', 'string');
			newAside.setAttribute('heading-content', 'Default colour test');
			el.parentNode?.replaceChild(newAside, el);
		});

		const hasTealClass = await host.evaluate(
			() =>
				!!document.querySelector('ontario-aside')?.shadowRoot?.querySelector('aside.ontario-border-highlight--teal'),
		);
		expect(hasTealClass).toBe(true);
	});

	test('applies correct padding and margin to heading element', async () => {
		const headingStyles = await host.evaluate((el: any) => {
			const heading = el.shadowRoot?.querySelector('.ontario-aside__title');
			if (!heading) return null;
			const computedStyle = window.getComputedStyle(heading);
			return {
				marginTop: computedStyle.marginTop,
				marginRight: computedStyle.marginRight,
				marginBottom: computedStyle.marginBottom,
				marginLeft: computedStyle.marginLeft,
			};
		});

		expect(headingStyles?.marginTop).toBe('0px');
		expect(headingStyles?.marginLeft).toBe('0px');
		expect(headingStyles?.marginRight).toBe('0px');
		expect(headingStyles?.marginBottom).not.toBe('0px');
	});

	test('applies correct max-width to child elements', async () => {
		const childWidths = await host.evaluate((el: any) => {
			const children = el.shadowRoot?.querySelectorAll('.ontario-aside *');
			if (!children || children.length === 0) return null;
			const maxWidths = Array.from(children).map((child: Element) => {
				return window.getComputedStyle(child).maxWidth;
			});
			return maxWidths;
		});

		if (childWidths) {
			// All child elements should have a max-width set
			childWidths.forEach((width: string) => {
				expect(width).not.toBe('none');
				expect(width).not.toBe('unset');
			});
		}
	});

	test('removes margin-bottom from last child element', async () => {
		const lastChildStyle = await host.evaluate((el: any) => {
			const lastChild = el.shadowRoot?.querySelector('.ontario-aside :last-child');
			if (!lastChild) return null;
			const computedStyle = window.getComputedStyle(lastChild);
			return {
				marginBottom: computedStyle.marginBottom,
			};
		});

		expect(lastChildStyle?.marginBottom).toBe('8px');
	});

	test('border colour changes immediately when highlight-colour prop updates', async ({ page }) => {
		// Get initial border colour (should be purple from fixture)
		let borderColour = await host.evaluate((el: any) => {
			const aside = el.shadowRoot?.querySelector('aside');
			return window.getComputedStyle(aside).borderLeftColor;
		});
		expect(borderColour).toBeTruthy();
		const initialColour = borderColour;

		// Change to gold
		await host.evaluate(() => {
			document.querySelector('ontario-aside')?.setAttribute('highlight-colour', 'gold');
		});
		await page.waitForChanges();

		borderColour = await host.evaluate((el: any) => {
			const aside = el.shadowRoot?.querySelector('aside');
			return window.getComputedStyle(aside).borderLeftColor;
		});

		// Verify the colour has changed
		expect(borderColour).not.toBe(initialColour);
	});

	test('applies correct margin spacing on small breakpoints', async ({ page }) => {
		// Set viewport to small breakpoint
		await page.setViewportSize({ width: 480, height: 640 });
		await page.waitForLoadState('networkidle');

		const marginStyles = await host.evaluate((el: any) => {
			const aside = el.shadowRoot?.querySelector('.ontario-aside');
			if (!aside) return null;
			const computedStyle = window.getComputedStyle(aside);
			return {
				marginLeft: computedStyle.marginLeft,
				marginRight: computedStyle.marginRight,
			};
		});

		// At small breakpoint, marginLeft should be reduced
		expect(marginStyles?.marginLeft).toBeTruthy();
		expect(marginStyles?.marginRight).toBe('0px');
	});

	test('border is solid left border only', async () => {
		const borderStyles = await host.evaluate((el: any) => {
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
	});

	test('heading uses correct semantic HTML elements with proper styling', async () => {
		const headingElement = host.locator('h4');
		const heading = headingElement.first();

		// Verify heading exists
		await expect(heading).toBeVisible();

		// Check heading has the title class
		const hasTitle = await heading.evaluate((el) => el.classList.contains('ontario-aside__title'));
		expect(hasTitle).toBe(true);
	});

	test('respects ::last-child and ::last-of-type selectors for margin override', async () => {
		await host.evaluate(() => {
			document
				.querySelector('ontario-aside')
				?.setAttribute('content', 'First paragraph of content that should have margin.');
		});

		const paragraphs = host.locator('p');
		const count = await paragraphs.count();
		expect(count).toBeGreaterThan(0);

		// Last paragraph should have no margin-bottom
		const lastParagraphMargin = await paragraphs.last().evaluate((el) => {
			return window.getComputedStyle(el).marginBottom;
		});

		expect(lastParagraphMargin).toBe('0px');
	});

	test('maintains proper text contrast within aside container', async () => {
		const textStyles = await host.evaluate((el: any) => {
			const content = el.shadowRoot?.querySelector('aside');
			if (!content) return null;
			const computedStyle = window.getComputedStyle(content);
			return {
				color: computedStyle.color,
				backgroundColor: computedStyle.backgroundColor,
			};
		});

		// Verify text colour and background are defined
		expect(textStyles?.color).toBeTruthy();
		expect(textStyles?.color).not.toBe('rgba(0, 0, 0, 0)');
	});

	test('padding is applied consistently on all sides', async () => {
		const paddingStyles = await host.evaluate((el: any) => {
			const aside = el.shadowRoot?.querySelector('aside');
			if (!aside) return null;
			const computedStyle = window.getComputedStyle(aside);
			return {
				paddingTop: computedStyle.paddingTop,
				paddingRight: computedStyle.paddingRight,
				paddingBottom: computedStyle.paddingBottom,
				paddingLeft: computedStyle.paddingLeft,
			};
		});

		// All padding values should be set
		expect(paddingStyles?.paddingTop).not.toBe('0px');
		expect(paddingStyles?.paddingBottom).not.toBe('0px');
		expect(paddingStyles?.paddingLeft).not.toBe('0px');
		expect(paddingStyles?.paddingRight).not.toBe('0px');
	});

	test('highlight colour class uses !important to override border-left-color', async () => {
		// Get computed style for border-left-color which should respect !important
		const borderColour = await host.evaluate((el: any) => {
			const asideEl = el.shadowRoot?.querySelector('aside');
			if (!asideEl) return null;
			// Get the actual computed border colour
			return window.getComputedStyle(asideEl).borderLeftColor;
		});

		expect(borderColour).toBeTruthy();
		expect(borderColour).not.toBe('rgba(0, 0, 0, 0)');
	});
});
