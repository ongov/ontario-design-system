import { newSpecPage } from '@stencil/core/testing';
import { OntarioSearchBox } from '../ontario-search-box';

describe('ontario-search-box', () => {
	it('should render the expected html', async () => {
		const page = await newSpecPage({
			components: [OntarioSearchBox],
			html: `<ontario-search-box id="ontario-search-box" class="hydrated"></ontario-search-box>`,
		});

		expect(page.root).toMatchSnapshot();
	});

	it('should render a default search box element', async () => {
		const page = await newSpecPage({
			components: [OntarioSearchBox],
			html: `<ontario-search-box></ontario-search-box>`,
		});

		expect(page.root).toMatchSnapshot();
	});
});
