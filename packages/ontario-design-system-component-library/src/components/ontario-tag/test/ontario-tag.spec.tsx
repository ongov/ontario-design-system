import { describe, expect, it, vi } from 'vitest';
import { render } from '@stencil/vitest';

describe('ontario-tag', () => {
	it('renders a non-dismissible tag', async () => {
		const page = await render(`<ontario-tag element-id="tag-health" label="Health"></ontario-tag>`);

		expect(page.root).toEqualHtml(`
<ontario-tag element-id="tag-health" label="Health" class="hydrated">
  <mock:shadow-root>
    <button id="tag-health" type="button" class="ontario-tag" aria-pressed="false">
      <span class="ontario-tag__label">
        Health
      </span>
    </button>
  </mock:shadow-root>
</ontario-tag>
`);
	});

	it('should generate an elementId when none is provided', async () => {
		const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

		const tag = page.root as HTMLOntarioTagElement;
		expect(tag.elementId).toBeTruthy();
		expect(page.root?.shadowRoot?.querySelector('button')?.id).toBe(tag.elementId);
	});

	it('should use the host text content as the label when no label prop is set', async () => {
		const page = await render(`<ontario-tag>Health</ontario-tag>`);

		expect(page.root?.shadowRoot?.querySelector('.ontario-tag__label')?.textContent).toBe('Health');
	});

	it('should prefer the label prop over the host text content', async () => {
		const page = await render(`<ontario-tag label="Education">Health</ontario-tag>`);

		expect(page.root?.shadowRoot?.querySelector('.ontario-tag__label')?.textContent).toBe('Education');
	});

	describe('non-dismissible', () => {
		it('should not be selected by default', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect((page.root as HTMLOntarioTagElement).selected).toBe(false);
			expect(button?.getAttribute('aria-pressed')).toBe('false');
			expect(button?.classList.contains('ontario-tag--selected')).toBe(false);
		});

		it('should render the selected state', async () => {
			const page = await render(`<ontario-tag label="Education" selected></ontario-tag>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.getAttribute('aria-pressed')).toBe('true');
			expect(button?.classList.contains('ontario-tag--selected')).toBe(true);
		});

		it('should toggle selected and emit tagToggled when activated', async () => {
			const page = await render(`<ontario-tag label="Health" value="health"></ontario-tag>`);

			const onToggled = vi.fn();
			page.root?.addEventListener('tagToggled', onToggled);
			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;

			button.click();
			await page.waitForChanges();

			expect((page.root as HTMLOntarioTagElement).selected).toBe(true);
			expect(button.getAttribute('aria-pressed')).toBe('true');
			expect(onToggled).toHaveBeenCalledTimes(1);
			expect(onToggled.mock.calls[0][0].detail).toEqual({ label: 'Health', value: 'health', selected: true });

			button.click();
			await page.waitForChanges();

			expect((page.root as HTMLOntarioTagElement).selected).toBe(false);
			expect(onToggled.mock.calls[1][0].detail).toEqual({ label: 'Health', value: 'health', selected: false });
		});

		it('should use the label as the value when no value is set', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			const onToggled = vi.fn();
			page.root?.addEventListener('tagToggled', onToggled);
			(page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			await page.waitForChanges();

			expect(onToggled.mock.calls[0][0].detail.value).toBe('Health');
		});

		it('should reflect the selected prop as an attribute', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			(page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			await page.waitForChanges();

			expect(page.root?.hasAttribute('selected')).toBe(true);
		});

		it('should use ariaLabelText as the accessible name when provided', async () => {
			const page = await render(`<ontario-tag label="Health" aria-label-text="Filter by Health"></ontario-tag>`);

			expect(page.root?.shadowRoot?.querySelector('button')?.getAttribute('aria-label')).toBe('Filter by Health');
		});

		it('should not set an aria-label when ariaLabelText is not provided', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			expect(page.root?.shadowRoot?.querySelector('button')?.hasAttribute('aria-label')).toBe(false);
		});

		it('should not render a close icon', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			expect(page.root?.shadowRoot?.querySelector('ontario-icon-close')).toBeNull();
		});
	});

	describe('dismissible', () => {
		it('should render the selected style, a close icon and no aria-pressed', async () => {
			const page = await render(
				`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`,
			);

			const button = page.root?.shadowRoot?.querySelector('button');
			const icon = page.root?.shadowRoot?.querySelector('ontario-icon-close');

			expect(button?.classList.contains('ontario-tag--selected')).toBe(true);
			expect(button?.classList.contains('ontario-tag--dismissible')).toBe(true);
			expect(button?.hasAttribute('aria-pressed')).toBe(false);
			expect(icon).toBeTruthy();
			expect(icon?.getAttribute('class')).toContain('ontario-tag__icon');
		});

		it('should be named "Remove {label}" in English', async () => {
			const page = await render(
				`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`,
			);

			expect(page.root?.shadowRoot?.querySelector('button')?.getAttribute('aria-label')).toBe(
				'Remove Category: Filter',
			);
		});

		it('should be named "Supprimer {label}" in French', async () => {
			const page = await render(
				`<ontario-tag label="Santé et bien-être" value="health" language="fr" dismissible></ontario-tag>`,
			);

			expect(page.root?.shadowRoot?.querySelector('button')?.getAttribute('aria-label')).toBe(
				'Supprimer Santé et bien-être',
			);
		});

		it('should ignore ariaLabelText', async () => {
			const page = await render(
				`<ontario-tag label="Category: Filter" aria-label-text="Filter by Category" dismissible></ontario-tag>`,
			);

			expect(page.root?.shadowRoot?.querySelector('button')?.getAttribute('aria-label')).toBe(
				'Remove Category: Filter',
			);
		});

		it('should emit tagDismissed and not change selected when activated', async () => {
			const page = await render(
				`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`,
			);

			const onDismissed = vi.fn();
			const onToggled = vi.fn();
			page.root?.addEventListener('tagDismissed', onDismissed);
			page.root?.addEventListener('tagToggled', onToggled);

			(page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			await page.waitForChanges();

			expect(onDismissed).toHaveBeenCalledTimes(1);
			expect(onDismissed.mock.calls[0][0].detail).toEqual({ label: 'Category: Filter', value: 'category-filter' });
			expect(onToggled).not.toHaveBeenCalled();
			expect((page.root as HTMLOntarioTagElement).selected).toBe(false);
		});

		it('should not remove itself when activated', async () => {
			const page = await render(
				`<div><ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag></div>`,
			);

			const wrapper = page.root as HTMLElement;
			const tag = wrapper.querySelector('ontario-tag') as HTMLOntarioTagElement;
			(tag.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			await page.waitForChanges();

			expect(wrapper.querySelector('ontario-tag')).toBe(tag);
		});
	});

	describe('language', () => {
		it('should default to English', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			expect((page.root as HTMLOntarioTagElement).language).toBe('en');
		});

		it('should fall back to English for an unsupported language', async () => {
			const page = await render(`<ontario-tag label="Health" language="de"></ontario-tag>`);

			expect((page.root as HTMLOntarioTagElement).language).toBe('en');
		});

		it('should translate the dismiss name when the header language is toggled', async () => {
			const page = await render(
				`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`,
			);

			window.dispatchEvent(
				new CustomEvent('headerLanguageToggled', { detail: { oldLanguage: 'en', newLanguage: 'fr' } }),
			);
			await page.waitForChanges();

			expect(page.root?.shadowRoot?.querySelector('button')?.getAttribute('aria-label')).toBe(
				'Supprimer Category: Filter',
			);
		});
	});

	describe('setFocus', () => {
		it('should focus the tag button', async () => {
			const page = await render(`<ontario-tag label="Health"></ontario-tag>`);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			const focusSpy = vi.spyOn(button, 'focus');

			await (page.root as HTMLOntarioTagElement).setFocus();

			expect(focusSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('validation', () => {
		it('should warn and render nothing when no label is provided', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			const page = await render(`<ontario-tag></ontario-tag>`);

			expect(warnSpy).toHaveBeenCalled();
			expect(page.root?.shadowRoot?.querySelector('button')).toBeNull();
			warnSpy.mockRestore();
		});

		it('should warn when selected is set together with dismissible', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			await render(`<ontario-tag label="Category: Filter" selected dismissible></ontario-tag>`);

			expect(warnSpy).toHaveBeenCalled();
			warnSpy.mockRestore();
		});

		it('should not warn for a valid tag', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			await render(`<ontario-tag label="Health" selected></ontario-tag>`);

			expect(warnSpy).not.toHaveBeenCalled();
			warnSpy.mockRestore();
		});
	});
});
