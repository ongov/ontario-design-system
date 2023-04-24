import { newE2EPage } from '@stencil/core/testing';
import { mockBTTContent } from './mock-page-content';

describe('ontario-back-to-top', () => {
	it('should be hidden on page load', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-back-to-top></ontario-back-to-top>');
		const element = await page.find('ontario-back-to-top >>> button');
		const styles = await element.getComputedStyle();

		expect(styles.visibility).toBe('hidden');
		expect(element).toHaveClass('ontario-back-to-top');
		expect(element).not.toHaveClass('active');
	});

	it('should be visible when the window is scrolled down beyond 200px', async () => {
		const page = await newE2EPage();
		await page.setContent(mockBTTContent);

		// scroll down the page
		// this method was taken from: https://github.com/microsoft/playwright/issues/4302#issuecomment-1132919529
		// setting delay function and calling it after setting the scrollTo was the only way to successfully get the scroll to work
		await page.evaluate(async () => {
			window.scrollTo(0, 500);
			await new Promise((resolve) => setTimeout(resolve, 100));
		});

		const element = await page.find('ontario-back-to-top >>> button');
		const styles = await element.getComputedStyle();

		expect(element.className).toEqual('ontario-back-to-top active');
		expect(styles?.visibility).toBe('visible');
	});

	it('should trigger the window to scroll back to the top of the page when clicked', async () => {
		const page = await newE2EPage();
		await page.setContent(mockBTTContent);

		// scroll down the page
		await page.evaluate(async () => {
			window.scrollTo(0, 500);
			await new Promise((resolve) => setTimeout(resolve, 100));
		});

		// wait for the scroll event to trigger and update the component's state
		await page.waitForChanges();
		const element = await page.find('ontario-back-to-top >>> button');

		// click the button
		await element.click();

		// Wait for the scroll animation to complete
		await new Promise((resolve) => setTimeout(resolve, 500));

		const pageDetails = await page.evaluate(() => {
			const component = window.document.getElementsByTagName('ontario-back-to-top')[0];

			return {
				scrollY: window.scrollY,
				element: component.shadowRoot?.firstElementChild,
				elementClassName: component.shadowRoot?.firstElementChild?.className,
			};
		});

		expect(pageDetails.scrollY).toEqual(0);
		expect(pageDetails.elementClassName).toEqual('ontario-back-to-top');

		const styles = await element.getComputedStyle();
		expect(styles.visibility).toBe('hidden');
	});
});
