import { newSpecPage } from '@stencil/core/testing';
import { OntarioFieldset } from '../ontario-fieldset';

describe('ontario-fieldset', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioFieldset],
				html: `<ontario-fieldset legend="What is your delivery address?" legend-size="heading"></ontario-aside>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render the default legend size if no legendSize prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioFieldset],
			html: `<ontario-fieldset legend="What is your delivery address?"></ontario-fieldset>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-fieldset legend="What is your delivery address?">
				<mock:shadow-root>
					<div class="ontario-form-group">
						<fieldset class="ontario-fieldset">
							<legend class="ontario-fieldset__legend">What is your delivery address?</legend>
							<slot></slot>
						</fieldset>
					</div>
				</mock:shadow-root>
			</ontario-fieldset>
		`);
	});
});
