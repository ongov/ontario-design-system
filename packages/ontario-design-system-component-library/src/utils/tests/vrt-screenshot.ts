import { expect, type Locator } from '@playwright/test';

export type VrtScreenshotOptions = {
	maxDiffPixels?: number;
};

export const expectVrtScreenshot = async (locator: Locator, options: VrtScreenshotOptions = {}) => {
	await expect(locator).toHaveScreenshot({
		animations: 'disabled',
		caret: 'hide',
		...options,
	});
};
