import { render } from '@stencil/vitest';
import { vi } from 'vitest';

describe('ontario-error-message', () => {
	it('hides whitespace-only messages and warns on initial and updated values, not ordinary clears', async () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
		try {
			const page = await render('<ontario-error-message message="   "></ontario-error-message>');
			const error = page.root as HTMLOntarioErrorMessageElement;
			expect(error.hidden).toBe(true);
			expect(error.shadowRoot?.querySelector('[role="alert"]')).toBeNull();
			expect(warning).toHaveBeenCalledTimes(1);
			expect(warning.mock.calls[0][0]).toContain('Ontario Design System');
			expect(warning.mock.calls[0][0]).toContain('message contains only whitespace');

			error.announce = false;
			await page.waitForChanges();
			expect(warning).toHaveBeenCalledTimes(1);
			error.message = ' Meaningful error ';
			await page.waitForChanges();
			expect(error.hidden).toBe(false);
			expect(error.shadowRoot?.textContent).toContain(' Meaningful error ');
			error.message = '\t\n';
			await page.waitForChanges();
			expect(error.hidden).toBe(true);
			expect(warning).toHaveBeenCalledTimes(2);
			error.message = '';
			await page.waitForChanges();
			error.message = undefined;
			await page.waitForChanges();
			expect(warning).toHaveBeenCalledTimes(2);
		} finally {
			warning.mockRestore();
		}
	});

	it('renders plain text with an ID and an alert by default', async () => {
		const page = await render(
			'<ontario-error-message element-id="email-error" message="Enter a valid email."></ontario-error-message>',
		);

		expect(page.root?.id).toBe('email-error');
		expect(page.root?.shadowRoot?.querySelector('[role="alert"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('ontario-icon-alert-error')?.getAttribute('aria-hidden')).toBe('true');
		expect(page.root?.shadowRoot?.textContent).toContain('Enter a valid email.');
	});

	it('does not render an empty alert', async () => {
		const page = await render('<ontario-error-message message=""></ontario-error-message>');

		expect(page.root?.shadowRoot?.querySelector('[role="alert"]')).toBeNull();
		expect(page.root?.hidden).toBe(true);
	});

	it('keeps the error ID in the document tree for native field descriptions', async () => {
		const page = await render(`
			<form>
				<input id="email" aria-invalid="true" aria-describedby="email-error">
				<ontario-error-message element-id="email-error" message="Enter a valid email."></ontario-error-message>
			</form>
		`);
		const input = page.root?.querySelector<HTMLInputElement>('#email');
		const error = page.root?.querySelector('#email-error');

		expect(error?.shadowRoot).not.toBeNull();
		expect(input?.getAttribute('aria-describedby')?.split(/\s+/)).toContain(error?.id);
		expect(document.getElementById('email-error')).toBe(error);
	});

	it('can disable its live announcement', async () => {
		const page = await render(
			'<ontario-error-message message="Invalid value" announce="false"></ontario-error-message>',
		);

		expect(page.root?.shadowRoot?.querySelector('[role="alert"]')).toBeNull();
		expect(page.root?.shadowRoot?.textContent).toContain('Invalid value');
	});

	it('renders message content as text rather than markup', async () => {
		const page = await render('<ontario-error-message message="<img src=x onerror=alert(1)>"></ontario-error-message>');

		expect(page.root?.shadowRoot?.querySelector('img')).toBeNull();
		expect(page.root?.shadowRoot?.textContent).toContain('<img src=x onerror=alert(1)>');
	});

	it('supports a native host ID and clears its content when corrected', async () => {
		const page = await render(
			'<ontario-error-message id="native-error" message="Invalid value"></ontario-error-message>',
		);
		expect(page.root?.id).toBe('native-error');
		(page.root as HTMLOntarioErrorMessageElement).message = '';
		await page.waitForChanges();
		expect(page.root?.hidden).toBe(true);
		expect(page.root?.shadowRoot?.querySelector('[role="alert"]')).toBeNull();
		expect(page.root?.id).toBe('native-error');
	});
});
