import { expect, type Locator, type Page } from '@playwright/test';

type VrtScreenshotOptions = {
	maxDiffPixels?: number;
};

export const waitForInteractionPaint = async (page: Page) => {
	await page.evaluate(
		() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
	);
};

export const expectVrtScreenshot = async (locator: Locator, options: VrtScreenshotOptions = {}) => {
	await expect(locator).toHaveScreenshot({
		animations: 'disabled',
		caret: 'hide',
		...options,
	});
};
