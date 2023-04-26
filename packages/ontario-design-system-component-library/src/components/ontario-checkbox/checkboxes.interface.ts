import { Base } from '../../utils/common.interface';
import { Caption } from '../../utils/input-caption/caption.interface';
import { CheckboxOption } from './checkbox-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

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
	 * The name for the checkboxes.
	 */
	name: string;

	/**
	 * Define hint text on an element.
	 */
	hintText?: string;

	/**
	 * Used to include the Hint Expander component underneath the Checkbox group.
	 * This is passed in as an object with key-value pairs.
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
	 *			"value": "checkbox-1-value",
	 *			"label": "Checkbox 1 label",
	 *			"elementId": "checkbox-1"
	 *		}
	 *   }]'
	 *   hint-expander='{
	 *    "hint": "Example hint expander for checkbox group",
	 *    "content": "Example hint expander content for checkbox group"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	hintExpander?: HintExpander | string;

	/**
	 * This is used to determine whether the checkbox is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	required?: boolean;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
	 * In the example below, the options are being passed in as a string and
	 * there are two checkboxes to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *		"captionText": "Checkbox legend",
	 *		"captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes",
	 *   hint-text="Example checkbox hint text"
	 *   options='[
	 *		{
	 *			"value": "checkbox-1-value",
	 *			"label": "Checkbox 1 label"
	 *			"elementId": "checkbox-1"
	 *     },
	 *     {
	 *        "value": "checkbox-2-value",
	 *        "label": "Checkbox 2 label",
	 * 		  "elementId": "checkbox-2",
	 *	      "hintExpander": {
	 *				"hint": "Example hint expander for checkbox 2",
	 *              "content": "Example hint expander content for checkbox 2"
	 *        }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	options: string | CheckboxOption[];
}
