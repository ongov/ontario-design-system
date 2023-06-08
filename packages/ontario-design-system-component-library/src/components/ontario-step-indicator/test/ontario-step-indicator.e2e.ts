import { newE2EPage } from '@stencil/core/testing';

describe('ontario-step-indicator', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-step-indicator></ontario-step-indicator>');

		const component = await page.find('ontario-step-indicator');

		expect(component).toHaveClass('hydrated');
	});

	it('renders back button with link', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-step-indicator show-back-button="true" back-button-url="https://designsystem.ontario.ca/"></ontario-step-indicator>',
		);

		const component = await page.find('ontario-step-indicator');
		const element = await page.find('ontario-step-indicator >>> a');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--tertiary']);
	});
});
