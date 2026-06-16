import { render } from '@stencil/vitest';

describe('ontario-card', () => {
	it('renders', async () => {
		const page = await render(`<ontario-card></ontario-card>`);
		expect(page.root).toMatchSnapshot();
	});

	it('should render a label', async () => {
		const page = await render(`<ontario-card label="Card Title 1"></ontario-card>`);
		expect(page.root).toMatchSnapshot();
	});

	it('should render a header colour on the label', async () => {
		const page = await render(`<ontario-card label="Card Title 1" header-colour="sky"></ontario-card>`);
		expect(page.root).toMatchSnapshot();
	});

	it('should render a description', async () => {
		const page = await render(`<ontario-card description="Lorem ipsum"></ontario-card>`);
		expect(page.root).toMatchSnapshot();
	});

	it('should render a single link when an image is provided', async () => {
		const href = 'https://www.ontario.ca/';

		const page = await render(
			`<ontario-card label="Card Title 1" image="https://example.com/image.jpg" card-link="${href}"></ontario-card>`,
		);

		const shadowRoot = page.root?.shadowRoot;
		const anchors = shadowRoot?.querySelectorAll('a');
		const headingAnchor = shadowRoot?.querySelector('h2 a');
		const imageAnchor = shadowRoot?.querySelector('.ontario-card__image-container a');

		expect(anchors?.length).toBeGreaterThanOrEqual(1);
		expect(headingAnchor?.getAttribute('href')).toBe(href);
		expect(imageAnchor).not.toBeNull();
		expect(imageAnchor?.getAttribute('tabindex')).toBe('-1');
	});

	// Don't think we can test images unless we point to a local path
});
