/** @jsxRuntime classic */
/** @jsx h */
import { h } from '@stencil/core';
import { render } from '@stencil/vitest';
import { ErrorMessage } from './error-message';

describe('deprecated ErrorMessage functional renderer', () => {
	it('preserves legacy markup and alert behaviour', async () => {
		const page = await render(<ErrorMessage error message="Enter an email address." />);
		expect(page.root?.tagName).toBe('DIV');
		expect(page.root?.classList.contains('ontario-error-messaging')).toBe(true);
		expect(page.root?.getAttribute('role')).toBe('alert');
		expect(page.root?.querySelector('.ontario-error-messaging__content')?.textContent).toBe('Enter an email address.');
	});

	it('preserves the hidden container when the legacy error flag is false', async () => {
		const page = await render(<ErrorMessage message="Not active" />);
		expect(page.root?.classList.contains('ontario-error__hidden')).toBe(true);
	});

	it('preserves the hidden container for an empty error message', async () => {
		const page = await render(<ErrorMessage error message="" />);
		expect(page.root?.classList.contains('ontario-error__hidden')).toBe(true);
	});

	it('retains optional description IDs and announcement suppression', async () => {
		const page = await render(<ErrorMessage error id="legacy-error" message="Invalid" announce={false} />);
		expect(page.root?.id).toBe('legacy-error');
		expect(page.root?.getAttribute('role')).toBeNull();
	});
});
