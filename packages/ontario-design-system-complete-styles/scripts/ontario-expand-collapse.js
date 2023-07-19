(function () {
	function findElement(arr, callback) {
		for (var i = 0; i < arr.length; i++) {
			var match = callback(arr[i]);
			if (match) {
				return arr[i];
			}
		}
	}

	function openAllAccordions(item, content) {
		item.classList.remove('ontario-expander--active');
		item.classList.add('ontario-expander--active');
		item.firstElementChild.setAttribute('aria-expanded', 'true');

		content.forEach(function (item) {
			item.classList.remove('ontario-expander__content--opened');
			item.classList.add('ontario-expander__content--opened');

			item.setAttribute('aria-hidden', 'false');
		});
	}

	function closeAllAccordions(item, content) {
		item.classList.remove('ontario-expander--active');
		item.firstElementChild.setAttribute('aria-expanded', 'false');

		content.forEach(function (item) {
			item.classList.remove('ontario-expander__content--opened');

			item.setAttribute('aria-hidden', 'true');
		});
	}

	function toggleExpandAllButton(accordionExpandAllButton) {
		// toggle expand all button class
		accordionExpandAllButton.parentNode.classList.toggle('ontario-accordion__controls--active');

		// toggle aria-expanded value of expand all button class if it contains active class
		accordionExpandAllButton.parentNode.classList.contains('ontario-accordion__controls--active')
			? accordionExpandAllButton.setAttribute('aria-expanded', 'true')
			: accordionExpandAllButton.setAttribute('aria-expanded', 'false');
	}

	function allAccordionsOpenCheck() {
		// get all open accordions
		var openExpanders = document.getElementsByClassName('ontario-expander--active');

		// get total accordions
		var accordionContainers = Array.prototype.slice.call(document.querySelectorAll('.ontario-accordion'));

		if (openExpanders.length === accordionContainers.length) {
			toggleExpandAllButton(document.getElementsByClassName('ontario-accordion__button--expand-all')[0]);
		}

		if (openExpanders.length === 0) {
			var accordionExpandAllButton = document.getElementsByClassName('ontario-accordion__button--expand-all')[0];

			accordionExpandAllButton.setAttribute('aria-expanded', 'false');

			accordionExpandAllButton.parentElement.classList.remove('ontario-accordion__controls--active');
		}
	}

	function toggleExpanderByLink(links, expandableItems) {
		var accordions = Array.prototype.slice.call(document.querySelectorAll('.ontario-accordion'));

		links.forEach(function (link) {
			link.addEventListener('click', function () {
				var id = this.hash.substring(1);

				var relatedAccordion = findElement(accordions, function (accordion) {
					return accordion.id === id;
				});

				relatedAccordion.classList.add('ontario-expander--active');

				window.setTimeout(function () {
					relatedAccordion.firstElementChild.focus();
				}, 0);

				var content = relatedAccordion.querySelector("[data-toggle='ontario-expander-content']");

				content.classList.add('ontario-expander__content--opened');
				content.setAttribute('aria-hidden', 'false');
				relatedAccordion.setAttribute('aria-expanded', 'true');
			});
		});
	}

	function toggleExpander(expanders) {
		expanders.forEach(function (item, index) {
			item.addEventListener('click', function () {
				item.parentNode.classList.toggle('ontario-expander--active');
				var content = item.parentNode.parentNode.querySelector("[data-toggle='ontario-expander-content']");

				content.classList.toggle('ontario-expander__content--opened');
				content.classList.contains('ontario-expander__content--opened')
					? content.setAttribute('aria-hidden', 'false')
					: content.setAttribute('aria-hidden', 'true');

				this.parentNode.classList.contains('ontario-expander--active')
					? this.setAttribute('aria-expanded', 'true')
					: this.setAttribute('aria-expanded', 'false');

				// if expander is an accordion
				if (document.getElementsByClassName('ontario-accordion__button--expand-all').length) {
					allAccordionsOpenCheck();
				}
			});
		});
	}

	function toggleAllAccordions(expandAllButton) {
		expandAllButton.forEach(function (button, index) {
			button.addEventListener('click', function () {
				var accordionContainer = this.parentNode.parentNode;
				var accordionExpandAllButton = this;
				var accordionItems = Array.prototype.slice.call(
					accordionContainer.querySelectorAll('.ontario-accordion-heading'),
				);

				toggleExpandAllButton(accordionExpandAllButton);

				// loop over every accordion item, add correct classes + aria attribuutes if the expand all button is active or not
				accordionItems.forEach(function (item, index) {
					var content = Array.prototype.slice.call(
						item.parentNode.querySelectorAll("[data-toggle='ontario-expander-content']"),
					);

					accordionExpandAllButton.parentNode.classList.contains('ontario-accordion__controls--active')
						? openAllAccordions(item, content)
						: closeAllAccordions(item, content);
				});
			});
		});
	}

	window.addEventListener('DOMContentLoaded', function () {
		var expandableItems = Array.prototype.slice.call(document.querySelectorAll("[data-toggle='ontario-collapse']"));
		var expandAllButtons = Array.prototype.slice.call(
			document.querySelectorAll('.ontario-accordion__button--expand-all'),
		);
		var accordionLinks = Array.prototype.slice.call(document.querySelectorAll('.ontario-accordion-link'));

		toggleExpander(expandableItems);
		toggleAllAccordions(expandAllButtons);
		toggleExpanderByLink(accordionLinks);
	});
})();
