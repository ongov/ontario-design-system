import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeaderApplicationMenu } from '../ontario-header-overflow-menu';

describe('ontario-header-overflow-menu', () => {
	it('should render without errors', async () => {
		const page = await newSpecPage({
			components: [OntarioHeaderApplicationMenu],
			html: `<ontario-header-overflow-menu menu-items='[{"title":"Link 1","href":"/link-1"},{"title":"Link 2","href":"/link-2"}]'></ontario-header-overflow-menu>`,
		});

		expect(page.root).toBeTruthy();
	});

	it('should render menu items correctly', async () => {
		const menuItems = JSON.stringify([
			{ title: 'Link 1', href: '/link-1', linkIsActive: false },
			{ title: 'Link 2', href: '/link-2', linkIsActive: false },
		]);

		const page = await newSpecPage({
			components: [OntarioHeaderApplicationMenu],
			html: `<ontario-header-overflow-menu menu-items='${menuItems}'></ontario-header-overflow-menu>`,
		});

		expect(page.root).toBeTruthy();
		const menuLinks = page.root?.shadowRoot?.querySelectorAll('a');

		expect(menuLinks?.length).toBe(2);
		expect(menuLinks?.[0]?.textContent).toBe('Link 1');
		expect(menuLinks?.[0]?.getAttribute('href')).toBe('/link-1');
		expect(menuLinks?.[1]?.textContent).toBe('Link 2');
		expect(menuLinks?.[1]?.getAttribute('href')).toBe('/link-2');
	});

	it('should toggle menu visibility when the menuButtonToggled event is received', async () => {
		const menuItems = JSON.stringify([{ title: 'Link 1', href: '/link-1', linkIsActive: false }]);

		const page = await newSpecPage({
			components: [OntarioHeaderApplicationMenu],
			html: `<ontario-header-overflow-menu menu-items='${menuItems}'></ontario-header-overflow-menu>`,
		});

		expect(page.rootInstance).toBeTruthy();
		const component = page.rootInstance!;
		expect(component.menuIsOpen).toBe(false);

		// Simulate the menu button being toggled open
		const event = new CustomEvent('menuButtonToggled', { detail: true });
		window.dispatchEvent(event);
		await page.waitForChanges();

		expect(component.menuIsOpen).toBe(true);
	});

	it('should close menu when clicking outside', async () => {
		const menuItems = JSON.stringify([{ title: 'Link 1', href: '/link-1', linkIsActive: false }]);

		const page = await newSpecPage({
			components: [OntarioHeaderApplicationMenu],
			html: `<ontario-header-overflow-menu menu-items='${menuItems}'></ontario-header-overflow-menu>`,
		});

		expect(page.rootInstance).toBeTruthy();
		const component = page.rootInstance!;
		component.menuIsOpen = true;
		await page.waitForChanges();

		// Simulate clicking outside the menu
		const event = new MouseEvent('click', { bubbles: true });
		document.body.dispatchEvent(event);
		await page.waitForChanges();

		expect(component.menuIsOpen).toBe(false);
	});
});
