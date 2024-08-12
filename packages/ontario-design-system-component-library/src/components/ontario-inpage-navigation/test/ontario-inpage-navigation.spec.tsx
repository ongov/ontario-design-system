import { newSpecPage } from '@stencil/core/testing';
import { OntarioInpageNavigation } from '../ontario-inpage-navigation';

describe('ontario-inpage-navigation', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioInpageNavigation],
			html: `<ontario-inpage-navigation></ontario-inpage-navigation>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-inpage-navigation>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-inpage-navigation>
    `);
	});
});
