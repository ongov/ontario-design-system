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

	it('should render a single link when an image is provided', async () => {
		const href = 'https://www.ontario.ca/';

		const page = await newSpecPage({
			components: [OntarioCard],
			html: `<ontario-card label="Card Title 1" image="https://example.com/image.jpg" card-link="${href}"></ontario-card>`,
		});

		const shadowRoot = page.root?.shadowRoot;
		const links = shadowRoot?.querySelectorAll('a');
		const cardLink = shadowRoot?.querySelector('h2 a');
		const image = shadowRoot?.querySelector('img.ontario-card__image');

		expect(links?.length).toBe(1);
		expect(cardLink?.getAttribute('href')).toBe(href);
		expect(image).not.toBeNull();
		expect(image?.parentElement?.tagName).toBe('DIV');
	});

	// Don't think we can test images unless we point to a local path
});
