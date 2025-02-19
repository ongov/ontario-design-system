import { newSpecPage } from '@stencil/core/testing';
import { OntarioVerticalFormSpacing } from '../ontario-vertical-form-spacing';

describe('ontario-vertical-form-spacing', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioVerticalFormSpacing],
				html: `<ontario-vertical-form-spacing><slot></slot></ontario-vertical-form-spacing>`,
			});
			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render with default spacing if no spacing prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioVerticalFormSpacing],
			html: `<ontario-vertical-form-spacing></ontario-vertical-form-spacing>`,
		});

		expect(page.root?.shadowRoot?.querySelector('div')).toHaveClass('ontario-vertical-form-spacing--40');
	});

	it('should render with condensed spacing if the `condensed` spacing prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioVerticalFormSpacing],
			html: `<ontario-vertical-form-spacing spacing="condensed"></ontario-vertical-form-spacing>`,
		});

		expect(page.root?.shadowRoot?.querySelector('div')).toHaveClass('ontario-vertical-form-spacing--16');
	});
});
