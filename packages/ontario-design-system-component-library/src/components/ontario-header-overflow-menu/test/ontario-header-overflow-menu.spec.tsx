import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { OntarioHeaderOverflowMenu } from '../ontario-header-overflow-menu';

describe('ontario-header-overflow-menu', () => {
	let page: SpecPage;
	let host: HTMLOntarioHeaderOverflowMenuElement;
	let hostInstance: any | OntarioHeaderOverflowMenu;
	let hostShadow: ShadowRoot;

	beforeEach(async () => {
		page = await newSpecPage({
			components: [OntarioHeaderOverflowMenu],
			html: `<ontario-header-overflow-menu></ontario-header-overflow-menu>`,
		});

		host = page.root as HTMLOntarioHeaderOverflowMenuElement;
		hostInstance = page.rootInstance as OntarioHeaderOverflowMenu;
		hostShadow = host.shadowRoot as ShadowRoot;

		await page.waitForChanges();
	});

	it('should render without errors', async () => {
		expect(host).not.toBeNull();
		expect(host.tagName).toBe('ONTARIO-HEADER-OVERFLOW-MENU');

		expect(hostShadow).not.toBeNull();
	});

	it('should render menu items correctly', async () => {
		const menuItems = [
			{ title: 'Link 1', href: '/link-1', linkIsActive: false },
			{ title: 'Link 2', href: '/link-2', linkIsActive: false },
		];

		host.menuItems = menuItems;

		await page.waitForChanges();

		// Check if the menuItem data is set correctly in the menu overflow component
		// Should match the number of menu items set in the constant above
		expect(host.menuItems.length).toBe(2);

		const overflowMenuRenderedMenuItems = hostShadow.querySelectorAll(
			'a.ontario-menu-item',
		) as NodeListOf<HTMLAnchorElement>;

		// Check to see the HTML output of the rendered menu items is as expected
		expect(overflowMenuRenderedMenuItems.length).toBe(2);
		expect(overflowMenuRenderedMenuItems[0].textContent?.trim()).toBe(menuItems[0].title);
		expect(overflowMenuRenderedMenuItems[0].href).toContain(menuItems[0].href);
		expect(overflowMenuRenderedMenuItems[1].textContent?.trim()).toBe(menuItems[1].title);
		expect(overflowMenuRenderedMenuItems[1].href).toContain(menuItems[1].href);

		expect(host).toMatchSnapshot();
	});

	/* TODO: This is a good test but may be better suited as an E2E test where actual browser behaviour is tested */
	it('should toggle menu open when the menuButtonToggled event is received', async () => {
		const menuItems = [
			{ title: 'Link 1', href: '/link-1', linkIsActive: false },
			{ title: 'Link 2', href: '/link-2', linkIsActive: false },
		];

		host.menuItems = menuItems;

		await page.waitForChanges();

		expect(hostInstance.menuIsOpen).toBe(false);

		// Simulate the menu button being toggled open
		const event = new CustomEvent('menuButtonToggled', { detail: true });
		window.dispatchEvent(event);

		await page.waitForChanges();

		expect(hostInstance.menuIsOpen).toBe(true);
	});

	/* TODO: This is a good test but may be better suited as an E2E test where actual browser behaviour is tested */
	it('should toggle menu closed when the menuButtonToggled event is received', async () => {
		const menuItems = [
			{ title: 'Link 1', href: '/link-1', linkIsActive: false },
			{ title: 'Link 2', href: '/link-2', linkIsActive: false },
		];

		host.menuItems = menuItems;

		await page.waitForChanges();

		hostInstance.menuIsOpen = true;

		await page.waitForChanges();

		// Simulate the menu button being toggled closed
		const event = new CustomEvent('menuButtonToggled', { detail: false });
		window.dispatchEvent(event);
		await page.waitForChanges();

		expect(hostInstance.menuIsOpen).toBe(false);
	});

	/* TODO: This is a good test but may be better suited as an E2E test where actual browser behaviour is tested */
	it('should close menu when focus leaves', async () => {
		const menuItems = [
			{ title: 'Link 1', href: '/link-1', linkIsActive: false },
			{ title: 'Link 2', href: '/link-2', linkIsActive: false },
		];

		host.menuItems = menuItems;

		await page.waitForChanges();

		// Simulate the menu being opened via menu button toggle event
		const openEvent = new CustomEvent('menuButtonToggled', { detail: true });
		window.dispatchEvent(openEvent);
		await page.waitForChanges();

		expect(hostInstance.menuIsOpen).toBe(true);

		// Simulate the menu being closed via menu button toggle event
		const closeEvent = new CustomEvent('menuButtonToggled', { detail: false });
		window.dispatchEvent(closeEvent);
		await page.waitForChanges();

		expect(hostInstance.menuIsOpen).toBe(false);
	});

	it('should call menu item onClickHandler when item is clicked', async () => {
		const onClickHandler = jest.fn((event: Event) => event.preventDefault());
		host.menuItems = [{ title: 'Link 1', href: '/link-1', linkIsActive: false, onClickHandler }];

		await page.waitForChanges();

		const menuItem = hostShadow.querySelector('a.ontario-menu-item') as HTMLAnchorElement;
		expect(menuItem).not.toBeNull();

		menuItem.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

		expect(onClickHandler).toHaveBeenCalledTimes(1);
	});
});
