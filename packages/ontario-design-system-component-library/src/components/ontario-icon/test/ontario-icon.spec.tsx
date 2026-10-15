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
});
