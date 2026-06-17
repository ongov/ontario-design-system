import { render } from '@stencil/vitest';

const defaultCaption = 'Personal information';
const overrideCaption = 'Contact details';
const actionLinkCaption = 'Address';
const actionLinkHref = '/change-address';

describe('ontario-summary-list', () => {
	let page: Awaited<ReturnType<typeof render>>;
	let host: HTMLElement;

	beforeEach(async () => {
		page = await render(`<ontario-summary-list caption="${defaultCaption}"></ontario-summary-list>`);
		host = page.root as HTMLElement;
		await page.waitForChanges();
	});

	it('should render', () => {
		expect(host).not.toBeNull();
		expect(host.tagName).toBe('ONTARIO-SUMMARY-LIST');
		expect(host.shadowRoot).not.toBeNull();
	});

	it('should render the caption as an h3 heading by default', () => {
		const heading = host.shadowRoot?.querySelector('h3');
		expect(heading).not.toBeNull();
		expect(heading?.textContent).toBe(defaultCaption);
	});

	it('should render the caption using the specified headingLevel', async () => {
		const overridePage = await render(
			`<ontario-summary-list caption="${overrideCaption}" heading-level="h2"></ontario-summary-list>`,
		);
		await overridePage.waitForChanges();
		const heading = (overridePage.root as HTMLElement).shadowRoot?.querySelector('h2');
		expect(heading).not.toBeNull();
		expect(heading?.textContent).toBe(overrideCaption);
	});

	it('should render default slot content in the container', async () => {
		const slotPage = await render(
			`<ontario-summary-list caption="${defaultCaption}">
				<div class="ontario-summary-list-demo-row">Projected row content</div>
			</ontario-summary-list>`,
		);

		await slotPage.waitForChanges();

		const slot = (slotPage.root as HTMLElement).shadowRoot?.querySelector('dl.ontario-summary-list__container > slot');
		expect(slot).not.toBeNull();
		expect(slotPage.root?.innerHTML).toContain('Projected row content');
	});

	it('should render slotted caption-action content when provided', async () => {
		const slotActionPage = await render(
			`<ontario-summary-list caption="${defaultCaption}">
				<a slot="caption-action" href="/slot-action">Update section</a>
			</ontario-summary-list>`,
		);

		await slotActionPage.waitForChanges();

		const headingButtons = (slotActionPage.root as HTMLElement).shadowRoot?.querySelector(
			'.ontario-summary-list__heading-buttons',
		);

		expect(slotActionPage.root?.querySelector('a[slot="caption-action"]')?.textContent).toContain('Update section');
		expect(headingButtons?.className).not.toContain('ontario-summary-list__heading-buttons--hidden');
	});

	it('should render a change link when captionActionLink is provided', async () => {
		const linkPage = await render(
			`<ontario-summary-list caption="${actionLinkCaption}" caption-action-link='{"href":"${actionLinkHref}"}'></ontario-summary-list>`,
		);
		await linkPage.waitForChanges();
		const link = (linkPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list__change-button');
		expect(link).not.toBeNull();
		expect(link?.getAttribute('href')).toBe(actionLinkHref);
	});

	it('should render English generated action label and sr text by default', async () => {
		const linkPage = await render(
			`<ontario-summary-list caption="${actionLinkCaption}" caption-action-link='{"href":"${actionLinkHref}"}'></ontario-summary-list>`,
		);

		await linkPage.waitForChanges();

		const link = (linkPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list__change-button');
		expect(link?.textContent).toContain('Change');
		expect(link?.textContent).toContain('your answer for:');
		expect(link?.textContent).toContain(actionLinkCaption);
	});

	it('should render French generated action label and sr text when language is fr', async () => {
		const frenchPage = await render(
			`<ontario-summary-list caption="${actionLinkCaption}" language="fr" caption-action-link='{"href":"${actionLinkHref}"}'></ontario-summary-list>`,
		);

		await frenchPage.waitForChanges();

		const link = (frenchPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list__change-button');
		expect(link?.textContent).toContain('Modifier');
		expect(link?.textContent).toMatch(/votre réponse pour\s*:/);
		expect(link?.textContent).toContain(actionLinkCaption);
	});

	it('should warn when caption prop is missing', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		await render(`<ontario-summary-list></ontario-summary-list>`);

		expect(warnSpy).toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});
