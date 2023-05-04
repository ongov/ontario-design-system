import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface RadioOption {
	/**
	 * The text to display as checkbox option label.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-radios"
	 *   hint-text="Hint text for the radio group."
	 *   options='[{
	 *     "label": "Radio option 1 label"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 *
	 * The resulting label will show `"Radio option 1 label"`.
	 */
	label: string;

	/**
	 * The radio option value.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-radios"
	 *   hint-text="Hint text for the radio group."
	 *   options='[{
	 *     "value": "radio-option-1"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 *
	 * The resulting value will be `"radio-option-1"`.
	 */

	value: string | number;

	/**
	 * Used to establish a relationship between radio option label and the radio option input.
	 * This ID must be unique to the radio option.
	 *
	 * @example
	 * <ontario-radio-buttons
	 * 	caption="Radio legend"
	 *  name="ontario-radios"
	 *  hint-text="Hint text for the radio group."
	 *  required="true"
	 *  options='[{
	 *	 "value": "radio-option-1",
	 *	 "elementId": "radio-1",
	 *	 "label": "Radio option 1 label"
	 *	},
	 *	{
	 *		"value": "radio-option-2",
	 *		"elementId": "radio-2",
	 *		"label": "Radio option 2 label"
	 *  }
	 */
	elementId: string;

	/**
	 * Used to include the ontario-hint-expander component underneath the radio option.
	 * This is passed in as an object in the `options` with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }'
	 *   hint-text="Hint text for the radio group."
	 *   options='[{
	 *     "value": "radio-option-1",
	 *     "label": "Radio option 1 label",
	 *     "elementId": "radio-1",
	 *     "hintExpander": {
	 *			"hint": "Hint expander for radio option 1",
	 * 		    "content": "Example hint expander content for radio option 1."
	 *		 }
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	hintExpander?: HintExpander;
}
