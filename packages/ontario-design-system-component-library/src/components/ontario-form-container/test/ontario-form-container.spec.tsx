import { newSpecPage } from '@stencil/core/testing';
import { OntarioFormContainer } from '../ontario-form-container';

describe('ontario-form-container', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioFormContainer],
				html: `<ontario-form-container></ontario-form-container>`,
			});
			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render with default gap if no gap prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioFormContainer],
			html: `<ontario-form-container></ontario-form-container>`,
		});

		expect(page.root?.shadowRoot?.querySelector('div')).toHaveClass('ontario-form-container--gap-40');
	});

	it('should render with condensed gap if the `condensed` spacing gap is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioFormContainer],
			html: `<ontario-form-container gap="condensed"></ontario-form-container>`,
		});

		expect(page.root?.shadowRoot?.querySelector('div')).toHaveClass('ontario-form-container--gap-16');
	});
});
