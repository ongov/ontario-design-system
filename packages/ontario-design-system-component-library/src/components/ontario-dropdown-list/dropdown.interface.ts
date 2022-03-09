import { Base } from '../../utils/common.interface';
import { DropdownOption } from './dropdown-option.interface';

export interface Dropdown extends Base {
  /**
   * The legend for the Dropdown List.
   */
  legend: string;

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
   * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
   * In the example below, the options are being passed in as a string and
   * there are two checkboxes to be displayed in the fieldset.
   *
   * @example
   * <ontario-checkboxes
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[
   *     {
   *        "name": "Checkbox 1",
   *        "value": "checkbox-1-value",
   *        "label": "Checkbox Label"
   *     },
   *     {
   *        "name": "Checkbox-2",
   *        "value": "checkbox-2",
   *        "label": "checkbox-2-label",
   *        "hintExpander": {
   *          "hint": "Hint expander",
   *          "content": "This is the content",
   *          "aria-label": "This indicates that the hint can be expanded"
   *        }
   *      }
   *   ]'
   * >
   * </ontario-checkbox>
   */
  options: string | DropdownOption[];

  /**
   * Determine whether the dropdown list is required.
   * If required, it should be set to true.
   * @example
   * <ontario-dropdown-list ... is-required></ontario-dropdown-list>
   */
  isRequired: boolean;

  /**
   * Whether or not the initial option displayed is empty.
   * If set to true, it will render the default “select” text.
   * If set to a string, it will render the string value.
   *
   * @example
   * <ontario-dropdown-list ... ></ontario-dropdown-list>
   */

  isEmptyStartOption: boolean | string;
}
