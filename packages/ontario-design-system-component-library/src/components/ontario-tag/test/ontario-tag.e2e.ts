import { expect, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { test, E2EPage } from '@stencil/playwright';

const expectNoAxeViolations = async (page: E2EPage, selector: string) => {
	const results = await new AxeBuilder({ page }).include(selector).analyze();
	expect(results.violations).toHaveLength(0);
};

test.describe('ontario-tag - non-dismissible', () => {
	let host: Locator;
	let button: Locator;

	test.beforeEach(async ({ page }) => {
		await page.setContent(`<ontario-tag label="Health" value="health"></ontario-tag>`);
		await page.waitForChanges();

		host = page.locator('ontario-tag');
		button = host.locator('button');
	});

	test('toggles selected and emits tagToggled when clicked', async ({ page }) => {
		const toggledSpy = await page.spyOnEvent('tagToggled');

		await button.click();
		await page.waitForChanges();

		await expect(button).toHaveAttribute('aria-pressed', 'true');
		await expect(host).toHaveAttribute('selected', '');
		expect(toggledSpy).toHaveReceivedEventDetail({ label: 'Health', value: 'health', selected: true });

		await button.click();
		await page.waitForChanges();

		await expect(button).toHaveAttribute('aria-pressed', 'false');
		expect(toggledSpy).toHaveReceivedEventDetail({ label: 'Health', value: 'health', selected: false });
		await expect(toggledSpy).toHaveReceivedEventTimes(2);
	});

	test('toggles with the keyboard: Tab focuses the tag, Space and Enter toggle it', async ({ page }) => {
		const toggledSpy = await page.spyOnEvent('tagToggled');

		await page.keyboard.press('Tab');
		await expect(button).toBeFocused();

		await page.keyboard.press('Space');
		await page.waitForChanges();
		await expect(button).toHaveAttribute('aria-pressed', 'true');

		await page.keyboard.press('Enter');
		await page.waitForChanges();
		await expect(button).toHaveAttribute('aria-pressed', 'false');

		await expect(toggledSpy).toHaveReceivedEventTimes(2);
	});

	test('applies an external selected update to the rendered tag', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioTagElement) => {
			element.selected = true;
		});
		await page.waitForChanges();

		await expect(button).toHaveAttribute('aria-pressed', 'true');
		await expect(button).toHaveClass(/ontario-tag--selected/);
	});

	test('setFocus() focuses the tag button', async ({ page }) => {
		await host.evaluate((element: HTMLOntarioTagElement) => element.setFocus());
		await page.waitForChanges();

		await expect(button).toBeFocused();
	});
});

test.describe('ontario-tag - dismissible', () => {
	test('emits tagDismissed when clicked and does not remove itself', async ({ page }) => {
		await page.setContent(`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`);
		await page.waitForChanges();

		const dismissedSpy = await page.spyOnEvent('tagDismissed');
		const toggledSpy = await page.spyOnEvent('tagToggled');
		const button = page.locator('ontario-tag').locator('button');

		await expect(button).toHaveAccessibleName('Remove Category: Filter');
		await expect(button).not.toHaveAttribute('aria-pressed');

		await button.click();
		await page.waitForChanges();

		expect(dismissedSpy).toHaveReceivedEventDetail({ label: 'Category: Filter', value: 'category-filter' });
		await expect(toggledSpy).toHaveReceivedEventTimes(0);
		await expect(page.locator('ontario-tag')).toHaveCount(1);
	});

	test('emits tagDismissed with the keyboard', async ({ page }) => {
		await page.setContent(`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`);
		await page.waitForChanges();

		const dismissedSpy = await page.spyOnEvent('tagDismissed');

		await page.keyboard.press('Tab');
		await expect(page.locator('ontario-tag').locator('button')).toBeFocused();
		await page.keyboard.press('Enter');
		await page.keyboard.press('Space');
		await page.waitForChanges();

		await expect(dismissedSpy).toHaveReceivedEventTimes(2);
	});

	test('is removed by a consumer that listens for tagDismissed', async ({ page }) => {
		await page.setContent(`
			<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>
			<script>
				document.querySelector('ontario-tag').addEventListener('tagDismissed', (event) => event.target.remove());
			</script>
		`);
		await page.waitForChanges();

		await page.locator('ontario-tag').locator('button').click();
		await page.waitForChanges();

		await expect(page.locator('ontario-tag')).toHaveCount(0);
	});

	test('is named "Supprimer {label}" in French', async ({ page }) => {
		await page.setContent(
			`<ontario-tag label="Santé et bien-être" value="health" language="fr" dismissible></ontario-tag>`,
		);
		await page.waitForChanges();

		await expect(page.locator('ontario-tag').locator('button')).toHaveAccessibleName('Supprimer Santé et bien-être');
	});
});

test.describe('ontario-tag - keyboard order', () => {
	test('each tag is its own Tab stop, in DOM order', async ({ page }) => {
		await page.setContent(`
			<ontario-tag label="Health"></ontario-tag>
			<ontario-tag label="Education" selected></ontario-tag>
			<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>
		`);
		await page.waitForChanges();

		const buttons = page.locator('ontario-tag').locator('button');

		for (let i = 0; i < 3; i++) {
			await page.keyboard.press('Tab');
			await expect(buttons.nth(i)).toBeFocused();
		}
	});
});

test.describe('ontario-tag - accessibility', () => {
	test('has no accessibility violations - unselected', async ({ page }) => {
		await page.setContent(`<ontario-tag label="Health"></ontario-tag>`);
		await page.waitForChanges();

		await expectNoAxeViolations(page, 'ontario-tag');
	});

	test('has no accessibility violations - selected', async ({ page }) => {
		await page.setContent(`<ontario-tag label="Education" selected></ontario-tag>`);
		await page.waitForChanges();

		await expectNoAxeViolations(page, 'ontario-tag');
	});

	test('has no accessibility violations - dismissible', async ({ page }) => {
		await page.setContent(`<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>`);
		await page.waitForChanges();

		await expectNoAxeViolations(page, 'ontario-tag');
	});
});

test.describe('ontario-tag - forced colours', () => {
	// Resolves a system colour keyword to the computed value the browser uses in forced colours mode.
	const systemColour = (page: E2EPage, keyword: string) =>
		page.evaluate((colour) => {
			const probe = document.createElement('div');
			probe.style.forcedColorAdjust = 'none';
			probe.style.color = colour;
			document.body.append(probe);
			const value = getComputedStyle(probe).color;
			probe.remove();
			return value;
		}, keyword);

	test('uses Highlight to set selected and dismissible tags apart', async ({ page }) => {
		await page.emulateMedia({ forcedColors: 'active' });
		await page.setContent(`
			<ontario-tag label="Health"></ontario-tag>
			<ontario-tag label="Education" selected></ontario-tag>
			<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>
		`);
		await page.waitForChanges();

		const highlight = await systemColour(page, 'Highlight');
		const highlightText = await systemColour(page, 'HighlightText');

		await expect(page.locator('ontario-tag[label="Health"]').locator('button')).not.toHaveCSS(
			'background-color',
			highlight,
		);

		for (const label of ['Education', 'Category: Filter']) {
			const button = page.locator(`ontario-tag[label="${label}"]`).locator('button');

			await expect(button).toHaveCSS('background-color', highlight);
			await expect(button).toHaveCSS('border-top-color', highlight);
			await expect(button).toHaveCSS('color', highlightText);
		}

		await expect(page.locator('ontario-tag[dismissible]').locator('ontario-icon-close')).toHaveCSS(
			'color',
			highlightText,
		);
	});
});
