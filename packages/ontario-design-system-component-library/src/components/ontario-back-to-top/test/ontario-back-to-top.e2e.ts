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

		// scroll down the page

		// this method was taken from: https://github.com/microsoft/playwright/issues/4302#issuecomment-1132919529
		// setting delay function and calling it after setting the scrollTo was the only way to successfully get the scroll to work
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

	// These tests won't work!!
	xit('should trigger the window to scroll back to the top of the page when clicked', async () => {
		const page = await newE2EPage();
		await page.setContent(mockBTTContent);
		const component = await page.find('ontario-back-to-top');
		const element = await page.find('ontario-back-to-top >>> button');

		// scroll down the page
		await page.evaluate(async () => {
			const delay = (miliseconds: number) => new Promise((resolve) => setTimeout(resolve, miliseconds));
			window.scrollTo(0, 500);
			await delay(100);
		});

		// Simulate a click on the element
		await component.click();
		// await element.click();

		await page.waitForChanges();

		console.log(element.className);

		////////////////////////
		//// Other attempts ////
		///////////////////////

		// const element = await page.evaluateHandle(async (mockBTTContent) => {
		// 	const el = document.createElement('div');
		// 	el.innerHTML = mockBTTContent;

		// 	const delay = (miliseconds: number) => new Promise((resolve) => setTimeout(resolve, miliseconds));
		// 	window.scrollTo(0, 500);
		// 	await delay(100);

		// 	return el;
		// }, mockBTTContent);

		// const component = element.$eval('ontario-back-to-top', (el) => el);

		// await page.evaluate(async (component) => {
		// 	(await component).click();
		// }, component);

		// const classNames = await page.evaluate(
		// 	(el) => el.shadowRoot?.querySelector('button')?.textContent,
		// 	element
		// );

		// console.log(classNames)
	});
});
