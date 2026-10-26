import { render } from '@stencil/vitest';
import { vi } from 'vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';
import type { ErrorAwareControl } from '../../../utils/form-error';

describe('ontario-error-alert', () => {
	it('ignores error events from descendants rather than attributing them to their parent control', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input name="email" caption="Email" error-message="Parent error"><span>Child</span></ontario-input>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		await page.waitForChanges();
		await summary.show();
		page.root?.querySelector('span')?.dispatchEvent(
			new CustomEvent('inputErrorOccurred', {
				bubbles: true,
				detail: { errorMessage: 'Unrelated descendant error' },
			}),
		);
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Parent error');
	});

	it('ignores snapshots from an older concurrent refresh', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input id="concurrent-control" name="email" caption="Email" error-message="Initial"></ontario-input>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		const input = page.root?.querySelector('ontario-input') as HTMLOntarioInputElement;
		await page.waitForChanges();
		await summary.show();
		let resolveOlder!: (value: Awaited<ReturnType<typeof input.getErrorState>>) => void;
		const snapshot = vi.spyOn(input, 'getErrorState');
		snapshot.mockImplementationOnce(
			() =>
				new Promise((resolve) => {
					resolveOlder = resolve;
				}),
		);
		const older = summary.refresh();
		snapshot.mockResolvedValue({ controlId: 'email', anchorId: input.id, message: 'Latest snapshot' });
		await summary.refresh();
		resolveOlder({ controlId: 'email', anchorId: input.id, message: 'Stale snapshot' });
		await older;
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Latest snapshot');
	});

	it('normalizes language metadata without rewriting the public prop', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert language="es"></ontario-error-alert>
				<ontario-input name="email" caption="Email" error-message="Email error"></ontario-input>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		await page.waitForChanges();
		await summary.show();
		await page.waitForChanges();
		expect(summary.language).toBe('es');
		const alert = summary.shadowRoot?.querySelector('ontario-page-alert');
		expect(alert?.getAttribute('type')).toBe('error');
		expect(alert?.shadowRoot?.querySelector('h2')?.textContent).toBe('There is a problem');
		expect(summary.shadowRoot?.querySelector('[data-error-summary]')?.getAttribute('aria-label')).toBe(
			'There is a problem',
		);
		expect(summary.shadowRoot?.querySelector('[data-error-summary]')?.getAttribute('lang')).toBe('en');

		summary.language = 'fr';
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('[data-error-summary]')?.getAttribute('lang')).toBe('fr');
		Object.assign(summary, { language: 'es' });
		await page.waitForChanges();
		expect(summary.language).toBe('es');
		expect(summary.shadowRoot?.querySelector('[data-error-summary]')?.getAttribute('lang')).toBe('en');
		expect(summary.shadowRoot?.querySelector('[role="status"]')?.getAttribute('lang')).toBe('en');
	});

	it('localizes updates and corrections when the language changes', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert language="fr"></ontario-error-alert>
				<ontario-input name="email" caption="Courriel" error-message="Erreur initiale"></ontario-input>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		const input = page.root?.querySelector('ontario-input') as HTMLOntarioInputElement;
		await page.waitForChanges();
		await summary.show();
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('ontario-page-alert')?.shadowRoot?.querySelector('h2')?.textContent).toBe(
			'Un problème est survenu',
		);

		input.errorMessage = 'Entrez une adresse courriel.';
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('[role="status"]')?.textContent).toBe(
			'Erreur mise à jour : Entrez une adresse courriel.',
		);
		summary.language = 'en';
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('[role="status"]')?.textContent).toBe(
			'Error updated: Entrez une adresse courriel.',
		);
		summary.language = 'fr';
		input.errorMessage = '';
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('[role="status"]')?.textContent).toBe('Une erreur a été corrigée.');
		expect(summary.shadowRoot?.querySelector('[role="status"]')?.getAttribute('lang')).toBe('fr');
		summary.language = 'en';
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('[role="status"]')?.textContent).toBe('An error was corrected.');
	});

	it('keeps inline announcements suppressed until every active summary hides', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input name="email" caption="Email" error-message="Email error"></ontario-input>
			</form>
		`);
		const summaries = page.root?.querySelectorAll('ontario-error-alert');
		const first = summaries?.[0] as HTMLOntarioErrorAlertElement;
		const second = summaries?.[1] as HTMLOntarioErrorAlertElement;
		const input = page.root?.querySelector('ontario-input') as HTMLOntarioInputElement;
		const role = () =>
			input.shadowRoot
				?.querySelector('ontario-error-message')
				?.shadowRoot?.querySelector('.ontario-error-messaging')
				?.getAttribute('role');
		await page.waitForChanges();
		await first.show();
		await first.show();
		await first.refresh();
		await second.refresh();
		await page.waitForChanges();
		expect(role()).toBeNull();
		await second.show();
		await first.hide();
		await first.refresh();
		await page.waitForChanges();
		expect(role()).toBeNull();
		expect(input.hasAttribute('data-error-summary-active')).toBe(true);
		await second.hide();
		await page.waitForChanges();
		expect(role()).toBe('alert');
		expect(input.hasAttribute('data-error-summary-active')).toBe(false);
	});

	it('shows errors from its associated form and follows live error updates', async () => {
		const originalMutationObserver = global.MutationObserver;
		global.MutationObserver = mutationObserverMock;
		try {
			const page = await render(`
			<div>
				<ontario-error-alert form-id="error-form"></ontario-error-alert>
				<form id="error-form">
					<ontario-input
						element-id="email-field"
						name="email"
						caption="Email"
						hint-text="Use the address associated with your account."
						error-message="Enter an email address."
					></ontario-input>
				</form>
			</div>
		`);
			const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
			const input = page.root?.querySelector('ontario-input') as HTMLOntarioInputElement;

			await page.waitForChanges();
			await summary.show();
			await page.waitForChanges();

			const summarySection = summary.shadowRoot?.querySelector<HTMLElement>('[data-error-summary]');
			expect(summarySection?.getAttribute('role')).toBe('region');
			expect(summarySection?.getAttribute('tabindex')).toBe('-1');
			expect(summary.shadowRoot?.querySelectorAll('a')).toHaveLength(1);
			expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Enter an email address.');
			expect(summary.shadowRoot?.querySelector('a')?.getAttribute('href')).toBe(`#${input.id}`);
			const nativeInput = input.shadowRoot?.querySelector<HTMLInputElement>('input');
			const describedBy = nativeInput?.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
			expect(describedBy).toContain(input.shadowRoot?.querySelector('ontario-error-message')?.id);
			const hint = input.shadowRoot?.querySelector<HTMLOntarioHintTextElement>('ontario-hint-text');
			expect(describedBy).toContain(await hint?.getHintTextId());
			expect(nativeInput?.getAttribute('aria-invalid')).toBe('true');
			expect(
				input.shadowRoot
					?.querySelector('ontario-error-message')
					?.shadowRoot?.querySelector('.ontario-error-messaging')
					?.getAttribute('role'),
			).toBeNull();

			input.errorMessage = 'Use a valid email address.';
			await page.waitForChanges();

			expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Use a valid email address.');
			expect(summary.shadowRoot?.querySelector('[role="status"]')?.textContent).toBe(
				'Error updated: Use a valid email address.',
			);
			expect(
				input.shadowRoot
					?.querySelector('ontario-error-message')
					?.shadowRoot?.querySelector('.ontario-error-messaging')
					?.getAttribute('role'),
			).toBeNull();

			input.errorMessage = '';
			await page.waitForChanges();

			expect(summary.shadowRoot?.querySelector('[data-error-summary]')).toBeNull();
		} finally {
			global.MutationObserver = originalMutationObserver;
		}
	});

	it('supports a summary outside its form and hides without clearing control errors', async () => {
		const page = await render(`
			<div>
				<ontario-error-alert form-id="outside-summary-form"></ontario-error-alert>
				<h1>Form heading</h1>
				<form id="outside-summary-form">
					<ontario-textarea
						element-id="details-field"
						name="details"
						caption="Details"
						error-message="Enter the required details."
					></ontario-textarea>
				</form>
			</div>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		const textarea = page.root?.querySelector('ontario-textarea') as HTMLOntarioTextareaElement;

		await page.waitForChanges();
		await summary.show();
		await page.waitForChanges();
		expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Enter the required details.');

		await summary.hide();
		await page.waitForChanges();

		expect(summary.shadowRoot?.querySelector('[data-error-summary]')).toBeNull();
		expect(textarea.errorMessage).toBe('Enter the required details.');
		expect(
			textarea.shadowRoot
				?.querySelector('ontario-error-message')
				?.shadowRoot?.querySelector('.ontario-error-messaging')
				?.getAttribute('role'),
		).toBe('alert');
	});

	it('discovers ODS controls attached to its form after it loads', async () => {
		const page = await render(`
			<form id="late-controls">
				<ontario-error-alert></ontario-error-alert>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		const form = page.root as HTMLFormElement;

		await page.waitForChanges();
		form!.insertAdjacentHTML(
			'beforeend',
			'<ontario-input element-id="late-email" name="email" caption="Email" error-message="Enter an email address."></ontario-input>',
		);
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();
		await summary.show();
		await page.waitForChanges();

		expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Enter an email address.');
	});

	it('does not let an older snapshot overwrite a newer error event', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input element-id="race-email" name="email" caption="Email" error-message="Old error"></ontario-input>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		const input = page.root?.querySelector('ontario-input') as HTMLOntarioInputElement;
		let resolveSnapshot!: (value: { controlId: string; message: string; anchorId: string } | null) => void;

		await page.waitForChanges();
		await summary.show();
		await page.waitForChanges();
		vi.spyOn(input, 'getErrorState').mockImplementation(
			() =>
				new Promise((resolve) => {
					resolveSnapshot = resolve;
				}),
		);

		const refresh = summary.refresh();
		input.errorMessage = 'New error';
		await page.waitForChanges();
		resolveSnapshot({ controlId: 'race-email', message: 'Old error', anchorId: 'race-email' });
		await refresh;

		expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('New error');
	});

	it('coordinates inline and summary announcements when validation errors are added after activation', async () => {
		const page = await render(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input element-id="late-error" name="email" caption="Email"></ontario-input>
			</form>
		`);
		const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
		const input = page.root?.querySelector('ontario-input') as HTMLOntarioInputElement;

		await page.waitForChanges();
		await summary.show();
		input.errorMessage = 'Enter an email address.';
		await page.waitForChanges();
		await new Promise((resolve) => setTimeout(resolve, 0));
		await page.waitForChanges();

		expect(summary.shadowRoot?.querySelector('a')?.textContent).toBe('Enter an email address.');
		expect(
			input.shadowRoot
				?.querySelector('ontario-error-message')
				?.shadowRoot?.querySelector('.ontario-error-messaging')
				?.getAttribute('role'),
		).toBeNull();
		expect(summary.shadowRoot?.querySelector('[data-error-summary]')?.getAttribute('role')).toBe('region');
	});

	it('warns about duplicate host anchor IDs without changing consumer IDs', async () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
		try {
			const page = await render(`
				<form>
					<ontario-error-alert></ontario-error-alert>
					<ontario-input id="duplicate-error-control" name="first" caption="First" error-message="First error"></ontario-input>
					<ontario-textarea id="duplicate-error-control" name="second" caption="Second" error-message="Second error"></ontario-textarea>
				</form>
			`);
			const summary = page.root?.querySelector('ontario-error-alert') as HTMLOntarioErrorAlertElement;
			const controls = page.root?.querySelectorAll('[id="duplicate-error-control"]');

			await page.waitForChanges();
			await summary.show();
			await page.waitForChanges();

			expect(controls).toHaveLength(2);
			expect(Array.from(controls ?? []).map((control) => control.id)).toEqual([
				'duplicate-error-control',
				'duplicate-error-control',
			]);
			expect(summary.shadowRoot?.querySelectorAll('a')).toHaveLength(2);
			expect(warning).toHaveBeenCalled();
		} finally {
			warning.mockRestore();
		}
	});

	it('exposes current error state, native descriptions, and focus for all supported controls', async () => {
		const page = await render(`
			<div>
				<form id="all-control-errors">
					<ontario-input element-id="email" name="email" caption="Email" error-message="Email error"></ontario-input>
					<ontario-textarea element-id="details" name="details" caption="Details" error-message="Details error"></ontario-textarea>
					<ontario-dropdown-list element-id="province" name="province" caption="Province" error-message="Province error" options='[{"value":"on","label":"Ontario"}]'></ontario-dropdown-list>
					<ontario-checkboxes name="options" caption="Options" error-message="Options error" options='[{"value":"yes","elementId":"option-yes","label":"Yes"}]'></ontario-checkboxes>
					<ontario-radio-buttons name="choice" caption="Choice" error-message="Choice error" options='[{"value":"yes","elementId":"choice-yes","label":"Yes"}]'></ontario-radio-buttons>
					<ontario-date-input element-id="birth-date" caption="Birth date" external-error-message="Date error"></ontario-date-input>
				</form>
			</div>
		`);
		const controls = Array.from(
			page.root?.querySelectorAll<ErrorAwareControl>(
				'ontario-input, ontario-textarea, ontario-dropdown-list, ontario-checkboxes, ontario-radio-buttons, ontario-date-input',
			) ?? [],
		);
		await page.waitForChanges();

		const errors = await Promise.all(controls.map((control) => control.getErrorState?.()));
		expect(errors.map((error) => error?.message)).toEqual([
			'Email error',
			'Details error',
			'Province error',
			'Options error',
			'Choice error',
			'Date error',
		]);

		for (const control of controls) {
			const shadowRoot = control.shadowRoot;
			const message = shadowRoot?.querySelector<HTMLElement>('ontario-error-message');
			const field =
				shadowRoot?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
					'input[aria-invalid="true"], textarea[aria-invalid="true"], select[aria-invalid="true"]',
				) ??
				shadowRoot?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
					'input, textarea, select',
				);

			expect(message?.id).toBeTruthy();
			expect(field?.getAttribute('aria-describedby')?.split(/\s+/)).toContain(message?.id);
			expect(field?.getAttribute('aria-invalid')).toBe('true');
			expect(control.getErrorState).toBeDefined();
			expect(control.focusError).toBeDefined();
			const focusSpy = vi.spyOn(field!, 'focus');
			await control.focusError?.();
			expect(focusSpy).toHaveBeenCalledOnce();
			focusSpy.mockRestore();
		}
	});
});
