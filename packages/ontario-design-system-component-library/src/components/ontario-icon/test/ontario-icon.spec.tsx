import { render } from '@stencil/vitest';
import { vi } from 'vitest';

describe('ontario-icon', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await render(
				`<ontario-icon-accessibility icon-width="36" colour="grey" label="Accessibility"></ontario-icon-accessibility>`,
			);

			expect(page.root).toMatchSnapshot();
		});
	});

	it('is decorative by default', async () => {
		const page = await render('<ontario-icon-accessibility></ontario-icon-accessibility>');
		const svg = page.root.shadowRoot?.querySelector('svg');

		expect(svg?.getAttribute('aria-hidden')).toBe('true');
		expect(svg?.getAttribute('focusable')).toBe('false');
		expect(svg?.hasAttribute('role')).toBe(false);
		expect(svg?.hasAttribute('aria-label')).toBe(false);
	});

	it('uses the label as the accessible name', async () => {
		const page = await render('<ontario-icon-accessibility label="Accessibility"></ontario-icon-accessibility>');
		const svg = page.root.shadowRoot?.querySelector('svg');

		expect(svg?.getAttribute('role')).toBe('img');
		expect(svg?.getAttribute('aria-label')).toBe('Accessibility');
		expect(svg?.getAttribute('focusable')).toBe('false');
		expect(svg?.hasAttribute('aria-hidden')).toBe(false);
	});

	it.each(['', '   '])('treats a blank label "%s" as decorative', async (label) => {
		const page = await render(`<ontario-icon-accessibility label="${label}"></ontario-icon-accessibility>`);
		const svg = page.root.shadowRoot?.querySelector('svg');
		expect(svg?.getAttribute('aria-hidden')).toBe('true');
		expect(svg?.getAttribute('focusable')).toBe('false');
		expect(svg?.hasAttribute('role')).toBe(false);
		expect(svg?.hasAttribute('aria-label')).toBe(false);
	});

	it('does not expose an unnamed image when the legacy prop is false', async () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		try {
			const page = await render('<ontario-icon-accessibility is-decorative="false"></ontario-icon-accessibility>');
			const svg = page.root.shadowRoot?.querySelector('svg');
			expect(svg?.getAttribute('aria-hidden')).toBe('true');
			expect(svg?.hasAttribute('role')).toBe(false);
			expect(warning).toHaveBeenCalledWith(expect.stringContaining('isDecorative'));
		} finally {
			warning.mockRestore();
		}
	});

	it('warns when the deprecated isDecorative prop is supplied', async () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		const page = await render('<ontario-icon-accessibility is-decorative="true"></ontario-icon-accessibility>');
		const svg = page.root.shadowRoot?.querySelector('svg');

		expect(svg?.getAttribute('aria-hidden')).toBe('true');
		expect(svg?.hasAttribute('role')).toBe(false);
		expect(warning).toHaveBeenCalledWith(expect.stringContaining('isDecorative'));
		warning.mockRestore();
	});

	it('lets a supplied label take precedence over isDecorative', async () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const page = await render(
			'<ontario-icon-accessibility label="Accessibility options" is-decorative="true"></ontario-icon-accessibility>',
		);
		const svg = page.root.shadowRoot?.querySelector('svg');

		expect(svg?.getAttribute('role')).toBe('img');
		expect(svg?.getAttribute('aria-label')).toBe('Accessibility options');
		expect(svg?.hasAttribute('aria-hidden')).toBe(false);
		warning.mockRestore();
	});

	describe('previously fixed-paint icons', () => {
		it.each(['ontario-icon-close-header', 'ontario-icon-menu-header'])('%s defaults to white', async (tag) => {
			const page = await render(`<${tag}></${tag}>`);

			expect(page.root.shadowRoot?.querySelector('.ontario-icon')?.classList.contains('ontario-icon--white')).toBe(
				true,
			);
		});

		it.each(['black', 'blue', 'grey', 'white', 'inherit'])(
			'close-header applies the %s colour class',
			async (colour) => {
				const page = await render(`<ontario-icon-close-header colour="${colour}"></ontario-icon-close-header>`);

				expect(
					page.root.shadowRoot?.querySelector('.ontario-icon')?.classList.contains(`ontario-icon--${colour}`),
				).toBe(true);
			},
		);

		it('falls back to white, not black, when a header icon is given an invalid colour', async () => {
			const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			try {
				const page = await render('<ontario-icon-menu-header colour="not-a-colour"></ontario-icon-menu-header>');

				expect(page.root.shadowRoot?.querySelector('.ontario-icon')?.classList.contains('ontario-icon--white')).toBe(
					true,
				);
				expect(warning).toHaveBeenCalled();
			} finally {
				warning.mockRestore();
			}
		});

		it.each(['ontario-icon-attach', 'ontario-icon-critical-alert-warning'])('%s defaults to black', async (tag) => {
			const page = await render(`<${tag}></${tag}>`);

			expect(page.root.shadowRoot?.querySelector('.ontario-icon')?.classList.contains('ontario-icon--black')).toBe(
				true,
			);
		});
	});

	describe('dropdown-arrow colour', () => {
		it.each(['black', 'blue', 'grey', 'white', 'inherit'])('applies the %s colour class', async (colour) => {
			const page = await render(`<ontario-icon-dropdown-arrow colour="${colour}"></ontario-icon-dropdown-arrow>`);

			expect(page.root.shadowRoot?.querySelector('.ontario-icon')?.classList.contains(`ontario-icon--${colour}`)).toBe(
				true,
			);
		});

		it('defaults to black', async () => {
			const page = await render('<ontario-icon-dropdown-arrow></ontario-icon-dropdown-arrow>');

			expect(page.root.shadowRoot?.querySelector('.ontario-icon')?.classList.contains('ontario-icon--black')).toBe(
				true,
			);
		});

		it('applies a custom CSS colour to the svg', async () => {
			const page = await render('<ontario-icon-dropdown-arrow colour="#123456"></ontario-icon-dropdown-arrow>');
			const svg = page.root.shadowRoot?.querySelector('svg') as SVGElement;

			expect(svg.style.fill).toBe('#123456');
		});

		it('does not warn about the colour attribute', async () => {
			const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			await render('<ontario-icon-dropdown-arrow colour="blue"></ontario-icon-dropdown-arrow>');

			expect(warning).not.toHaveBeenCalled();
			warning.mockRestore();
		});
	});

	describe('search-white deprecation', () => {
		it('warns once per tag in development and still renders', async () => {
			const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			try {
				const first = await render('<ontario-icon-search-white></ontario-icon-search-white>');
				await render('<ontario-icon-search-white></ontario-icon-search-white>');

				const deprecationWarnings = warning.mock.calls.filter(([message]) =>
					String(message).includes('ontario-icon-search-white'),
				);
				expect(deprecationWarnings).toHaveLength(1);
				expect(String(deprecationWarnings[0][0])).toContain('ontario-icon-search');
				expect(first.root.shadowRoot?.querySelector('svg')).not.toBeNull();
			} finally {
				warning.mockRestore();
			}
		});

		it('does not warn for the replacement icon', async () => {
			const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			await render('<ontario-icon-search></ontario-icon-search>');

			expect(warning).not.toHaveBeenCalled();
			warning.mockRestore();
		});
	});
});
