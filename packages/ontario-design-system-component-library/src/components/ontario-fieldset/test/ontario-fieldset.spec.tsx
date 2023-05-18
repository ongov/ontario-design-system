import { newSpecPage } from '@stencil/core/testing';
import { OntarioFieldset } from '../ontario-fieldset';

describe('ontario-fieldset', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioFieldset],
			html: `<ontario-fieldset></ontario-fieldset>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-fieldset>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-fieldset>
    `);
	});
});
