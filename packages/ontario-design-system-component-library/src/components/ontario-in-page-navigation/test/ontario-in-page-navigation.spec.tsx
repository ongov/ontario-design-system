import { newSpecPage } from '@stencil/core/testing';
import { OntarioInPageNavigation } from '../ontario-in-page-navigation';

describe('ontario-inpage-navigation', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigation],
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
