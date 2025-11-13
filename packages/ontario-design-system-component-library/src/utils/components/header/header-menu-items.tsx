import { h } from '@stencil/core';

/**
 * This function generates the menu items in a <li>, accordingly, to the given parameters.
 *
 * href and title are necessary, but rest are not.
 *
 * @param {string} href - the href of the menu item
 * @param {string} title - the title of the menu item
 * @param {boolean} [linkIsActive] - when set to true, this will add the classes necessary to style the link in a way that indicates to the user what the active page/link is
 * @param {string} [liClass] - if there is a class that is related to the <a> portion of the menu item, put it here
 * @param {function(PointerEvent): void} [onClickHandler] - for any custom onClick functionality a user might want to add to their menu links
 */
export const generateMenuItem = (
	href: string,
	title: string,
	linkIsActive?: boolean,
	liClass?: string,
	onClickHandler?: (e: PointerEvent) => void,
) => {
	return (
		<li class={liClass}>
			<a class={`ontario-menu-item ${linkIsActive ? 'ontario-link--active' : ''}`} href={href} onClick={onClickHandler}>
				{title}
			</a>
		</li>
	);
};
