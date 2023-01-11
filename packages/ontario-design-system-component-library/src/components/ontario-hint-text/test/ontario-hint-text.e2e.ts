import { newE2EPage } from '@stencil/core/testing';

describe('ontario-hint-text', () => {
	describe('render', () => {
		it('renders', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-hint-text></ontario-hint-text>');

			const component = await page.find('ontario-hint-text');
			const element = await page.find('ontario-hint-text >>> p');

			expect(component).toHaveClass('hydrated');
			expect(element).toHaveClass('ontario-hint');
		});

		describe('render changes', () => {
			let page: any;
			let component: any;
			let element: any;

			beforeEach(async () => {
				page = await newE2EPage();
				await page.setContent('<ontario-hint-text></ontario-hint-text>');
				component = await page.find('ontario-hint-text');
				element = await page.find('ontario-hint-text >>> p');
			});

			it('renders changes to the id property', async () => {
				component.setProperty('elementId', 'testId');
				await page.waitForChanges();
				expect(element).toEqualAttributes({
					id: 'testId',
				});
			});
		});
	});
});
