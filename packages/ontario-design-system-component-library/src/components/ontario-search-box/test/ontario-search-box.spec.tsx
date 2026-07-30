import { render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

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
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto', 'Ottawa']);
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.focus();
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		const options = (page.root as HTMLElement).shadowRoot?.querySelectorAll('ontario-search-result-item');
		expect(options?.length).toBe(2);
	});

	it('should prioritize slotted suggestions over getSuggestions', async () => {
		const page = await render(
			`<ontario-search-box enable-autocomplete caption="Search cities">
				<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
			</ontario-search-box>`,
		);

		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};
		const getter = vi.fn(async () => ['Ottawa']);
		host.getSuggestions = getter;
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.focus();
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		expect(page.root).toMatchSnapshot();
	});

	it('should render a default search box element', async () => {
		const page = await render(`<ontario-search-box caption="Search"></ontario-search-box>`);

		expect(page.root).toMatchSnapshot();
	});

	it('should apply highlight markup to custom HTML slotted suggestions', async () => {
		const page = await render(
			`<ontario-search-box enable-autocomplete caption="Search cities">
				<div slot="suggestions" data-value="Waterloo">
					<span data-ontario-search-highlight>Waterloo</span>
				</div>
			</ontario-search-box>`,
		);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'wat';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const highlightTarget = (page.root as HTMLElement).querySelector('[data-ontario-search-highlight]') as HTMLElement;

		expect(highlightTarget.innerHTML).toContain('ontario-search-autocomplete__suggestion-match');
		expect(highlightTarget.innerHTML).toContain('ontario-search-autocomplete__suggestion-completion');
	});

	it('should hide non-matching custom HTML slotted suggestions', async () => {
		const page = await render(
			`<ontario-search-box enable-autocomplete caption="Search cities">
				<div slot="suggestions" data-value="Toronto" role="option">
					<span data-ontario-search-highlight>Toronto</span>
				</div>
				<div slot="suggestions" data-value="Waterloo" role="option">
					<span data-ontario-search-highlight>Waterloo</span>
				</div>
			</ontario-search-box>`,
		);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'wat';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const torontoOption = (page.root as HTMLElement).querySelector('[data-value="Toronto"]') as HTMLElement;
		const waterlooOption = (page.root as HTMLElement).querySelector('[data-value="Waterloo"]') as HTMLElement;

		expect(torontoOption.hasAttribute('hidden')).toBe(true);
		expect(waterlooOption.hasAttribute('hidden')).toBe(false);
	});

	it('should hide non-matching semantic slotted suggestions', async () => {
		const page = await render(
			`<ontario-search-box enable-autocomplete caption="Search cities">
				<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
				<ontario-search-result-item slot="suggestions" label="Waterloo" value="Waterloo"></ontario-search-result-item>
			</ontario-search-box>`,
		);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'wat';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const torontoOption = (page.root as HTMLElement).querySelector(
			'ontario-search-result-item[slot="suggestions"][value="Toronto"]',
		) as HTMLElement;
		const waterlooOption = (page.root as HTMLElement).querySelector(
			'ontario-search-result-item[slot="suggestions"][value="Waterloo"]',
		) as HTMLElement;

		expect(torontoOption.hasAttribute('hidden')).toBe(true);
		expect(waterlooOption.hasAttribute('hidden')).toBe(false);
	});

	it('should keep subsequence matching consistent for semantic slot filtering', async () => {
		const page = await render(
			`<ontario-search-box enable-autocomplete caption="Search cities">
				<ontario-search-result-item slot="suggestions" label="Waterloo" value="Waterloo"></ontario-search-result-item>
				<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
			</ontario-search-box>`,
		);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'wlo';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const waterlooOption = (page.root as HTMLElement).querySelector(
			'ontario-search-result-item[slot="suggestions"][value="Waterloo"]',
		) as HTMLElement;
		const torontoOption = (page.root as HTMLElement).querySelector(
			'ontario-search-result-item[slot="suggestions"][value="Toronto"]',
		) as HTMLElement;

		expect(waterlooOption.hasAttribute('hidden')).toBe(false);
		expect(torontoOption.hasAttribute('hidden')).toBe(true);
	});

	it('should close suggestion list on mouse option selection', async () => {
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);
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

		const firstOption = (page.root as HTMLElement).shadowRoot?.querySelector(
			'ontario-search-result-item',
		) as HTMLElement;
		firstOption?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const list = (page.root as HTMLElement).shadowRoot?.querySelector('.ontario-search-autocomplete__suggestion-list');
		expect(list?.getAttribute('aria-hidden')).toBe('true');
	});
	it('should keep suggestions available after keyboard navigation keys', async () => {
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);
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

		const options = (page.root as HTMLElement).shadowRoot?.querySelectorAll('ontario-search-result-item');
		expect(options?.length).toBeGreaterThan(0);
	});

	it('should support ArrowUp and Escape keyboard behaviours', async () => {
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);
		const hostRef = (page.root as any).__stencil__getHostRef?.();
		const hostInstance = hostRef?.$lazyInstance$ as
			| {
					handleInputKeyDown?: (event: KeyboardEvent) => void;
			  }
			| undefined;
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto', 'Ottawa']);
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.focus();
		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		if (!hostInstance?.handleInputKeyDown) {
			return;
		}

		hostInstance.handleInputKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
		await page.waitForChanges();

		hostInstance.handleInputKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
		await page.waitForChanges();

		const listBeforeEscape = (page.root as HTMLElement).shadowRoot?.querySelector(
			'.ontario-search-autocomplete__suggestion-list',
		);
		expect(listBeforeEscape?.getAttribute('aria-hidden')).toBe('false');

		hostInstance.handleInputKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
		await page.waitForChanges();

		const list = (page.root as HTMLElement).shadowRoot?.querySelector('.ontario-search-autocomplete__suggestion-list');
		expect(list?.getAttribute('aria-hidden')).toBe('true');
	});

	it('should render contiguous matches before fuzzy matches when computing segments', async () => {
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);
		const host = page.root as unknown as {
			getSuggestions?: (query: string) => Promise<string[]>;
			debounceMs?: number;
		};

		host.getSuggestions = vi.fn(async () => ['Toronto']);
		host.debounceMs = 0;

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;
		input.value = 'ron';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		const option = (page.root as HTMLElement).shadowRoot?.querySelector('ontario-search-result-item') as HTMLElement;
		const labelSegments = option.shadowRoot?.querySelectorAll('.ontario-search-result-item__label span');

		expect(labelSegments?.[0]?.textContent).toBe('To');
		expect(labelSegments?.[1]?.textContent).toBe('ron');
		expect(labelSegments?.[2]?.textContent).toBe('to');
		expect(labelSegments?.[1]?.className).toBe('ontario-search-result-item__match');
	});

	it('should render the full label bold when a slotted query is cleared', async () => {
		const page = await render(
			`<ontario-search-box enable-autocomplete caption="Search cities">
				<ontario-search-result-item slot="suggestions" label="Toronto" value="Toronto"></ontario-search-result-item>
			</ontario-search-box>`,
		);

		const input = (page.root as HTMLElement).shadowRoot?.querySelector(
			'#ontario-search-input-field',
		) as HTMLInputElement;

		input.value = 'to';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		input.value = '';
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
		await page.waitForChanges();

		const option = (page.root as HTMLElement).querySelector('ontario-search-result-item') as HTMLElement;
		const labelSegments = option.shadowRoot?.querySelectorAll('.ontario-search-result-item__label span');

		expect(labelSegments?.length).toBe(1);
		expect(labelSegments?.[0]?.className).toBe('ontario-search-result-item__completion');
	});

	it('should emit autocomplete lifecycle events', async () => {
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);
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
		const page = await render(`<ontario-search-box enable-autocomplete caption="Search cities"></ontario-search-box>`);

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
