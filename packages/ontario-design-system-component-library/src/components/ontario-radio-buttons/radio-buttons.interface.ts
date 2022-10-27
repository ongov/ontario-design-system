import { Base } from '../../utils/common.interface';
import { RadioOption } from './radio-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface RadioButtons extends Base {
	/**
	 * The name assigned to the radio button.
	 * The name value is used to reference form data after a form is submitted.
	 */
	name: string;

	/**
	 * Define hint text on an element.
	 */
	hintText?: string;

	/**
	 * Used to include the Hint Expander component underneath the Radio Button Legend.
	 * This is passed in as an object with key-value pairs.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   options='[{
	 *     "value": "radio-option-1",
	 *     "elementId": "radio-1",
	 *     "label": "Radio Option 1 Label",
	 *     "hintExpander": {
	 *			  "hint": "Hint expander",
	 * 		    "content": "This is the content"
	 *		 }
	 *   }]'
	 *   hint-expander='{
	 *    "hint": "Hint expander",
	 *    "content": "This is the content, yup this is the content"
	 *   }'
	 *   is-required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	hintExpander?: HintExpander | string;

	/**
	 * This is used to determine whether the radio button is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	isRequired?: boolean;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple radio buttons in a fieldset, each radio button will be displayed as an option.
	 * In the example below, the options are being passed in as a string and
	 * there are two radio buttons to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   hint-text="This is the hint text"
	 *   options='[
	 *     {
	 *        "value": "radio-1-value",
	 *        "elementId": "radio-1",
	 *        "label": "Radio Button Label 1"
	 *     },
	 *     {
	 *        "value": "radio-2-value",
	 *        "elementId": "radio-1",
	 *        "label": "Radio Button Label 2",
	 *        "hintExpander": {
	 *          "hint": "Hint expander",
	 *          "content": "This is the content"
	 *        }
	 *      }
	 *   ]'
	 *   is-required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	options: string | RadioOption[];
}
