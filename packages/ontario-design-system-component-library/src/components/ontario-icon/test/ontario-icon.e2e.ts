import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { test } from '@stencil/playwright';
import manifest from '../icon-manifest.json' with { type: 'json' };

const rotationFixture = `
	<style>
		.rotating-icon {
			display: inline-block;
			transform: rotate(0deg);
			transition: transform 200ms ease-in-out;
		}

		.rotating-icon--open {
			transform: rotate(180deg);
		}

		@media (prefers-reduced-motion: reduce) {
			.rotating-icon {
				transition: none;
			}
		}
	</style>
	<ontario-icon-chevron-down class="rotating-icon"></ontario-icon-chevron-down>
`;

test.describe('ontario-icon', () => {
	test('every manifest icon renders a decorative, non-focusable SVG', async ({ page }) => {
		await page.setContent(`<main>${manifest.icons.map((icon) => `<${icon.name}></${icon.name}>`).join('')}</main>`);
		await page.waitForChanges();
		for (const icon of manifest.icons) {
			const svg = page.locator(icon.name).locator('svg');
			await expect(svg).toHaveCount(1);
			await expect(svg).toHaveAttribute('aria-hidden', 'true');
			await expect(svg).toHaveAttribute('focusable', 'false');
			await expect(svg).not.toHaveAttribute('role');
		}
	});

	test('decorative and labelled icons pass axe accessibility checks', async ({ page }) => {
		await page.setContent(`
			<main>
				<ontario-icon-accessibility></ontario-icon-accessibility>
				<ontario-icon-accessibility label="Accessibility options"></ontario-icon-accessibility>
			</main>
		`);
		await page.waitForChanges();

		const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

		expect(results.violations).toHaveLength(0);
	});

	test('consumer rotation applies to the icon host and respects reduced motion', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		await page.setContent(rotationFixture);
		await page.waitForChanges();

		const host = page.locator('ontario-icon-chevron-down');
		await expect(host).toHaveCSS('display', 'inline-block');
		await expect(host).toHaveCSS('transition-duration', '0.2s');

		const transitionFinished = host.evaluate(
			(element) =>
				new Promise<void>((resolve) => element.addEventListener('transitionend', () => resolve(), { once: true })),
		);
		await host.evaluate((element) => element.classList.add('rotating-icon--open'));
		await transitionFinished;
		await expect
			.poll(() => host.evaluate((element) => getComputedStyle(element).transform))
			.toBe('matrix(-1, 0, 0, -1, 0, 0)');

		await page.emulateMedia({ reducedMotion: 'reduce' });
		await expect(host).toHaveCSS('transition-duration', '0s');
	});

	test.describe('colour API', () => {
		const iconFillColours = {
			black: 'rgb(26, 26, 26)',
			blue: 'rgb(0, 102, 204)',
			grey: 'rgb(102, 102, 102)',
			white: 'rgb(255, 255, 255)',
		};

		for (const [colour, fill] of Object.entries(iconFillColours)) {
			test(`dropdown-arrow renders the ${colour} token fill`, async ({ page }) => {
				await page.setContent(`<ontario-icon-dropdown-arrow colour="${colour}"></ontario-icon-dropdown-arrow>`);
				await page.waitForChanges();

				await expect(page.locator('ontario-icon-dropdown-arrow').locator('path')).toHaveCSS('fill', fill);
			});
		}

		test('dropdown-arrow follows the surrounding text colour with colour="inherit"', async ({ page }) => {
			await page.setContent(`
				<div style="color: rgb(0, 102, 204)">
					<ontario-icon-dropdown-arrow colour="inherit"></ontario-icon-dropdown-arrow>
				</div>
			`);
			await page.waitForChanges();

			await expect(page.locator('ontario-icon-dropdown-arrow').locator('path')).toHaveCSS('fill', 'rgb(0, 102, 204)');
		});

		test('dropdown-arrow renders a custom CSS colour as its fill', async ({ page }) => {
			await page.setContent('<ontario-icon-dropdown-arrow colour="#123456"></ontario-icon-dropdown-arrow>');
			await page.waitForChanges();

			await expect(page.locator('ontario-icon-dropdown-arrow').locator('path')).toHaveCSS('fill', 'rgb(18, 52, 86)');
		});

		test('search-white warns once in development and still renders', async ({ page }) => {
			const warnings: string[] = [];
			page.on('console', (message) => {
				if (message.type() === 'warning') {
					warnings.push(message.text());
				}
			});
			await page.setContent(`
				<ontario-icon-search-white></ontario-icon-search-white>
				<ontario-icon-search-white></ontario-icon-search-white>
			`);
			await page.waitForChanges();

			await expect(page.locator('ontario-icon-search-white').locator('svg')).toHaveCount(2);
			expect(warnings.filter((warning) => warning.includes('ontario-icon-search-white'))).toHaveLength(1);
			expect(warnings.find((warning) => warning.includes('ontario-icon-search-white'))).toContain(
				'ontario-icon-search',
			);
		});
	});

	test.describe('interactive colour state', () => {
		// Mirrors the header search button: dark icon at rest, white icon on a blue background on hover and focus.
		const searchButtonFixture = `
			<style>
				.search-button { background: #f2f2f2; color: #1a1a1a; border: 0; padding: 12px; margin: 40px; }
				.search-button:hover, .search-button:focus { background: #0b5f9e; color: #fff; }
				.look-alike { width: 24px; height: 24px; }
			</style>
			<button class="search-button" type="button">
				<ontario-icon-search colour="inherit"></ontario-icon-search>
			</button>
			<div class="ontario-icon ontario-icon--blue">
				<svg class="look-alike" viewBox="0 0 24 24"><path d="M0 0h24v24z"></path></svg>
			</div>
		`;

		test('icon recolours on hover and returns to its idle colour', async ({ page }) => {
			await page.setContent(searchButtonFixture);
			await page.waitForChanges();
			const iconPath = page.locator('ontario-icon-search').locator('path');
			const button = page.locator('.search-button');

			await expect(iconPath).toHaveCSS('fill', 'rgb(26, 26, 26)');
			await button.hover();
			await expect(iconPath).toHaveCSS('fill', 'rgb(255, 255, 255)');
			await page.mouse.move(0, 0);
			await expect(iconPath).toHaveCSS('fill', 'rgb(26, 26, 26)');
		});

		test('icon recolours on keyboard focus and returns to its idle colour on blur', async ({ page }) => {
			await page.setContent(searchButtonFixture);
			await page.waitForChanges();
			const iconPath = page.locator('ontario-icon-search').locator('path');

			await page.keyboard.press('Tab');
			await expect(page.locator('.search-button')).toBeFocused();
			await expect(iconPath).toHaveCSS('fill', 'rgb(255, 255, 255)');
			await page.keyboard.press('Tab');
			await expect(iconPath).toHaveCSS('fill', 'rgb(26, 26, 26)');
		});

		test('icon styles do not leak into light-DOM markup', async ({ page }) => {
			await page.setContent(searchButtonFixture);
			await page.waitForChanges();

			await expect(page.locator('.look-alike path')).toHaveCSS('fill', 'rgb(0, 0, 0)');
		});

		test('page-level svg rules cannot restyle the icon through the shadow boundary', async ({ page }) => {
			await page.setContent(`
				<style>
					svg, path, .ontario-icon svg, .ontario-icon--blue svg {
						fill: rgb(255, 0, 0) !important;
						stroke: rgb(255, 0, 0) !important;
					}
				</style>
				<ontario-icon-search colour="blue"></ontario-icon-search>
				<svg class="control" viewBox="0 0 24 24"><path d="M0 0h24v24z"></path></svg>
			`);
			await page.waitForChanges();

			// The control proves the page rule is live, so the icon staying blue is due to encapsulation.
			await expect(page.locator('.control path')).toHaveCSS('fill', 'rgb(255, 0, 0)');
			await expect(page.locator('ontario-icon-search').locator('path')).toHaveCSS('fill', 'rgb(0, 102, 204)');
		});

		test('rendering icons does not change the styles of surrounding page elements', async ({ page }) => {
			await page.setContent(`
				<style>.look-alike { width: 24px; height: 24px; }</style>
				<main id="page">
					<button id="button" type="button">Search</button>
					<svg class="look-alike" viewBox="0 0 24 24"><path d="M0 0h24v24z"></path></svg>
				</main>
				<div id="icons"></div>
			`);
			await page.waitForChanges();
			const readStyles = () =>
				page.evaluate(() =>
					['body', '#page', '#button', '.look-alike', '.look-alike path'].map((selector) => {
						const style = getComputedStyle(document.querySelector(selector)!);
						return [selector, style.color, style.fill, style.stroke, style.display, style.verticalAlign, style.width];
					}),
				);

			const before = await readStyles();
			await page.evaluate(() => {
				document.querySelector('#icons')!.innerHTML =
					'<ontario-icon-search colour="blue"></ontario-icon-search><ontario-icon-dropdown-arrow colour="white"></ontario-icon-dropdown-arrow>';
			});
			await page.waitForChanges();

			expect(await readStyles()).toEqual(before);
		});

		test('icons using a token colour are unaffected by their parent colour', async ({ page }) => {
			await page.setContent(`
				<div style="color: rgb(255, 0, 0)">
					<ontario-icon-search colour="blue"></ontario-icon-search>
				</div>
			`);
			await page.waitForChanges();

			await expect(page.locator('ontario-icon-search').locator('path')).toHaveCSS('fill', 'rgb(0, 102, 204)');
		});
	});

	test.describe('icons whose artwork previously ignored colour', () => {
		test('attach follows every colour token', async ({ page }) => {
			await page.setContent(
				['black', 'blue', 'grey', 'white']
					.map((colour) => `<ontario-icon-attach colour="${colour}"></ontario-icon-attach>`)
					.join(''),
			);
			await page.waitForChanges();
			const fills = await page
				.locator('ontario-icon-attach')
				.evaluateAll((icons) => icons.map((icon) => getComputedStyle(icon.shadowRoot!.querySelector('path')!).fill));

			expect(fills).toEqual(['rgb(26, 26, 26)', 'rgb(0, 102, 204)', 'rgb(102, 102, 102)', 'rgb(255, 255, 255)']);
		});

		for (const tag of ['ontario-icon-close-header', 'ontario-icon-menu-header']) {
			test(`${tag} is white by default and can be recoloured`, async ({ page }) => {
				await page.setContent(`
					<${tag} id="default"></${tag}>
					<${tag} id="blue" colour="blue"></${tag}>
					<${tag} id="invalid" colour="not-a-colour"></${tag}>
				`);
				await page.waitForChanges();

				await expect(page.locator('#default').locator('path')).toHaveCSS('fill', 'rgb(255, 255, 255)');
				await expect(page.locator('#blue').locator('path')).toHaveCSS('fill', 'rgb(0, 102, 204)');
				await expect(page.locator('#invalid').locator('path')).toHaveCSS('fill', 'rgb(255, 255, 255)');
			});
		}

		test('critical-alert-warning recolours the exclamation mark and keeps the white triangle', async ({ page }) => {
			await page.setContent(`
				<ontario-icon-critical-alert-warning id="default"></ontario-icon-critical-alert-warning>
				<ontario-icon-critical-alert-warning id="blue" colour="blue"></ontario-icon-critical-alert-warning>
				<ontario-icon-critical-alert-warning id="custom" colour="#cd0000"></ontario-icon-critical-alert-warning>
			`);
			await page.waitForChanges();
			const readFills = (id: string) =>
				page
					.locator(`#${id}`)
					.evaluate((icon) =>
						Array.from(icon.shadowRoot!.querySelectorAll('path, rect')).map((shape) => getComputedStyle(shape).fill),
					);

			expect(await readFills('default')).toEqual(['rgb(255, 255, 255)', 'rgb(26, 26, 26)', 'rgb(26, 26, 26)']);
			expect(await readFills('blue')).toEqual(['rgb(255, 255, 255)', 'rgb(0, 102, 204)', 'rgb(0, 102, 204)']);
			expect(await readFills('custom')).toEqual(['rgb(255, 255, 255)', 'rgb(205, 0, 0)', 'rgb(205, 0, 0)']);
		});

		test('the critical alert component still draws a black exclamation mark on a white triangle', async ({ page }) => {
			await page.setContent('<ontario-critical-alert><p>Critical alert text</p></ontario-critical-alert>');
			await page.waitForChanges();
			const fills = await page
				.locator('ontario-critical-alert')
				.evaluate((alert) =>
					Array.from(
						alert.shadowRoot!.querySelectorAll(
							'.ontario-critical-alert__icon svg path, .ontario-critical-alert__icon svg rect',
						),
					).map((shape) => getComputedStyle(shape).fill),
				);

			expect(fills).toEqual(['rgb(255, 255, 255)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)']);
		});

		test('the header menu and close icons stay white', async ({ page }) => {
			await page.setContent('<ontario-header type="ontario"></ontario-header>');
			await page.waitForChanges();
			const fills = await page
				.locator('ontario-header')
				.evaluate((header) =>
					Array.from(
						header.shadowRoot!.querySelectorAll(
							'.ontario-header__icon-container--white svg, .ontario-header__search-close svg',
						),
					).map((svg) => getComputedStyle(svg.querySelector('path')!).fill),
				);

			expect(fills.length).toBeGreaterThan(0);
			expect(new Set(fills)).toEqual(new Set(['rgb(255, 255, 255)']));
		});
	});
});
