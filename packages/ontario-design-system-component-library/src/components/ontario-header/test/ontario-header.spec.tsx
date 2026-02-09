import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';
import OntarioHeaderDefaultData from '../ontario-header-default-data.json';
import { OntarioHeaderOverflowMenu } from '../../ontario-header-overflow-menu/ontario-header-overflow-menu';
import { OntarioLanguageToggle } from '../../ontario-language-toggle/ontario-language-toggle';
import { default as translations } from '../../../translations/global.i18n.json';

jest.mock('@ongov/ontario-design-system-design-tokens/', () => ({
	OntarioBreakpointsSmall: '40em',
	OntarioBreakpointsMedium: '64em',
	OntarioBreakpointsLarge: '90em',
}));

// Used to help with Stencil Component Lifecycles
// the _ variables denote unsued variables
// easier than using ESLint and TypeScript disable comments
globalThis.MutationObserver = class {
	constructor(_callback: MutationCallback) {}
	observe(_target: Node, _options?: MutationObserverInit) {}
	disconnect() {}
	takeRecords(): MutationRecord[] {
		return [];
	}
} as typeof MutationObserver;

describe('ontario-header', () => {
	let page: SpecPage;
	let host: HTMLOntarioHeaderElement;
	let hostShadow: ShadowRoot;

	beforeEach(async () => {
		page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header></ontario-header>`,
		});

		host = page.root as HTMLOntarioHeaderElement;
		hostShadow = host.shadowRoot as ShadowRoot;

		await page.waitForChanges();
	});

	it('should render', async () => {
		expect(host).not.toBeNull();
		expect(host.tagName).toBe('ONTARIO-HEADER');

		expect(hostShadow).not.toBeNull();
	});

	it('should render child components', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader, OntarioLanguageToggle, OntarioHeaderOverflowMenu],
			html: `<ontario-header></ontario-header>`,
		});

		await page.waitForChanges();

		const host = page.root as HTMLOntarioHeaderElement;
		const hostShadow = host.shadowRoot as ShadowRoot;

		// Find the child language toggle component inside the shadow root
		const childLangToggle = hostShadow.querySelector('ontario-language-toggle') as HTMLOntarioLanguageToggleElement;
		expect(childLangToggle).not.toBeNull();
		expect(childLangToggle.tagName).toBe('ONTARIO-LANGUAGE-TOGGLE');

		// Ensure the child language toggle component shadow root is present
		const childLangToggleShadow = childLangToggle.shadowRoot as ShadowRoot;
		expect(childLangToggleShadow).not.toBeNull();

		// Ensure the hild language toggle component has expected html
		const childLangToggleAnchor = childLangToggleShadow.querySelector('.ontario-language-toggler') as HTMLElement;
		expect(childLangToggleAnchor).not.toBeNull();
		expect(childLangToggleAnchor.textContent).toBe(translations.siteLanguage.fullWord.fr);

		// Find the child overflow menu component inside the shadow root
		const childOverflowMenu = hostShadow.querySelector(
			'ontario-header-overflow-menu',
		) as HTMLOntarioHeaderOverflowMenuElement;
		expect(childOverflowMenu).not.toBeNull();
		expect(childOverflowMenu.tagName).toBe('ONTARIO-HEADER-OVERFLOW-MENU');

		// Ensure the child overflow menu component shadow root is present
		const childOverflowMenuShadow = childOverflowMenu.shadowRoot as ShadowRoot;
		expect(childOverflowMenuShadow).not.toBeNull();

		// Ensure the child overflow menu component has expected html
		const childOverflowMenuNav = childOverflowMenuShadow.querySelector(
			'.ontario-application-navigation',
		) as HTMLElement;
		expect(childOverflowMenuNav).not.toBeNull();
	});

	it('should render the ontario header', async () => {
		host.type = 'ontario';

		await page.waitForChanges();

		expect(hostShadow).not.toBeNull();
		expect(hostShadow.querySelectorAll('.ontario-header').length).toBe(1);
	});

	it('should render the ontario header menu items', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader, OntarioHeaderOverflowMenu],
			html: `<ontario-header></ontario-header>`,
		});

		await page.waitForChanges();

		const host = page.root as HTMLOntarioHeaderElement;
		const hostShadow = host.shadowRoot as ShadowRoot;

		host.type = 'ontario';

		await page.waitForChanges();

		// Find the child component inside the shadow root
		const childOverflowMenu = hostShadow.querySelector(
			'ontario-header-overflow-menu',
		) as HTMLOntarioHeaderOverflowMenuElement;

		// Check if the menuItem data is set correctly in the menu overflow child component
		const childOverflowMenuItemsData = childOverflowMenu.menuItems;
		// Should match the number of ontario.ca global topics
		expect(childOverflowMenuItemsData.length).toBe(14);

		// Access the child's shadow root
		const childOverflowMenuShadow = childOverflowMenu.shadowRoot as ShadowRoot;
		const childOverflowMenuRenderedMenuItems = childOverflowMenuShadow.querySelectorAll(
			'a.ontario-menu-item',
		) as NodeListOf<HTMLAnchorElement>;

		// Check to see the HTML output of the rendered menu items is as expected
		expect(childOverflowMenuRenderedMenuItems.length).toBe(14);
		expect(childOverflowMenuRenderedMenuItems[0].textContent?.trim()).toBe(OntarioHeaderDefaultData.en[0].title);
		expect(childOverflowMenuRenderedMenuItems[0].href).toContain(OntarioHeaderDefaultData.en[0].href);
		expect(childOverflowMenuRenderedMenuItems[13].textContent?.trim()).toBe(OntarioHeaderDefaultData.en[13].title);
		expect(childOverflowMenuRenderedMenuItems[13].href).toContain(OntarioHeaderDefaultData.en[13].href);
	});

	it('should render the application header', async () => {
		host.type = 'application';

		await page.waitForChanges();

		expect(hostShadow).not.toBeNull();
		expect(hostShadow.querySelectorAll('.ontario-application-header').length).toBe(1);
	});

	it('should render the application header menu items', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader, OntarioHeaderOverflowMenu],
			html: `<ontario-header></ontario-header>`,
		});

		await page.waitForChanges();

		const host = page.root as HTMLOntarioHeaderElement;
		host.type = 'application';
		host.menuItems = [
			{ title: 'Item 1', href: '/item-1' },
			{ title: 'Item 2', href: '/item-2' },
			{ title: 'Item 3', href: '/item-3' },
		];

		await page.waitForChanges();

		const hostShadow = host.shadowRoot as ShadowRoot;

		// Find the child component inside the shadow root
		const childOverflowMenu = hostShadow.querySelector(
			'ontario-header-overflow-menu',
		) as HTMLOntarioHeaderOverflowMenuElement;

		// Check if the menuItem data is set correctly in the menu overflow child component
		const childOverflowMenuItemsData = childOverflowMenu.menuItems;
		// Should match the number of menu items set on the host
		expect(childOverflowMenuItemsData.length).toBe(3);

		// Access the child's shadow root
		const childOverflowMenuShadow = childOverflowMenu.shadowRoot as ShadowRoot;
		const childOverflowMenuRenderedMenuItems = childOverflowMenuShadow.querySelectorAll(
			'a.ontario-menu-item',
		) as NodeListOf<HTMLAnchorElement>;

		// Check to see the HTML output of the rendered menu items is as expected
		expect(childOverflowMenuRenderedMenuItems.length).toBe(3);
		expect(childOverflowMenuRenderedMenuItems[0].textContent?.trim()).toBe('Item 1');
		expect(childOverflowMenuRenderedMenuItems[0].href).toContain('/item-1');
		expect(childOverflowMenuRenderedMenuItems[2].textContent?.trim()).toBe('Item 3');
		expect(childOverflowMenuRenderedMenuItems[2].href).toContain('/item-3');
	});

	it('should render the ServiceOntario header', async () => {
		host.type = 'serviceOntario';

		await page.waitForChanges();

		expect(hostShadow).not.toBeNull();
		expect(hostShadow?.querySelectorAll('.ontario-service-subheader').length).toBe(1);
	});

	it('should call menu item onClickHandler for subheader menu item', async () => {
		const onClickHandler = jest.fn((event: Event) => event.preventDefault());

		host.type = 'application';
		host.applicationHeaderInfo = {
			title: 'Application',
			href: '/application',
			maxSubheaderLinks: { desktop: 1, tablet: 1, mobile: 1 },
		};
		host.menuItems = [
			{ title: 'Subheader Item', href: '/subheader-item', onClickHandler },
			{ title: 'Overflow Item', href: '/overflow-item' },
		];

		await page.waitForChanges();

		const subheaderItem = hostShadow.querySelector(
			'.ontario-application-subheader__menu a.ontario-menu-item',
		) as HTMLAnchorElement;
		expect(subheaderItem).not.toBeNull();

		subheaderItem.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

		expect(onClickHandler).toHaveBeenCalledTimes(1);
	});

	it('should call menu item onClickHandler for overflow menu item', async () => {
		const onClickHandler = jest.fn((event: Event) => event.preventDefault());

		const page = await newSpecPage({
			components: [OntarioHeader, OntarioHeaderOverflowMenu],
			html: `<ontario-header></ontario-header>`,
		});

		const host = page.root as HTMLOntarioHeaderElement;
		const hostShadow = host.shadowRoot as ShadowRoot;

		host.type = 'application';
		host.applicationHeaderInfo = {
			title: 'Application',
			href: '/application',
			maxSubheaderLinks: { desktop: 1, tablet: 1, mobile: 1 },
		};
		host.menuItems = [
			{ title: 'Subheader Item', href: '/subheader-item' },
			{ title: 'Overflow Item', href: '/overflow-item', onClickHandler },
		];

		await page.waitForChanges();

		const childOverflowMenu = hostShadow.querySelector(
			'ontario-header-overflow-menu',
		) as HTMLOntarioHeaderOverflowMenuElement;
		expect(childOverflowMenu).not.toBeNull();

		const childOverflowMenuShadow = childOverflowMenu.shadowRoot as ShadowRoot;
		const overflowItem = childOverflowMenuShadow.querySelector('a.ontario-menu-item') as HTMLAnchorElement;
		expect(overflowItem).not.toBeNull();

		overflowItem.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

		expect(onClickHandler).toHaveBeenCalledTimes(1);
	});
});
