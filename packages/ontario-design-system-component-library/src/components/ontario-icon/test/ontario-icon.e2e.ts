import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { test } from '@stencil/playwright';
import manifest from '../icon-manifest.json' with { type: 'json' };

const rotationFixture = `
	<style>
		.rotating-icon {
			display: inline-block;
			transform: rotate(0deg);
			transition: transform 200ms ease-in-out;
		}

		.rotating-icon--open {
			transform: rotate(180deg);
		}

		@media (prefers-reduced-motion: reduce) {
			.rotating-icon {
				transition: none;
			}
		}
	</style>
	<ontario-icon-chevron-down class="rotating-icon"></ontario-icon-chevron-down>
`;

test.describe('ontario-icon', () => {
	test('every manifest icon renders a decorative, non-focusable SVG', async ({ page }) => {
		await page.setContent(`<main>${manifest.icons.map((icon) => `<${icon.name}></${icon.name}>`).join('')}</main>`);
		await page.waitForChanges();
		for (const icon of manifest.icons) {
			const svg = page.locator(icon.name).locator('svg');
			await expect(svg).toHaveCount(1);
			await expect(svg).toHaveAttribute('aria-hidden', 'true');
			await expect(svg).toHaveAttribute('focusable', 'false');
			await expect(svg).not.toHaveAttribute('role');
		}
	});

	test('colour updates clear a previous custom fill', async ({ page }) => {
		await page.setContent('<ontario-icon-accessibility colour="#123456"></ontario-icon-accessibility>');
		await page.waitForChanges();
		const icon = page.locator('ontario-icon-accessibility');
		const svg = icon.locator('svg');
		await expect(svg).toHaveCSS('fill', 'rgb(18, 52, 86)');
		await icon.evaluate((element: HTMLOntarioIconAccessibilityElement) => {
			element.colour = 'white';
		});
		await expect(svg).toHaveCSS('fill', 'rgb(255, 255, 255)');
		await icon.evaluate((element: HTMLOntarioIconAccessibilityElement) => {
			element.setAttribute('colour', 'not-a-colour');
		});
		await expect(svg).toHaveCSS('fill', 'rgb(26, 26, 26)');
	});

	test('decorative and labelled icons pass axe accessibility checks', async ({ page }) => {
		await page.setContent(`
			<main>
				<ontario-icon-accessibility></ontario-icon-accessibility>
				<ontario-icon-accessibility label="Accessibility options"></ontario-icon-accessibility>
			</main>
		`);
		await page.waitForChanges();

		const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

		expect(results.violations).toHaveLength(0);
	});

	test('consumer rotation applies to the icon host and respects reduced motion', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		await page.setContent(rotationFixture);
		await page.waitForChanges();

		const host = page.locator('ontario-icon-chevron-down');
		await expect(host).toHaveCSS('display', 'inline-block');
		await expect(host).toHaveCSS('transition-duration', '0.2s');

		const transitionFinished = host.evaluate(
			(element) =>
				new Promise<void>((resolve) => element.addEventListener('transitionend', () => resolve(), { once: true })),
		);
		await host.evaluate((element) => element.classList.add('rotating-icon--open'));
		await transitionFinished;
		await expect
			.poll(() => host.evaluate((element) => getComputedStyle(element).transform))
			.toBe('matrix(-1, 0, 0, -1, 0, 0)');

		await page.emulateMedia({ reducedMotion: 'reduce' });
		await expect(host).toHaveCSS('transition-duration', '0s');
	});
});
