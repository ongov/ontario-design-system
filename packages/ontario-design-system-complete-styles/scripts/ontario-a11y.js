/**
 * A11Y handling
 */
var KEYCODE = {
	TAB: 9,
	ENTER: 13,
	ESCAPE: 27,
};

function addA11y(element) {
	element.setAttribute('aria-hidden', true);
}

function removeA11y(element) {
	element.removeAttribute('aria-hidden');
}

function addA11yVisibility(element) {
	element.setAttribute('aria-hidden', false);
	element.setAttribute('tabindex', -1);
}

function removeA11yVisibility(element) {
	element.setAttribute('aria-hidden', true);
	element.removeAttribute('tabindex');
}

// keyboard utility to Trap focus
function focusUser(config) {
	if (!config) {
		throw new Error('Unable to initialize focus-trapping - missing config');
	}
	var element = config.element,
		escapeCallback = config.callbackOnEscape;

	if (escapeCallback && !(escapeCallback instanceof Function)) {
		throw new Error('Unable to initialize focus-trapping -  callback is not a function');
	}

	var focusableElements = element.querySelectorAll(
		"a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex='0'], [contenteditable]",
	);
	var keyboardHandler;

	if (focusableElements.length > 0) {
		var firstFocusableElement = focusableElements[0],
			lastFocusableElement = focusableElements[focusableElements.length - 1];

		firstFocusableElement.focus();

		keyboardHandler = function keyboardHandler(e) {
			if (e.key === 'Escape' || e.keyCode === KEYCODE.ESCAPE) {
				return escapeCallback();
			}

			if (e.key === 'Tab' || e.keyCode === KEYCODE.TAB) {
				if (e.shiftKey && document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					e.preventDefault();
				} else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					e.preventDefault();
				}
			}
		};
		element.addEventListener('keydown', keyboardHandler);
	}

	return function cleanUpEventListener() {
		if (keyboardHandler) {
			element.removeEventListener('keydown', keyboardHandler);
		}
	};
}
