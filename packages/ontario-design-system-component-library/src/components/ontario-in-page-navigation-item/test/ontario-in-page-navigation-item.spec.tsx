import { newSpecPage } from '@stencil/core/testing';
import { OntarioInPageNavigationItem } from '../ontario-in-page-navigation-item';

const setHasDefaultSlotContent = (instance: OntarioInPageNavigationItem, hasDefaultSlotContent: boolean) => {
	(instance as unknown as { hasDefaultSlotContent: boolean }).hasDefaultSlotContent = hasDefaultSlotContent;
};

describe('ontario-in-page-navigation-item', () => {
	let warnSpy: jest.SpyInstance;

	beforeEach(() => {
		warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('renders expected link structure with label and href', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="Section" href="#section"></ontario-in-page-navigation-item>',
		});

		expect(page.root).toBeTruthy();
		expect(page.root?.classList.contains('ontario-in-page-navigation-item')).toBe(true);

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link).toBeTruthy();
		expect(link?.getAttribute('href')).toBe('#section');
		expect(link?.textContent?.trim()).toBe('Section');
	});

	it('renders valid in-page anchor href values', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>',
		});

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link?.getAttribute('href')).toBe('#eligibility');
	});

	it('warns when label validation runs without slot content and label is missing', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item href="#section"></ontario-in-page-navigation-item>',
		});

		const instance = page.rootInstance as OntarioInPageNavigationItem;
		setHasDefaultSlotContent(instance, false);
		instance.label = '';
		instance.validateLabel();

		const hasLabelWarning = warnSpy.mock.calls.some((args) => args.map(String).join(' ').includes('label'));
		expect(hasLabelWarning).toBe(true);
	});

	it('warns when href validation runs without slot content and href is missing', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="Section"></ontario-in-page-navigation-item>',
		});

		const instance = page.rootInstance as OntarioInPageNavigationItem;
		setHasDefaultSlotContent(instance, false);
		instance.href = '';
		instance.validateHref();

		const hasHrefWarning = warnSpy.mock.calls.some((args) => args.map(String).join(' ').includes('href'));
		expect(hasHrefWarning).toBe(true);
	});

	it('warns when href validation runs without slot content and href is not an in-page anchor', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="Section" href="/section"></ontario-in-page-navigation-item>',
		});

		const instance = page.rootInstance as OntarioInPageNavigationItem;
		setHasDefaultSlotContent(instance, false);
		instance.href = '/section';
		instance.validateHref();

		const hasInvalidHrefWarning = warnSpy.mock.calls.some((args) =>
			args.map(String).join(' ').includes('must be an in-page anchor'),
		);
		expect(hasInvalidHrefWarning).toBe(true);
	});

	it('renders fallback href when href is missing', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="Section"></ontario-in-page-navigation-item>',
		});

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link?.getAttribute('href')).toBe('#');
	});

	it('renders empty link text when label is empty', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: '<ontario-in-page-navigation-item label="   " href="#section"></ontario-in-page-navigation-item>',
		});

		const link = page.root?.shadowRoot?.querySelector('a.ontario-in-page-navigation-item__link');
		expect(link?.textContent?.trim()).toBe('');
	});

	it('projects default slot content when custom markup is supplied', async () => {
		const page = await newSpecPage({
			components: [OntarioInPageNavigationItem],
			html: `<ontario-in-page-navigation-item>
				<a class="custom-link" href="#section-custom">Custom section</a>
			</ontario-in-page-navigation-item>`,
		});

		const slot = page.root?.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
		const assignedElements = slot.assignedElements({ flatten: true });

		expect(assignedElements.length).toBe(1);
		expect(assignedElements[0].tagName).toBe('A');
		expect(assignedElements[0].getAttribute('href')).toBe('#section-custom');
	});
});
