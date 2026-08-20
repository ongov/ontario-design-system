import { render } from '@stencil/vitest';
import type { OntarioInPageNavigationItem } from '../ontario-in-page-navigation-item';

const setHasDefaultSlotContent = (instance: OntarioInPageNavigationItem, hasDefaultSlotContent: boolean) => {
	(instance as unknown as { hasDefaultSlotContent: boolean }).hasDefaultSlotContent = hasDefaultSlotContent;
};

describe('ontario-in-page-navigation-item', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('renders expected link structure with label and href', async () => {
		const page = await render(
			'<ontario-in-page-navigation-item label="Section" href="#section"></ontario-in-page-navigation-item>',
		);

		expect(page.root).toBeTruthy();
		expect(page.root?.classList.contains('ontario-in-page-navigation-item')).toBe(true);

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link).toBeTruthy();
		expect(link?.getAttribute('href')).toBe('#section');
		expect(link?.textContent?.trim()).toBe('Section');
	});

	it('renders valid in-page anchor href values', async () => {
		const page = await render(
			'<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>',
		);

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link?.getAttribute('href')).toBe('#eligibility');
	});

	it('warns when label is missing without slot content', async () => {
		const page = await render(
			'<ontario-in-page-navigation-item label="Section" href="#section"></ontario-in-page-navigation-item>',
		);

		const instance = page.instance as OntarioInPageNavigationItem;
		setHasDefaultSlotContent(instance, false);
		instance.label = '';
		instance.validateLabel();

		const hasLabelWarning = warnSpy.mock.calls.some((args) => args.map(String).join(' ').includes('label'));
		expect(hasLabelWarning).toBe(true);
	});

	it('warns when href is missing without slot content', async () => {
		const page = await render(
			'<ontario-in-page-navigation-item label="Section" href="#section"></ontario-in-page-navigation-item>',
		);

		const instance = page.instance as OntarioInPageNavigationItem;
		setHasDefaultSlotContent(instance, false);
		instance.href = '';
		instance.validateHref();

		const hasHrefWarning = warnSpy.mock.calls.some((args) => args.map(String).join(' ').includes('href'));
		expect(hasHrefWarning).toBe(true);
	});

	it('warns when href is not an in-page anchor', async () => {
		const page = await render(
			'<ontario-in-page-navigation-item label="Section" href="#section"></ontario-in-page-navigation-item>',
		);

		const instance = page.instance as OntarioInPageNavigationItem;
		setHasDefaultSlotContent(instance, false);
		instance.href = '/section';
		instance.validateHref();

		const hasInvalidHrefWarning = warnSpy.mock.calls.some((args) =>
			args.map(String).join(' ').includes('must be an in-page anchor'),
		);
		expect(hasInvalidHrefWarning).toBe(true);
	});

	it('omits href when href is missing', async () => {
		const page = await render('<ontario-in-page-navigation-item label="Section"></ontario-in-page-navigation-item>');

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link?.hasAttribute('href')).toBe(false);
	});

	it('renders empty link text when label is empty', async () => {
		const page = await render(
			'<ontario-in-page-navigation-item label="   " href="#section"></ontario-in-page-navigation-item>',
		);

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link?.textContent?.trim()).toBe('');
	});

	it('projects default slot content when custom markup is supplied', async () => {
		const page = await render(`<ontario-in-page-navigation-item>
				<a class="custom-link" href="#section-custom">Custom section</a>
			</ontario-in-page-navigation-item>`);

		const slot = page.root?.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
		const assignedElements = slot.assignedElements({ flatten: true });

		expect(assignedElements.length).toBe(1);
		expect(assignedElements[0].tagName).toBe('A');
		expect(assignedElements[0].getAttribute('href')).toBe('#section-custom');
	});
});
