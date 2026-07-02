import { render } from '@stencil/vitest';

describe('ontario-search-box', () => {
	it('should render a default search box with autocomplete disabled', async () => {
		const page = await render(`<ontario-search-box caption="Search cities"></ontario-search-box>`);
		await page.waitForChanges();

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;

		expect(input.getAttribute('aria-autocomplete')).toBe('none');
		expect(input.getAttribute('aria-controls')).toBeNull();
	});

	it('should render async suggestions in autocomplete mode', async () => {
		const page = await render(`<ontario-search-box autocomplete caption="Search cities"></ontario-search-box>`);
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto', 'Ottawa']);
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		const options = (page.root as HTMLElement).shadowRoot?.querySelectorAll(
			'.ontario-search-autocomplete__suggestion-option',
		);
		expect(options?.length).toBe(2);
	});

	it('should prioritize slotted suggestions over getSuggestions', async () => {
		const page = await render(
			`<ontario-search-box autocomplete caption="Search cities">
				<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
			</ontario-search-box>`,
		);

		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
		};
		const getter = vi.fn(async () => ['Ottawa']);
		host.getSuggestions = getter;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		expect(getter).not.toHaveBeenCalled();
	});

	it('should close suggestion list on mouse option click selection', async () => {
		const page = await render(`<ontario-search-box autocomplete caption="Search cities"></ontario-search-box>`);
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto', 'Ottawa']);
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		const option = (page.root as HTMLElement).shadowRoot?.querySelector(
			'.ontario-search-autocomplete__suggestion-option',
		) as HTMLElement;
		option.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const list = (page.root as HTMLElement).shadowRoot?.querySelector('.ontario-search-autocomplete__suggestion-list');
		expect(list?.getAttribute('aria-hidden')).toBe('true');
	});

	it('should keep suggestions available after keyboard navigation keys', async () => {
		const page = await render(`<ontario-search-box autocomplete caption="Search cities"></ontario-search-box>`);
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto', 'Ottawa']);
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await page.waitForChanges();

		const options = (page.root as HTMLElement).shadowRoot?.querySelectorAll(
			'.ontario-search-autocomplete__suggestion-option',
		);
		expect(options?.length).toBeGreaterThan(0);
	});

	it('should emit autocomplete lifecycle events', async () => {
		const page = await render(`<ontario-search-box autocomplete caption="Search cities"></ontario-search-box>`);
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto']);
		host.debounceMs = 0;

		const querySpy = vi.fn();
		const suggestionsSpy = vi.fn();
		(page.root as HTMLElement).addEventListener('autocompleteQueryUpdated', querySpy);
		(page.root as HTMLElement).addEventListener('autocompleteSuggestionsUpdated', suggestionsSpy);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		expect(querySpy).toHaveBeenCalled();
		expect(suggestionsSpy).toHaveBeenCalled();

		(page.root as HTMLElement).removeEventListener('autocompleteQueryUpdated', querySpy);
		(page.root as HTMLElement).removeEventListener('autocompleteSuggestionsUpdated', suggestionsSpy);
	});

	it('should keep search submit behaviour unchanged with autocomplete enabled', async () => {
		const page = await render(`<ontario-search-box autocomplete caption="Search cities"></ontario-search-box>`);

		const submitSpy = vi.fn();
		document.addEventListener('searchOnSubmit', submitSpy);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'Toronto';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const submitButton = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-box__submit',
		) as HTMLElement;
		submitButton.click();
		await page.waitForChanges();

		expect(submitSpy).toHaveBeenCalled();
		document.removeEventListener('searchOnSubmit', submitSpy);
	});
});
