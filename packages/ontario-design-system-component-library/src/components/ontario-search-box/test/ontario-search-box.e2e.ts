import { newE2EPage } from '@stencil/core/testing';

describe('ontario-search-box', () => {
	//checks if the component has hydrated class
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent(`<ontario-search-box></ontario-search-box>`);
		const element = await page.find('ontario-search-box');
		expect(element).toHaveClass('hydrated');
	});

	it('checks the onclick event', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-search-box></ontario-search-box>');
		const changedEvent = await page.spyOnEvent('click');
		const component = await page.find('ontario-search-box >>> #ontario-search-submit');
		component.click();
		await page.waitForChanges();
		expect(changedEvent).toHaveReceivedEventTimes(1);
	});
});
