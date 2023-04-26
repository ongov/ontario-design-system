import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface CheckboxOption {
	/**
	 * The text to display as label.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes"
	 *   hint-text="Example checkbox hint text"
	 *   options='[{
	 *     "label": "Checkbox 1 label"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 *
	 * The resulting label will show `"Checkbox Label"`.
	 */
	label: string;

	/**
	 * The checkbox content value.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes"
	 *   hint-text="Example checkbox hint text"
	 *   options='[{
	 *     "value": "checkbox-1-value"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 *
	 * The resulting value will be `"checkbox-1-value"`.
	 */
	value: string;

	/**
	 * Used to establish a relationship between checkbox label and the checkbox input.
	 * This ID must be unique to the checkbox option.
	 *
	 * @example
	 * <ontario-checkboxes
	 *  caption="Checkbox legend"
	 *  name="ontario-checkboxes"
	 *  hint-text="Example checkbox hint text"
	 *  required
	 *  options='[
	 * 		{
	 *	 		"value": "checkbox-1-value",
	 *	 		"label": "Checkbox 1 label"
	 *	 		"elementId": "checkbox-1",
	 *		},
	 *		{
	 *			"value": "checkbox-2-value",
	 *			"label": "Checkbox 2 Label"
	 *			"elementId": "checkbox-2",
	 *  	}
	 */
	elementId: string;

	/**
	 * Used to include the Hint Expander component underneath the checkbox option.
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
	 *   hint-text="Example checkbox hint text"
	 *   options='[
	 * 		{
	 *     		"value": "checkbox-1-value",
	 *     		"label": "Checkbox 1 label",
	 * 			"elementId": "checkbox-1",
	 *     		"hintExpander": {
	 *			 	"hint": "Example hint expander for checkbox 1",
	 * 		    	"content": "Example hint expander content for checkbox 1"
	 *		 	}
	 *   	}
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	hintExpander?: HintExpander;
}
