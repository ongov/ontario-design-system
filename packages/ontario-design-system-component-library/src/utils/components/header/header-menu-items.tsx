import { h } from '@stencil/core';
import { Language } from '../../../utils/common/language-types';

/**
 * Get text in current language from a string or bilingual object.
 */
function getText(text: string | { en: string; fr: string } | undefined, language: Language = 'en'): string {
	if (!text) return '';
	if (typeof text === 'string') return text;
	return text[language] || text.en || '';
}

/**
 * This function generates the menu items in a <li>, accordingly, to the given parameters.
 *
 * @param {string} href - the href of the menu item
 * @param {string | { en: string; fr: string }} title - the title of the menu item (can be string or bilingual object)
 * @param {boolean} linkIsActive - when set to true, this will add the classes necessary to style the link
 * @param {string | { en: string; fr: string }} [description] - optional description text that appears below the title
 * @param {Language} [language] - the language to use for bilingual content
 * @param {string} [liClass] - if there is a class that is related to the <a> portion of the menu item, put it here
 * @param {function(PointerEvent): void} [onClickHandler] - for any custom onClick functionality
 */
export function generateMenuItem(
	href: string,
	title: string | { en: string; fr: string } | undefined,
	linkIsActive: boolean,
	description?: string | { en: string; fr: string },
	language: Language = 'en',
	liClass?: string,
	onClickHandler?: (event: PointerEvent) => void,
) {
	const titleText = getText(title, language);
	const descriptionText = getText(description, language);

	return (
		<li class={liClass}>
			<a
				href={href}
				class={linkIsActive ? 'ontario-menu-item ontario-link--active' : 'ontario-menu-item'}
				onClick={onClickHandler}
			>
				<span class="ontario-menu-item__title">{titleText}</span>
				{descriptionText && <span class="ontario-menu-item__description">{descriptionText}</span>}
			</a>
		</li>
	);
}
