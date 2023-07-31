import { newE2EPage } from '@stencil/core/testing';

xdescribe('ontario-table', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-table></ontario-table>');

		const element = await page.find('ontario-table');
		expect(element).toHaveClass('hydrated');
	});
});
