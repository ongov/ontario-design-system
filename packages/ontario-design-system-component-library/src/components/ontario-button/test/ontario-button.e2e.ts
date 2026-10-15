import { expect, Locator } from '@playwright/test';
import { test } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';
import { ButtonTypes, HtmlTypes } from '../ontario-button.types';

test.describe('ontario-button', () => {
	let host: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent('<ontario-button></ontario-button>');
		await page.waitForChanges();
		host = page.locator('ontario-button');
	});

	test('renders default button', async () => {
		const element = host.locator('button');

		await expect(host).toHaveClass(/hydrated/);
		await expect(element).toHaveClass(/ontario-button/);
		await expect(element).toHaveClass(/ontario-button--secondary/);
		await expect(element).toHaveText('');
		await expect(element).toHaveAttribute('type', 'button');
	});

	test('renders changes to the button', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioButtonElement) => {
			element.label = 'Element Content';
			element.ariaLabelText = 'Element Content';
		});
		await page.waitForChanges();

		const element = host.locator('button');

		await expect(element).toHaveClass(/ontario-button--secondary/);
		await expect(element).toHaveText('Element Content');
		await expect(element).toHaveAttribute('aria-label', 'Element Content');
		await expect(element).toHaveAttribute('type', 'button');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.ariaLabelText = 'Aria Label';
		});

		await page.waitForChanges();
		await expect(element).toHaveAttribute('aria-label', 'Aria Label');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.elementId = 'defaultButton';
		});
		await page.waitForChanges();
		await expect(element).toHaveAttribute('id', 'defaultButton');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'primary';
			button.htmlType = 'submit';
		});
		await page.waitForChanges();
		await expect(element).toHaveClass(/ontario-button--primary/);
		await expect(element).toHaveAttribute('type', 'submit');
		await expect(element).toHaveAttribute('id', 'defaultButton');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'tertiary';
			button.htmlType = 'button';
			button.label = 'Back';
			button.elementId = 'BackButton';
		});
		await page.waitForChanges();
		await expect(element).toHaveClass(/ontario-button--tertiary/);
		await expect(element).toHaveText('Back');
		await expect(element).toHaveAttribute('type', 'button');
		await expect(element).toHaveAttribute('id', 'BackButton');
	});

	test('uses the label prop instead of the host content', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.textContent = 'Host Content';
			button.label = 'Save profile';
			button.ariaLabelText = 'Save profile';
		});
		await page.waitForChanges();

		const element = host.locator('button');
		await expect(element).toHaveText('Save profile');
		await expect(element).toHaveAttribute('aria-label', 'Save profile');
	});

	test('renders as a link when href is provided', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.label = 'View details';
			button.href = '/details';
			button.target = '_blank';
			button.rel = 'noopener';
			button.htmlType = 'submit';
		});
		await page.waitForChanges();

		const element = host.locator('a');
		await expect(element).toHaveText('View details');
		await expect(element).toHaveAttribute('href', '/details');
		await expect(element).toHaveAttribute('target', '_blank');
		await expect(element).toHaveAttribute('rel', 'noopener');
		await expect(element).not.toHaveAttribute('type');
		await expect(host.locator('button')).toHaveCount(0);
	});

	for (const buttonType of ButtonTypes) {
		test(`renders the ${buttonType} button type`, async ({ page }) => {
			await host.evaluate((button: HTMLOntarioButtonElement, type) => {
				button.type = type;
			}, buttonType);
			await page.waitForChanges();

			await expect(host.locator('button')).toHaveAttribute('type', 'button');
			await expect(host.locator('button')).toHaveClass(`ontario-button ontario-button--${buttonType}`);
		});
	}

	for (const htmlType of HtmlTypes) {
		test(`renders the ${htmlType} HTML type`, async ({ page }) => {
			await host.evaluate((button: HTMLOntarioButtonElement, type) => {
				button.htmlType = type;
			}, htmlType);
			await page.waitForChanges();

			await expect(host.locator('button')).toHaveAttribute('type', htmlType);
			await expect(host.locator('button')).toHaveClass(/ontario-button/);
		});
	}

	test('applies the expected styles for each button type', async ({ page }) => {
		const element = host.locator('button');

		await expect(element).toHaveCSS('border-top-style', 'solid');
		await expect(element).toHaveCSS('background-color', 'rgb(255, 255, 255)');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'primary';
		});
		await page.waitForChanges();
		await expect(element).toHaveCSS('border-top-width', '0px');
		await expect(element).toHaveCSS('background-color', 'rgb(0, 102, 204)');
		await expect(element).toHaveCSS('border-bottom-left-radius', '4px');
		await expect(element).toHaveCSS('border-bottom-right-radius', '4px');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'secondary';
		});
		await page.waitForChanges();
		await expect(element).toHaveCSS('background-color', 'rgb(255, 255, 255)');
		await expect(element).toHaveCSS('border-bottom-left-radius', '4px');
		await expect(element).toHaveCSS('border-bottom-right-radius', '4px');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'tertiary';
		});
		await page.waitForChanges();
		await expect(element).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
		await expect(element).toHaveCSS('text-decoration-line', 'underline');

		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.type = 'internalThemeDark';
		});
		await page.waitForChanges();
		await expect(element).toHaveCSS('border-top-style', 'solid');
		await expect(element).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
	});

	test('applies hover, focus, and active styles', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement) => {
			button.label = 'Element Content';
			button.type = 'primary';
		});
		await page.waitForChanges();
		const element = host.locator('button');
		const defaultBackground = await element.evaluate((button) => getComputedStyle(button).backgroundColor);

		await element.hover();
		await expect(element).not.toHaveCSS('background-color', defaultBackground);

		await element.focus();
		await expect(element).toHaveCSS('outline-style', 'solid');
		await expect(element).toHaveCSS('outline-color', 'rgba(0, 0, 0, 0)');
		await expect(element).not.toHaveCSS('box-shadow', 'none');

		await page.mouse.down();
		await expect(element).not.toHaveCSS('background-color', defaultBackground);
		await page.mouse.up();
	});

	test('meets the documented minimum button width on larger screens', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.waitForChanges();

		await expect(host.locator('button')).toHaveCSS('min-width', '160px');
	});

	test('renders full width below the small breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.waitForChanges();

		const element = host.locator('button');

		await expect(element).toHaveCSS('display', 'block');

		const buttonBox = await element.boundingBox();
		const hostBox = await host.boundingBox();

		expect(buttonBox?.width).toBe(hostBox?.width);
	});

	test('fires the click event', async ({ page }) => {
		await host.evaluate((button: HTMLOntarioButtonElement) => (button.label = 'Element Content'));
		await page.waitForChanges();

		const clickPromise = host.evaluate(
			(button) =>
				new Promise<void>((resolve) => {
					button.addEventListener('click', () => resolve(), { once: true });
				}),
		);

		await host.locator('button').click();
		await clickPromise;
	});

	for (const buttonType of ButtonTypes) {
		test(`the ${buttonType} button with non-ASCII text has no axe violations`, async ({ page }) => {
			const label = 'Réviser les données reçues';

			await host.evaluate(
				(button: HTMLOntarioButtonElement, properties) => {
					button.label = properties.label;
					button.ariaLabelText = properties.label;
					button.type = properties.type;
				},
				{ label, type: buttonType },
			);
			await page.waitForChanges();

			const button = host.locator('button');
			await expect(button).toHaveText(label);
			await expect(button).toHaveAttribute('aria-label', label);

			const accessibilityScanResults = await new AxeBuilder({ page }).include('ontario-button').analyze();
			expect(accessibilityScanResults.violations).toHaveLength(0);
		});
	}
});
