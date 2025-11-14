import { newE2EPage } from '@stencil/core/testing';

describe('ontario-header-overflow-menu', () => {
	it('should handle menu toggle correctly', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-header-overflow-menu></ontario-header-overflow-menu>');

		const component = await page.find('ontario-header-overflow-menu');

		// Simulate clicking the toggle button
		const button = await page.find('ontario-header-overflow-menu >>> button');
		expect(button).not.toBeNull(); // Ensure button exists

		await button.click();
		await page.waitForChanges();

		const menuIsOpen = await component.getProperty('menuIsOpen');
		expect(menuIsOpen).toBe(true);
	});
});
