import { newE2EPage } from '@stencil/core/testing';

describe('ontario-page-alert', () => {
	it('renders default informational page alert', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-page-alert heading="This is informational page alert"></ontario-page-alert>');

		const component = await page.find('ontario-page-alert');
		const element = await page.find('ontario-page-alert >>> div');
		const iconElement = await page.find('ontario-page-alert >>> ontario-icon-alert-information');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-alert', 'ontario-alert--informational']);
		expect(iconElement).not.toBeNull();
		expect(element.textContent).toEqual('This is informational page alert');
	});

	it('renders error page alert', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-page-alert type="error" heading="This is error page alert"></ontario-page-alert>');

		const component = await page.find('ontario-page-alert');
		const element = await page.find('ontario-page-alert >>> div');
		const iconElement = await page.find('ontario-page-alert >>> ontario-icon-alert-error');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-alert', 'ontario-alert--error']);
		expect(iconElement).not.toBeNull();
		expect(element.textContent).toEqual('This is error page alert');
	});

	it('renders warning page alert', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-page-alert type="warning" heading="This is warning page alert"></ontario-page-alert>',
		);

		const component = await page.find('ontario-page-alert');
		const element = await page.find('ontario-page-alert >>> div');
		const iconElement = await page.find('ontario-page-alert >>> ontario-icon-alert-warning');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-alert', 'ontario-alert--warning']);
		expect(iconElement).not.toBeNull();
		expect(element.textContent).toEqual('This is warning page alert');
	});

	it('renders success page alert', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-page-alert type="success" heading="This is success page alert"></ontario-page-alert>',
		);

		const component = await page.find('ontario-page-alert');
		const element = await page.find('ontario-page-alert >>> div');
		const iconElement = await page.find('ontario-page-alert >>> ontario-icon-alert-success');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-alert', 'ontario-alert--success']);
		expect(iconElement).not.toBeNull();
		expect(element.textContent).toEqual('This is success page alert');
	});
});
