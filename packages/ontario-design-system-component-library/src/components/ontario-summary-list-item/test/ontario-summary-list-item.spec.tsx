import { render } from '@stencil/vitest';

describe('ontario-summary-list-item', () => {
	let page: Awaited<ReturnType<typeof render>>;
	let host: HTMLElement;

	it('should render without crashing when no props are provided', async () => {
		const emptyPage = await render(`<ontario-summary-list-item></ontario-summary-list-item>`);
		await emptyPage.waitForChanges();
		expect(emptyPage.root).not.toBeNull();
		expect(emptyPage.root?.shadowRoot).not.toBeNull();
	});

	beforeEach(async () => {
		page = await render(`<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>`);
		host = page.root as HTMLElement;
		await page.waitForChanges();
	});

	it('should render with required props', () => {
		expect(host).not.toBeNull();
		expect(host.tagName).toBe('ONTARIO-SUMMARY-LIST-ITEM');
		expect(host.shadowRoot).not.toBeNull();
	});

	it('should render the name value in a <dt> element', () => {
		const dt = host.shadowRoot?.querySelector('dt.ontario-summary-list-item__key');
		expect(dt).not.toBeNull();
		expect(dt?.textContent).toBe('Last name');
	});

	it('should render the description value in a <dd> element', () => {
		const dd = host.shadowRoot?.querySelector('dd.ontario-summary-list-item__value');
		expect(dd).not.toBeNull();
		expect(dd?.textContent).toBe('Smith');
	});

	it('should project the named action slot content when provided', async () => {
		const slotPage = await render(
			`<ontario-summary-list-item name="Last name" description="Smith">
				<a slot="action" href="#change-last-name">Change last name</a>
			</ontario-summary-list-item>`,
		);

		await slotPage.waitForChanges();

		const slotLink = slotPage.root?.querySelector('a[slot="action"]');
		const row = (slotPage.root as HTMLElement).shadowRoot?.querySelector('.ontario-summary-list-item__row');
		expect(slotLink?.textContent).toContain('Change last name');
		expect(row).not.toHaveClass('ontario-summary-list-item__row--no-actions');
	});

	it('should apply ontario-summary-list-item__row--no-actions when no actionLink or slot is provided', () => {
		const row = host.shadowRoot?.querySelector('.ontario-summary-list-item__row');
		expect(row).toHaveClass('ontario-summary-list-item__row--no-actions');
	});

	it('should hide the button container when no actionLink or slot is provided', () => {
		const container = host.shadowRoot?.querySelector('.ontario-summary-list-item__button-container');
		expect(container).toBeNull();
	});

	it('should render a change link when actionLink is provided', async () => {
		const linkPage = await render(
			`<ontario-summary-list-item name="First name" description="George" action-link='{"href":"/change"}'></ontario-summary-list-item>`,
		);
		await linkPage.waitForChanges();
		const link = (linkPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list-item__change-button');
		expect(link).not.toBeNull();
		expect(link?.getAttribute('href')).toBe('/change');
	});

	it('should not apply ontario-summary-list-item__row--no-actions when actionLink is provided', async () => {
		const linkPage = await render(
			`<ontario-summary-list-item name="First name" description="George" action-link='{"href":"/change"}'></ontario-summary-list-item>`,
		);
		await linkPage.waitForChanges();
		const row = (linkPage.root as HTMLElement).shadowRoot?.querySelector('.ontario-summary-list-item__row');
		expect(row).not.toHaveClass('ontario-summary-list-item__row--no-actions');
	});

	it('should use the i18n default label when actionLink has no label', async () => {
		const linkPage = await render(
			`<ontario-summary-list-item name="First name" description="George" action-link='{"href":"/change"}'></ontario-summary-list-item>`,
		);
		await linkPage.waitForChanges();
		const link = (linkPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list-item__change-button');
		// default language is 'en'; i18n label is "Change"
		expect(link?.textContent?.trim().startsWith('Change')).toBe(true);
	});

	it('should override the visible link text when actionLink.label is provided', async () => {
		const linkPage = await render(
			`<ontario-summary-list-item name="First name" description="George" action-link='{"href":"/change","label":"Edit"}'></ontario-summary-list-item>`,
		);
		await linkPage.waitForChanges();
		const link = (linkPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list-item__change-button');
		expect(link?.textContent?.trim().startsWith('Edit')).toBe(true);
	});

	it('should apply the compact modifier class when the compact prop is set', async () => {
		const compactPage = await render(
			`<ontario-summary-list-item name="Last name" description="Smith" compact></ontario-summary-list-item>`,
		);
		await compactPage.waitForChanges();
		const row = (compactPage.root as HTMLElement).shadowRoot?.querySelector('.ontario-summary-list-item__row');
		expect(row).toHaveClass('ontario-summary-list-item__row--compact');
	});

	it('should warn when name prop is missing', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		await render(`<ontario-summary-list-item description="Smith"></ontario-summary-list-item>`);

		expect(warnSpy).toHaveBeenCalled();
		warnSpy.mockRestore();
	});

	it('should warn when description prop is missing', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		await render(`<ontario-summary-list-item name="Last name"></ontario-summary-list-item>`);

		expect(warnSpy).toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});
