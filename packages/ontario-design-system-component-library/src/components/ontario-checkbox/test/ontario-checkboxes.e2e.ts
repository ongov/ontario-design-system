import { newE2EPage } from '@stencil/core/testing';

describe('ontario-checkboxes', () => {
	it('renders checkbox', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-checkboxes></ontario-checkboxes>');
		const component = await page.find('ontario-checkboxes');
		expect(component).toHaveClass('hydrated');
	});
});

describe('events', () => {
	it('fires the onChange event', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-checkboxes></ontario-checkboxes>');
		const changeEvent = await page.spyOnEvent('change');
		const component = await page.find('ontario-checkboxes');

		component.triggerEvent('change');
		await page.waitForChanges();
		expect(changeEvent).toHaveReceivedEventTimes(1);
	});
});
