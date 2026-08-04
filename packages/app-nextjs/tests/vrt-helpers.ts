import { type Page } from '@playwright/test';

export { expectVrtScreenshot } from '../../ontario-design-system-component-library/src/utils/tests/vrt-screenshot';

export const waitForInteractionPaint = async (page: Page) => {
	await page.evaluate(
		() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
	);
};
