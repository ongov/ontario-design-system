import { expect, type Locator } from '@playwright/test';

export type VrtScreenshotOptions = {
	maxDiffPixels?: number;
	/**
	 * How different two pixels need to be (from `0` to `1`) before they count as different. Playwright's default is
	 * `0.2`, which treats small colour changes (for example one dark border colour swapped for another) as identical.
	 */
	threshold?: number;
};

export const expectVrtScreenshot = async (locator: Locator, options: VrtScreenshotOptions = {}) => {
	await expect(locator).toHaveScreenshot({
		animations: 'disabled',
		caret: 'hide',
		...options,
	});
};
