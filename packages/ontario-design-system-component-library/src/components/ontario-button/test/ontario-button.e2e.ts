import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { ButtonTypes, HtmlTypes } from '../ontario-button.types';
import { withGlobalStyles } from '../../../utils/tests/vrt-helpers';

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

		// A block-level flex container, so the icon slots and label lay out in a row while the button fills the line.
		await expect(host.locator('button')).toHaveCSS('display', 'flex');
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

/**
 * E2E tests for the layout of `ontario-button` with icons, against the sizes in the DS-2789 epic:
 *
 * - 24px of padding between the button edge and the label or icon (the border counts towards this)
 * - 8px between an icon and the label
 * - a 160px minimum width, with no maximum width on desktop
 * - on mobile, a 328px maximum button width and a maximum label width of 280px (no icon), 248px (one icon)
 *   and 216px (two icons)
 *
 * Measurements are taken from the rendered geometry, so they catch layout regressions that a DOM snapshot can't.
 */
const EDGE_PADDING = 24;
const ICON_GAP = 8;
const ICON_SIZE = 24;
const BUTTON_HEIGHT = 48;
const MOBILE_MAX_WIDTH = 328;
const MOBILE_LABEL_MAX_NO_ICON = 280;
const MOBILE_LABEL_MAX_ONE_ICON = 248;
const MOBILE_LABEL_MAX_TWO_ICONS = 216;

const BUTTON_TYPES = ['primary', 'secondary', 'tertiary'] as const;

const LONG_LABEL =
	'A very long button label that keeps going and going well past any sensible width so it has to wrap onto several lines';

const icon = (name: string, slot: string) =>
	`<ontario-icon-${name} slot="${slot}" colour="inherit" is-decorative="true"></ontario-icon-${name}>`;

interface Box {
	left: number;
	right: number;
	width: number;
	height: number;
}

interface Measurements {
	button: Box;
	label: Box;
	leadingIcon: Box | null;
	trailingIcon: Box | null;
}

const measure = (page: E2EPage, id: string): Promise<Measurements> =>
	page.evaluate((hostId) => {
		const host = document.getElementById(hostId) as HTMLElement;
		const box = (el: Element | null) => {
			if (!el) return null;
			const r = el.getBoundingClientRect();
			return { left: r.left, right: r.right, width: r.width, height: r.height };
		};
		return {
			button: box(host.shadowRoot!.querySelector('button'))!,
			label: box(host.shadowRoot!.querySelector('.ontario-button__label'))!,
			leadingIcon: box(host.querySelector(':scope > [slot="leading-icon"]')),
			trailingIcon: box(host.querySelector(':scope > [slot="trailing-icon"]')),
		};
	}, id) as Promise<Measurements>;

const render = async (page: E2EPage, html: string) => {
	await page.setContent(html);
	await page.waitForChanges();
	await page.evaluate(() => document.fonts.ready);
};

test.describe('ontario-button - icon layout on desktop', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
	});

	for (const type of BUTTON_TYPES) {
		test(`${type}: leading icon has 24px of padding and 8px before the label`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="Add another item to the list">${icon('add', 'leading-icon')}</ontario-button>`,
			);
			const m = await measure(page, 'b');

			expect(m.leadingIcon!.left - m.button.left).toBeCloseTo(EDGE_PADDING, 0);
			expect(m.label.left - m.leadingIcon!.right).toBeCloseTo(ICON_GAP, 0);
			expect(m.button.right - m.label.right).toBeCloseTo(EDGE_PADDING, 0);
			expect(m.leadingIcon!.width).toBeCloseTo(ICON_SIZE, 0);
			expect(m.leadingIcon!.height).toBeCloseTo(ICON_SIZE, 0);
		});

		test(`${type}: trailing icon has 8px after the label and 24px of padding`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="Continue to the next step">${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);
			const m = await measure(page, 'b');

			expect(m.trailingIcon!.left - m.label.right).toBeCloseTo(ICON_GAP, 0);
			expect(m.button.right - m.trailingIcon!.right).toBeCloseTo(EDGE_PADDING, 0);
			expect(m.label.left - m.button.left).toBeCloseTo(EDGE_PADDING, 0);
		});

		test(`${type}: leading and trailing icons are spaced the same as one icon`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="Download the full report">${icon('download', 'leading-icon')}${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);
			const m = await measure(page, 'b');

			expect(m.leadingIcon!.left - m.button.left).toBeCloseTo(EDGE_PADDING, 0);
			expect(m.label.left - m.leadingIcon!.right).toBeCloseTo(ICON_GAP, 0);
			expect(m.trailingIcon!.left - m.label.right).toBeCloseTo(ICON_GAP, 0);
			expect(m.button.right - m.trailingIcon!.right).toBeCloseTo(EDGE_PADDING, 0);
		});

		test(`${type}: is 48px tall with an icon, the same as without`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="with" type="${type}" label="Save">${icon('add', 'leading-icon')}</ontario-button>
				<ontario-button id="without" type="${type}" label="Save"></ontario-button>`,
			);

			expect((await measure(page, 'with')).button.height).toBeCloseTo(BUTTON_HEIGHT, 0);
			expect((await measure(page, 'without')).button.height).toBeCloseTo(BUTTON_HEIGHT, 0);
		});

		test(`${type}: is at least 160px wide, with or without an icon`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="with" type="${type}" label="Go">${icon('add', 'leading-icon')}</ontario-button>
				<ontario-button id="without" type="${type}" label="Go"></ontario-button>`,
			);

			expect((await measure(page, 'with')).button.width).toBeGreaterThanOrEqual(159.5);
			expect((await measure(page, 'without')).button.width).toBeGreaterThanOrEqual(159.5);
		});
	}

	test('has no maximum width, so a long label grows past the old 736px cap', async ({ page }) => {
		await render(
			page,
			`<ontario-button id="b" type="primary" label="${LONG_LABEL} ${LONG_LABEL} ${LONG_LABEL}">${icon('add', 'leading-icon')}</ontario-button>`,
		);

		expect((await measure(page, 'b')).button.width).toBeGreaterThan(736);
	});

	test('keeps secondary and primary icon buttons the same width', async ({ page }) => {
		await render(
			page,
			`<ontario-button id="primary" type="primary" label="Add item">${icon('add', 'leading-icon')}</ontario-button>
			<ontario-button id="secondary" type="secondary" label="Add item">${icon('add', 'leading-icon')}</ontario-button>`,
		);

		const primary = await measure(page, 'primary');
		const secondary = await measure(page, 'secondary');
		expect(secondary.button.width).toBeCloseTo(primary.button.width, 0);
		expect(secondary.label.width).toBeCloseTo(primary.label.width, 0);
	});
});

test.describe('ontario-button - icon layout on mobile', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 800 });
	});

	for (const type of BUTTON_TYPES) {
		test(`${type}: is at most 328px wide, with or without an icon`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="none" type="${type}" label="${LONG_LABEL}"></ontario-button>
				<ontario-button id="one" type="${type}" label="${LONG_LABEL}">${icon('add', 'leading-icon')}</ontario-button>
				<ontario-button id="two" type="${type}" label="${LONG_LABEL}">${icon('add', 'leading-icon')}${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);

			for (const id of ['none', 'one', 'two']) {
				expect((await measure(page, id)).button.width).toBeLessThanOrEqual(MOBILE_MAX_WIDTH + 0.5);
			}
		});

		test(`${type}: limits the label to 248px with one icon`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="lead" type="${type}" label="${LONG_LABEL}">${icon('add', 'leading-icon')}</ontario-button>
				<ontario-button id="trail" type="${type}" label="${LONG_LABEL}">${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);

			expect((await measure(page, 'lead')).label.width).toBeCloseTo(MOBILE_LABEL_MAX_ONE_ICON, 0);
			expect((await measure(page, 'trail')).label.width).toBeCloseTo(MOBILE_LABEL_MAX_ONE_ICON, 0);
		});

		test(`${type}: limits the label to 216px with two icons`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="${LONG_LABEL}">${icon('add', 'leading-icon')}${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);

			expect((await measure(page, 'b')).label.width).toBeCloseTo(MOBILE_LABEL_MAX_TWO_ICONS, 0);
		});

		test(`${type}: limits the label to at most 280px with no icon`, async ({ page }) => {
			await render(page, `<ontario-button id="b" type="${type}" label="${LONG_LABEL}"></ontario-button>`);

			expect((await measure(page, 'b')).label.width).toBeLessThanOrEqual(MOBILE_LABEL_MAX_NO_ICON + 0.5);
		});
	}
});

test.describe('ontario-button - icon slots', () => {
	test('picks up an icon that is added and removed after the first render', async ({ page }) => {
		await render(page, `<ontario-button id="b" type="primary" label="Save"></ontario-button>`);
		const button = page.locator('#b button');
		await expect(button).not.toHaveClass(/ontario-button--icons-/);

		await page.evaluate(() => {
			const el = document.createElement('ontario-icon-add');
			el.setAttribute('slot', 'leading-icon');
			el.setAttribute('colour', 'inherit');
			el.setAttribute('is-decorative', 'true');
			document.getElementById('b')!.appendChild(el);
		});
		await page.waitForChanges();
		await expect(button).toHaveClass(/ontario-button--icons-1/);

		await page.evaluate(() => {
			const el = document.createElement('ontario-icon-chevron-right');
			el.setAttribute('slot', 'trailing-icon');
			el.setAttribute('colour', 'inherit');
			el.setAttribute('is-decorative', 'true');
			document.getElementById('b')!.appendChild(el);
		});
		await page.waitForChanges();
		await expect(button).toHaveClass(/ontario-button--icons-2/);

		await page.evaluate(() =>
			document
				.getElementById('b')!
				.querySelectorAll('[slot]')
				.forEach((el) => el.remove()),
		);
		await page.waitForChanges();
		await expect(button).not.toHaveClass(/ontario-button--icons-/);
	});

	test('does not slot an icon that is nested inside another element', async ({ page }) => {
		await render(
			page,
			`<ontario-button id="b" type="primary" label="Save"><span>${icon('add', 'leading-icon')}</span></ontario-button>`,
		);

		await expect(page.locator('#b button')).not.toHaveClass(/ontario-button--icons-/);
		const assigned = await page.evaluate(
			() =>
				(
					document.getElementById('b')!.shadowRoot!.querySelector('slot[name="leading-icon"]') as HTMLSlotElement
				).assignedElements().length,
		);
		expect(assigned).toBe(0);
	});

	test('slots a wrapper element that carries the slot attribute', async ({ page }) => {
		await render(
			page,
			`<ontario-button id="b" type="primary" label="Save"><span slot="leading-icon"><ontario-icon-add colour="inherit" is-decorative="true"></ontario-icon-add></span></ontario-button>`,
		);

		await expect(page.locator('#b button')).toHaveClass(/ontario-button--icons-1/);
	});

	test('hides icons from assistive technology and keeps the label as the accessible name', async ({ page }) => {
		await render(
			page,
			`<ontario-button id="b" type="primary" label="Add item">${icon('add', 'leading-icon')}</ontario-button>`,
		);

		await expect(page.getByRole('button', { name: 'Add item' })).toBeVisible();
		await expect(page.locator('#b ontario-icon-add svg')).toHaveAttribute('aria-hidden', 'true');
	});

	test('the icon follows the button text colour on hover', async ({ page }) => {
		await render(
			page,
			`<ontario-button id="b" type="secondary" label="Add item">${icon('add', 'leading-icon')}</ontario-button>`,
		);
		const colours = () =>
			page.evaluate(() => {
				const host = document.getElementById('b')!;
				// `.ontario-icon` lives inside `ontario-icon-add`'s own shadow root, one level deeper than the
				// button's light DOM, so it has to be reached through the icon element's shadow root.
				const iconHost = host.querySelector('ontario-icon-add')!;
				return {
					button: getComputedStyle(host.shadowRoot!.querySelector('button')!).color,
					icon: getComputedStyle(iconHost.shadowRoot!.querySelector('.ontario-icon')!).color,
				};
			});

		const before = await colours();
		expect(before.icon).toBe(before.button);

		await page.locator('#b').hover();
		// The colour change is a CSS transition, so poll until it settles instead of using a fixed wait.
		await expect.poll(async () => (await colours()).button).not.toBe(before.button);
		const after = await colours();
		expect(after.icon).toBe(after.button);
	});
});

test.describe('ontario-button - spacing between adjacent buttons', () => {
	const BUTTON_GROUP_GAP_DESKTOP = 32;
	const BUTTON_STACK_GAP_MOBILE = 24;

	// Markup without whitespace between the buttons, so no inline gap is added on top of the margin
	const group = `<div style="width: 100%"><ontario-button id="a" type="primary" label="Save"></ontario-button><ontario-button id="b" type="secondary" label="Cancel"></ontario-button><ontario-button id="c" type="tertiary" label="Reset"></ontario-button></div>`;

	const boxes = (page: E2EPage) =>
		page.evaluate(() =>
			['a', 'b', 'c'].map((id) => {
				const r = document.getElementById(id)!.shadowRoot!.querySelector('button')!.getBoundingClientRect();
				return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
			}),
		);

	test('places 32px between buttons in a group on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await render(page, withGlobalStyles(group));
		const [a, b, c] = await boxes(page);

		expect(b.left - a.right).toBeCloseTo(BUTTON_GROUP_GAP_DESKTOP, 0);
		expect(c.left - b.right).toBeCloseTo(BUTTON_GROUP_GAP_DESKTOP, 0);
		expect(b.top).toBeCloseTo(a.top, 0);
		expect(c.top).toBeCloseTo(a.top, 0);
	});

	test('stacks the buttons with 24px between them on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await render(page, withGlobalStyles(group));
		const [a, b, c] = await boxes(page);

		expect(b.top - a.bottom).toBeCloseTo(BUTTON_STACK_GAP_MOBILE, 0);
		expect(c.top - b.bottom).toBeCloseTo(BUTTON_STACK_GAP_MOBILE, 0);
		expect(b.left).toBeCloseTo(a.left, 0);
		expect(c.left).toBeCloseTo(a.left, 0);
	});

	test('does not add spacing around a single button', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await render(page, withGlobalStyles(`<ontario-button id="a" type="primary" label="Save"></ontario-button>`));

		await expect(page.locator('#a')).toHaveCSS('margin-left', '0px');
		await expect(page.locator('#a')).toHaveCSS('margin-top', '0px');
	});
});
