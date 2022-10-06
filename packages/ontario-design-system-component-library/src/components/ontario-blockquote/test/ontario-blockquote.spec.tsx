import { newSpecPage } from '@stencil/core/testing';
import { OntarioBlockquote } from '../ontario-blockquote';

describe('ontario-blockquote', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioBlockquote],
			html: `<ontario-blockquote></ontario-blockquote>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-blockquote>
        <mock:shadow-root>
					<blockquote class="ontario-blockquote">
						<p></p>
					</blockquote>
        </mock:shadow-root>
      </ontario-blockquote>
    `);
	});
});
