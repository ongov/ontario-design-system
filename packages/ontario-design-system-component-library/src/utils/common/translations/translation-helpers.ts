export const translateTextContent = (translateHelperFunc: Function, element: Element) => {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				translateHelperFunc();
			}
		});
	});

	const options = { attributes: true };
	observer.observe(element, options);
};
