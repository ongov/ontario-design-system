import { newE2EPage } from '@stencil/core/testing';

describe('ontario-loading-indicator', () => {
	it('should be hidden on page load', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-loading-indicator></ontario-loading-indicator>');
		const element = await page.find('ontario-loading-indicator >>> div');

		const styles = await element.getComputedStyle();
		const ariaHiddenValue = element.getAttribute('aria-hidden');

		expect(styles.display).toBe('none');
		expect(ariaHiddenValue).toBe('true');
	});

	it('should be visible when the `isLoading` prop is set to true', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-loading-indicator is-loading="true"></ontario-loading-indicator>');
		const element = await page.find('ontario-loading-indicator >>> div');

		const styles = await element.getComputedStyle();
		const ariaHiddenValue = element.getAttribute('aria-hidden');

		expect(styles.display).toBe('block');
		expect(ariaHiddenValue).toBe('false');
	});

	it('should have a `fullScreenOverlay` value of true when none is explicitly set', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-loading-indicator is-loading="true"></ontario-loading-indicator>');
		const component = await page.find('ontario-loading-indicator');
		const element = await page.find('ontario-loading-indicator >>> div');

		const styles = await element.getComputedStyle();
		const fullScreenValue = await component.getProperty('fullScreenOverlay');

		expect(fullScreenValue).toBe(true);
		expect(styles.position).toBe('fixed');
	});

	it('should update the overlay styles and value with the `fullScreenOverlay` prop is set to false', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-loading-indicator is-loading="true" full-screen-overlay="false"></ontario-loading-indicator>',
		);
		const component = await page.find('ontario-loading-indicator');
		const element = await page.find('ontario-loading-indicator >>> div');

		const styles = await element.getComputedStyle();
		const fullScreenValue = await component.getProperty('fullScreenOverlay');

		expect(fullScreenValue).toBe(false);
		expect(styles.position).toBe('absolute');
	});

	it('should render the default "Loading" content when no `message` prop is passed', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-loading-indicator></ontario-loading-indicator>');
		const element = await page.find('ontario-loading-indicator >>> div');

		expect(element.textContent).toEqual('Loading');
	});

	it('should update the content when the `message` prop is updated', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-loading-indicator></ontario-loading-indicator>');
		const component = await page.find('ontario-loading-indicator');
		const element = await page.find('ontario-loading-indicator >>> div');

		component.setAttribute('message', 'Data incoming...');
		await page.waitForChanges();

		expect(element.textContent).toEqual('Data incoming...');
	});
});
