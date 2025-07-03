import { newSpecPage } from '@stencil/core/testing';
import { OntarioBadge } from '../ontario-badge';

describe('ontario-badge', () => {
	it('should render the expected base html', async () => {
		const page = await newSpecPage({
			components: [OntarioBadge],
			html: `<ontario-badge>In progress</ontario-badge>`,
		});

		expect(page.root).toMatchSnapshot();
	});

	it('should override the host textContent with label prop output on the span element', async () => {
		const page = await newSpecPage({
			components: [OntarioBadge],
			html: `<ontario-badge label="completed">In progress</ontario-badge>`,
		});

		expect(page.root).toMatchSnapshot();
	});

	it('should render with the ontario-badge--default-light class on the span element', async () => {
		const page = await newSpecPage({
			components: [OntarioBadge],
			html: `<ontario-badge colour="lightTeal">In progress</ontario-badge>`,
		});

		expect(page.root).toMatchSnapshot();
	});

	it('should render the aria-label attribute on the span element', async () => {
		const page = await newSpecPage({
			components: [OntarioBadge],
			html: `<ontario-badge aria-label-text="This course is currently in progress.">In progress</ontario-badge>`,
		});

		expect(page.root).toMatchSnapshot();
	});
});
