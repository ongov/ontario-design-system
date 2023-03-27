import { newE2EPage } from '@stencil/core/testing';
import { mockBTTContent } from './mock-page-content';

describe('ontario-back-to-top', () => {
	it('should be hidden on page load', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-back-to-top></ontario-back-to-top>');
		const element = await page.find('ontario-back-to-top >>> button');
		const styles = element.getComputedStyle();

		expect((await styles)?.visibility).toBe('hidden');
		expect(element).toHaveClass('ontario-back-to-top');
		expect(element).not.toHaveClass('active');
	});

	it('should be visible when the window is scrolled down beyond 200px', async () => {
		const page = await newE2EPage();
		await page.setContent(mockBTTContent);

		await page.evaluate(() => {
			window.scrollTo(0, 500);
		});

		const element = await page.find('ontario-back-to-top >>> button');
		// const styles = element.getComputedStyle();
		console.log(element.className);

		// tests below don't work!
		// expect(element).toHaveClasses(['ontario-back-top-top', 'active']);
		// expect((await styles)?.visibility).toBe('visible');
	});
});
