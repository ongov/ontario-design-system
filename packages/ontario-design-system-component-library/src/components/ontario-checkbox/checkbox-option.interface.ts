import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface CheckboxOption {
	/**
	 * The text to display as checkbox option label.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes"
	 *   hint-text="Hint text for the checkbox group."
	 *   options='[{
	 *     "label": "Checkbox option 1 label"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 *
	 * The resulting label will show `"Checkbox option 1 label"`.
	 */
	label: string;

	/**
	 * The checkbox option value.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes"
	 *   hint-text="Hint text for the checkbox group."
	 *   options='[{
	 *     "value": "checkbox-option-1"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 *
	 * The resulting value will be `"checkbox-option-1"`.
	 */
	value: string;

	/**
	 * Used to establish a relationship between checkbox option label and the checkbox option input.
	 * This ID must be unique to the checkbox option.
	 *
	 * @example
	 * <ontario-checkboxes
	 *  caption="Checkbox legend"
	 *  name="ontario-checkboxes"
	 *  hint-text="Hint text for the checkbox group."
	 *  required
	 *  options='[
	 * 		{
	 *	 		"value": "checkbox-option-1",
	 *	 		"label": "Checkbox option 1 label"
	 *	 		"elementId": "checkbox-1",
	 *		},
	 *		{
	 *			"value": "checkbox-option-2",
	 *			"label": "Checkbox option 2 label"
	 *			"elementId": "checkbox-2",
	 *  	}
	 */
	elementId: string;

	/**
	 * Used to include the ontario-hint-expander component underneath the checkbox option.
	 * This is passed in as an object in the `options` with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes"
	 *   hint-text="Hint text for the checkbox group."
	 *   options='[
	 * 		{
	 *     		"value": "checkbox-option-1",
	 *     		"label": "Checkbox option 1 label",
	 * 			"elementId": "checkbox-1",
	 *     		"hintExpander": {
	 *			 	"hint": "Hint expander for checkbox option 1",
	 * 		    	"content": "Example hint expander content for radio option 1"
	 *		 	}
	 *   	}
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	hintExpander?: HintExpander;
}
