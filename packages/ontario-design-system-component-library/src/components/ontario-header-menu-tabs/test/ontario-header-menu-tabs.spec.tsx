import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { OntarioHeaderMenuTabs } from '../ontario-header-menu-tabs';
import { HeaderMenuToggleDetail } from '../../ontario-header/ontario-header.interface';

describe('ontario-header-menu-tabs', () => {
	let page: SpecPage;

	beforeEach(async () => {
		page = await newSpecPage({
			components: [OntarioHeaderMenuTabs],
			html: `<ontario-header-menu-tabs></ontario-header-menu-tabs>`,
		});

		await page.waitForChanges();
	});

	it('should not focus the Topics tab on click-open', async () => {
		const component = page.rootInstance as unknown as {
			handleMenuButtonToggled: (event: CustomEvent<HeaderMenuToggleDetail>) => void;
			menuIsOpen: boolean;
			shouldFocusTabOnOpen: boolean;
		};

		component.handleMenuButtonToggled({
			detail: { isOpen: true, trigger: 'click' },
		} as CustomEvent<HeaderMenuToggleDetail>);

		expect(component.menuIsOpen).toBe(true);
		expect(component.shouldFocusTabOnOpen).toBe(false);
	});

	it('should focus the Topics tab on keyboard-open', async () => {
		const component = page.rootInstance as unknown as {
			handleMenuButtonToggled: (event: CustomEvent<HeaderMenuToggleDetail>) => void;
			menuIsOpen: boolean;
			shouldFocusTabOnOpen: boolean;
		};

		component.handleMenuButtonToggled({
			detail: { isOpen: true, trigger: 'keyboard' },
		} as CustomEvent<HeaderMenuToggleDetail>);

		expect(component.menuIsOpen).toBe(true);
		expect(component.shouldFocusTabOnOpen).toBe(true);
	});

	it('should reset tab focus intent when menu closes', async () => {
		const component = page.rootInstance as unknown as {
			handleMenuButtonToggled: (event: CustomEvent<HeaderMenuToggleDetail>) => void;
			shouldFocusTabOnOpen: boolean;
		};

		component.handleMenuButtonToggled({
			detail: { isOpen: true, trigger: 'keyboard' },
		} as CustomEvent<HeaderMenuToggleDetail>);

		component.handleMenuButtonToggled({
			detail: { isOpen: false, trigger: 'programmatic' },
		} as CustomEvent<HeaderMenuToggleDetail>);

		expect(component.shouldFocusTabOnOpen).toBe(false);
	});
});
