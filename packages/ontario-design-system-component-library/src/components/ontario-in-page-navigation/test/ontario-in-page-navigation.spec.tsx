import { render } from '@stencil/vitest';

describe('ontario-in-page-navigation', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('renders with no information', async () => {
		const page = await render(`<ontario-in-page-navigation></ontario-in-page-navigation>`);

		expect(page.root).toBeTruthy();
	});

	it('renders the navigation shell with heading and list container', async () => {
		const page = await render(`<ontario-in-page-navigation heading="On this page">
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		expect(page.root).toBeTruthy();

		const nav = page.root?.shadowRoot?.querySelector('nav');
		const shell = page.root?.shadowRoot?.querySelector('.ontario-page-navigation');
		const heading = page.root?.shadowRoot?.querySelector('h2.ontario-page-navigation-header');
		const list = page.root?.shadowRoot?.querySelector('ol.ontario-page-navigation-list');

		expect(nav).toBeTruthy();
		expect(nav?.getAttribute('aria-label')).toBe('On this page');
		expect(shell).toBeTruthy();
		expect(heading?.textContent?.trim()).toBe('On this page');
		expect(list).toBeTruthy();
		expect(list?.getAttribute('role')).toBeNull();
	});

	it('projects default slot content into the list', async () => {
		const page = await render(`<ontario-in-page-navigation>
				<ontario-in-page-navigation-item id="section-link" label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		const slot = page.root?.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
		const assignedElements = slot.assignedElements({ flatten: true });

		expect(assignedElements.length).toBe(1);
		expect(assignedElements[0].id).toBe('section-link');
		expect(assignedElements[0].tagName).toBe('ONTARIO-IN-PAGE-NAVIGATION-ITEM');
	});

	it('renders host heading prop when provided', async () => {
		const page = await render(`<ontario-in-page-navigation heading="Contents">
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		const heading = page.root?.shadowRoot?.querySelector('.ontario-page-navigation-header');
		expect(heading?.textContent?.trim()).toBe('Contents');
		expect(page.root?.shadowRoot?.querySelector('nav')?.getAttribute('aria-label')).toBe('Contents');
	});

	it('renders skip link with expected target and text', async () => {
		const page = await render(`<ontario-in-page-navigation heading="On this page" skip-link-target="main-content">
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		const skipLink = page.root?.shadowRoot?.querySelector('a.ontario-page-navigation__skip-link');

		expect(skipLink).toBeTruthy();
		expect(skipLink?.getAttribute('href')).toBe('#main-content');
		expect(skipLink?.textContent?.trim()).toBe('Skip this page navigation');
	});

	it('applies no-top-border modifier when noTopBorder is enabled', async () => {
		const page = await render(`<ontario-in-page-navigation heading="On this page" no-top-border>
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		const shell = page.root?.shadowRoot?.querySelector('.ontario-page-navigation');
		expect(shell?.classList.contains('ontario-page-navigation--no-top-border')).toBe(true);
	});

	it('warns when heading is not provided', async () => {
		await render(`<ontario-in-page-navigation>
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		expect(warnSpy).toHaveBeenCalled();
		expect(String(warnSpy.mock.calls[0]?.[0] || '')).toContain('heading');
	});

	it('warns when default slot links are missing', async () => {
		await render(`<ontario-in-page-navigation heading="On this page"></ontario-in-page-navigation>`);

		expect(warnSpy).toHaveBeenCalled();
		const hasMissingItemsWarning = warnSpy.mock.calls.some((args) => String(args[0] || '').includes('requires child'));
		expect(hasMissingItemsWarning).toBe(true);
	});

	it('keeps list semantics with projected links', async () => {
		const page = await render(`<ontario-in-page-navigation heading="On this page">
				<ontario-in-page-navigation-item label="Section 1" href="#section-1"></ontario-in-page-navigation-item>
				<ontario-in-page-navigation-item label="Section 2" href="#section-2"></ontario-in-page-navigation-item>
			</ontario-in-page-navigation>`);

		const list = page.root?.shadowRoot?.querySelector('ol.ontario-page-navigation-list');
		const lightDomItems = page.root?.querySelectorAll('ontario-in-page-navigation-item');

		expect(list?.tagName).toBe('OL');
		expect(list?.getAttribute('role')).toBeNull();
		expect(lightDomItems?.length).toBe(2);
	});
});
