import { Base } from '../../utils/common.interface';
import { DropdownOption } from './dropdown-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface Dropdown extends Base {
	/**
	 * The name for the dropdown list.
	 */
	name: string;

	/**
	 * The ID for the dropdown list.
	 */
	elementId?: string;

	/**
   * Each property will be passed in through an object in the options array.
   * This can either be passed in as an object directly (if using react), or as a string in HTML.
   * In the example below, the options are being passed in as a string and
   * there are three dropdown options to be displayed in the fieldset.
   *
   * @example
   * <ontario-dropdown-list
   *   caption='{
   *     "captionText": "Do you like cats?",
   *     "captionType": "heading",

   *   }'
   *   is-empty-start-option="Please select"
   *   options='[{
   *     "value": "dropdown-list-1",
   *     "label": "Option 1"
   *   },
   *   {
   *     "value": "dropdown-list-2",
   *     "label": "Option 2"
   *   },
   *   {
   *     "value": "dropdown-list-3",
   *     "label": "Option 3"
   *   }]'
	 *   is-required="true"
	 * >
   * </ontario-dropdown-list>
   */
	options: string | DropdownOption[];

	/**
	 * This is used to determine whether the dropdown list is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	sRequired?: boolean;
	/**
	 * Whether or not the initial option displayed is empty.
	 * If set to true, it will render the default “select” text.
	 * If set to a string, it will render the string value.
	 *
	 * @example
	 * <ontario-dropdown-list is-empty-start-option></ontario-dropdown-list>
	 *
	 * or
	 *
	 * <ontario-dropdown-list is-empty-start-option="Please select"></ontario-dropdown-list>
	 */
	isEmptyStartOption?: boolean | string;

	/**
	 * Hint text for Ontario Dropdown. This is optional.
	 */
	hintText?: string;

	/**
	 * Used to include the Hint Expander component underneath the dropdown list box.
	 * This is passed in as an object with key-value pairs. This is optional.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "caption": "What province do you live in?",
	 *     "captionType": "heading",
	 *   }
	 *   hint-expander='{
	 *    "hint": "Hint expander",
	 *    "content": "This is the content"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-dropdown-list>
	 */
	hintExpander?: HintExpander | string;
}
