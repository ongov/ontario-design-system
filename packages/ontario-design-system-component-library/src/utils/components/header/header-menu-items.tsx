import { h } from '@stencil/core';

/**
 * This function generates the menu items in a <li>, accordingly, to the given parameters.
 *
 * @param {string} href - the href of the menu item
 * @param {string} title - the title of the menu item
 * @param {boolean} linkIsActive - when set to true, this will add the classes necessary to style the link
 * @param {string} [description] - optional description text that appears below the title
 * @param {string} [liClass] - if there is a class that is related to the <a> portion of the menu item, put it here
 * @param {function(PointerEvent): void} [onClickHandler] - for any custom onClick functionality
 */
export function generateMenuItem(
	href: string,
	title: string,
	linkIsActive: boolean,
	description?: string,
	liClass?: string,
	onClickHandler?: (event: PointerEvent) => void,
) {
	return (
		<li class={liClass}>
			<a
				href={href}
				class={linkIsActive ? 'ontario-menu-item ontario-link--active' : 'ontario-menu-item'}
				onClick={onClickHandler}
			>
				<span class="ontario-menu-item__title">{title}</span>
				{description && <span class="ontario-menu-item__description">{description}</span>}
			</a>
		</li>
	);
}
