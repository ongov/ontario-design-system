import { render } from '@stencil/vitest';

const CITY_LABEL = 'Toronto';
const CITY_DESCRIPTION = 'City in Ontario';
const RESULT_URL = 'https://www.ontario.ca/page/toronto';

describe('ontario-search-result-item', () => {
	it('should render with default option semantics', async () => {
		const page = await render(`<ontario-search-result-item label="${CITY_LABEL}"></ontario-search-result-item>`);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.getAttribute('role')).toBe('option');
		expect(host.getAttribute('aria-selected')).toBe('false');
		expect(host.getAttribute('aria-disabled')).toBe('false');
	});

	it('should render description when provided', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" description="${CITY_DESCRIPTION}"></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const description = (page.root as HTMLElement).shadowRoot?.querySelector(
			'.ontario-search-result-item__description',
		);
		expect(description?.textContent).toContain(CITY_DESCRIPTION);
	});

	it('should render href when provided', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" href="${RESULT_URL}"></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const link = (page.root as HTMLElement).shadowRoot?.querySelector('.ontario-search-result-item__link');
		expect(link).not.toBeNull();
		expect(link?.getAttribute('href')).toBe(RESULT_URL);
	});

	it('should give slot content precedence over label and description', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" description="${CITY_DESCRIPTION}">
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
			`<ontario-search-result-item label="${CITY_LABEL}" active selected></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.classList.contains('ontario-search-result-item--active')).toBe(true);
		expect(host.classList.contains('ontario-search-result-item--selected')).toBe(true);
		expect(host.getAttribute('aria-selected')).toBe('true');
	});

	it('should update aria-selected when selected changes', async () => {
		const page = await render(`<ontario-search-result-item label="${CITY_LABEL}"></ontario-search-result-item>`);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.getAttribute('aria-selected')).toBe('false');

		host.setAttribute('selected', '');
		await page.waitForChanges();

		expect(host.getAttribute('aria-selected')).toBe('true');
	});

	it('should apply disabled semantics and class', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" disabled></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const host = page.root as HTMLElement;
		expect(host.classList.contains('ontario-search-result-item--disabled')).toBe(true);
		expect(host.getAttribute('aria-disabled')).toBe('true');
	});

	it('should emit itemSelected when clicked if enabled', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" value="${CITY_LABEL}"></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const emitSpy = vi.fn();
		document.addEventListener('itemSelected', emitSpy);

		(page.root as HTMLElement).click();
		await page.waitForChanges();

		expect(emitSpy).toHaveBeenCalled();
		document.removeEventListener('itemSelected', emitSpy);
	});

	it('should emit itemSelected once when href link is clicked', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" value="${CITY_LABEL}" href="${RESULT_URL}"></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const emitSpy = vi.fn();
		document.addEventListener('itemSelected', emitSpy);

		const link = (page.root as HTMLElement).shadowRoot?.querySelector(
			'.ontario-search-result-item__link',
		) as HTMLAnchorElement | null;
		link?.click();
		await page.waitForChanges();

		expect(emitSpy).toHaveBeenCalledTimes(1);
		document.removeEventListener('itemSelected', emitSpy);
	});

	it('should not emit itemSelected when disabled', async () => {
		const page = await render(
			`<ontario-search-result-item label="${CITY_LABEL}" disabled></ontario-search-result-item>`,
		);
		await page.waitForChanges();

		const emitSpy = vi.fn();
		document.addEventListener('itemSelected', emitSpy);

		(page.root as HTMLElement).click();
		await page.waitForChanges();

		expect(emitSpy).not.toHaveBeenCalled();
		document.removeEventListener('itemSelected', emitSpy);
	});
});
