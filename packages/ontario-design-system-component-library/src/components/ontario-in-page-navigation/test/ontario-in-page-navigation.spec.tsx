import { newSpecPage } from '@stencil/core/testing';
import { OntarioInPageNavigation } from '../ontario-in-page-navigation';

describe('ontario-in-page-navigation', () => {
	it('renders with no information', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigation],
			html: `<ontario-in-page-navigation></ontario-in-page-navigation>`,
		});

		expect(page.root).toBeTruthy();
	});

	it('renders with child item elements', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigation],
			html: `<ontario-in-page-navigation>
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`,
		});

		expect(page.root).toBeTruthy();
	});
});
