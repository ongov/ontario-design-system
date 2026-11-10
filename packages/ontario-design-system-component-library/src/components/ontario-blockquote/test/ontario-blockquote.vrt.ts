import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

const quoteText = 'This is the quote';
const longQuoteText =
	'When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one that has opened for us.';
const attributionText = 'Homer Simpson';
const bylineText = 'Ontario Digital Service';
const slottedQuoteText = 'Quote from slotted content';

/**
 * The blockquote has small-breakpoint rules for its font size, line height and margin, so the narrow viewport shots
 * need a viewport below the small breakpoint (`40em`, 640px).
 */
const narrowViewport = { width: 375, height: 800 };

test.describe('ontario-blockquote', () => {
	/**
	 * Renders the markup with the global styles (for the Raleway font the blockquote uses) in a wrapper of a fixed
	 * width, then waits for the component to hydrate and the fonts to load.
	 */
	const renderBlockquote = async (page: E2EPage, markup: string, width = 640): Promise<Locator> => {
		await page.setContent(
			withGlobalStyles(`
				<div id="vrt-blockquote" style="width: ${width}px; padding: 16px;">
					${markup}
				</div>
			`),
		);
		await page.waitForChanges();
		await expect(page.locator('ontario-blockquote')).toHaveClass(/hydrated/);
		await page.evaluate(async () => {
			await document.fonts.ready;
		});
		return page.locator('#vrt-blockquote');
	};

	test('renders a short quote', async ({ page }) => {
		const wrapper = await renderBlockquote(page, `<ontario-blockquote quote="${quoteText}"></ontario-blockquote>`);

		await expect(page.locator('ontario-blockquote').locator('blockquote')).toHaveClass(/ontario-blockquote--short/);
		await expectVrtScreenshot(wrapper);
	});

	test('renders a quote longer than 140 characters', async ({ page }) => {
		const wrapper = await renderBlockquote(page, `<ontario-blockquote quote="${longQuoteText}"></ontario-blockquote>`);

		await expect(page.locator('ontario-blockquote').locator('blockquote')).not.toHaveClass(/ontario-blockquote--short/);
		await expectVrtScreenshot(wrapper);
	});

	test('renders the attribution', async ({ page }) => {
		const wrapper = await renderBlockquote(
			page,
			`<ontario-blockquote quote="${quoteText}" attribution="${attributionText}"></ontario-blockquote>`,
		);

		await expect(page.locator('ontario-blockquote').locator('cite.ontario-blockquote__attribution')).toHaveText(
			attributionText,
		);
		await expectVrtScreenshot(wrapper);
	});

	test('renders the byline', async ({ page }) => {
		const wrapper = await renderBlockquote(
			page,
			`<ontario-blockquote quote="${quoteText}" byline="${bylineText}"></ontario-blockquote>`,
		);

		await expect(page.locator('ontario-blockquote').locator('cite.ontario-blockquote__byline')).toHaveText(bylineText);
		await expectVrtScreenshot(wrapper);
	});

	test('renders both the attribution and the byline', async ({ page }) => {
		const wrapper = await renderBlockquote(
			page,
			`<ontario-blockquote quote="${quoteText}" attribution="${attributionText}" byline="${bylineText}"></ontario-blockquote>`,
		);

		await expect(page.locator('ontario-blockquote').locator('cite')).toHaveCount(2);
		await expectVrtScreenshot(wrapper);
	});

	test('renders slotted content when no quote is provided', async ({ page }) => {
		const wrapper = await renderBlockquote(page, `<ontario-blockquote>${slottedQuoteText}</ontario-blockquote>`);

		await expect(page.locator('ontario-blockquote').locator('blockquote')).toContainText(slottedQuoteText);
		await expectVrtScreenshot(wrapper);
	});

	test.describe('below the small breakpoint', () => {
		test.use({ viewport: narrowViewport });

		test('renders a short quote with an attribution and a byline', async ({ page }) => {
			const wrapper = await renderBlockquote(
				page,
				`<ontario-blockquote quote="${quoteText}" attribution="${attributionText}" byline="${bylineText}"></ontario-blockquote>`,
				narrowViewport.width - 48,
			);

			await expectVrtScreenshot(wrapper);
		});

		test('renders a quote longer than 140 characters with an attribution', async ({ page }) => {
			const wrapper = await renderBlockquote(
				page,
				`<ontario-blockquote quote="${longQuoteText}" attribution="${attributionText}"></ontario-blockquote>`,
				narrowViewport.width - 48,
			);

			await expectVrtScreenshot(wrapper);
		});
	});
});
