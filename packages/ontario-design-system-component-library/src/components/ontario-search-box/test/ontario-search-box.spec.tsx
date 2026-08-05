import { render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('ontario-search-box', () => {
	it('should render with explicit id and caption', async () => {
		const page = await render(
			`<ontario-search-box id="ontario-search-box" class="hydrated" caption="Search"></ontario-search-box>`,
		);

		expect(page.root?.getAttribute('id')).toBe('ontario-search-box');
		expect(page.root?.shadowRoot?.querySelector('form#ontario-search-form-container')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('input[type="search"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('button#ontario-search-box__submit')).not.toBeNull();
	});

	it('should render a default search box element', async () => {
		const page = await render(`<ontario-search-box caption="Search"></ontario-search-box>`);

		expect(
			page.root?.shadowRoot?.querySelector('label.ontario-label')?.textContent?.replace(/\s+/g, ' ').trim(),
		).toContain('Search');
		expect(page.root?.shadowRoot?.querySelector('input[type="search"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('button#ontario-search-box__submit')).not.toBeNull();
	});
});
