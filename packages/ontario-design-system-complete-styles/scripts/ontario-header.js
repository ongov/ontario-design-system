// run asynchronously
function deferInFn(fn) {
	if (typeof fn === 'function') setTimeout(fn, 0);
}

/*
  Header
*/
(function () {
	'use strict';

	if (!('addEventListener' in window) || !document.documentElement.classList) return;

	var navPanelSelector = 'ontario-navigation',
		isReadyClass = 'ontario-navigation--is-ready',
		isActiveClass = 'ontario-navigation--open',
		mobileMenuActiveClass = 'ontario-navigation--open';

	var header = document.getElementById('ontario-header'),
		nav = document.getElementById(navPanelSelector),
		openBttnToggler = document.getElementById('ontario-header-menu-toggler'),
		closeBttnToggler = document.getElementById('ontario-header-nav-toggler'),
		body = document.getElementsByTagName('body')[0];

	if (!nav) return;

	var currentTogger = null,
		currentDomEl = null;

	function showNavPanel(navpanel) {
		body.classList.add(mobileMenuActiveClass);
		header.parentNode.classList.add(isActiveClass);

		navpanel.classList.add('ontario-navigation--open');

		addA11yVisibility(navpanel);

		focusUser({
			element: navpanel,
			callbackOnEscape: hideNavPanel,
		});

		closeBttnToggler.focus();

		deferInFn(unbindOpenBttnToggler);

		// bind clickables: document, closebttn - asynchronously
		deferInFn(bindDocumentKeydown);
		deferInFn(bindDocumentClick);
		deferInFn(bindCloseBttnToggler);
	}

	function hideNavPanel(navpanel, returnToToggler) {
		var navpanelDomEl = navpanel ? navpanel : currentDomEl;
		var returnFocusToToggler = returnToToggler !== undefined;

		body.classList.remove(mobileMenuActiveClass);
		header.parentNode.classList.remove(isActiveClass);

		var navigation = navpanelDomEl.querySelector('.ontario-navigation')
			? navpanelDomEl.querySelector('.ontario-navigation')
			: navpanelDomEl;

		navpanelDomEl.querySelector('.ontario-navigation').classList.remove('ontario-navigation--open');

		removeA11yVisibility(navigation);

		// unbind clickables: document, closebttn
		unbindCloseBttnToggler();
		unbindDocumentClick();
		unbindDocumentKeydown();

		bindOpenBttnToggler();

		// return focus to toggler
		if (returnFocusToToggler) {
			currentTogger.focus();
			currentTogger = null;
		}
	}

	function openMenu(e) {
		var navpanelId = e.currentTarget.getAttribute('aria-controls');
		var navpanel = document.getElementById(navpanelId);

		if (currentDomEl) {
			hideNavPanel(currentDomEl, false);
		}
		currentTogger = e.currentTarget;
		currentDomEl = document.querySelector('.ontario-header__container');
		showNavPanel(navpanel);
	}

	function closeMenu() {
		hideNavPanel(currentDomEl);
	}

	function onClickHandler(e) {
		hideNavPanel();
	}

	function onKeyboardHandler(e) {
		if (e.key === 'Escape' || e.keyCode === KEYCODE.ESCAPE) hideNavPanel();
	}

	//  bind-unbind events
	function bindOpenBttnToggler() {
		openBttnToggler.addEventListener('click', openMenu);
	}

	function unbindOpenBttnToggler() {
		openBttnToggler.removeEventListener('click', openMenu);
	}

	function bindCloseBttnToggler() {
		closeBttnToggler.addEventListener('click', closeMenu);
	}

	function unbindCloseBttnToggler() {
		closeBttnToggler.removeEventListener('click', closeMenu);
	}

	function bindDocumentClick() {
		document.addEventListener('click', onClickHandler);
	}

	function unbindDocumentClick() {
		document.removeEventListener('click', onClickHandler);
	}

	function bindDocumentKeydown() {
		document.addEventListener('keydown', onKeyboardHandler);
	}

	function unbindDocumentKeydown() {
		document.removeEventListener('keydown', onKeyboardHandler);
	}

	function init() {
		addA11y(nav);
		bindOpenBttnToggler(nav);
		nav.classList.add(isReadyClass);
	}

	init();
})();

/*
    Search
*/
(function () {
	'use strict';

	// review browser support
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

	searchInputField.addEventListener('keyup', function (e) {
		if (e.key === 'Escape' || e.keyCode === KEYCODE.ESCAPE) {
			searchReset.click();
		}
		if (!e.target.value) {
			searchInputField.value = '';
			searchInputField.focus();
		}
	});

	// Mobile handling
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

	searchToggler.addEventListener('click', function (e) {
		toggleSearchForm('expand');
	});
	searchClose.addEventListener('click', function (e) {
		toggleSearchForm('collapse');
	});
	searchClose.addEventListener('keyup', function (e) {
		if (e.key === 'Enter' || e.keyCode === KEYCODE.ENTER) {
			toggleSearchForm('collapse');
		}
	});
})();
