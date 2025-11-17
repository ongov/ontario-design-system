/**
 * Defer a function to the next macrotask.
 * @param {Function} fn
 */
function deferInFn(fn) {
	if (typeof fn === 'function') {
		setTimeout(fn, 0);
	}
}

/* ===========================
	Header
=========================== */
(function () {
	'use strict';

	if (!('addEventListener' in window) || !document.documentElement.classList) {
		return;
	}

	console.log('is this running?');
	/* ---------------------------
	   DOM lookups
	--------------------------- */
	const navSelector = document.getElementById('ontario-navigation');
	const openBtnToggler = document.getElementById('ontario-header-menu-toggler');
	const closeBtnToggler = document.getElementById('ontario-header-nav-close-button');

	// Topics/Menu icons
	const menuIcon = document.getElementById('ontario-header-menu-icon'); // desktop caret icon <use>
	const mobileMenuIcon = document.getElementById('ontario-header-menu-icon-mobile'); // mobile hamburger icon <use>

	// Sign-in controls
	const signInIcon = document.getElementById('ontario-header-sign-in-icon'); // caret icon <use>
	const signInBtn = document.getElementById('ontario-header-sign-in-toggler');
	const signInNavigation = document.getElementById('ontario-sign-in-navigation');
	const signInClose = document.getElementById('ontario-header-sign-in-nav-toggler');

	// Mobile menu / tabs
	const mobileMenu = document.getElementById('ontario-mobile-menu');
	const mobileTabs = Array.from(document.querySelectorAll('.ontario-mobile-menu__tab'));
	const mobilePanels = Array.from(document.querySelectorAll('.ontario-mobile-menu__panel'));
	const mobileTopicsTab = document.getElementById('ontario-mobile-menu-tab-topics');
	const mobileSignInTab = document.getElementById('ontario-mobile-menu-tab-sign-in');
	const mobileTopicsPanel = document.getElementById('ontario-mobile-menu-panel-topics');
	const mobileSignInPanel = document.getElementById('ontario-mobile-menu-panel-sign-in');
	const mobileCloseBtn = mobileMenu ? mobileMenu.querySelector('.ontario-mobile-menu-close') : null;

	const body = document.body;
	const appHeader = document.querySelector('.ontario-application-header');

	/* ---------------------------
	   Class/flag constants
	--------------------------- */
	const isReadyClass = 'ontario-navigation--is-ready';
	const isActiveClass = 'ontario-navigation--open';
	const mobileMenuActiveClass = 'ontario-mobile-navigation--open';
	const signInActiveClass = 'ontario-sign-in-navigation--open';

	// Track desktop listeners so we don't double-attach
	let desktopListenersAttached = false;

	/* ---------------------------
		Breakpoint detection
	--------------------------- */
	/**
	 * Desktop breakpoint media query.
	 */
	const desktopMediaQuery = '(min-width: 1168px)';

	/**
	 * Media query list object for detecting viewport changes.
	 */
	const desktopMediaQueryList = window.matchMedia(desktopMediaQuery);

	/**
	 * Determine whether the current viewport is below the desktop breakpoint.
	 * Uses matchMedia for parity with CSS breakpoints.
	 * @returns {boolean} true when in mobile/tablet range, false on desktop.
	 */
	function isMobile() {
		return !desktopMediaQueryList.matches;
	}

	/* ---------------------------
	   SVG <use> helper
	--------------------------- */

	/**
	 * Sets the SVG <use> reference for both modern (href) and legacy (xlink:href) attributes to ensure broad compatibility across browsers.
	 */
	function setUseHref(useEl, val) {
		if (!useEl) return;
		useEl.setAttribute('href', val);
		// legacy attribute, provided for broad compatibility
		useEl.setAttribute('xlink:href', val);
	}

	/* ---------------------------
		Focus-trap helpers
	--------------------------- */
	const focusTraps = {
		mobile: null,
		desktop: null,
	};

	/**
	 * Clear a specific focus trap if it exists.
	 * @param {'mobile'|'desktop'} context - Which focus context to clear.
	 */
	function clearFocusTrapFor(context) {
		const cleanup = focusTraps[context];
		if (cleanup) {
			cleanup();
			focusTraps[context] = null;
		}
	}

	/**
	 * Set or replace a focus trap for a given context.
	 * Automatically clears any existing trap for that context.
	 * @param {'mobile'|'desktop'} context - Focus context.
	 * @param {Element|null} panel - The element whose contents will be trapped.
	 * @param {Element|null} loopTarget - The element to loop focus back to.
	 */
	function setFocusTrapFor(context, panel, loopTarget) {
		clearFocusTrapFor(context);
		focusTraps[context] = trapFocus(panel, loopTarget);
	}

	/**
	 * Aliases for readability — keeps existing code compatible
	 * while making the intent clear.
	 */
	const setMobileFocusTrap = (panel, loopTarget) => setFocusTrapFor('mobile', panel, loopTarget);
	const clearMobileFocusTrap = () => clearFocusTrapFor('mobile');
	const setDesktopFocusTrap = (panel, loopTarget) => setFocusTrapFor('desktop', panel, loopTarget);
	const clearDesktopFocusTrap = () => clearFocusTrapFor('desktop');

	/**
	 * Return focusable elements inside a panel (visible only).
	 * @param {Element|null} panel
	 * @returns {Element[]}
	 */
	function getFocusables(panel) {
		if (!panel) return [];
		return Array.from(
			panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
		).filter((el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
	}

	/**
	 * Trap keyboard focus within a panel and loop to a target element when tabbing wraps.
	 * @param {Element|null} panel
	 * @param {Element|null} loopTarget
	 * @returns {Function} cleanup
	 */
	function trapFocus(panel, loopTarget) {
		if (!panel) return () => {};

		function handler(e) {
			if (e.key !== 'Tab') return;

			const focusable = getFocusables(panel);
			if (!focusable.length) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;

			if (!panel.contains(active)) return;

			if (e.shiftKey) {
				if (active === first) {
					e.preventDefault();
					if (loopTarget && typeof loopTarget.focus === 'function') loopTarget.focus();
				}
			} else {
				if (active === last) {
					e.preventDefault();
					if (loopTarget && typeof loopTarget.focus === 'function') loopTarget.focus();
				}
			}
		}

		document.addEventListener('keydown', handler, true);
		return () => document.removeEventListener('keydown', handler, true);
	}

	/* ---------------------------
		State readers
	--------------------------- */
	/**
	 * True if the desktop topics menu is currently open.
	 * @returns {boolean}
	 */
	function isDesktopMenuOpen() {
		return !!(navSelector && !navSelector.hidden && navSelector.classList.contains(isActiveClass));
	}

	/**
	 * True if the mobile menu is currently open.
	 * @returns {boolean}
	 */
	function isMobileMenuOpen() {
		return !!(mobileMenu && !mobileMenu.hidden && mobileMenu.classList.contains(mobileMenuActiveClass));
	}

	/* ---------------------------
		Icon/ARIA sync
	--------------------------- */
	/**
	 * Synchronize header toggler icons and aria-expanded state with the current DOM state.
	 */
	function syncMenuButtonIcons() {
		const desktopSvg = menuIcon && (menuIcon.closest ? menuIcon.closest('svg') : null);

		const isApplicationHeader = !!appHeader; // application header pages
		const isOntarioHeader = !appHeader; // Ontario.ca header pages

		const mobileOpen = isMobileMenuOpen();
		const desktopOpen = isDesktopMenuOpen();

		if (isApplicationHeader) {
			// Application header: always hamburger <-> X on all sizes
			const open = mobileOpen || desktopOpen;
			setUseHref(menuIcon, open ? '#ontario-icon-close' : '#ontario-icon-menu');
		}

		if (isOntarioHeader) {
			// Ontario header: caret on desktop; mobile hamburger when mobile icon available (fallback to menuIcon)
			if (isMobile()) {
				if (mobileMenuIcon) setUseHref(mobileMenuIcon, mobileOpen ? '#ontario-icon-close' : '#ontario-icon-menu');
				else if (menuIcon) setUseHref(menuIcon, open ? '#ontario-icon-close' : '#ontario-icon-menu');
			} else {
				if (menuIcon) setUseHref(menuIcon, '#ontario-icon-dropdown-arrow');
				if (desktopSvg) desktopSvg.classList.toggle('ontario-icon--rotated', desktopOpen);
			}
		}

		// sign-in icon handling (no change)
		const signInOpen = !!(
			signInNavigation &&
			!signInNavigation.hidden &&
			signInNavigation.classList.contains(signInActiveClass)
		);
		if (signInIcon) setUseHref(signInIcon, '#ontario-icon-dropdown-arrow');
		const signInSvg = signInIcon && (signInIcon.closest ? signInIcon.closest('svg') : null);
		if (signInSvg) signInSvg.classList.toggle('ontario-icon--rotated', !isMobile() && signInOpen);
		if (signInBtn) signInBtn.setAttribute('aria-expanded', signInOpen ? 'true' : 'false');
	}

	/* ---------------------------
		Mobile menu
	--------------------------- */
	/**
	 * Open the mobile menu, set focus trap, and update the icon state.
	 */
	function openMobileMenu() {
		if (!mobileMenu) return;

		mobileMenu.hidden = false;
		mobileMenu.classList.add(mobileMenuActiveClass);
		showTopicsMenu();

		if (mobileTopicsTab) mobileTopicsTab.focus();
		document.addEventListener('mousedown', mobileOutsideHandler);

		setMobileFocusTrap(mobileTopicsPanel, mobileTopicsTab);

		syncMenuButtonIcons();
	}

	/**
	 * Close the mobile menu, remove focus trap, and update the icon state.
	 * @param {boolean} [suppressFocus=false] - When true do not move focus to the menu toggler.
	 */
	function closeMobileMenu(suppressFocus) {
		if (!mobileMenu) return;

		mobileMenu.hidden = true;
		mobileMenu.classList.remove(mobileMenuActiveClass);
		document.removeEventListener('mousedown', mobileOutsideHandler);

		if (!suppressFocus && openBtnToggler) openBtnToggler.focus();

		clearMobileFocusTrap();
		syncMenuButtonIcons();
	}

	/**
	 * Close on outside click for the mobile menu.
	 * @param {Event} e
	 */
	function mobileOutsideHandler(e) {
		handleClickOutside(mobileMenu, openBtnToggler, mobileMenuActiveClass, closeMobileMenu, e);
	}

	/**
	 * Switch which mobile tab/panel is active and refresh focus trap.
	 * @param {Element} activePanel
	 * @param {Element} activeTab
	 */
	function switchMobilePanel(activePanel, activeTab) {
		if (!mobileTopicsPanel || !mobileSignInPanel || !mobileTopicsTab || !mobileSignInTab) return;

		// Hide both
		mobileTopicsPanel.hidden = true;
		mobileSignInPanel.hidden = true;
		mobileTopicsPanel.classList.remove('ontario-mobile-menu__panel--active');
		mobileSignInPanel.classList.remove('ontario-mobile-menu__panel--active');

		mobileTopicsTab.setAttribute('aria-selected', 'false');
		mobileSignInTab.setAttribute('aria-selected', 'false');

		// Show requested
		if (activePanel === mobileTopicsPanel && activeTab === mobileTopicsTab) {
			mobileTopicsPanel.hidden = false;
			mobileTopicsPanel.classList.add('ontario-mobile-menu__panel--active');
			mobileTopicsTab.setAttribute('aria-selected', 'true');
		} else if (activePanel === mobileSignInPanel && activeTab === mobileSignInTab) {
			mobileSignInPanel.hidden = false;
			mobileSignInPanel.classList.add('ontario-mobile-menu__panel--active');
			mobileSignInTab.setAttribute('aria-selected', 'true');
		}

		if (activeTab && typeof activeTab.focus === 'function') activeTab.focus();

		setMobileFocusTrap(activePanel, activeTab);
		syncMenuButtonIcons();
	}

	/** Show the topics panel in the mobile menu. */
	function showTopicsMenu() {
		switchMobilePanel(mobileTopicsPanel, mobileTopicsTab);
	}

	/** Show the sign-in panel in the mobile menu. */
	function showSignInMenu() {
		switchMobilePanel(mobileSignInPanel, mobileSignInTab);
	}

	/* ---------------------------
	   Desktop helpers
	--------------------------- */
	/**
	 * Call a close handler when clicking outside a panel.
	 * @param {Element|null} panel
	 * @param {Element|null} toggler
	 * @param {string} activeClass
	 * @param {Function} closeHandler
	 * @param {Event} event
	 */
	function handleClickOutside(panel, toggler, activeClass, closeHandler, event) {
		const panelIsOpen = panel && !panel.hidden && panel.classList.contains(activeClass);
		const clickedPanel = panel && panel.contains(event.target);
		const clickedToggler = toggler && toggler.contains(event.target);

		if (panelIsOpen && !clickedPanel && !clickedToggler) {
			closeHandler();
		}
	}

	/**
	 * Reset a desktop panel and its button to closed state.
	 * @param {Element|null} panel
	 * @param {Element|null} btn
	 * @param {string} activeClass
	 * @param {string} openClass
	 * @param {Element|null} iconEl
	 * @param {string} openIcon
	 * @param {string} closeIcon
	 */
	function resetPanel(panel, btn, activeClass, openClass) {
		if (panel) {
			panel.classList.remove(activeClass);
			panel.hidden = true;
		}
		if (btn) {
			btn.setAttribute('aria-expanded', 'false');
			btn.classList.remove(openClass);
			btn.setAttribute('tabindex', '0');
		}
		// Icon state is handled by syncMenuButtonIcons()
	}

	/**
	 * Close panels on Escape (desktop only).
	 * @param {KeyboardEvent} e
	 */
	function onEscapeDesktop(e) {
		if (e.key === 'Escape') {
			closeAllPanelsDesktop();
		}
	}

	/** Remove desktop listeners and clear the desktop focus trap. */
	function removeDesktopListeners() {
		document.removeEventListener('keydown', onEscapeDesktop);
		document.removeEventListener('mousedown', desktopOutsideHandler);
		clearDesktopFocusTrap();
	}

	/**
	 * Close panels when clicking outside (desktop only).
	 * @param {Event} e
	 */
	function desktopOutsideHandler(e) {
		handleClickOutside(navSelector, openBtnToggler, isActiveClass, closeAllPanelsDesktop, e);
		handleClickOutside(signInNavigation, signInBtn, signInActiveClass, closeAllPanelsDesktop, e);
	}

	/* ---------------------------
		Mobile tab keyboard init
	--------------------------- */
	function activateTab(index) {
		clearMobileFocusTrap();

		mobileTabs.forEach((tab, i) => {
			const selected = i === index;
			tab.setAttribute('aria-selected', selected ? 'true' : 'false');
			tab.setAttribute('tabindex', selected ? '0' : '-1');
			if (selected) tab.focus();
		});

		mobilePanels.forEach((panel, i) => {
			if (i === index) {
				panel.classList.add('ontario-mobile-menu__panel--active');
				panel.removeAttribute('hidden');
			} else {
				panel.classList.remove('ontario-mobile-menu__panel--active');
				panel.setAttribute('hidden', '');
			}
		});

		const activePanel = mobilePanels[index];
		const loopTarget = mobileTabs[index];

		setMobileFocusTrap(activePanel, loopTarget);
		syncMenuButtonIcons();
	}

	mobileTabs.forEach((tab, i) => {
		tab.addEventListener('click', () => activateTab(i));
		tab.addEventListener('keydown', (e) => {
			let newIndex = i;
			if (e.key === 'ArrowRight') newIndex = (i + 1) % mobileTabs.length;
			if (e.key === 'ArrowLeft') newIndex = (i - 1 + mobileTabs.length) % mobileTabs.length;
			if (e.key === 'Home') newIndex = 0;
			if (e.key === 'End') newIndex = mobileTabs.length - 1;
			if (newIndex !== i) {
				e.preventDefault();
				activateTab(newIndex);
			}
		});
	});

	// Initialize first tab
	activateTab(0);

	// Wire up mobile tab buttons
	if (mobileTopicsTab && mobileSignInTab && mobileTopicsPanel && mobileSignInPanel) {
		mobileTopicsTab.addEventListener('click', showTopicsMenu);
		mobileSignInTab.addEventListener('click', showSignInMenu);
	}
	if (mobileCloseBtn) {
		mobileCloseBtn.addEventListener('click', closeMobileMenu);
	}
	if (mobileMenu) {
		mobileMenu.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') closeMobileMenu();
		});
	}

	/* ---------------------------
	   Main toggles
	--------------------------- */
	/**
	 * Click handler for the main Topics/Menu button.
	 * Routes to mobile or desktop behavior based on the current breakpoint.
	 */
	if (openBtnToggler) {
		openBtnToggler.addEventListener('click', function (e) {
			if (isMobile()) {
				e.preventDefault();
				if (appHeader) {
					toggleDesktopMenu(); // app header forces desktop pattern
				} else {
					toggleMobileMenu();
				}
				return;
			}
			toggleDesktopMenu();
		});
	}

	/** Toggle mobile menu open/closed. */
	function toggleMobileMenu() {
		if (mobileMenu && !mobileMenu.hidden) {
			closeMobileMenu();
		} else {
			openMobileMenu();
		}
	}

	/** Toggle desktop topics menu open/closed. */
	function toggleDesktopMenu() {
		const expanded = openBtnToggler && openBtnToggler.getAttribute('aria-expanded') === 'true';

		closeAllPanelsDesktop(); // close everything first to normalize

		if (!expanded) {
			// Panel state
			body.classList.add(mobileMenuActiveClass);
			if (navSelector) {
				navSelector.classList.add(isActiveClass);
				navSelector.hidden = false;
			}

			// Toggler state
			if (openBtnToggler) {
				openBtnToggler.classList.add('ontario-header__menu-toggle--is-open');
				openBtnToggler.setAttribute('aria-expanded', 'true');
				openBtnToggler.setAttribute('tabindex', '0');
			}

			if (closeBtnToggler) closeBtnToggler.setAttribute('aria-expanded', 'true');

			// Accessibility: remove sign-in from tab order while menu open
			if (signInBtn) signInBtn.setAttribute('tabindex', '-1');

			// Focus trap
			setDesktopFocusTrap(navSelector, openBtnToggler);

			// Attach desktop listeners once (avoid duplicates)
			if (!desktopListenersAttached) {
				document.addEventListener('keydown', onEscapeDesktop);
				document.addEventListener('mousedown', desktopOutsideHandler);
				desktopListenersAttached = true;
			}

			syncMenuButtonIcons();
		}
	}

	// Close button inside desktop topics menu
	if (closeBtnToggler) {
		closeBtnToggler.addEventListener('click', closeAllPanelsDesktop);
	}

	/**
	 * Open the desktop sign-in panel and set up listeners and focus trap.
	 */
	function openSignInPanel() {
		if (signInNavigation) {
			signInNavigation.hidden = false;
			signInNavigation.classList.add(signInActiveClass);
		}
		if (signInBtn) {
			signInBtn.setAttribute('aria-expanded', 'true');
			signInBtn.classList.add('ontario-header__sign-in-toggle--is-open');
			signInBtn.setAttribute('tabindex', '0');
		}

		if (openBtnToggler) openBtnToggler.setAttribute('tabindex', '-1');

		// Focus trap
		setDesktopFocusTrap(signInNavigation, signInBtn);

		// Attach desktop listeners once (avoid duplicates)
		if (!desktopListenersAttached) {
			document.addEventListener('keydown', onEscapeDesktop);
			document.addEventListener('mousedown', desktopOutsideHandler);
			desktopListenersAttached = true;
		}

		syncMenuButtonIcons();
	}

	/**
	 * Sign-in button: open/close desktop sign-in panel, or ignore on mobile.
	 */
	if (signInBtn && signInNavigation && signInClose) {
		signInBtn.addEventListener('click', function () {
			if (isMobile()) return;
			const expanded = signInBtn.getAttribute('aria-expanded') === 'true';
			if (expanded) {
				closeAllPanelsDesktop();
			} else {
				closeAllPanelsDesktop();
				openSignInPanel();
			}
		});
		signInClose.addEventListener('click', closeAllPanelsDesktop);
	}

	/**
	 * Close all desktop panels (topics + sign-in), remove listeners, and sync icons.
	 */
	function closeAllPanelsDesktop() {
		// Remove desktop listeners if attached
		if (desktopListenersAttached) {
			document.removeEventListener('keydown', onEscapeDesktop);
			document.removeEventListener('mousedown', desktopOutsideHandler);
			desktopListenersAttached = false;
		}

		// Clear the desktop focus trap
		clearDesktopFocusTrap();

		// Reset panels/buttons
		resetPanel(navSelector, openBtnToggler, isActiveClass, 'ontario-header__menu-toggle--is-open');

		resetPanel(signInNavigation, signInBtn, signInActiveClass, 'ontario-header__sign-in-toggle--is-open');

		if (closeBtnToggler) {
			closeBtnToggler.setAttribute('aria-expanded', 'false');
		}

		body.classList.remove(mobileMenuActiveClass);
		syncMenuButtonIcons();
	}

	// Desktop nav ready state
	if (navSelector && openBtnToggler) {
		navSelector.classList.add(isReadyClass);
	}

	/**
	 * Breakpoint change handler: closes open panels and resyncs icons.
	 * Ensures icons reflect the correct layout immediately after resize.
	 */
	function onBreakpointChange() {
		closeMobileMenu(true);
		closeAllPanelsDesktop();
		syncMenuButtonIcons();
	}

	// Listen for breakpoint changes
	desktopMediaQueryList.addEventListener('change', onBreakpointChange);

	// Normalize once on load so icons match the current layout
	onBreakpointChange();
})();

/* ===========================
	 Search
  =========================== */
(function () {
	'use strict';

	if (!('addEventListener' in window) || !document.documentElement.classList) {
		return;
	}

	var header = document.getElementById('ontario-header'),
		searchFormContainer = document.getElementById('ontario-search-form-container'),
		searchInputField = document.getElementById('ontario-search-input-field'),
		searchReset = document.getElementById('ontario-search-reset'),
		searchToggler = document.getElementById('ontario-header-search-toggler'),
		searchClose = document.getElementById('ontario-header-search-close'),
		searchOpenClass = 'ontario-header--search-open';

	if (!searchFormContainer || !searchInputField || !searchReset) {
		return;
	}

	// ESC clears the field; empty value keeps focus
	searchInputField.addEventListener('keyup', function (e) {
		if (e.key === 'Escape' || e.keyCode === KEYCODE.ESCAPE) {
			searchReset.click();
		}
		if (!e.target.value) {
			searchInputField.value = '';
			searchInputField.focus();
		}
	});

	/**
	 * Toggle the header search form open/closed and manage focus/ARIA.
	 * @param {'expand'|'collapse'} newState
	 */
	function toggleSearchForm(newState) {
		header.classList.toggle(searchOpenClass);
		if (newState === 'expand') {
			removeA11y(searchFormContainer);
			searchInputField.focus();
		} else {
			addA11y(searchFormContainer);
			searchToggler.focus();
		}
	}

	searchToggler.addEventListener('click', function () {
		toggleSearchForm('expand');
	});

	searchClose.addEventListener('click', function () {
		toggleSearchForm('collapse');
	});

	searchClose.addEventListener('keyup', function (e) {
		if (e.key === 'Enter' || e.keyCode === KEYCODE.ENTER) {
			toggleSearchForm('collapse');
		}
	});
})();
