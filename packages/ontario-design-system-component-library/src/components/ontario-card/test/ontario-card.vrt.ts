import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';
import { cardLink, image, imageAltText, label } from './ontario-card-test-data';

const description = 'Card description text that wraps onto a second line.';

const verticalWithImage = `label="${label}" description="${description}" image="${image}" image-alt-text="${imageAltText}" card-link="${cardLink}"`;

test.describe('ontario-card', () => {
	const renderCard = async (page: E2EPage, attributes: string, width = 360): Promise<Locator> => {
		await page.setContent(
			withGlobalStyles(`
				<div id="vrt-card" style="width: ${width}px; padding: 16px;">
					<ontario-card ${attributes}></ontario-card>
				</div>
			`),
		);
		await page.waitForChanges();
		await expect(page.locator('ontario-card')).toHaveClass(/hydrated/);
		await page.evaluate(async () => {
			await document.fonts.ready;
		});
		return page.locator('#vrt-card');
	};

	test.describe('layouts', () => {
		test('vertical with image and description', async ({ page }) => {
			const wrapper = await renderCard(page, verticalWithImage);
			await expectVrtScreenshot(wrapper);
		});

		test('vertical with header colour and description', async ({ page }) => {
			const wrapper = await renderCard(
				page,
				`label="${label}" description="${description}" header-colour="lightTeal" card-link="${cardLink}"`,
			);
			await expectVrtScreenshot(wrapper);
		});

		for (const colour of ['blue', 'lightBlue']) {
			test(`vertical with ${colour} header colour and description`, async ({ page }) => {
				const wrapper = await renderCard(
					page,
					`label="${label}" description="${description}" header-colour="${colour}" card-link="${cardLink}"`,
				);
				await expectVrtScreenshot(wrapper);
			});
		}

		test('vertical with header colour filling the card when there is no description', async ({ page }) => {
			const wrapper = await renderCard(page, `label="${label}" header-colour="lightTeal" card-link="${cardLink}"`);
			await expectVrtScreenshot(wrapper);
		});

		test('horizontal with a left, one-third image', async ({ page }) => {
			const wrapper = await renderCard(
				page,
				`label="${label}" description="${description}" image="${image}" image-alt-text="${imageAltText}" layout-direction="horizontal" card-link="${cardLink}"`,
				640,
			);
			await expectVrtScreenshot(wrapper);
		});

		test('horizontal with a right, one-fourth image', async ({ page }) => {
			const wrapper = await renderCard(
				page,
				`label="${label}" description="${description}" image="${image}" image-alt-text="${imageAltText}" layout-direction="horizontal" horizontal-image-position-type="right" horizontal-image-size-type="one-fourth" card-link="${cardLink}"`,
				640,
			);
			await expectVrtScreenshot(wrapper);
		});
	});

	test.describe('interaction states', () => {
		test('hover', async ({ page }) => {
			const wrapper = await renderCard(page, verticalWithImage);
			await page.locator('ontario-card').locator('li.ontario-card').hover();
			await expectVrtScreenshot(wrapper);
		});

		test('focus', async ({ page }) => {
			const wrapper = await renderCard(page, verticalWithImage);
			const headingLink = page.locator('ontario-card').getByRole('link', { name: label });
			await headingLink.focus();
			await expect(headingLink).toBeFocused();
			await expectVrtScreenshot(wrapper);
		});

		test('active', async ({ page }) => {
			const wrapper = await renderCard(page, verticalWithImage);
			await page.locator('ontario-card').locator('li.ontario-card').hover();
			await page.mouse.down();
			try {
				await page.evaluate(
					() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
				);
				await expectVrtScreenshot(wrapper);
			} finally {
				await page.mouse.up();
			}
		});
	});

	test.describe('responsive', () => {
		test('narrow viewport below the small breakpoint', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 800 });
			const wrapper = await renderCard(page, verticalWithImage, 320);
			await expectVrtScreenshot(wrapper);
		});
	});
});
