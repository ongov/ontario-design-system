import { E2EElement, newE2EPage } from '@stencil/core/testing';
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

		await page.evaluate(async () => {
			const delay = (miliseconds: number) => new Promise((resolve) => setTimeout(resolve, miliseconds));
			window.scrollTo(0, 500);
			await delay(100);
		});

		const element = await page.find('ontario-back-to-top >>> button');
		const styles = await element.getComputedStyle();

		expect(element.className).toEqual('ontario-back-to-top active');
		expect(styles?.visibility).toBe('visible');
	});

	it('should trigger the window to scroll back to the top of the page when clicked', async () => {
		const page = await newE2EPage();
		await page.setContent(mockBTTContent);

		await page.evaluate(async () => {
			const delay = (miliseconds: number) => new Promise((resolve) => setTimeout(resolve, miliseconds));
			window.scrollTo(0, 500);

			await delay(100);
		});

		await page.click('ontario-back-to-top');
		await page.waitForChanges();

		const element = await page.find('ontario-back-to-top >>> button');
		console.log(element.className);
	});
});
