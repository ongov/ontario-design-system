import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { cardLink, image, imageAltText, label } from './ontario-card-test-data';

const description = 'Card description text';

test.describe('ontario-card', () => {
	const renderCard = async (page: E2EPage, attributes: string): Promise<Locator> => {
		await page.setContent(`<ontario-card ${attributes}></ontario-card>`);
		await page.waitForChanges();
		const host = page.locator('ontario-card');
		await expect(host).toHaveClass(/hydrated/);
		return host;
	};

	const expectNoAxeViolations = async (page: E2EPage) => {
		// `listitem` is disabled: the card renders its own `li` and the `ul` comes from `ontario-card-collection`.
		const results = await new AxeBuilder({ page }).include('ontario-card').disableRules(['listitem']).analyze();
		expect(results.violations).toHaveLength(0);
	};

	test.describe('rendering', () => {
		test('renders the card list item in the shadow root', async ({ page }) => {
			const host = await renderCard(page, `label="${label}"`);

			await expect(host.locator('li.ontario-card')).toBeVisible();
		});

		test('renders the label as an h2 link by default', async ({ page }) => {
			const host = await renderCard(page, `label="${label}"`);

			const heading = host.getByRole('heading', { level: 2, name: label });
			await expect(heading).toBeVisible();
			await expect(heading.getByRole('link', { name: label })).toHaveAttribute('href', '#');
		});

		test('renders the label at the requested heading level', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" heading-level="h4"`);

			await expect(host.getByRole('heading', { level: 4, name: label })).toBeVisible();
			await expect(host.locator('h2')).toHaveCount(0);
		});

		test('renders the description when provided', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" description="${description}"`);

			await expect(host.locator('.ontario-card__description')).toHaveText(description);
			await expect(host.locator('li.ontario-card')).not.toContainClass('ontario-card__description-false');
		});

		test('omits the description container when no description is provided', async ({ page }) => {
			const host = await renderCard(page, `label="${label}"`);

			await expect(host.locator('.ontario-card__description')).toHaveCount(0);
			await expect(host.locator('li.ontario-card')).toContainClass('ontario-card__description-false');
		});

		test('does not render an image when none is provided', async ({ page }) => {
			const host = await renderCard(page, `label="${label}"`);

			await expect(host.locator('.ontario-card__image-container')).toHaveCount(0);
			await expect(host.locator('.ontario-card__text-container')).not.toContainClass('ontario-card--image-true');
		});

		test('renders the image with alt text and links it to the card link', async ({ page }) => {
			const host = await renderCard(
				page,
				`label="${label}" image="${image}" image-alt-text="${imageAltText}" card-link="${cardLink}"`,
			);

			const imageLink = host.locator('.ontario-card__image-container a');
			await expect(imageLink).toHaveAttribute('href', cardLink);
			await expect(imageLink.locator('img.ontario-card__image')).toHaveAttribute('alt', imageAltText);
			await expect(host.locator('.ontario-card__text-container')).toContainClass('ontario-card--image-true');
		});

		test('renders an empty alt attribute for decorative images by default', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" image="${image}"`);

			await expect(host.locator('img.ontario-card__image')).toHaveAttribute('alt', '');
		});

		test('applies the card link to the heading link', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" card-link="${cardLink}"`);

			await expect(host.getByRole('link', { name: label })).toHaveAttribute('href', cardLink);
		});

		test('uses aria-label-text as the accessible name of both links', async ({ page }) => {
			const host = await renderCard(
				page,
				`label="${label}" image="${image}" aria-label-text="Read more about the card topic"`,
			);

			const links = host.locator('a');
			await expect(links).toHaveCount(2);
			await expect(links.nth(0)).toHaveAttribute('aria-label', 'Read more about the card topic');
			await expect(links.nth(1)).toHaveAttribute('aria-label', 'Read more about the card topic');
			await expect(host.getByRole('link', { name: 'Read more about the card topic' })).toHaveCount(2);
		});
	});

	test.describe('layout', () => {
		test('applies the vertical layout classes by default', async ({ page }) => {
			const host = await renderCard(page, `label="${label}"`);

			const card = host.locator('li.ontario-card');
			await expect(card).toContainClass('ontario-card__card-type--basic ontario-card--position-vertical');
			await expect(card).not.toContainClass('ontario-card__card-type--horizontal');
		});

		test('applies the horizontal layout with a left, one-third image by default', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" image="${image}" layout-direction="horizontal"`);

			const card = host.locator('li.ontario-card');
			await expect(card).toContainClass(
				'ontario-card__card-type--horizontal ontario-card__image-left ontario-card__image-size-one-third',
			);
			await expect(card).toHaveCSS('flex-direction', 'row');
		});

		test('applies the horizontal image position and size props', async ({ page }) => {
			const host = await renderCard(
				page,
				`label="${label}" image="${image}" layout-direction="horizontal" horizontal-image-position-type="right" horizontal-image-size-type="one-fourth"`,
			);

			const card = host.locator('li.ontario-card');
			await expect(card).toContainClass('ontario-card__image-right ontario-card__image-size-one-fourth');
			await expect(card).toHaveCSS('flex-direction', 'row-reverse');
		});

		test('falls back to the vertical layout for an invalid layout direction', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" layout-direction="diagonal"`);

			await expect(host.locator('li.ontario-card')).toContainClass('ontario-card--position-vertical');
		});

		test('falls back to an h2 for an invalid heading level', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" heading-level="h9"`);

			await expect(host.getByRole('heading', { level: 2, name: label })).toBeVisible();
		});

		// Known defect: the component never adds the ontario-card--no-image class that the SCSS relies on.
		// `test.fail` expects this to fail; once the defect is fixed, the run will fail and the annotation should become `test`.
		test.fail('uses the full width for the text in a horizontal card without an image', async ({ page }) => {
			const host = await renderCard(
				page,
				`label="${label}" description="${description}" layout-direction="horizontal"`,
			);

			const cardWidth = await host.locator('li.ontario-card').evaluate((el) => el.clientWidth);
			const textWidth = await host.locator('.ontario-card__text-container').evaluate((el) => el.clientWidth);
			expect(textWidth).toBe(cardWidth);
		});
	});

	test.describe('header colour', () => {
		test('applies the header colour to the heading only when a description is provided', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" description="${description}" header-colour="lightTeal"`);

			await expect(host.locator('.ontario-card__heading')).toContainClass('ontario-card__heading--light-teal');
			await expect(host.locator('li.ontario-card')).not.toContainClass('ontario-card__background--light-teal');
		});

		test('applies the header colour to the whole card when no description is provided', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" header-colour="lightTeal"`);

			await expect(host.locator('.ontario-card__heading')).toContainClass('ontario-card__heading--light-teal');
			await expect(host.locator('li.ontario-card')).toContainClass('ontario-card__background--light-teal');
		});

		test('ignores an invalid header colour', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" header-colour="pink"`);

			await expect(host.locator('.ontario-card__heading')).toHaveClass('ontario-card__heading');
			//check that no background class exists because pink is an invalid colour
			await expect(host.locator('li.ontario-card')).not.toHaveClass(/ontario-card__background--/);
		});

		// Known defect: blue and lightBlue are accepted values but have no styles in ontario-card.scss.
		// `test.fail` expects this to fail; once the defect is fixed, the run will fail and the annotation should become `test`.
		for (const colour of ['blue', 'lightBlue']) {
			test.fail(`renders a coloured heading background for ${colour}`, async ({ page }) => {
				const host = await renderCard(page, `label="${label}" description="${description}" header-colour="${colour}"`);

				await expect(host.locator('.ontario-card__heading')).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
			});
		}

		// Known defect: darkAccent sets a near-black heading background but the heading link keeps its black text colour,
		// so the label is invisible. axe doesn't report it, so this checks the computed colours directly.
		// `test.fail` expects this to fail; once the defect is fixed, the run will fail and the annotation should become `test`.
		test.fail('renders legible heading text on the dark accent header colour', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" description="${description}" header-colour="darkAccent"`);

			const heading = host.locator('.ontario-card__heading');
			const background = await heading.evaluate((el) => getComputedStyle(el).backgroundColor);
			const textColour = await heading.getByRole('link').evaluate((el) => getComputedStyle(el).color);
			expect(textColour).not.toBe(background);
		});
	});

	test.describe('property updates', () => {
		test('re-renders when props change after load', async ({ page }) => {
			const host = await renderCard(page, `label="${label}"`);

			await host.evaluate((el: HTMLElement) => {
				el.setAttribute('label', 'Updated title');
				el.setAttribute('layout-direction', 'horizontal');
				el.setAttribute('header-colour', 'teal');
			});
			await page.waitForChanges();

			await expect(host.getByRole('link', { name: 'Updated title' })).toBeVisible();
			await expect(host.locator('li.ontario-card')).toContainClass('ontario-card__card-type--horizontal');
			await expect(host.locator('.ontario-card__heading')).toContainClass('ontario-card__heading--teal');
		});
	});

	test.describe('keyboard and pointer interaction', () => {
		test('exposes a single tab stop even when an image link is rendered', async ({ page }) => {
			await page.setContent(`
				<button id="before">Before</button>
				<ontario-card label="${label}" image="${image}" card-link="${cardLink}"></ontario-card>
				<button id="after">After</button>
			`);
			await page.waitForChanges();

			const host = page.locator('ontario-card');
			await expect(host).toHaveClass(/hydrated/);
			await expect(host.locator('.ontario-card__image-container a')).toHaveAttribute('tabindex', '-1');

			await page.locator('#before').focus();
			await page.keyboard.press('Tab');
			await expect(host.getByRole('link', { name: label })).toBeFocused();

			await page.keyboard.press('Tab');
			await expect(page.locator('#after')).toBeFocused();
		});

		test('follows the card link when Enter is pressed on the focused heading link', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" card-link="${cardLink}"`);

			await host.getByRole('link', { name: label }).focus();
			await page.keyboard.press('Enter');

			await expect(page).toHaveURL(/#card-destination$/);
		});

		test('follows the card link when clicking the description area', async ({ page }) => {
			const host = await renderCard(page, `label="${label}" description="${description}" card-link="${cardLink}"`);

			const card = host.locator('li.ontario-card');
			const box = await card.boundingBox();
			await card.click({ position: { x: 10, y: (box?.height ?? 20) - 10 } });

			await expect(page).toHaveURL(/#card-destination$/);
		});
	});

	test.describe('responsive behaviour', () => {
		const headingPaddingAt = async (page: E2EPage, width: number) => {
			await page.setViewportSize({ width, height: 800 });
			const host = await renderCard(page, `label="${label}" description="${description}"`);
			return host.locator('.ontario-card__heading').evaluate((el) => parseFloat(getComputedStyle(el).paddingLeft));
		};

		const cardMarginAt = async (page: E2EPage, width: number) => {
			await page.setViewportSize({ width, height: 800 });
			const host = await renderCard(page, `label="${label}"`);
			return host.locator('li.ontario-card').evaluate((el) => parseFloat(getComputedStyle(el).marginBottom));
		};

		test('reduces heading padding at and below the 1168px medium breakpoint', async ({ page }) => {
			const above = await headingPaddingAt(page, 1169);
			const at = await headingPaddingAt(page, 1168);

			expect(at).toBeLessThan(above);
		});

		test('increases the bottom margin at and below the 640px small breakpoint', async ({ page }) => {
			const above = await cardMarginAt(page, 641);
			const at = await cardMarginAt(page, 640);

			expect(at).toBeGreaterThan(above);
		});
	});

	test.describe('accessibility', () => {
		test('has no axe violations for a vertical card with an image', async ({ page }) => {
			await renderCard(
				page,
				`label="${label}" description="${description}" image="${image}" image-alt-text="${imageAltText}" card-link="${cardLink}"`,
			);

			await expectNoAxeViolations(page);
		});

		test('has no axe violations for a horizontal card with an image', async ({ page }) => {
			await renderCard(
				page,
				`label="${label}" description="${description}" image="${image}" image-alt-text="${imageAltText}" layout-direction="horizontal" card-link="${cardLink}"`,
			);

			await expectNoAxeViolations(page);
		});

		// Known defect: with the default empty alt text, the image link has no accessible name.
		// `test.fail` expects this to fail; once the defect is fixed, the run will fail and the annotation should become `test`.
		test.fail('has no axe violations for a decorative image with the default empty alt text', async ({ page }) => {
			await renderCard(page, `label="${label}" description="${description}" image="${image}" card-link="${cardLink}"`);

			await expectNoAxeViolations(page);
		});

		test('has no axe violations for the dark accent header colour', async ({ page }) => {
			await renderCard(
				page,
				`label="${label}" description="${description}" header-colour="darkAccent" card-link="${cardLink}"`,
			);

			await expectNoAxeViolations(page);
		});

		test('has no axe violations for a light header colour without a description', async ({ page }) => {
			await renderCard(page, `label="${label}" header-colour="lightTeal" card-link="${cardLink}"`);

			await expectNoAxeViolations(page);
		});

		test('has no axe violations for a header colour with a description', async ({ page }) => {
			await renderCard(
				page,
				`label="${label}" description="${description}" header-colour="gold" card-link="${cardLink}"`,
			);

			await expectNoAxeViolations(page);
		});
	});
});
