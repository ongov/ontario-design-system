import { newSpecPage } from '@stencil/core/testing';
import { OntarioAside } from '../ontario-aside';

describe('ontario-aside', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioAside],
			html: `<ontario-aside></ontario-aside>`,
		});
		expect(page.root).toEqualHtml(`
      		<ontario-aside>
        		<mock:shadow-root>
					<div class="ontario-aside ontario-border-highlight--teal">
      					<h2 class="ontario-aside__title ontario-h5"></h2>
       					<slot></slot>
       				</div>
        		</mock:shadow-root>
      		</ontario-aside>
    	`);
	});
});
