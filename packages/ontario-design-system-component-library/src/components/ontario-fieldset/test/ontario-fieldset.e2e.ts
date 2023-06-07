import { newE2EPage } from '@stencil/core/testing';

describe('ontario-fieldset', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-fieldset></ontario-fieldset>');

		const element = await page.find('ontario-fieldset');
		expect(element).toHaveClass('hydrated');
	});

	it('should render the large legend class when the legendSize property is set to `large`', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-fieldset legend-size="large" legend="What is your delivery address?"></ontario-fieldset>',
		);

		const legend = await page.find('ontario-fieldset >>> legend');
		expect(legend).toHaveClasses(['ontario-fieldset__legend', 'ontario-fieldset__legend--large']);
	});

	it('should render the heading legend class when the legendSize property is set to `large`', async () => {
		const page = await newE2EPage();
		await page.setContent(
			'<ontario-fieldset legend-size="heading" legend="What is your delivery address?"></ontario-fieldset>',
		);
		const legend = await page.find('ontario-fieldset >>> legend');

		expect(legend).toHaveClasses(['ontario-fieldset__legend', 'ontario-fieldset__legend--heading']);
		expect(legend.innerHTML).toEqual('<h1>What is your delivery address?</h1>');
	});
});
