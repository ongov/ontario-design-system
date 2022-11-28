import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface RadioOption {
	/**
	 * The name assigned to the radio button.
	 * The name value is used to reference form data after a form is submitted.
	 * Please note that if you have multiple radio button options, the name must
	 * the same for all options in a fieldset.
	 */
	name: string;

	/**
	 * Text to display as the radio button's label
	 *
	 * Setting the radio label can be done using the element content or setting
	 * the property. This property will take precedence.
	 *
	 * @example
	 * <ontario-radio-button radioLabel="Override Radio Label">Radio Label</ontario-radio-button>
	 *
	 * The resulting radio label text will display "Override Radio label".
	 *
	 */
	label: string;

	/**
	 * Used to include the Hint Expander component underneath the Radio Button Label.
	 * This is passed in as an object in the `options` with key-value pairs.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   hint-text="This is the hint text"
	 *   options='[{
	 *     "name": "Radio",
	 *     "value": "radio-option-1",
	 *     "label": "Radio Option Label",
	 *     "hintExpander": {
	 *			  "hint": "Hint expander",
	 * 		    "content": "This is the content"
	 *		 }
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	hintExpander?: HintExpander;

	/**
	 ** The radio button content value.
	 */
	value: string | number;

	/**
	 * Used to establish a relationship between radio label and the radio input.
	 * This ID must be unique to the radio option.
	 *
	 * @example
	 * <ontario-radio-buttons caption="Do you have cats?" name="radio" hint-text="This is the hint text" required
	 *  options='[{
	 *	 "value": "radio",
	 *	 "elementId": "radio-1",
	 *	 "label": "radio-1-label"
	 *	},
	 *	{
	 *		"value": "radio-2",
	 *		"elementId": "radio-2",
	 *		"label": "radio-2-label"
	 *  }
	 */
	elementId: string;
}
