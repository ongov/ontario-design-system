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
   * In the example below, the options are being passed in as a string and
   * there are three dropdown options to be displayed in the fieldset.
   *
   * @example
   * <ontario-dropdown-list legend="Do you like cats?" name="cat-dropdown" is-required
   * is-empty-start-option="Please select" options='[{
   *     "value": "dropdown-list-1",
   *     "label": "Option 1"
   *   },
   *   {
   *     "value": "dropdown-list-2",
   *     "label": "Option 2"
   *   },
   *   {
   *      "value": "dropdown-list-3",
   *      "label": "Option 3"
   *   }]'>
   * </ontario-dropdown-list>
   */
  options: string | DropdownOption[];

  /**
   * Determine whether the dropdown list is required.
   * If required, add `is-required` attribute.
   * Otherwise, the `optional` flag will appear.
   *
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
   * <ontario-dropdown-list is-empty-start-option></ontario-dropdown-list>
   *
   * or
   *
   * <ontario-dropdown-list is-empty-start-option="Please select"></ontario-dropdown-list>
   */
  isEmptyStartOption?: boolean | string;
}
