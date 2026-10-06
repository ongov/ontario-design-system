import { render } from '@stencil/vitest';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';

/**
 * Unit tests for ontario-back-to-top.
 *
 * These cover the rendered markup, translated labels/aria-label, language
 * defaulting/validation, the language-toggle event listeners, and the
 * scroll-to-top click behaviour.
 *
 * Actual window-scroll visibility (window.scrollY > 200 toggling the `active`
 * class) is primarily covered by the Playwright e2e suite, which runs in a real
 * browser. A best-effort jsdom version is included below too since the
 * `@Listen('scroll', { target: 'window' })` handler can be exercised by
 * dispatching a `scroll` event and stubbing `window.scrollY`.
 */
describe('ontario-back-to-top', () => {
	// Existing snapshot test - kept with the same describe > it path so the
	// committed __snapshots__/ontario-back-to-top.spec.tsx.snap baseline still matches.
	it('should render the expected html', async () => {
		const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

		expect(page.root).toMatchSnapshot();
	});

	it('renders', async () => {
		const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);
		expect(page.root).toEqualHtml(`
<ontario-back-to-top class="hydrated">
  <mock:shadow-root>
    <button class="ontario-back-to-top" aria-label="Scroll back to the top">
      <span aria-hidden="true">
        <svg class="ontario-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
        </svg>
      </span>
      Top
    </button>
  </mock:shadow-root>
</ontario-back-to-top>
`);
	});

	describe('renders', () => {
		it('renders a native button with the base (hidden) class by default', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button).not.toBeNull();
			expect(button?.className).toBe('ontario-back-to-top');
			expect(button?.classList.contains('active')).toBe(false);
		});

		it('renders the decorative arrow-up icon marked aria-hidden', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			const iconWrapper = page.root?.shadowRoot?.querySelector('span[aria-hidden="true"]');
			expect(iconWrapper).not.toBeNull();
			expect(iconWrapper?.querySelector('svg')).not.toBeNull();
		});

		it('renders the translated "Top" text label', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			const text = page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim();
			expect(text).toBe('Top');
		});
	});

	describe('bilingual support', () => {
		it('renders the English aria-label and label by default', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.getAttribute('aria-label')).toBe('Scroll back to the top');
			expect(button?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Top');
		});

		it('renders the French aria-label and label when language="fr"', async () => {
			const page = await render(`<ontario-back-to-top language="fr"></ontario-back-to-top>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.getAttribute('aria-label')).toBe('Retour en haut de la page');
			expect(button?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Haut');
		});
	});

	describe('language defaulting and validation', () => {
		it('defaults to English when no language prop is provided', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			expect((page.root as HTMLOntarioBackToTopElement).language).toBe('en');
		});

		it('falls back to English when an invalid language is provided', async () => {
			const page = await render(`<ontario-back-to-top language="es"></ontario-back-to-top>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect((page.root as HTMLOntarioBackToTopElement).language).toBe('en');
			expect(button?.getAttribute('aria-label')).toBe('Scroll back to the top');
		});
	});

	describe('language toggle events', () => {
		it('switches language when a headerLanguageToggled event is dispatched', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			window.dispatchEvent(
				new CustomEvent('headerLanguageToggled', {
					detail: { oldLanguage: 'en', newLanguage: 'fr' },
				}),
			);
			await page.waitForChanges();

			const button = page.root?.shadowRoot?.querySelector('button');
			expect((page.root as HTMLOntarioBackToTopElement).language).toBe('fr');
			expect(button?.getAttribute('aria-label')).toBe('Retour en haut de la page');
			expect(button?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Haut');
		});

		it('validates the toggled language and falls back to English for an unsupported value', async () => {
			const page = await render(`<ontario-back-to-top language="fr"></ontario-back-to-top>`);

			window.dispatchEvent(
				new CustomEvent('headerLanguageToggled', {
					detail: { oldLanguage: 'fr', newLanguage: 'es' },
				}),
			);
			await page.waitForChanges();

			expect((page.root as HTMLOntarioBackToTopElement).language).toBe('en');
		});

		it('does not override an already-resolved language on setAppLanguage (componentWillLoad has set it)', async () => {
			// componentWillLoad resolves language to 'en' before this listener could ever run
			// with an unset language, so the handler's `if (!this.language)` guard is a no-op
			// here. This test documents that real behaviour rather than changing it.
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			window.dispatchEvent(new CustomEvent('setAppLanguage', { detail: 'fr' }));
			await page.waitForChanges();

			expect((page.root as HTMLOntarioBackToTopElement).language).toBe('en');
		});
	});

	describe('scroll-to-top behaviour', () => {
		let scrollToSpy: MockInstance;

		beforeEach(() => {
			scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
		});

		afterEach(() => {
			scrollToSpy.mockRestore();
		});

		it('smooth-scrolls the window to the top when the button is clicked', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(scrollToSpy).toHaveBeenCalledTimes(1);
			expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
		});
	});

	describe('scroll visibility state', () => {
		afterEach(() => {
			// Reset the stubbed scroll position between tests.
			Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 });
		});

		it('adds the active class when a scroll past 200px is detected', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			// jsdom exposes window.scrollY as a fixed data property, so redefine it
			// before dispatching the scroll event the component listens for.
			Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 300 });
			window.dispatchEvent(new Event('scroll'));
			await page.waitForChanges();

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.classList.contains('active')).toBe(true);
			expect(button?.className).toBe('ontario-back-to-top active');
		});

		it('removes the active class when scrolled back within 200px', async () => {
			const page = await render(`<ontario-back-to-top></ontario-back-to-top>`);

			Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 300 });
			window.dispatchEvent(new Event('scroll'));
			await page.waitForChanges();

			Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 });
			window.dispatchEvent(new Event('scroll'));
			await page.waitForChanges();

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.classList.contains('active')).toBe(false);
			expect(button?.className).toBe('ontario-back-to-top');
		});
	});
});
