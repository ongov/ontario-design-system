import { newE2EPage } from '@stencil/core/testing';

describe('ontario-hint-expander', () => {
	it('render a default hint expander', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-hint-expander></ontario-hint-expander>');
		const component = await page.find('ontario-hint-expander');
		const element = await page.find('ontario-hint-expander >>> div');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClass('ontario-hint-expander__container');
	});

	it('fires the onclick event', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-hint-expander>Element Content</ontario-hint-expander>');
		const changedEvent = await page.spyOnEvent('click');
		const component = await page.find('ontario-hint-expander');
		component.click();
		await page.waitForChanges();
		expect(changedEvent).toHaveReceivedEventTimes(1);
	});
});
