import { Base } from '../../utils/common.interface';
import { CheckboxOption } from './checkbox-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface Checkboxes extends Base {
	/**
	 * The name for the checkboxes.
	 */
	name: string;

	/**
	 * Define hint text on an element.
	 */
	hintText?: string;

	/**
   * Used to include the Hint Expander component underneath the Checkbox Legend.
   * This is passed in as an object with key-value pairs.
   *
   * @example
   * <ontario-checkboxes
   *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
   *   name='ontario-checkboxes'
   *   options='[{
   *     "value": "checkbox-1-value",
   *     "label": "Checkbox Label",
   *     "hintExpander": {
   *			  "hint": "Hint expander",
   * 		    "content": "This is the content"
   *		 }
   *   }]'
   *   hint-expander='{
   *    "hint": "Hint expander",
   *    "content": "This is the content, yup this is the content"
      }'
			required="true"
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
	 *     "caption": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   name='ontario-checkboxes'
	 *   hint-text="This is the hint text"
	 *   options='[
	 *     {
	 *        "value": "checkbox-1-value",
	 *        "label": "Checkbox Label"
	 *     },
	 *     {
	 *        "value": "checkbox-2",
	 *        "label": "checkbox-2-label",
	 *        "hintExpander": {
	 *          "hint": "Hint expander",
	 *          "content": "This is the content"
	 *        }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkbox>
	 */
	options: string | CheckboxOption[];
}