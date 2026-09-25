import { EventEmitter } from '@stencil/core';

import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Base, Hint } from '../../utils/common/common.interface';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { Language } from '../../utils/common/language-types';
import { InputFocusBlurEvent, RadioAndCheckboxChangeEvent } from '../../utils/events/event-handler.interface';

export interface Checkbox extends Base {
	/**
	 * The text to display as the checkbox label.
	 *
	 * @example
	 * <ontario-checkbox
	 *   label='{
	 *     "captionText": "I agree to the terms and conditions",
	 *     "captionType": "default"
	 *   }'
	 *   name="terms-and-conditions"
	 *   value="agreed"
	 * ></ontario-checkbox>
	 */
	label: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	language?: Language;

	/**
	 * The name for the checkbox. The name value is used to reference form data after a form is submitted.
	 */
	name: string;

	/**
	 * The value submitted with the form data when the checkbox is checked.
	 */
	value?: string;

	/**
	 * Whether the checkbox is checked. This is mutable and is kept in sync with user interaction.
	 */
	checked?: boolean;

	/**
	 * Used to include the ontario-hint-text component for the checkbox.
	 * This is optional.
	 */
	hintText?: string | Hint;

	/**
	 * Used to include the ontario-hint-expander component for the checkbox.
	 * This is passed in as an object with key-value pairs.
	 *
	 * This is optional.
	 */
	hintExpander?: HintExpander | string;

	/**
	 * This is used to determine whether the checkbox is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	required?: boolean;

	/**
	 * Set this to display an error message
	 */
	errorMessage?: string;

	/**
	 * The message to display when the checkbox is required and left unchecked. If not provided,
	 * a translated default message is used instead.
	 */
	requiredValidationMessage?: string;

	/**
	 * Used to add a custom function to the checkbox onChange event.
	 */
	customOnChange?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the checkbox onBlur event.
	 */
	customOnBlur?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the checkbox onFocus event.
	 */
	customOnFocus?: (event: globalThis.Event) => void;

	/**
	 * Emitted when a keyboard input or mouse event occurs when the checkbox has been changed.
	 */
	checkboxOnChange: EventEmitter<RadioAndCheckboxChangeEvent>;

	/**
	 * Emitted when a keyboard input event occurs when the checkbox has lost focus.
	 */
	checkboxOnBlur: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when a keyboard input event occurs when the checkbox has gained focus.
	 */
	checkboxOnFocus: EventEmitter<InputFocusBlurEvent>;
}
