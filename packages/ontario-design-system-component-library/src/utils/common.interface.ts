import { EventEmitter } from '@stencil/core';
import { Language } from './language-types';

export interface Base {
	/**
	 * The unique identifier of the element. This is optional - if no ID is passed, one will be generated.
	 */
	elementId?: string;

	/**
	 * Returns the unique identifier.
	 */
	getId?: () => string;

	/**
	 * Stencil API that doesn't return anything. Implementation is optional.
	 */
	componentWillLoad?: () => void;

	/**
	 * Returns the HTML code to be rendered into a custom element.
	 */
	render?: () => object;
}

export interface Input extends Base {
	/**
	 * The name assigned to the element. The name value is used to reference form data after a form is submitted.
	 */
	name: string;

	/**
	 * Used to define whether the input field is required or not.
	 */
	required?: boolean;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	language?: Language;

	/**
	 * The element content value.
	 */
	value?: string;

	/**
	 * Determines if the element is focused.
	 */
	focused?: boolean;

	/**
	 * Emitted when a keyboard input occurred.
	 */
	changeEvent?: EventEmitter<KeyboardEvent>;

	/**
	 * Emitted when the input loses focus.
	 */
	blurEvent?: EventEmitter<void>;

	/**
	 * Emitted when the input gains focus.
	 */
	focusEvent?: EventEmitter<void>;

	handleBlur?: () => void;

	handleFocus?: () => void;

	handleChange?: (event: Event) => void;
}

export interface Hint extends Base {
	/**
	 * The content type of the hint.
	 * If no prop is passed, it will default to a string.
	 * If the hint requires multiple lines or HTML, the `hintContentType` prop should be set to `html`.
	 */
	hintContentType?: 'string' | 'html';

	/**
	 * Text to display as the hint text statement.
	 *
	 * Setting the hint can be done using the element content or setting the
	 * this property.  This property will take precedence.
	 */
	hint: string;
}

export type HintContentType = 'string' | 'html';
