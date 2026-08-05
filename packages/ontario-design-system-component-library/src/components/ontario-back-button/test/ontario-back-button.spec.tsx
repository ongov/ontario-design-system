import { newSpecPage } from '@stencil/core/testing';
import { OntarioBackButton } from '../ontario-back-button';

describe('ontario-back-button', () => {
	let warnSpy: jest.SpyInstance;
	let historyBackSpy: jest.SpyInstance;

	beforeEach(() => {
		warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
		historyBackSpy = jest.spyOn(window.history, 'back').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
		historyBackSpy.mockRestore();
	});

	describe('renders', () => {
		it('the default output', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button></ontario-back-button>`,
			});

			expect(page.root).toMatchSnapshot();
		});

		it('href mode output', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button href="/previous-step" back-mode="href"></ontario-back-button>`,
			});

			expect(page.root).toMatchSnapshot();
		});

		it('renders Back by default', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button></ontario-back-button>`,
			});

			expect(page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Back');
		});

		it('renders Retour when language is fr and label is not provided', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button language="fr"></ontario-back-button>`,
			});

			expect(page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Retour');
		});

		it('uses label prop when provided', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button label="Go back now"></ontario-back-button>`,
			});

			expect(page.root?.shadowRoot?.querySelector('button')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Go back now',
			);
		});

		it('renders an anchor when href is provided and back-mode is omitted', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button href="/previous-step"></ontario-back-button>`,
			});

			const link = page.root?.shadowRoot?.querySelector('a');
			const button = page.root?.shadowRoot?.querySelector('button');

			expect(link).not.toBeNull();
			expect(link?.getAttribute('href')).toBe('/previous-step');
			expect(button).toBeNull();
		});

		it('renders a button when back-mode is href but href is missing', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button back-mode="href"></ontario-back-button>`,
			});

			expect(page.root?.shadowRoot?.querySelector('button')).not.toBeNull();
			expect(page.root?.shadowRoot?.querySelector('a')).toBeNull();
			expect(warnSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('behaviour by mode', () => {
		it('history mode emits event and calls window.history.back', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button></ontario-back-button>`,
			});

			const eventSpy = jest.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(eventSpy).toHaveBeenCalledTimes(1);
			expect(historyBackSpy).toHaveBeenCalledTimes(1);
		});

		it('event mode emits event only', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button back-mode="event"></ontario-back-button>`,
			});

			const eventSpy = jest.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(eventSpy).toHaveBeenCalledTimes(1);
			expect(historyBackSpy).toHaveBeenCalledTimes(0);
		});

		it('href mode emits event on click', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button href="/previous-step" back-mode="href"></ontario-back-button>`,
			});

			const eventSpy = jest.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const link = page.root?.shadowRoot?.querySelector('a') as HTMLAnchorElement;
			link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

			expect(eventSpy).toHaveBeenCalledTimes(1);
			expect(historyBackSpy).toHaveBeenCalledTimes(0);
		});

		it('disabled mode blocks interaction and does not emit events', async () => {
			const page = await newSpecPage({
				components: [OntarioBackButton],
				html: `<ontario-back-button disabled="true"></ontario-back-button>`,
			});

			const eventSpy = jest.fn();
			page.root?.addEventListener('backClick', eventSpy);

			const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
			button.click();

			expect(eventSpy).toHaveBeenCalledTimes(0);
			expect(historyBackSpy).toHaveBeenCalledTimes(0);
		});
	});
});
