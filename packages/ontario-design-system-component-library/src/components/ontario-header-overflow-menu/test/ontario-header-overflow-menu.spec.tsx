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

		expect(page.root).toMatchSnapshot();
	});

	it('should toggle menu open when the menuButtonToggled event is received', async () => {
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

	it('should toggle menu closed when the menuButtonToggled event is received', async () => {
		const menuItems = JSON.stringify([{ title: 'Link 1', href: '/link-1', linkIsActive: false }]);

		const page = await newSpecPage({
			components: [OntarioHeaderApplicationMenu],
			html: `<ontario-header-overflow-menu menu-items='${menuItems}'></ontario-header-overflow-menu>`,
		});

		expect(page.rootInstance).toBeTruthy();
		const component = page.rootInstance!;
		component.menuIsOpen = true;
		await page.waitForChanges();

		// Simulate the menu button being toggled closed
		const event = new CustomEvent('menuButtonToggled', { detail: false });
		window.dispatchEvent(event);
		await page.waitForChanges();

		expect(component.menuIsOpen).toBe(false);
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
