import { MenuItem } from '../../common/common.interface';

/**
 * Shared keyboard navigation utilities for header menu components
 */
export class HeaderKeyboardNavigation {
	/**
	 * Sync currentIndex with the actually focused menu item
	 * This ensures arrow navigation continues from where Tab navigation left off
	 */
	static syncCurrentIndexWithFocus(
		focusableElements: NodeListOf<HTMLElement>,
		getActiveElement: () => Element | null,
	): number | undefined {
		const activeElement = getActiveElement();

		// Find which menu item currently has focus
		const focusedIndex = Array.from(focusableElements).findIndex((el) => el === activeElement);

		// If we found a focused menu item, return that index
		return focusedIndex !== -1 ? focusedIndex : undefined;
	}

	/**
	 * Handle arrow key navigation through menu items
	 * Returns the new index after navigation
	 */
	static handleArrowNavigation(
		event: KeyboardEvent,
		currentIndex: number | undefined,
		focusableElements: NodeListOf<HTMLElement>,
		menuItems: MenuItem[],
		updateAriaLive: (index: number, items: MenuItem[]) => void,
	): number | undefined {
		if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return currentIndex;

		event.preventDefault();

		let newIndex: number;

		if (event.key === 'ArrowDown') {
			// Move down or wrap to first
			newIndex = currentIndex === undefined ? 0 : (currentIndex + 1) % focusableElements.length;
		} else {
			// Move up or wrap to last
			newIndex =
				currentIndex === undefined
					? focusableElements.length - 1
					: (currentIndex - 1 + focusableElements.length) % focusableElements.length;
		}

		focusableElements[newIndex].focus();
		updateAriaLive(newIndex, menuItems);

		return newIndex;
	}

	/**
	 * Get the currently focused element, accounting for Shadow DOM
	 */
	static getActiveElement(el: HTMLElement): Element | null {
		let active = document.activeElement;

		// Traverse shadow DOM boundaries
		while (active?.shadowRoot?.activeElement) {
			active = active.shadowRoot.activeElement;
		}

		// Check this component's shadow root
		return el.shadowRoot?.activeElement || active;
	}

	/**
	 * Get all focusable elements within a given panel
	 */
	static getFocusableElements(panel: HTMLElement): HTMLElement[] {
		if (!panel) return [];

		const selectors =
			'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		const elements = panel.querySelectorAll(selectors) as NodeListOf<HTMLElement>;

		return Array.from(elements).filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hasAttribute('hidden'));
	}

	/**
	 * Update ARIA live region to announce current menu item position
	 */
	static updateAriaLive(ariaLiveRegion: HTMLElement | undefined, selectedIndex: number, menuItems: MenuItem[]) {
		if (!ariaLiveRegion || !menuItems) return;
		ariaLiveRegion.textContent = `Option ${selectedIndex + 1} of ${menuItems.length}`;
	}

	/**
	 * Get focusable elements inside a component's shadowRoot using a selector.
	 * Returns an array of HTMLElements (already filtered for visibility).
	 * Default selector targets the actual focusable anchors inside menu items.
	 */
	static getFocusableElementsInShadow(
		overflowEl: HTMLElement | null,
		selector = '.ontario-menu-item a',
	): HTMLElement[] {
		if (!overflowEl?.shadowRoot) return [];
		const els = overflowEl.shadowRoot.querySelectorAll(selector) as NodeListOf<HTMLElement>;
		return Array.from(els).filter((el) => el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hasAttribute('hidden'));
	}

	/**
	 * Return the activeElement inside a component's shadowRoot (or null).
	 */
	static getShadowActiveElement(overflowEl: HTMLElement | null): Element | null {
		if (!overflowEl?.shadowRoot) return null;
		return overflowEl.shadowRoot.activeElement || null;
	}
}
