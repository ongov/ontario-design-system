import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';

const headingContent = 'This is an aside heading';

const slottedContent = `
	<p>
		As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of
		global emissions.
	</p>
	<p><a href="#">Learn more about Canada's global emissions.</a></p>
`;

/**
 * Highlight colours other than the default (`teal`), which is covered by the default render test.
 */
const highlightColours = ['gold', 'yellow', 'taupe', 'green', 'lime', 'sky', 'blue', 'purple'] as const;

/**
 * The coloured left border is well under 1% of the pixels in a screenshot, and Playwright's default pixel `threshold`
 * (`0.2`) can't tell one dark border colour from another, so by default a colour change still passes. A low `threshold`
 * with only a handful of pixels allowed to differ makes a change to the border colour fail the test.
 */
const colourSensitiveOptions = { maxDiffPixels: 100, threshold: 0.02 };

test.describe('ontario-aside', () => {
	const renderAside = async (page: E2EPage, attributes: string, content = slottedContent): Promise<Locator> => {
		await page.setContent(
			withGlobalStyles(`
				<div id="vrt-aside" style="width: 640px; padding: 16px;">
					<ontario-aside ${attributes}>${content}</ontario-aside>
				</div>
			`),
		);
		await page.waitForChanges();
		await expect(page.locator('ontario-aside')).toHaveClass(/hydrated/);
		await page.evaluate(async () => {
			await document.fonts.ready;
		});
		return page.locator('#vrt-aside');
	};

	test('renders the default aside', async ({ page }) => {
		const wrapper = await renderAside(
			page,
			`heading-type="h4" heading-content-type="string" heading-content="${headingContent}"`,
		);

		await expect(page.locator('ontario-aside').locator('aside')).toHaveClass(/ontario-border-highlight--teal/);
		await expectVrtScreenshot(wrapper, colourSensitiveOptions);
	});

	for (const colour of highlightColours) {
		test(`renders the ${colour} highlight colour`, async ({ page }) => {
			const wrapper = await renderAside(
				page,
				`heading-type="h4" heading-content-type="string" heading-content="${headingContent}" highlight-colour="${colour}"`,
			);

			await expect(page.locator('ontario-aside').locator('aside')).toHaveClass(
				new RegExp(`ontario-border-highlight--${colour}`),
			);
			await expectVrtScreenshot(wrapper, colourSensitiveOptions);
		});
	}

	test('renders the heading as HTML', async ({ page }) => {
		const wrapper = await renderAside(
			page,
			`heading-type="h4" heading-content-type="html" heading-content='<a href="#">Quick fact:</a>'`,
		);

		await expect(page.locator('ontario-aside').locator('h4 a')).toHaveText('Quick fact:');
		await expectVrtScreenshot(wrapper, colourSensitiveOptions);
	});

	test('renders content passed through the content property', async ({ page }) => {
		const wrapper = await renderAside(
			page,
			`heading-type="h4" heading-content-type="string" heading-content="${headingContent}" content="This is content passed via the content property."`,
			'',
		);

		await expect(page.locator('ontario-aside').locator('p')).toHaveText(
			'This is content passed via the content property.',
		);
		await expectVrtScreenshot(wrapper, colourSensitiveOptions);
	});
});
