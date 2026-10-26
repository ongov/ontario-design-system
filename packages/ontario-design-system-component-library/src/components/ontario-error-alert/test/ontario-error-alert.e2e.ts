import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { E2EPage, test } from '@stencil/playwright';

test.describe('ontario-error-alert', () => {
	test('keeps link focus on updates and does not override intentional focus during correction', async ({ page }) => {
		await page.setContent(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input id="focus-first" name="first" caption="First" error-message="First error"></ontario-input>
				<ontario-textarea name="second" caption="Second" error-message="Second error"></ontario-textarea>
			</form>
		`);
		await page.waitForChanges();
		const summary = page.locator('ontario-error-alert');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await summary.locator('a').first().focus();
		await page.locator('#focus-first').evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = 'Updated first error';
		});
		await expect(summary.locator('a').first()).toBeFocused();
		await expect(summary.locator('a').first()).toHaveText('Updated first error');
		await page.locator('#focus-first').evaluate(async (element) => {
			const control = element as HTMLOntarioInputElement;
			control.errorMessage = '';
			await control.focusError();
		});
		await expect(page.locator('#focus-first').locator('input')).toBeFocused();
		await expect(summary.locator('a')).toHaveCount(1);
	});

	test('cleans up reassociation and restores discovery after reconnecting', async ({ page }) => {
		await page.setContent(`
			<div id="summary-container">
				<ontario-error-alert form-id="lifecycle-first"></ontario-error-alert>
			</div>
			<form id="lifecycle-first">
				<ontario-input id="lifecycle-a" name="a" caption="First" error-message="First error"></ontario-input>
			</form>
			<form id="lifecycle-second">
				<ontario-input id="lifecycle-b" name="b" caption="Second" error-message="Second error"></ontario-input>
			</form>
		`);
		await page.waitForChanges();
		const summary = page.locator('ontario-error-alert');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await expect(summary.locator('a')).toHaveText('First error');
		await summary.evaluate((element) => {
			(element as HTMLOntarioErrorAlertElement).formId = 'lifecycle-second';
		});
		await expect(summary.locator('a')).toHaveText('Second error');
		await expect(page.locator('#lifecycle-a').locator('.ontario-error-messaging')).toHaveAttribute('role', 'alert');
		await expect(page.locator('#lifecycle-b').locator('.ontario-error-messaging')).not.toHaveAttribute('role', 'alert');
		await page.locator('#lifecycle-a').evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = 'Unrelated change';
		});
		await expect(summary.locator('a')).toHaveText('Second error');
		const summaryHandle = await summary.elementHandle();
		await summaryHandle?.evaluate((element) => element.remove());
		await summaryHandle?.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).refresh();
		});
		await expect(page.locator('#lifecycle-b').locator('.ontario-error-messaging')).toHaveAttribute('role', 'alert');
		await summaryHandle?.evaluate((element) => document.getElementById('summary-container')?.append(element));
		await expect(summary.locator('a')).toHaveText('Second error');
		await page.locator('#lifecycle-second').evaluate((form) => {
			form.insertAdjacentHTML(
				'beforeend',
				'<ontario-textarea name="late" caption="Late" error-message="After reconnect"></ontario-textarea>',
			);
		});
		await expect(summary.locator('a')).toHaveCount(2);
		await expect(summary.locator('a').nth(1)).toHaveText('After reconnect');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).hide();
		});
		await expect(page.locator('#lifecycle-b').locator('.ontario-error-messaging')).toHaveAttribute('role', 'alert');
	});

	test('runs the mixed ODS/native example on the component samples page', async ({ page }) => {
		await page.goto('/');
		const form = page.locator('#integrated-error-form');
		const summary = page.locator('ontario-error-alert[form-id="integrated-error-form"]');
		await expect(form.locator('ontario-input input')).toBeVisible();
		await form.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect(summary.locator('a')).toHaveCount(6);
		const alert = summary.locator('ontario-page-alert');
		await expect(alert).toHaveAttribute('type', 'error');
		await expect(alert.getByRole('heading', { level: 2 })).toHaveText('There is a problem');
		await expect(summary.locator('[data-error-summary]')).toHaveAccessibleName('There is a problem');
		await expect(summary.locator('[data-error-summary]')).toBeFocused();
		await expect(form.locator('#integrated-native-email')).toHaveAttribute('aria-invalid', 'true');
		await expect(form.locator('#integrated-native-email')).toHaveAccessibleDescription(
			'For example, name@example.ca. Enter a valid email address, such as name@example.ca.',
		);

		await form.locator('ontario-input input').fill('Test Person');
		await form.locator('ontario-textarea textarea').fill('A sample request.');
		await form.locator('ontario-dropdown-list select').selectOption('north');
		await form.locator('label[for="integrated-service-licensing"]').click();
		await form.locator('label[for="integrated-contact-email"]').click();
		await form.locator('#year-integrated-date-field').fill('2000');
		await form.locator('#month-integrated-date-field').fill('10');
		await form.locator('#day-integrated-date-field').fill('23');
		await form.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect(summary.locator('a')).toHaveCount(0);
		await expect(form.locator('#integrated-native-email')).toBeFocused();

		await form.locator('#integrated-native-email').fill('person@example.ca');
		await form.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect(page.locator('#integrated-error-result')).toHaveText(
			'All fields are valid. This demonstration did not submit any information.',
		);
		await expect(form.locator('#integrated-native-email')).not.toHaveAttribute('aria-invalid');

		await form.getByRole('button', { name: 'Reset', exact: true }).click();
		await expect(page.locator('#integrated-error-result')).toHaveText('Example reset.');
		await expect(form.locator('ontario-input input')).toHaveValue('');
		await expect(form.locator('#year-integrated-date-field')).toHaveValue('');
		await expect(form.locator('#integrated-service-licensing')).not.toBeChecked();
		await expect(form.locator('#integrated-contact-email')).not.toBeChecked();
		await expect(form.locator('ontario-error-message')).toHaveCount(7);
		await expect(summary.locator('a')).toHaveCount(0);
		await form.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect(summary.locator('a')).toHaveCount(6);
	});

	test('exposes shadow-rendered standalone errors as native descriptions and isolates their styles', async ({
		page,
	}) => {
		await page.setContent(`
			<main>
				<h1>Contact</h1>
				<style>
					.ontario-error-messaging { color: rgb(0, 255, 0) !important; }
					.ontario-alert { background-color: rgb(0, 255, 0) !important; }
				</style>
				<label for="native-email">Email</label>
				<input id="native-email" aria-invalid="true" aria-describedby="native-hint native-error">
				<span id="native-hint">Use your work address.</span>
				<ontario-error-message id="native-error" message="Enter an email address."></ontario-error-message>
			</main>
		`);
		await page.waitForChanges();
		const field = page.locator('input');
		const error = page.locator('ontario-error-message');
		await expect(field).toHaveAccessibleDescription('Use your work address. Enter an email address.');
		await expect(error.locator('.ontario-error-messaging')).not.toHaveCSS('color', 'rgb(0, 255, 0)');
		await error.evaluate((element) => {
			(element as HTMLOntarioErrorMessageElement).message = 'Enter a valid email address.';
		});
		await expect(field).toHaveAccessibleDescription('Use your work address. Enter a valid email address.');
		await error.evaluate((element) => {
			(element as HTMLOntarioErrorMessageElement).message = '';
		});
		await field.evaluate((element) => {
			element.removeAttribute('aria-invalid');
			element.setAttribute('aria-describedby', 'native-hint');
		});
		await expect(error).toBeHidden();
		await expect(field).toHaveAccessibleDescription('Use your work address.');
		const results = await new AxeBuilder({ page }).include('main').analyze();
		expect(results.violations).toHaveLength(0);
	});

	test('releases only its own announcement suppression on hide and disconnect', async ({ page }) => {
		await page.setContent(`
			<form>
				<ontario-error-alert id="first-summary"></ontario-error-alert>
				<ontario-error-alert id="second-summary"></ontario-error-alert>
				<ontario-input name="email" caption="Email" error-message="Email error"></ontario-input>
			</form>
		`);
		await page.waitForChanges();
		const first = page.locator('#first-summary');
		const second = page.locator('#second-summary');
		const input = page.locator('ontario-input');
		const inline = input.locator('.ontario-error-messaging');
		await first.evaluate(async (element) => {
			const summary = element as HTMLOntarioErrorAlertElement;
			await summary.show();
			await summary.show();
			await summary.refresh();
		});
		await second.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).refresh();
		});
		await expect(inline).not.toHaveAttribute('role', 'alert');
		await second.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await first.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).hide();
		});
		await expect(inline).not.toHaveAttribute('role', 'alert');
		await first.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await second.evaluate((element) => element.remove());
		await expect(inline).not.toHaveAttribute('role', 'alert');
		await first.evaluate((element) => element.remove());
		await expect(inline).toHaveAttribute('role', 'alert');
		await expect(input).not.toHaveAttribute('data-error-summary-active');
	});

	test('updates French status text and its language after correction and a language change', async ({ page }) => {
		await page.setContent(`
			<form>
				<ontario-error-alert language="fr"></ontario-error-alert>
				<ontario-input name="email" caption="Courriel" error-message="Erreur initiale"></ontario-input>
			</form>
		`);
		await page.waitForChanges();
		const summary = page.locator('ontario-error-alert');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await expect(summary.locator('[data-error-summary]')).toHaveAttribute('role', 'region');
		await page.locator('ontario-input').evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = 'Entrez une adresse courriel.';
		});
		await expect(summary.locator('[role="status"]')).toHaveText('Erreur mise à jour : Entrez une adresse courriel.');
		await page.locator('ontario-input').evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = '';
		});
		await expect(summary.locator('[role="status"]')).toHaveText('Une erreur a été corrigée.');
		await expect(summary.locator('[role="status"]')).toHaveAttribute('lang', 'fr');
		await summary.evaluate((element) => {
			(element as HTMLOntarioErrorAlertElement).language = 'en';
		});
		await expect(summary.locator('[role="status"]')).toHaveText('An error was corrected.');
		await expect(summary.locator('[role="status"]')).toHaveAttribute('lang', 'en');
	});

	const setFormContent = async (page: E2EPage) => {
		await page.setContent(`
			<main>
				<ontario-error-alert form-id="application-form"></ontario-error-alert>
				<h1>Apply for a service</h1>
				<form id="application-form">
					<ontario-input
						id="email-control"
						element-id="email-field"
						name="email"
						caption="Email address"
						hint-text="Use the address associated with your account."
						error-message="Enter an email address."
					></ontario-input>
				</form>
			</main>
		`);
		await page.waitForChanges();
	};

	const setAllControlContent = async (page: E2EPage) => {
		await page.setContent(`
			<form id="all-control-form">
				<ontario-error-alert></ontario-error-alert>
				<ontario-input element-id="input-field" name="input" caption="Input" error-message="Input error"></ontario-input>
				<ontario-textarea element-id="textarea-field" name="textarea" caption="Textarea" hint-text="Textarea hint" error-message="Textarea error"></ontario-textarea>
				<ontario-dropdown-list element-id="dropdown-field" name="dropdown" caption="Dropdown" hint-text="Dropdown hint" error-message="Dropdown error" options='[{"value":"on","label":"Ontario"}]'></ontario-dropdown-list>
				<ontario-checkboxes name="checkboxes" caption="Checkboxes" hint-text="Checkbox hint" error-message="Checkbox error" options='[{"value":"yes","elementId":"checkbox-option","label":"Yes"}]'></ontario-checkboxes>
				<ontario-radio-buttons name="radios" caption="Radios" hint-text="Radio hint" error-message="Radio error" options='[{"value":"yes","elementId":"radio-option","label":"Yes"}]'></ontario-radio-buttons>
				<ontario-date-input element-id="date-field" caption="Date" hint-text="Date hint" external-error-message="Date error"></ontario-date-input>
			</form>
		`);
		await page.waitForChanges();
	};

	test('shows the form error and focuses its native field from the summary link', async ({ page }) => {
		await setFormContent(page);
		const summary = page.locator('ontario-error-alert');
		const input = page.locator('ontario-input');

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();

		await expect(summary.locator('[data-error-summary]')).toHaveAttribute('role', 'region');
		await expect(summary.locator('a')).toHaveText('Enter an email address.');
		await summary.locator('a').click();
		await expect(input).toBeFocused();
		await expect
			.poll(() => input.evaluate((element) => element.shadowRoot?.activeElement?.getAttribute('id') ?? null))
			.toBe('email-field');
		await expect(input.locator('input')).toHaveAccessibleDescription(
			'Use the address associated with your account. Enter an email address.',
		);
		await summary.locator('a').focus();
		await page.keyboard.press('Enter');
		await expect(input).toBeFocused();
	});

	test('omits a whitespace-only error link while preserving invalid state and reporting the omission', async ({
		page,
	}) => {
		const warnings: string[] = [];
		page.on('console', (message) => {
			if (message.type() === 'warning') warnings.push(message.text());
		});
		await page.setContent(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input id="whitespace-error" name="email" caption="Email" error-message="Initial error"></ontario-input>
			</form>
		`);
		await page.waitForChanges();
		const summary = page.locator('ontario-error-alert');
		const input = page.locator('#whitespace-error');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await expect(summary.locator('a')).toHaveText('Initial error');

		await input.evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = '   ';
		});
		await page.waitForChanges();

		await expect(summary.locator('a')).toHaveCount(0);
		await expect(input.locator('input')).toHaveAttribute('aria-invalid', 'true');
		await expect(input.locator('ontario-error-message')).toHaveAttribute('hidden', '');
		expect(warnings.some((warning) => warning.includes('omitted from the error alert'))).toBe(true);

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).refresh();
		});
		await page.waitForChanges();
		await expect(summary.locator('a')).toHaveCount(0);
		await expect(input.locator('input')).toHaveAttribute('aria-invalid', 'true');
	});

	test('has no axe violations in the active invalid form state', async ({ page }) => {
		await setFormContent(page);
		const summary = page.locator('ontario-error-alert');
		const input = page.locator('ontario-input');

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();

		const results = await new AxeBuilder({ page }).include('main').analyze();
		expect(results.violations).toHaveLength(0);

		await input.evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = '';
		});
		await page.waitForChanges();
		await expect(summary.locator('[data-error-summary]')).toHaveCount(0);
		const correctedResults = await new AxeBuilder({ page }).include('main').analyze();
		expect(correctedResults.violations).toHaveLength(0);
	});

	test('aggregates all six controls, including grouped and compound errors, with no axe violations', async ({
		page,
	}) => {
		await setAllControlContent(page);
		const summary = page.locator('ontario-error-alert');

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();

		await expect(summary.locator('a')).toHaveCount(6);
		await expect(summary.locator('a').allTextContents()).resolves.toEqual([
			'Input error',
			'Textarea error',
			'Dropdown error',
			'Checkbox error',
			'Radio error',
			'Date error',
		]);
		const results = await new AxeBuilder({ page }).include('form').analyze();
		expect(results.violations).toHaveLength(0);
		const descriptions = [
			['ontario-input', 'input', 'Input error'],
			['ontario-textarea', 'textarea', 'Textarea hint Textarea error'],
			['ontario-dropdown-list', 'select', 'Dropdown hint Dropdown error'],
			['ontario-checkboxes', 'input', 'Checkbox error'],
			['ontario-radio-buttons', 'input', 'Radio error'],
			['ontario-date-input', 'input', 'Date hint Date error'],
		] as const;
		for (const [tag, selector, message] of descriptions) {
			const control = page.locator(tag);
			await expect(control.locator('ontario-error-message')).toHaveCount(1);
			for (const field of await control.locator(selector).all()) {
				await expect(field).toHaveAccessibleDescription(message);
			}
			await expect(page.locator('ontario-checkboxes').locator('fieldset')).toHaveAccessibleDescription(
				'Checkbox hint Checkbox error',
			);
			await expect(page.locator('ontario-radio-buttons').locator('fieldset')).toHaveAccessibleDescription(
				'Radio hint Radio error',
			);
		}
		await page.addStyleTag({
			content: '.ontario-alert { background-color: rgb(0, 255, 0) !important; }',
		});
		await expect(summary.locator('ontario-page-alert').locator('.ontario-alert')).toHaveCSS(
			'background-color',
			'rgb(252, 239, 240)',
		);
		await expect(summary.locator('a').first()).toHaveCSS('color', 'rgb(205, 0, 0)');
		await summary.locator('a').first().focus();
		await expect(summary.locator('a').first()).toHaveCSS('color', 'rgb(107, 0, 0)');

		const focusTargets = [
			['ontario-input', 'input-field'],
			['ontario-textarea', 'textarea-field'],
			['ontario-dropdown-list', 'dropdown-field'],
			['ontario-checkboxes', 'checkbox-option'],
			['ontario-radio-buttons', 'radio-option'],
			['ontario-date-input', undefined],
		] as const;
		for (let index = 0; index < focusTargets.length; index++) {
			const [tag, fieldId] = focusTargets[index];
			await summary.locator('a').nth(index).click();
			const host = page.locator(tag);
			await expect(host).toBeFocused();
			if (fieldId) {
				await expect
					.poll(() => host.evaluate((element) => element.shadowRoot?.activeElement?.id ?? null))
					.toBe(fieldId);
			} else {
				await expect
					.poll(() => host.evaluate((element) => element.shadowRoot?.activeElement?.id ?? null))
					.toBe('year-date-field');
			}
		}
	});

	test('isolates multiple forms and discovers a late form control and late error', async ({ page }) => {
		await page.setContent(`
			<main>
				<ontario-error-alert form-id="first-form"></ontario-error-alert>
				<h1>Application</h1>
				<form id="first-form">
					<ontario-input id="first-control" element-id="first-field" name="first" caption="First" error-message="Shared error"></ontario-input>
				</form>
				<form id="second-form">
					<ontario-error-alert></ontario-error-alert>
					<ontario-input id="second-control" element-id="second-field" name="second" caption="Second" error-message="Shared error"></ontario-input>
				</form>
			</main>
		`);
		await page.waitForChanges();
		const summaries = page.locator('ontario-error-alert');
		await summaries.nth(0).evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await summaries.nth(1).evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();
		await expect(summaries.nth(0).locator('a')).toHaveCount(1);
		await expect(summaries.nth(1).locator('a')).toHaveCount(1);

		await page.locator('#first-control').evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = '';
		});
		await page.waitForChanges();
		await expect(summaries.nth(0).locator('a')).toHaveCount(0);
		await expect(summaries.nth(1).locator('a')).toHaveText('Shared error');

		await page.locator('#second-control').evaluate((form) => {
			form.insertAdjacentHTML(
				'beforeend',
				'<ontario-textarea id="late-control" element-id="late-field" name="late" caption="Late" error-message="Late error"></ontario-textarea>',
			);
		});
		await expect(summaries.nth(1).locator('a')).toHaveCount(2);
		await expect(summaries.nth(1).locator('a').nth(1)).toHaveText('Late error');

		await page.locator('#late-control').evaluate((element) => {
			(element as HTMLOntarioTextareaElement).errorMessage = 'Updated late error';
		});
		await page.waitForChanges();
		await expect(summaries.nth(1).locator('a').nth(1)).toHaveText('Updated late error');

		await page.locator('#late-control').evaluate((element) => element.remove());
		await expect(summaries.nth(1).locator('a')).toHaveCount(1);
	});

	test('discovers pre-existing errors when the summary mounts after its form controls', async ({ page }) => {
		await page.setContent(`
			<form id="late-summary-form">
				<ontario-input element-id="late-summary-field" name="email" caption="Email" error-message="Initial server error"></ontario-input>
			</form>
		`);
		await page.waitForChanges();
		await page.locator('form').evaluate((form) => {
			form.insertAdjacentHTML('afterbegin', '<ontario-error-alert></ontario-error-alert>');
		});
		const summary = page.locator('ontario-error-alert');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await expect(summary.locator('a')).toHaveCount(1);
		await expect(summary.locator('a')).toHaveText('Initial server error');
		await page.waitForChanges();
		await expect(summary.locator('[data-error-summary]')).toBeFocused();
	});

	test('includes a form-associated ODS control outside its form', async ({ page }) => {
		await page.setContent(`
			<main>
				<ontario-error-alert form-id="associated-form"></ontario-error-alert>
				<h1>Application</h1>
				<form id="associated-form"></form>
				<ontario-input form="associated-form" element-id="external-field" name="external" caption="External" error-message="External control error"></ontario-input>
			</main>
		`);
		await page.waitForChanges();
		const summary = page.locator('ontario-error-alert');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();
		await expect(summary.locator('a')).toHaveText('External control error');
		await summary.locator('a').click();
		await expect(page.locator('ontario-input')).toBeFocused();
	});

	test('shows no empty summary, activates when an error arrives, and preserves focus during correction', async ({
		page,
	}) => {
		await page.setContent(`
			<form>
				<ontario-error-alert></ontario-error-alert>
				<ontario-input element-id="first-field" name="first" caption="First"></ontario-input>
				<ontario-input element-id="second-field" name="second" caption="Second"></ontario-input>
			</form>
		`);
		await page.waitForChanges();
		const summary = page.locator('ontario-error-alert');
		const inputs = page.locator('ontario-input');

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();
		await expect(summary.locator('[data-error-summary]')).toHaveCount(0);

		await inputs.nth(0).evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = 'First error';
		});
		await expect(summary.locator('a')).toHaveText('First error');
		await expect(summary.locator('[data-error-summary]')).toBeFocused();

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();
		await expect(summary.locator('[data-error-summary]')).toBeFocused();

		await inputs.nth(1).evaluate(async (element) => {
			await (element as HTMLOntarioInputElement).focusError();
		});
		await inputs.nth(0).evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = 'Updated first error';
		});
		await page.waitForChanges();
		await expect(inputs.nth(1)).toBeFocused();
		await expect(summary.locator('a').first()).toHaveText('Updated first error');
	});

	test('moves focus to the associated control when the last focused summary entry clears', async ({ page }) => {
		await setFormContent(page);
		const summary = page.locator('ontario-error-alert');
		const input = page.locator('ontario-input');

		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await page.waitForChanges();
		await summary.locator('[data-error-summary]').focus();
		await input.evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = '';
		});
		await page.waitForChanges();

		await expect(input).toBeFocused();
		await expect(summary.locator('[data-error-summary]')).toHaveCount(0);
	});

	test('recovers shadow focus when a link clears and when the summary hides', async ({ page }) => {
		await setAllControlContent(page);
		const summary = page.locator('ontario-error-alert');
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).show();
		});
		await summary.locator('a').first().focus();
		await page.locator('ontario-input').evaluate((element) => {
			(element as HTMLOntarioInputElement).errorMessage = '';
		});
		await expect(summary.locator('a').first()).toHaveText('Textarea error');
		await expect(summary.locator('a').first()).toBeFocused();
		await summary.evaluate(async (element) => {
			await (element as HTMLOntarioErrorAlertElement).hide();
		});
		await expect(page.locator('ontario-textarea').locator('textarea')).toBeFocused();
		await expect(summary.locator('[data-error-summary]')).toHaveCount(0);
	});
});
