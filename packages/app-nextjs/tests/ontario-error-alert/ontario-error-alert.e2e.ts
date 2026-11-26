import { expect, test } from '@playwright/test';

test('renders form children without React key warnings', async ({ page }) => {
	const keyWarnings: string[] = [];
	page.on('console', (message) => {
		if (message.text().includes('Each child in a list should have a unique')) {
			keyWarnings.push(message.text());
		}
	});
	await page.goto('/components/ontario-error-alert');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('button', { name: 'Reset', exact: true })).toBeVisible();
	await page.getByRole('button', { name: 'Reset', exact: true }).click();
	await expect(page.getByRole('status').filter({ hasText: 'Example reset.' })).toBeVisible();
	expect(keyWarnings).toEqual([]);
});

test.describe('integrated error example', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/components/ontario-error-alert');
		await page.waitForLoadState('networkidle');
		await page.waitForFunction(() => customElements.get('ontario-date-input') !== undefined);
	});

	test('preserves design system form spacing through Next.js SSR wrappers', async ({ page }) => {
		const controls = [
			'name-control',
			'details-control',
			'region-control',
			'services-control',
			'contact-control',
			'date-control',
		];
		const checkSpacing = async () => {
			for (const id of controls) {
				await expect(page.locator(`#${id}`)).toHaveCSS('display', 'block');
				await expect(page.locator(`#${id}`)).toHaveCSS('margin-bottom', '40px');
			}
			await expect(page.locator('#native-email').locator('..')).toHaveCSS('margin-bottom', '48px');
			await expect(page.locator('#native-email').locator('..')).toHaveCSS('border-top-style', 'dotted');
			await expect(page.locator('#native-email').locator('..')).toHaveCSS('border-top-width', '1px');
			await expect(page.locator('#native-email').locator('..')).toHaveCSS('border-top-color', 'rgb(204, 204, 204)');
			const reset = await page.getByRole('button', { name: 'Reset', exact: true }).boundingBox();
			const submit = await page.getByRole('button', { name: 'Submit', exact: true }).boundingBox();
			expect(reset).not.toBeNull();
			expect(submit).not.toBeNull();
			expect(submit!.x).toBeGreaterThan(reset!.x + reset!.width);
			expect(submit!.y).toBeCloseTo(reset!.y, 0);
		};
		await checkSpacing();
		await page.getByRole('button', { name: 'Submit', exact: true }).click();
		await checkSpacing();
		await page.getByRole('button', { name: 'Reset', exact: true }).click();
		await checkSpacing();
	});

	test('validates on blur, updates the summary and preserves the native hint association', async ({ page }) => {
		const summary = page.locator('#integrated-error-summary');
		const links = summary.locator('.ontario-error-alert__list a');
		const name = page.locator('#name-field');
		const email = page.locator('#native-email');

		await name.focus();
		await name.blur();
		await expect(name).toHaveAttribute('aria-invalid', 'true');
		await email.focus();
		await email.blur();
		await expect(email).toHaveAttribute('aria-describedby', 'native-email-hint native-email-error');
		await expect(page.locator('#native-email-error')).toContainText('Enter a valid email address');

		await page.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect(links).toHaveCount(6);
		await expect(summary.locator('section')).toBeFocused();
		await links.first().click();
		await expect(name).toBeFocused();
		await name.fill('Jane Doe');
		await name.blur();
		await expect(name).not.toHaveAttribute('aria-invalid', 'true');
		await expect(links).toHaveCount(5);
		await email.fill('jane@example.ca');
		await email.blur();
		await expect(email).toHaveAttribute('aria-describedby', 'native-email-hint');
	});

	test('honours the live-validation toggle and validates date parts on submit and blur', async ({ page }) => {
		const date = page.locator('#date-control');
		const year = page.locator('#year-date-field');
		const month = page.locator('#month-date-field');
		const day = page.locator('#day-date-field');
		const dateError = () => date.evaluate((element: HTMLOntarioDateInputElement) => element.externalErrorMessage);

		await page.getByLabel('Enable live validation').uncheck();
		await year.fill('2024');
		await year.blur();
		expect(await dateError()).toBeFalsy();
		await page.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect.poll(dateError).toBe('Enter the month and day.');
		await month.fill('13');
		await day.fill('20');
		await day.blur();
		expect(await dateError()).toBe('Enter the month and day.');
		await page.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect.poll(dateError).toBe('Enter a valid month.');

		await page.getByLabel('Enable live validation').check();
		await month.fill('2');
		await day.fill('30');
		await day.blur();
		await expect.poll(dateError).toBe('Enter a valid date.');
		await day.fill('29');
		await day.blur();
		await expect.poll(dateError).toBeFalsy();
	});

	test('reset clears incomplete dates and restores live validation after remount', async ({ page }) => {
		const year = page.locator('#year-date-field');
		const month = page.locator('#month-date-field');
		const day = page.locator('#day-date-field');
		const date = page.locator('#date-control');
		await year.fill('2024');
		await month.fill('13');
		await month.blur();
		await expect
			.poll(() => date.evaluate((element: HTMLOntarioDateInputElement) => element.externalErrorMessage))
			.toBe('Enter the day.');
		await page.getByRole('button', { name: 'Reset', exact: true }).click();
		await expect(year).toHaveValue('');
		await expect(month).toHaveValue('');
		await expect(day).toHaveValue('');
		await year.fill('2024');
		await year.blur();
		await expect
			.poll(() => date.evaluate((element: HTMLOntarioDateInputElement) => element.externalErrorMessage))
			.toBe('Enter the month and day.');
	});

	test('accepts a complete form without submitting data', async ({ page }) => {
		await page.locator('#name-field').fill('Jane Doe');
		await page.locator('#details-field').fill('Request details');
		await page.locator('#region-field').selectOption('north');
		await page.locator('label[for="service-licensing"]').click();
		await page.locator('label[for="contact-email"]').click();
		await page.locator('#year-date-field').fill('2024');
		await page.locator('#month-date-field').fill('2');
		await page.locator('#day-date-field').fill('29');
		await page.locator('#native-email').fill('jane@example.ca');
		await page.getByRole('button', { name: 'Submit', exact: true }).click();
		await expect(page.getByRole('status').filter({ hasText: 'All fields are valid.' })).toBeVisible();
		await expect(page.locator('#integrated-error-summary .ontario-error-alert__list a')).toHaveCount(0);
	});
});
