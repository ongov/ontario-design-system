import { Base } from '../../utils/common.interface';
import { CheckboxOption } from './checkboxoption.interface';

export interface Checkbox extends Base {
  /**
   * The legend for the checkbox.
   */
  legend: string;

  /**
   * Define hint text on an element.
   */
  hintText?: string;

  /**
   * Each property will be passed in through an object in the options array.
   * This can either be passed in as an object directly (if using react), or as a string in HTML.
   * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
   * In the example below, the options are being passed in as a string and
   * there are two checkboxes to be displayed in the fieldset.
   *
   * @example
   * <ontario-checkbox
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
  options: string | CheckboxOption[];

  /**
   * Determine whether the input field is required.
   * If required, it should be set to true.
   * @example
   * <ontario-checkbox ... is-required></ontario-checkbox>
   */
  isRequired: boolean;
}
