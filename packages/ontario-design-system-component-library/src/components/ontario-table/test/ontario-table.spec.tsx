import { newSpecPage } from '@stencil/core/testing';
import { OntarioTable } from '../ontario-table';

xdescribe('ontario-table', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioTable],
			html: `<ontario-table></ontario-table>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-table>
    `);
	});
});
