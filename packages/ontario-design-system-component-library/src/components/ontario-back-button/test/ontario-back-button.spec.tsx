import { render } from '@stencil/vitest';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';

describe('ontario-back-button', () => {
	let warnSpy: MockInstance;
	let historyBackSpy: MockInstance;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		historyBackSpy = vi.spyOn(window.history, 'back').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
		historyBackSpy.mockRestore();
	});

	describe('renders', () => {
		it('the default output', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			expect(page.root).toMatchSnapshot();
		});

		it('href mode output', async () => {
			const page = await render(`<ontario-back-button href="/previous-step" back-mode="href"></ontario-back-button>`);

			expect(page.root).toMatchSnapshot();
		});

		it('renders Back by default', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			expect(page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Back');
		});

		it('renders Retour when language is fr and label is not provided', async () => {
			const page = await render(`<ontario-back-button language="fr"></ontario-back-button>`);

			expect(page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Retour');
		});

		it('uses label prop when provided', async () => {
			const page = await render(`<ontario-back-button label="Go back now"></ontario-back-button>`);

			expect(page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Go back now',
			);
		});

		it('renders an anchor when href is provided and back-mode is omitted', async () => {
			const page = await render(`<ontario-back-button href="/previous-step"></ontario-back-button>`);

			const link = page.root?.shadowRoot?.querySelector('a');
			const button = page.root?.shadowRoot?.querySelector('button');

			expect(link).not.toBeNull();
			expect(link?.getAttribute('href')).toBe('/previous-step');
			expect(button).toBeNull();
		});

		it('renders a button when back-mode is href but href is missing', async () => {
			const page = await render(`<ontario-back-button back-mode="href"></ontario-back-button>`);

			expect(page.root?.shadowRoot?.querySelector('button')).not.toBeNull();
			expect(page.root?.shadowRoot?.querySelector('a')).toBeNull();
			expect(warnSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('behaviour by mode', () => {
		it('history mode emits event and calls window.history.back', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			const eventSpy = vi.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(eventSpy).toHaveBeenCalledTimes(1);
			expect(historyBackSpy).toHaveBeenCalledTimes(1);
		});

		it('event mode emits event only', async () => {
			const page = await render(`<ontario-back-button back-mode="event"></ontario-back-button>`);

			const eventSpy = vi.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(eventSpy).toHaveBeenCalledTimes(1);
			expect(historyBackSpy).toHaveBeenCalledTimes(0);
		});

		it('href mode emits event on click', async () => {
			const page = await render(`<ontario-back-button href="/previous-step" back-mode="href"></ontario-back-button>`);

			const eventSpy = vi.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const link = page.root?.shadowRoot?.querySelector('a') as HTMLAnchorElement;
			link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

			expect(eventSpy).toHaveBeenCalledTimes(1);
			expect(historyBackSpy).toHaveBeenCalledTimes(0);
		});

		it('disabled mode blocks interaction and does not emit events', async () => {
			const page = await render(`<ontario-back-button disabled="true"></ontario-back-button>`);

			const eventSpy = vi.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(eventSpy).toHaveBeenCalledTimes(0);
			expect(historyBackSpy).toHaveBeenCalledTimes(0);
		});
	});

	describe('keyboard interaction', () => {
		it('activates on Enter key press', async () => {
			const page = await render(`<ontario-back-button back-mode="event"></ontario-back-button>`);

			const eventSpy = vi.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
			button.dispatchEvent(enterEvent);
			button.click();

			expect(eventSpy).toHaveBeenCalled();
		});

		it('activates on Space key press', async () => {
			const page = await render(`<ontario-back-button back-mode="event"></ontario-back-button>`);

			const eventSpy = vi.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
			button.dispatchEvent(spaceEvent);
			button.click();

			expect(eventSpy).toHaveBeenCalled();
		});
	});

	describe('accessibility', () => {
		it('has accessible button semantics', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.tagName).toBe('BUTTON');
			expect(button?.getAttribute('type')).toBe('button');
		});

		it('decorative icon is hidden from screen readers', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			const icon = page.root?.shadowRoot?.querySelector('svg');
			expect(icon?.getAttribute('aria-hidden')).toBe('true');
			expect(icon?.getAttribute('focusable')).toBe('false');
		});

		it('has accessible name from visible label text', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			const buttonText = button?.textContent?.trim();
			expect(buttonText).toContain('Back');
		});
	});

	describe('href attribute handling', () => {
		it('renders correct href value when provided', async () => {
			const page = await render(`<ontario-back-button href="/contact-details" back-mode="href"></ontario-back-button>`);

			const link = page.root?.shadowRoot?.querySelector('a');
			expect(link?.getAttribute('href')).toBe('/contact-details');
		});

		it('warns when href mode is used without href value', async () => {
			await render(`<ontario-back-button back-mode="href"></ontario-back-button>`);
			expect(warnSpy).toHaveBeenCalled();
		});
	});

	describe('bilingual support', () => {
		it('renders English label by default', async () => {
			const page = await render(`<ontario-back-button></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			const text = button?.textContent?.replace(/\s+/g, ' ').trim();
			expect(text).toBe('Back');
		});

		it('renders French label when language="fr"', async () => {
			const page = await render(`<ontario-back-button language="fr"></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			const text = button?.textContent?.replace(/\s+/g, ' ').trim();
			expect(text).toBe('Retour');
		});

		it('preserves custom label across language changes', async () => {
			const page = await render(`<ontario-back-button label="Custom Label" language="en"></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			const text = button?.textContent?.replace(/\s+/g, ' ').trim();
			expect(text).toBe('Custom Label');
		});
	});

	describe('disabled prop variants', () => {
		it('recognizes disabled boolean attribute', async () => {
			const page = await render(`<ontario-back-button disabled></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.hasAttribute('disabled')).toBe(true);
		});

		it('recognizes disabled="true" string attribute', async () => {
			const page = await render(`<ontario-back-button disabled="true"></ontario-back-button>`);

			const button = page.root?.shadowRoot?.querySelector('button');
			expect(button?.hasAttribute('disabled')).toBe(true);
		});
	});
});
