import { Language } from './language-types';
import { InputChangeEvent, InputFocusBlurEvent } from '../events/event-handler.interface';

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
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	language?: Language;

	/**
	 * The element content value.
	 */
	value?: string;

	/**
	 * Used to add a custom function to the input onChange event.
	 */
	customOnChange?: Function;

	/**
	 * Used to add a custom function to the input onBlur event.
	 */
	customOnBlur?: Function;

	/**
	 * Used to add a custom function to the input onFocus event.
	 */
	customOnFocus?: Function;

	/**
	 * Emitted when a keyboard input or mouse event occurs when an input has been changed.
	 */
	inputOnChange: InputChangeEvent;

	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	inputOnBlur: InputFocusBlurEvent;

	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	inputOnFocus: InputFocusBlurEvent;
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
