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

		expect(page.root).toMatchSnapshot();
	});

	it('should render a default search box element', async () => {
		const page = await render(`<ontario-search-box></ontario-search-box>`);

		expect(page.root).toMatchSnapshot();
	});
});
