import { newSpecPage } from '@stencil/core/testing';
import { OntarioCard } from '../ontario-card';

describe('ontario-card', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-card></ontario-card>`,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('should render a label', async () => {
		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-card label="Card Title 1"></ontario-card>`,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('should render a header colour on the label', async () => {
		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-card label="Card Title 1" header-colour="sky"></ontario-card>`,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('should render a description', async () => {
		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-card description="Lorem ipsum"></ontario-card>`,
		});
		expect(page.root).toMatchSnapshot();
	});

	// Don't think we can test images unless we point to a local path
});
