import { newSpecPage } from '@stencil/core/testing';
import { OntarioBackToTop } from '../ontario-back-to-top';

describe('ontario-back-to-top', () => {
	it('should render the expected html', async () => {
		const page = await newSpecPage({
			components: [OntarioBackToTop],
			html: `<ontario-back-to-top></ontario-back-to-top>`,
		});

		expect(page.root).toMatchSnapshot();
	});

	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioBackToTop],
			html: `<ontario-back-to-top></ontario-back-to-top>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-back-to-top>
				<mock:shadow-root>
					<button aria-label="Scroll back to the top" class="ontario-back-to-top">
						<span aria-hidden="true"></span>
						Top
					</button>
				</mock:shadow-root>
			</ontario-back-to-top>
    	`);
	});
});
