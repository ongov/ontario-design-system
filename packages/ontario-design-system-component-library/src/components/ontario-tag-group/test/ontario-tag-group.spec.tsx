import { describe, expect, it, vi } from 'vitest';
import { render } from '@stencil/vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

const appliedFilters = `
	<ontario-tag-group element-id="applied-filters" heading="Applied filters" heading-level="h2">
		<ontario-tag label="Category: Health" value="health" dismissible></ontario-tag>
		<ontario-tag label="Region: Northern Ontario" value="north" dismissible></ontario-tag>
	</ontario-tag-group>
`;

const getGroup = (root: HTMLElement | undefined) =>
	root?.shadowRoot?.querySelector('.ontario-tag-group') as HTMLDivElement;
const getHeading = (root: HTMLElement | undefined) =>
	root?.shadowRoot?.querySelector('.ontario-tag-group__heading') as HTMLElement | null;
const getStatus = (root: HTMLElement | undefined) =>
	root?.shadowRoot?.querySelector('.ontario-tag-group__status') as HTMLElement;
const getTags = (root: HTMLElement | undefined) =>
	Array.from(root?.querySelectorAll('ontario-tag') ?? []) as HTMLOntarioTagElement[];

// The mock DOM does not fire `slotchange` when light DOM children change, so the tests fire it the way a browser would.
const fireSlotChange = (root: HTMLElement | undefined) =>
	root?.shadowRoot?.querySelector('slot')?.dispatchEvent(new Event('slotchange'));

/**
 * Dismisses a tag, then removes it the way a consumer would.
 */
const dismissAndRemove = async (page: Awaited<ReturnType<typeof render>>, tag: HTMLOntarioTagElement) => {
	(tag.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
	tag.remove();
	fireSlotChange(page.root);
	await page.waitForChanges();
};

describe('ontario-tag-group', () => {
	it('renders a group with a heading and a count', async () => {
		const page = await render(appliedFilters);

		const group = getGroup(page.root);
		const heading = getHeading(page.root);

		expect(group.getAttribute('role')).toBe('group');
		expect(group.getAttribute('aria-labelledby')).toBe('applied-filters-heading');
		expect(group.hasAttribute('aria-label')).toBe(false);
		expect(group.hasAttribute('tabindex')).toBe(false);
		expect(heading?.tagName).toBe('H2');
		expect(heading?.id).toBe('applied-filters-heading');
		expect(heading?.getAttribute('tabindex')).toBe('-1');
		expect(heading?.textContent).toBe('Applied filters (2)');
		expect(page.root?.shadowRoot?.querySelector('.ontario-tag-group__tags slot')).toBeTruthy();
	});

	it('renders a polite, atomic status region that is empty on load', async () => {
		const page = await render(appliedFilters);

		const status = getStatus(page.root);
		expect(status.getAttribute('role')).toBe('status');
		expect(status.getAttribute('aria-live')).toBe('polite');
		expect(status.getAttribute('aria-atomic')).toBe('true');
		expect(status.textContent).toBe('');
	});

	it('should generate an elementId when none is provided', async () => {
		const page = await render(`<ontario-tag-group heading="Applied filters"></ontario-tag-group>`);

		const elementId = (page.root as HTMLOntarioTagGroupElement).elementId;
		expect(elementId).toBeTruthy();
		expect(getGroup(page.root).id).toBe(elementId);
		expect(getHeading(page.root)?.id).toBe(`${elementId}-heading`);
	});

	describe('heading', () => {
		it('should default to an h3', async () => {
			const page = await render(`<ontario-tag-group heading="Applied filters"></ontario-tag-group>`);

			expect(getHeading(page.root)?.tagName).toBe('H3');
		});

		it('should render h4 when headingLevel is h4', async () => {
			const page = await render(`<ontario-tag-group heading="Applied filters" heading-level="h4"></ontario-tag-group>`);

			expect(getHeading(page.root)?.tagName).toBe('H4');
		});

		it('should warn and use h3 when headingLevel is invalid', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			const page = await render(`<ontario-tag-group heading="Applied filters" heading-level="h6"></ontario-tag-group>`);

			expect(warnSpy).toHaveBeenCalled();
			expect((page.root as HTMLOntarioTagGroupElement).headingLevel).toBe('h3');
			expect(getHeading(page.root)?.tagName).toBe('H3');
			warnSpy.mockRestore();
		});

		it('should leave out the count when showCount is false', async () => {
			const page = await render(`
				<ontario-tag-group heading="Applied filters">
					<ontario-tag label="Category: Health" dismissible></ontario-tag>
				</ontario-tag-group>
			`);

			(page.root as HTMLOntarioTagGroupElement).showCount = false;
			await page.waitForChanges();

			expect(getHeading(page.root)?.textContent).toBe('Applied filters');
		});

		it('should show a count of 0 when there are no tags', async () => {
			const page = await render(`<ontario-tag-group heading="Applied filters"></ontario-tag-group>`);

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (0)');
		});
	});

	describe('count', () => {
		it('should only count ontario-tag elements', async () => {
			const page = await render(`
				<ontario-tag-group heading="Applied filters">
					<ontario-tag label="Category: Health" dismissible></ontario-tag>
					<span>Health</span>
				</ontario-tag-group>
			`);

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (1)');
		});

		it('should count tags inside a wrapper element', async () => {
			const page = await render(`
				<ontario-tag-group heading="Applied filters">
					<div style="display: contents"><ontario-tag label="Category: Health" dismissible></ontario-tag></div>
					<div style="display: contents"><ontario-tag label="Region: Northern Ontario" dismissible></ontario-tag></div>
				</ontario-tag-group>
			`);

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (2)');
		});

		it('should update the count when a tag is added', async () => {
			const page = await render(appliedFilters);

			const tag = document.createElement('ontario-tag');
			tag.setAttribute('label', 'Category: Filter');
			page.root?.appendChild(tag);
			fireSlotChange(page.root);
			await page.waitForChanges();

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (3)');
			expect(getStatus(page.root).textContent).toBe('');
		});
	});

	describe('accessible name', () => {
		it('should use groupLabel as the accessible name when there is no heading', async () => {
			const page = await render(`
				<ontario-tag-group group-label="Topics">
					<ontario-tag label="Health"></ontario-tag>
					<ontario-tag label="Education" selected></ontario-tag>
				</ontario-tag-group>
			`);

			const group = getGroup(page.root);
			expect(getHeading(page.root)).toBeNull();
			expect(group.getAttribute('aria-label')).toBe('Topics');
			expect(group.hasAttribute('aria-labelledby')).toBe(false);
			expect(group.getAttribute('tabindex')).toBe('-1');
		});

		it('should prefer the heading over groupLabel', async () => {
			const page = await render(
				`<ontario-tag-group element-id="filters" heading="Applied filters" group-label="Topics"></ontario-tag-group>`,
			);

			const group = getGroup(page.root);
			expect(group.getAttribute('aria-labelledby')).toBe('filters-heading');
			expect(group.hasAttribute('aria-label')).toBe(false);
		});

		it('should warn when neither heading nor groupLabel is provided', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			await render(`<ontario-tag-group><ontario-tag label="Health"></ontario-tag></ontario-tag-group>`);

			expect(warnSpy).toHaveBeenCalled();
			warnSpy.mockRestore();
		});

		it('should not warn when a heading is provided', async () => {
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			await render(appliedFilters);

			// Only design system warnings count: the Stencil dev build used for unit tests logs its own render hints.
			const designSystemWarnings = warnSpy.mock.calls.filter((args) =>
				args.some((arg) => typeof arg === 'string' && arg.includes('Ontario Design System')),
			);
			expect(designSystemWarnings).toHaveLength(0);
			warnSpy.mockRestore();
		});
	});

	describe('hint text', () => {
		it('should render hint text and use it as the accessible description', async () => {
			const page = await render(
				`<ontario-tag-group element-id="filters" heading="Applied filters" hint-text="Hint text example."></ontario-tag-group>`,
			);

			const hint = page.root?.shadowRoot?.querySelector('ontario-hint-text') as HTMLOntarioHintTextElement;
			expect(hint).toBeTruthy();
			expect(hint.id).toBe('filters-hint');
			expect(hint.hint).toBe('Hint text example.');
			expect(getGroup(page.root).getAttribute('aria-describedby')).toBe('filters-hint');
		});

		it('should render the hint between the heading and the tags', async () => {
			const page = await render(
				`<ontario-tag-group heading="Applied filters" hint-text="Hint text example."></ontario-tag-group>`,
			);

			const children = Array.from(getGroup(page.root).children).map((el) => el.className.split(' ')[0]);
			expect(children).toEqual([
				'ontario-tag-group__heading',
				'ontario-tag-group__hint',
				'ontario-tag-group__tags',
				'ontario-tag-group__status',
			]);
		});

		it('should accept a Hint object with HTML content', async () => {
			const page = await render(
				`<ontario-tag-group heading="Applied filters" hint-text='{"hint": "<p>Hint text example.</p>", "hintContentType": "html"}'></ontario-tag-group>`,
			);

			const hint = page.root?.shadowRoot?.querySelector('ontario-hint-text') as HTMLOntarioHintTextElement;
			expect(hint.hintContentType).toBe('html');
		});

		it('should not render hint text or aria-describedby when no hint is provided', async () => {
			const page = await render(appliedFilters);

			expect(page.root?.shadowRoot?.querySelector('ontario-hint-text')).toBeNull();
			expect(getGroup(page.root).hasAttribute('aria-describedby')).toBe(false);
		});

		it('should remove the hint when hintText is cleared', async () => {
			const page = await render(
				`<ontario-tag-group heading="Applied filters" hint-text="Hint text example."></ontario-tag-group>`,
			);

			(page.root as HTMLOntarioTagGroupElement).hintText = undefined;
			await page.waitForChanges();

			expect(page.root?.shadowRoot?.querySelector('ontario-hint-text')).toBeNull();
		});
	});

	describe('removal', () => {
		it('should not remove a tag itself when it is dismissed', async () => {
			const page = await render(appliedFilters);

			const [first] = getTags(page.root);
			(first.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			await page.waitForChanges();

			expect(getTags(page.root)).toHaveLength(2);
			expect(getHeading(page.root)?.textContent).toBe('Applied filters (2)');
		});

		it('should announce the removal with the remaining count and focus the next tag', async () => {
			const page = await render(`
				<ontario-tag-group heading="Applied filters">
					<ontario-tag label="Category: Health" dismissible></ontario-tag>
					<ontario-tag label="Region: Northern Ontario" dismissible></ontario-tag>
					<ontario-tag label="Category: Filter" dismissible></ontario-tag>
				</ontario-tag-group>
			`);

			const [first, second] = getTags(page.root);
			const focusSpy = vi.spyOn(second, 'setFocus');
			await dismissAndRemove(page, first);

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (2)');
			expect(getStatus(page.root).textContent).toBe('Removed: Category: Health. 2 remaining.');
			expect(focusSpy).toHaveBeenCalledTimes(1);
		});

		it('should use the singular message and focus the previous tag when the last tag is removed', async () => {
			const page = await render(appliedFilters);

			const [first, second] = getTags(page.root);
			const focusSpy = vi.spyOn(first, 'setFocus');
			await dismissAndRemove(page, second);

			expect(getStatus(page.root).textContent).toBe('Removed: Region: Northern Ontario. 1 remaining.');
			expect(focusSpy).toHaveBeenCalledTimes(1);
		});

		it('should announce that no tags remain and focus the heading when the only tag is removed', async () => {
			const page = await render(`
				<ontario-tag-group heading="Applied filters">
					<ontario-tag label="Category: Health" dismissible></ontario-tag>
				</ontario-tag-group>
			`);

			const heading = getHeading(page.root) as HTMLElement;
			const focusSpy = vi.spyOn(heading, 'focus');
			await dismissAndRemove(page, getTags(page.root)[0]);

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (0)');
			expect(getStatus(page.root).textContent).toBe('Removed: Category: Health. No tags remaining.');
			expect(focusSpy).toHaveBeenCalledTimes(1);
		});

		it('should focus the group container when the only tag is removed and there is no heading', async () => {
			const page = await render(`
				<ontario-tag-group group-label="Topics">
					<ontario-tag label="Health" dismissible></ontario-tag>
				</ontario-tag-group>
			`);

			const focusSpy = vi.spyOn(getGroup(page.root), 'focus');
			await dismissAndRemove(page, getTags(page.root)[0]);

			expect(getStatus(page.root).textContent).toBe('Removed: Health. No tags remaining.');
			expect(focusSpy).toHaveBeenCalledTimes(1);
		});

		it('should handle a removed tag that was wrapped in another element', async () => {
			const page = await render(`
				<ontario-tag-group heading="Applied filters">
					<div style="display: contents"><ontario-tag label="Category: Health" dismissible></ontario-tag></div>
					<div style="display: contents"><ontario-tag label="Region: Northern Ontario" dismissible></ontario-tag></div>
				</ontario-tag-group>
			`);

			const [first, second] = getTags(page.root);
			const focusSpy = vi.spyOn(second, 'setFocus');
			(first.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			first.parentElement?.remove();
			fireSlotChange(page.root);
			await page.waitForChanges();

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (1)');
			expect(getStatus(page.root).textContent).toBe('Removed: Category: Health. 1 remaining.');
			expect(focusSpy).toHaveBeenCalledTimes(1);
		});

		it('should announce the removal in French', async () => {
			const page = await render(`
				<ontario-tag-group group-label="Sujets" language="fr">
					<ontario-tag label="Santé et bien-être" language="fr" dismissible></ontario-tag>
					<ontario-tag label="Éducation et formation" language="fr" dismissible></ontario-tag>
				</ontario-tag-group>
			`);

			await dismissAndRemove(page, getTags(page.root)[0]);

			expect(getStatus(page.root).textContent).toBe('Supprimé\u00a0: Santé et bien-être. 1 restante.');
		});

		it('should use the French plural and empty messages', async () => {
			const page = await render(`
				<ontario-tag-group group-label="Sujets" language="fr">
					<ontario-tag label="Santé et bien-être" language="fr" dismissible></ontario-tag>
					<ontario-tag label="Éducation et formation" language="fr" dismissible></ontario-tag>
					<ontario-tag label="Category: Health" language="fr" dismissible></ontario-tag>
				</ontario-tag-group>
			`);

			const [first, second, third] = getTags(page.root);
			await dismissAndRemove(page, first);
			expect(getStatus(page.root).textContent).toBe('Supprimé\u00a0: Santé et bien-être. 2 restantes.');

			await dismissAndRemove(page, second);
			await dismissAndRemove(page, third);
			expect(getStatus(page.root).textContent).toBe('Supprimé\u00a0: Category: Health. Aucune étiquette restante.');
		});

		it('should not announce or move focus when a tag is removed without being dismissed', async () => {
			const page = await render(appliedFilters);

			const [first, second] = getTags(page.root);
			const focusSpy = vi.spyOn(second, 'setFocus');
			first.remove();
			fireSlotChange(page.root);
			await page.waitForChanges();

			expect(getHeading(page.root)?.textContent).toBe('Applied filters (1)');
			expect(getStatus(page.root).textContent).toBe('');
			expect(focusSpy).not.toHaveBeenCalled();
		});

		it('should forget a dismissal that is not followed by a removal within one second', async () => {
			const page = await render(appliedFilters);

			const [first, second] = getTags(page.root);
			const focusSpy = vi.spyOn(second, 'setFocus');
			(first.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
			await new Promise((resolve) => setTimeout(resolve, 1100));
			first.remove();
			fireSlotChange(page.root);
			await page.waitForChanges();

			expect(getStatus(page.root).textContent).toBe('');
			expect(focusSpy).not.toHaveBeenCalled();
		});
	});

	describe('language', () => {
		it('should default to English', async () => {
			const page = await render(appliedFilters);

			expect((page.root as HTMLOntarioTagGroupElement).language).toBe('en');
		});

		it('should fall back to English for an unsupported language', async () => {
			const page = await render(`<ontario-tag-group heading="Applied filters" language="de"></ontario-tag-group>`);

			expect((page.root as HTMLOntarioTagGroupElement).language).toBe('en');
		});

		it('should announce in French after the header language is toggled', async () => {
			const page = await render(appliedFilters);

			window.dispatchEvent(
				new CustomEvent('headerLanguageToggled', { detail: { oldLanguage: 'en', newLanguage: 'fr' } }),
			);
			await page.waitForChanges();
			await dismissAndRemove(page, getTags(page.root)[0]);

			expect((page.root as HTMLOntarioTagGroupElement).language).toBe('fr');
			expect(getStatus(page.root).textContent).toBe('Supprimé\u00a0: Category: Health. 1 restante.');
		});
	});
});
