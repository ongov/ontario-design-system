(function () {
	const links = document.querySelectorAll('.ontario-page-navigation-item__link');

	for (const link of links) {
		link.addEventListener('click', clickHandler);
	}

	function clickHandler(e) {
		e.preventDefault();

		const href = this.getAttribute('href');
		const element = document.querySelector(href);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}

		history.pushState(null, null, href);
	}
})();
