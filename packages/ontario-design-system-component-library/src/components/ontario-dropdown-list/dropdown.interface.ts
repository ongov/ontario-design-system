import { EventEmitter } from '@stencil/core';

import { DropdownOption } from './dropdown-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Base, Hint } from '../../utils/common/common.interface';
import { InputFocusBlurEvent, InputInteractionEvent } from '../../utils/events/event-handler.interface';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { Language } from '../../utils/common/language-types';

export interface Dropdown extends Base {
	/**
	 * The text to display for the dropdown list label.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   name="ontario-dropdown-list"
	 *   caption='{
	 *     "captionText": "Label",
	 *     "captionType": "heading",
	 *   }'
	 *   ...>
	 * </ontario-dropdown-list>
	 */
	caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	language?: Language;

	/**
	 * The name for the dropdown list. The name value is used to reference form data after a form is submitted.
	 */
	name: string;

	/**
	 * The ID for the dropdown list.
	 * If no ID is provided, one will be generated.
	 */
	elementId?: string;

	/**
	 * The options for dropdown list.
	 *
	 * Each option will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 *
	 * In the example below, the options are being passed in as a string and there are three dropdown options displayed.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "captionText": "Label",
	 *     "captionType": "heading",
	 *   }'
	 *   name="ontario-dropdown-list"
	 *   options='[
	 *     {
	 *       "value": "dropdown-option-1",
	 *       "label": "Option 1",
	 *       "selected": "true"
	 *     },
	 *     {
	 *       "value": "dropdown-option-2",
	 *       "label": "Option 2"
	 *     },
	 *     {
	 *       "value": "dropdown-option-3",
	 *       "label": "Option 3"
	 *     }
	 *   ]'
	 * >
	 * </ontario-dropdown-list>
	 */
	options: string | DropdownOption[];

	/**
	 * This is used to determine whether the dropdown list is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	required?: boolean;

	/**
	 * This prop is used to determine whether or not the initial option displayed is empty.
	 * If set to `true`, it will render the default “select” text.
	 * If set to a string, it will render the string value.
	 *
	 * @example
	 * <ontario-dropdown-list is-empty-start-option="true"></ontario-dropdown-list>
	 *
	 * or
	 *
	 * <ontario-dropdown-list is-empty-start-option="Please select"></ontario-dropdown-list>
	 */
	isEmptyStartOption?: boolean | string;

	/**
	 * Used to include the ontario-hint-text component for the dropdown list.
	 * This is optional.
	 */
	hintText?: string | Hint;

	/**
	 * Used to include the ontario-hint-expander component for the dropdown list component.
	 * This is passed in as an object with key-value pairs.
	 *
	 * This is optional.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "caption": "What province do you live in?",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-dropdown-list"
	 *   options='[
	 *     {
	 *       "value": "dropdown-option-1",
	 *       "label": "Option 1",
	 *       "selected": "true"
	 *     },
	 *     {
	 *       "value": "dropdown-option-2",
	 *       "label": "Option 2"
	 *     },
	 *     {
	 *       "value": "dropdown-option-3",
	 *       "label": "Option 3"
	 *     }
	 *   ]'
	 *   hint-expander='{
	 *    "hint": "Hint expander for the dropdown list",
	 *    "content": "Example hint expander content for the dropdown list."
	 *   }'
	 * >
	 * </ontario-dropdown-list>
	 */
	hintExpander?: HintExpander | string;

	/**
	 * Used to add a custom function to the dropdown onChange event.
	 */
	customOnChange?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the dropdown onBlur event.
	 */
	customOnBlur?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the dropdown onFocus event.
	 */
	customOnFocus?: (event: globalThis.Event) => void;

	/**
	 * Emitted when a keyboard input or mouse event occurs when a dropdown list has been changed.
	 */
	dropdownOnChange: EventEmitter<InputInteractionEvent>;

	/**
	 * Emitted when a keyboard input event occurs when a dropdown list has lost focus.
	 */
	dropdownOnBlur: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when a keyboard input event occurs when a dropdown list has gained focus.
	 */
	dropdownOnFocus: EventEmitter<InputFocusBlurEvent>;
}
