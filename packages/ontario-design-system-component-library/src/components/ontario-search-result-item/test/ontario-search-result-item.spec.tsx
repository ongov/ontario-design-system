import { render } from '@stencil/vitest';

describe('ontario-search-result-item', () => {
	it('should render with default option semantics', async () => {
		const page = await render(`<ontario-search-result-item label="Toronto"></ontario-search-result-item>`);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.getAttribute('role')).toBe('option');
		expect(host.getAttribute('aria-selected')).toBe('false');
		expect(host.getAttribute('aria-disabled')).toBe('false');
	});

	it('should render description when provided', async () => {
		const page = await render(
			`<ontario-search-result-item label="Toronto" description="City in Ontario"></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const description = (page.root as HTMLElement).shadowRoot?.querySelector(
			'.ontario-search-result-item__description',
		);
		expect(description?.textContent).toContain('City in Ontario');
	});

	it('should render provided segments before legacy highlight fallbacks', async () => {
		const page = await render(`<ontario-search-result-item label="Toronto"></ontario-search-result-item>`);
		const host = page.root as HTMLOntarioSearchResultItemElement & {
			segments?: Array<{ text: string; kind: 'match' | 'completion' }>;
		};

		host.segments = [
			{ text: 'Tor', kind: 'match' },
			{ text: 'onto', kind: 'completion' },
		];
		await page.waitForChanges();

		const parts = (page.root as HTMLElement).shadowRoot?.querySelectorAll('.ontario-search-result-item__label span');
		expect(parts?.[0]?.textContent).toBe('Tor');
		expect(parts?.[1]?.className).toBe('ontario-search-result-item__completion');
	});

	it('should give slot content precedence over label and description', async () => {
		const page = await render(
			`<ontario-search-result-item label="Toronto" description="City in Ontario">
				<div class="custom-item">Custom content</div>
			</ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const fallback = (page.root as HTMLElement).shadowRoot?.querySelector('.ontario-search-result-item__label');
		const slotted = (page.root as HTMLElement).querySelector('.custom-item');
		expect(slotted?.textContent).toContain('Custom content');
		expect(fallback).toBeNull();
	});

	it('should apply active and selected class modifiers', async () => {
		const page = await render(
			`<ontario-search-result-item label="Toronto" active selected></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.classList.contains('ontario-search-result-item--active')).toBe(true);
		expect(host.classList.contains('ontario-search-result-item--selected')).toBe(true);
		expect(host.getAttribute('aria-selected')).toBe('true');
	});

	it('should apply disabled semantics and class', async () => {
		const page = await render(`<ontario-search-result-item label="Toronto" disabled></ontario-search-result-item>`);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.classList.contains('ontario-search-result-item--disabled')).toBe(true);
		expect(host.getAttribute('aria-disabled')).toBe('true');
	});

	it('should emit itemSelected when clicked if enabled', async () => {
		const page = await render(
			`<ontario-search-result-item label="Toronto" value="Toronto"></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const emitSpy = vi.fn();
		document.addEventListener('itemSelected', emitSpy);

		(page.root as HTMLElement).click();
		await page.waitForChanges();

		expect(emitSpy).toHaveBeenCalled();
		document.removeEventListener('itemSelected', emitSpy);
	});
});
