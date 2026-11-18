import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { ButtonTypes, HtmlTypes } from '../ontario-button.types';

/**
 * The computed value of a fully transparent colour (`transparent`). It is used for the tertiary button background, which
 * is not a token, and for the focus outline, which is transparent so it stays visible in forced colours mode.
 */
const transparent = 'rgba(0, 0, 0, 0)';

/** Label and accessible name used by the tests that need a button with text. */
const buttonLabel = 'Element Content';

/** Attribute on the test form that counts how many times it was submitted. */
const submitCountAttribute = 'data-submits';

test.describe('ontario-button', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent('<ontario-button></ontario-button>');
		await page.waitForChanges();
		host = page.locator('ontario-button');
	});

	test('renders default button', async () => {
		const element = host.locator('button');

		await expect(host).toHaveClass(/hydrated/);
		await expect(element).toHaveClass(/ontario-button/);
		await expect(element).toHaveClass(/ontario-button--secondary/);
		await expect(element).toHaveText('');
		await expect(element).toHaveAttribute('type', 'button');
	});

	test('renders changes to the button', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioButtonElement, label) => {
			element.label = label;
			element.ariaLabelText = label;
		}, buttonLabel);
		await page.waitForChanges();

		const element = host.locator('button');

		await expect(element).toHaveClass(/ontario-button--secondary/);
		await expect(element).toHaveText(buttonLabel);
		await expect(element).toHaveAttribute('aria-label', buttonLabel);
		await expect(element).toHaveAttribute('type', 'button');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.ariaLabelText = 'Aria Label';
		});

		await page.waitForChanges();
		await expect(element).toHaveAttribute('aria-label', 'Aria Label');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.elementId = 'defaultButton';
		});
		await page.waitForChanges();
		await expect(element).toHaveAttribute('id', 'defaultButton');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'primary';
			button.htmlType = 'submit';
		});
		await page.waitForChanges();
		await expect(element).toHaveClass(/ontario-button--primary/);
		await expect(element).toHaveAttribute('type', 'submit');
		await expect(element).toHaveAttribute('id', 'defaultButton');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'tertiary';
			button.htmlType = 'button';
			button.label = 'Back';
			button.elementId = 'BackButton';
		});
		await page.waitForChanges();
		await expect(element).toHaveClass(/ontario-button--tertiary/);
		await expect(element).toHaveText('Back');
		await expect(element).toHaveAttribute('type', 'button');
		await expect(element).toHaveAttribute('id', 'BackButton');
	});

	test('uses the label prop instead of the host content', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.textContent = 'Host Content';
			button.label = 'Save profile';
			button.ariaLabelText = 'Save profile';
		});
		await page.waitForChanges();

		const element = host.locator('button');
		await expect(element).toHaveText('Save profile');
		await expect(element).toHaveAttribute('aria-label', 'Save profile');
	});

	test('renders as a link when href is provided', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.label = 'View details';
			button.href = '/details';
			button.target = '_blank';
			button.rel = 'noopener';
			button.htmlType = 'submit';
		});
		await page.waitForChanges();

		const element = host.locator('a');
		await expect(element).toHaveText('View details');
		await expect(element).toHaveAttribute('href', '/details');
		await expect(element).toHaveAttribute('target', '_blank');
		await expect(element).toHaveAttribute('rel', 'noopener');
		await expect(element).not.toHaveAttribute('type');
		await expect(host.locator('button')).toHaveCount(0);
	});

	for (const buttonType of ButtonTypes) {
		test(`renders the ${buttonType} button type`, async ({ page }) => {
			await host.evaluate((button: HTMLOntarioButtonElement, type) => {
				button.type = type;
			}, buttonType);
			await page.waitForChanges();

			await expect(host.locator('button')).toHaveAttribute('type', 'button');
			await expect(host.locator('button')).toHaveClass(`ontario-button ontario-button--${buttonType}`);
		});
	}

	for (const htmlType of HtmlTypes) {
		test(`renders the ${htmlType} HTML type`, async ({ page }) => {
			await host.evaluate((button: HTMLOntarioButtonElement, type) => {
				button.htmlType = type;
			}, htmlType);
			await page.waitForChanges();

			await expect(host.locator('button')).toHaveAttribute('type', htmlType);
			await expect(host.locator('button')).toHaveClass(/ontario-button/);
		});
	}

	// The button colours come from SCSS tokens, so these checks compare the button types with each other instead of
	// hard-coding colour values that would fail whenever a token changes. The exact colours are covered by the VRT tests.
	// - `primary`: `$ontario-colour-link` background and white text, with no border
	// - `secondary`: `$ontario-colour-white` background with a solid `$ontario-colour-link` border and text
	// - `tertiary`: transparent background (not a token) with underlined `$ontario-colour-link` text
	// - `internalThemeDark`: `$ontario-colour-black` background with a solid white border and text
	test('applies the expected styles for each button type', async ({ page }) => {
		const element = host.locator('button');

		const stylesFor = async (type: (typeof ButtonTypes)[number]) => {
			await host.evaluate((button: HTMLOntarioButtonElement, buttonType) => {
				button.type = buttonType;
			}, type);
			await page.waitForChanges();

			return element.evaluate((button) => {
				const styles = window.getComputedStyle(button);
				return {
					backgroundColor: styles.backgroundColor,
					borderTopStyle: styles.borderTopStyle,
					borderTopWidth: styles.borderTopWidth,
					borderRadius: styles.borderBottomLeftRadius,
					textDecorationLine: styles.textDecorationLine,
				};
			});
		};

		const secondary = await stylesFor('secondary');
		const primary = await stylesFor('primary');
		const tertiary = await stylesFor('tertiary');
		const internalThemeDark = await stylesFor('internalThemeDark');

		expect(primary.borderTopWidth).toBe('0px');
		expect(primary.backgroundColor).not.toBe(secondary.backgroundColor);

		expect(secondary.borderTopStyle).toBe('solid');
		expect(internalThemeDark.borderTopStyle).toBe('solid');
		expect(internalThemeDark.backgroundColor).not.toBe(secondary.backgroundColor);

		expect(tertiary.backgroundColor).toBe(transparent);
		expect(tertiary.textDecorationLine).toBe('underline');

		// every button type shares the same corner radius (`$global-radius`)
		expect(primary.borderRadius).not.toBe('0px');
		expect(secondary.borderRadius).toBe(primary.borderRadius);
		expect(tertiary.borderRadius).toBe(primary.borderRadius);
		expect(internalThemeDark.borderRadius).toBe(primary.borderRadius);
	});

	// For `primary`, the background is `$ontario-colour-link` by default, `$ontario-colour-link--hover` on hover and focus,
	// and `$ontario-colour-link--active` while pressed, so each state is checked against the one before it.
	// Focus also adds the `%ontario-focus` box shadow and a 4px outline that is transparent, so the focus indicator is
	// still visible in forced colours (high contrast) mode.
	test('applies hover, focus, and active styles', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement, label) => {
			button.label = label;
			button.type = 'primary';
		}, buttonLabel);
		await page.waitForChanges();
		const element = host.locator('button');
		const backgroundColour = () => element.evaluate((button) => window.getComputedStyle(button).backgroundColor);
		const defaultBackground = await backgroundColour();

		await element.hover();
		await expect(element).not.toHaveCSS('background-color', defaultBackground);
		const hoverBackground = await backgroundColour();

		await element.focus();
		await expect(element).toHaveCSS('outline-style', 'solid');
		await expect(element).toHaveCSS('outline-color', transparent);
		await expect(element).not.toHaveCSS('box-shadow', 'none');

		await page.mouse.down();
		try {
			await expect(element).not.toHaveCSS('background-color', defaultBackground);
			await expect(element).not.toHaveCSS('background-color', hoverBackground);
		} finally {
			await page.mouse.up();
		}
	});

	test('meets the documented minimum button width on larger screens', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.waitForChanges();

		await expect(host.locator('button')).toHaveCSS('min-width', '160px');
	});

	test('renders as a block below the small breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.waitForChanges();

		await expect(host.locator('button')).toHaveCSS('display', 'block');
	});

	// Known defect (DS-2973): `:host { display: inline-block }` makes the host shrink to the button's minimum width, so the
	// button's `width: 100%` never fills its container.
	// `test.fail` expects this to fail; once the defect is fixed, the run will fail and the annotation should become `test`.
	test.fail('fills its container below the small breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		// `page.setContent` does not replace the content a second time in the same test, so replace the body directly
		await page.evaluate(() => {
			document.body.innerHTML = `
				<div id="container" style="width: 300px">
					<ontario-button label="Continue"></ontario-button>
				</div>
			`;
		});
		await page.waitForChanges();

		const container = await page.locator('#container').boundingBox();
		const button = await page.locator('ontario-button').locator('button').boundingBox();

		expect(button?.width).toBe(container?.width);
	});

	test('fires the click event', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement, label) => (button.label = label), buttonLabel);
		await page.waitForChanges();

		const clickPromise = host.evaluate(
			(button) =>
				new Promise<void>((resolve) => {
					button.addEventListener('click', () => resolve(), { once: true });
				}),
		);

		await host.locator('button').click();
		await clickPromise;
	});

	for (const buttonType of ButtonTypes) {
		test(`the ${buttonType} button with non-ASCII text has no axe violations`, async ({ page }) => {
			const label = 'Réviser les données reçues';

			await host.evaluate(
				(button: HTMLOntarioButtonElement, properties) => {
					button.label = properties.label;
					button.ariaLabelText = properties.label;
					button.type = properties.type;
				},
				{ label, type: buttonType },
			);
			await page.waitForChanges();

			const button = host.locator('button');
			await expect(button).toHaveText(label);
			await expect(button).toHaveAttribute('aria-label', label);

			const accessibilityScanResults = await new AxeBuilder({ page }).include('ontario-button').analyze();
			expect(accessibilityScanResults.violations).toHaveLength(0);
		});
	}
});

test.describe('ontario-button - forms and keyboard', () => {
	/**
	 * Renders a form with an input followed by the button, and counts submissions in the `submitCountAttribute` attribute on the form
	 * (the submit is cancelled so the page does not navigate).
	 */
	const renderForm = async (page: E2EPage, htmlType: string) => {
		await page.setContent(`
			<form id="form" ${submitCountAttribute}="0">
				<input id="name" name="name" value="Original" />
				<ontario-button html-type="${htmlType}" label="Action"></ontario-button>
			</form>
		`);
		await page.waitForChanges();
		await page.locator('#form').evaluate((form, attribute) => {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				form.setAttribute(attribute, String(Number(form.getAttribute(attribute)) + 1));
			});
		}, submitCountAttribute);

		return {
			form: page.locator('#form'),
			input: page.locator('#name'),
			button: page.locator('ontario-button').locator('button'),
		};
	};

	test('submits the form when a submit button is clicked', async ({ page }) => {
		const { form, button } = await renderForm(page, 'submit');

		await button.click();

		await expect(form).toHaveAttribute(submitCountAttribute, '1');
	});

	test('does not submit the form when a button is clicked', async ({ page }) => {
		const { form, button } = await renderForm(page, 'button');

		await button.click();

		await expect(form).toHaveAttribute(submitCountAttribute, '0');
	});

	test('resets the form when a reset button is clicked', async ({ page }) => {
		const { input, button } = await renderForm(page, 'reset');
		await input.fill('Changed');

		await button.click();

		await expect(input).toHaveValue('Original');
	});

	test('is reached with Tab and submits the form with Enter', async ({ page }) => {
		const { form, input, button } = await renderForm(page, 'submit');
		await input.focus();

		await page.keyboard.press('Tab');
		await expect(button).toBeFocused();
		await page.keyboard.press('Enter');

		await expect(form).toHaveAttribute(submitCountAttribute, '1');
	});

	test('submits the form with Space', async ({ page }) => {
		const { form, input, button } = await renderForm(page, 'submit');
		await input.focus();

		await page.keyboard.press('Tab');
		await expect(button).toBeFocused();
		await page.keyboard.press('Space');

		await expect(form).toHaveAttribute(submitCountAttribute, '1');
	});
});
