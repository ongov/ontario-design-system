import { Base } from '../../utils/common.interface';
import { RadioOption } from './radio-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface RadioButtons extends Base {
  /**
   * The name assigned to the radio button.
   * The name value is used to reference form data after a form is submitted.
   */
  name: string;

  /**
   * The legend for the Radio Buttons.
   */
  legend: string;

  /**
   * Define hint text on an element.
   */
  hintText?: string;

  /**
   * Used to include the Hint Expander component underneath the Radio Button Legend.
   * This is passed in as an object with key-value pairs.
   *
   * @example
   * <ontario-radio-buttons
   *   legend="This is a question?"
   *   options='[{
   *     "value": "radio-option-1",
   *     "elementId": "radio-1",
   *     "label": "Radio Option 1 Label",
   *     "hintExpander": {
   *			  "hint": "Hint expander",
   * 		    "content": "This is the content",
   *			  "aria-label": "This indicates that the hint can be expanded"
   *		 }
   *   }]'
   *   hint-expander='{
   *    "hint": "Hint expander",
   *    "content": "This is the content, yup this is the content",
   *    "aria-label": "This indicates that the hint can be expanded"
   *   }'
   * >
   * </ontario-radio-buttons>
   */
  hintExpander?: HintExpander | string;

  /**
   * Each property will be passed in through an object in the options array.
   * This can either be passed in as an object directly (if using react), or as a string in HTML.
   * If there are multiple radio buttons in a fieldset, each radio button will be displayed as an option.
   * In the example below, the options are being passed in as a string and
   * there are two radio buttons to be displayed in the fieldset.
   *
   * @example
   * <ontario-radio-buttons
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[
   *     {
   *        "value": "radio-1-value",
   *        "elementId": "radio-1",
   *        "label": "Radio Button Label 1"
   *     },
   *     {
   *        "value": "radio-2-value",
   *        "elementId": "radio-1",
   *        "label": "Radio Button Label 2",
   *        "hintExpander": {
   *          "hint": "Hint expander",
   *          "content": "This is the content",
   *          "aria-label": "This indicates that the hint can be expanded"
   *        }
   *      }
   *   ]'
   * >
   * </ontario-radio-buttons>
   */
  options: string | RadioOption[];

  /**
   * Determine whether the input field is required.
   * If required, it should be set to true.
   * This can be done by passing in `is-required` to the component.
   *
   * @example
   * <ontario-radio-buttons ... is-required></ontario-radio-buttons>
   */
  isRequired?: boolean;
}
