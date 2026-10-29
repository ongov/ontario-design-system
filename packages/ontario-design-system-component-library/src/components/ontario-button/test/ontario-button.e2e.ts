import { expect } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';

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

			expect(m.leadingIcon!.left - m.button.left).toBeCloseTo(24, 0);
			expect(m.label.left - m.leadingIcon!.right).toBeCloseTo(8, 0);
			expect(m.button.right - m.label.right).toBeCloseTo(24, 0);
			expect(m.leadingIcon!.width).toBeCloseTo(24, 0);
			expect(m.leadingIcon!.height).toBeCloseTo(24, 0);
		});

		test(`${type}: trailing icon has 8px after the label and 24px of padding`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="Continue to the next step">${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);
			const m = await measure(page, 'b');

			expect(m.trailingIcon!.left - m.label.right).toBeCloseTo(8, 0);
			expect(m.button.right - m.trailingIcon!.right).toBeCloseTo(24, 0);
			expect(m.label.left - m.button.left).toBeCloseTo(24, 0);
		});

		test(`${type}: leading and trailing icons are spaced the same as one icon`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="Download the full report">${icon('download', 'leading-icon')}${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);
			const m = await measure(page, 'b');

			expect(m.leadingIcon!.left - m.button.left).toBeCloseTo(24, 0);
			expect(m.label.left - m.leadingIcon!.right).toBeCloseTo(8, 0);
			expect(m.trailingIcon!.left - m.label.right).toBeCloseTo(8, 0);
			expect(m.button.right - m.trailingIcon!.right).toBeCloseTo(24, 0);
		});

		test(`${type}: is 48px tall with an icon, the same as without`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="with" type="${type}" label="Save">${icon('add', 'leading-icon')}</ontario-button>
				<ontario-button id="without" type="${type}" label="Save"></ontario-button>`,
			);

			expect((await measure(page, 'with')).button.height).toBeCloseTo(48, 0);
			expect((await measure(page, 'without')).button.height).toBeCloseTo(48, 0);
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
				expect((await measure(page, id)).button.width).toBeLessThanOrEqual(328.5);
			}
		});

		test(`${type}: limits the label to 248px with one icon`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="lead" type="${type}" label="${LONG_LABEL}">${icon('add', 'leading-icon')}</ontario-button>
				<ontario-button id="trail" type="${type}" label="${LONG_LABEL}">${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);

			expect((await measure(page, 'lead')).label.width).toBeCloseTo(248, 0);
			expect((await measure(page, 'trail')).label.width).toBeCloseTo(248, 0);
		});

		test(`${type}: limits the label to 216px with two icons`, async ({ page }) => {
			await render(
				page,
				`<ontario-button id="b" type="${type}" label="${LONG_LABEL}">${icon('add', 'leading-icon')}${icon('chevron-right', 'trailing-icon')}</ontario-button>`,
			);

			expect((await measure(page, 'b')).label.width).toBeCloseTo(216, 0);
		});

		test(`${type}: limits the label to at most 280px with no icon`, async ({ page }) => {
			await render(page, `<ontario-button id="b" type="${type}" label="${LONG_LABEL}"></ontario-button>`);

			expect((await measure(page, 'b')).label.width).toBeLessThanOrEqual(280.5);
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
			`<ontario-button id="b" type="primary" label="Save"><span slot="leading-icon">${'<ontario-icon-add colour="inherit" is-decorative="true"></ontario-icon-add>'}</span></ontario-button>`,
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
		await page.waitForTimeout(400);
		const after = await colours();
		expect(after.icon).toBe(after.button);
		expect(after.button).not.toBe(before.button);
	});
});

// import { newE2EPage } from '@stencil/core/testing';

// describe('ontario-button', () => {
// 	it('renders default button', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-button></ontario-button>');
// 		const component = await page.find('ontario-button');
// 		const element = await page.find('ontario-button >>> button');

// 		expect(component).toHaveClass('hydrated');
// 		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
// 		expect(element.textContent).toEqual('');
// 		expect(element).toEqualAttributes({
// 			type: 'button',
// 		});
// 	});

// 	it('renders changes to the button', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-button>Element Content</ontario-button>');
// 		const component = await page.find('ontario-button');
// 		const element = await page.find('ontario-button >>> button');

// 		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
// 		expect(element.textContent).toEqual('Element Content');
// 		expect(element).toEqualAttributes({
// 			'aria-label': 'Element Content',
// 			'type': 'button',
// 		});

// 		component.setProperty('ariaLabelText', 'Aria Label');
// 		await page.waitForChanges();
// 		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
// 		expect(element.textContent).toEqual('Element Content');
// 		expect(element).toEqualAttributes({
// 			'aria-label': 'Aria Label',
// 			'type': 'button',
// 		});

// 		component.setProperty('elementId', 'defaultButton');
// 		await page.waitForChanges();
// 		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
// 		expect(element.textContent).toEqual('Element Content');
// 		expect(element).toEqualAttributes({
// 			type: 'button',
// 			id: 'defaultButton',
// 		});

// 		component.setProperty('type', 'primary');
// 		component.setProperty('htmlType', 'submit');
// 		await page.waitForChanges();
// 		expect(element).toHaveClasses(['ontario-button', 'ontario-button--primary']);
// 		expect(element.textContent).toEqual('Element Content');
// 		expect(element).toEqualAttributes({
// 			type: 'submit',
// 			id: 'defaultButton',
// 		});

// 		component.setProperty('type', 'tertiary');
// 		component.setProperty('htmlType', 'button');
// 		component.setProperty('label', 'Back');
// 		component.setProperty('elementId', 'BackButton');
// 		await page.waitForChanges();
// 		expect(element).toHaveClasses(['ontario-button', 'ontario-button--tertiary']);
// 		expect(element.textContent).toEqual('Back');
// 		expect(element).toEqualAttributes({
// 			type: 'button',
// 			id: 'BackButton',
// 		});
// 	});

// 	it('fires the onclick event', async () => {
// 		const page = await newE2EPage();
// 		await page.setContent('<ontario-button>Element Content</ontario-button>');
// 		const changedEvent = await page.spyOnEvent('click');
// 		const component = await page.find('ontario-button');
// 		component.click();
// 		await page.waitForChanges();
// 		expect(changedEvent).toHaveReceivedEventTimes(1);
// 	});
// });
