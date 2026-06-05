import { newSpecPage } from '@stencil/core/testing';
import { OntarioInPageNavigationItem } from '../ontario-in-page-navigation-item';

describe('ontario-in-page-navigation-item', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="Section" href="#section"></ontario-in-page-navigation-item>',
		});

		expect(page.root).toBeTruthy();
	});
});
