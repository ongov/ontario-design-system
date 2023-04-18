import { newSpecPage } from '@stencil/core/testing';
import { OntarioCallout } from '../ontario-callout';

describe('ontario-callout', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCallout],
			html: `<ontario-callout></ontario-callout>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-callout>
				<mock:shadow-root>
				<div class="ontario-border-highlight--teal ontario-callout">
      				<h2 class="ontario-callout__title ontario-h5"></h2>
    				<slot></slot>
        		</div>
				</mock:shadow-root>
			</ontario-callout>
		`);
	});
});
