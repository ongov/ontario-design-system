import { CheckboxOption } from './checkbox-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Base, Hint } from '../../utils/common/common.interface';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { Language } from '../../utils/common/language-types';
import { InputFocusBlurEvent, RadioAndCheckboxChangeEvent } from '../../utils/events/event-handler.interface';

export interface Checkboxes extends Base {
	/**
	 * The text to display for the checkbox legend.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   ...>
	 * </ontario-checkboxes>
	 */
	caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	language?: Language;

	/**
	 * The name for the checkboxes. The name value is used to reference form data after a form is submitted.
	 */
	name: string;

	/**
	 * Used to include the ontario-hint-text component for the checkbox group.
	 * This is optional.
	 */
	hintText?: string | Hint;

	/**
	 * Used to include the ontario-hint-expander component for the checkbox group.
	 * This is passed in as an object with key-value pairs.
	 *
	 * This is optional.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name='ontario-checkboxes'
	 *   options='[
	 *		{
	 *			"value": "checkbox-option-1",
	 *			"label": "Checkbox option 1 label",
	 *			"elementId": "checkbox-1"
	 *		}
	 *   }]'
	 *   hint-expander='{
	 *    "hint": "Hint expander for the checkbox group",
	 *    "content": "Example hint expander content for the checkbox group"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	hintExpander?: HintExpander | string;

	/**
	 * The options for the checkbox group.
	 *
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
	 *
	 * In the example below, the options are being passed in as a string and there are two checkboxes to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *		"captionText": "Checkbox legend",
	 *		"captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes",
	 *   hint-text="Hint text for the checkbox group."
	 *   options='[
	 *		{
	 *			"value": "checkbox-option-1",
	 *			"label": "Checkbox option 1 label"
	 *			"elementId": "checkbox-1"
	 *     },
	 *     {
	 *        "value": "checkbox-option-2",
	 *        "label": "Checkbox option 2 label",
	 * 		  "elementId": "checkbox-2",
	 *	      "hintExpander": {
	 *				"hint": "Hint expander for checkbox option 2",
	 *              "content": "Example hint expander content for checkbox option 2"
	 *        }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	options: string | CheckboxOption[];

	/**
	 * This is used to determine whether the checkbox is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	required?: boolean;

	/**
	 * Used to add a custom function to the checkbox onChange event.
	 */
	customOnChange?: Function;

	/**
	 * Used to add a custom function to the checkbox onBlur event.
	 */
	customOnBlur?: Function;

	/**
	 * Used to add a custom function to the checkbox onFocus event.
	 */
	customOnFocus?: Function;

	/**
	 * Emitted when a keyboard input or mouse event occurs when a checkbox option has been changed.
	 */
	checkboxOnChange: RadioAndCheckboxChangeEvent;

	/**
	 * Emitted when a keyboard input event occurs when a checkbox option has lost focus.
	 */
	checkboxOnBlur: InputFocusBlurEvent;

	/**
	 * Emitted when a keyboard input event occurs when a checkbox option has gained focus.
	 */
	checkboxOnFocus: InputFocusBlurEvent;
}
