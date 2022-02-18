import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface CheckboxOption {

  /**
   * The name for the checkbox (note that to group checkboxes to the same question, the name must be the same)
   */
  name: string;

  /**
   * The text to display as label.
   *
   * @example
   * <ontario-checkbox
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[{
   *     "name": "Checkbox 1",
   *     "value": "checkbox-1-value",
   *     "label": "Checkbox Label"
   *   }]'
   * >
   * </ontario-checkbox>
   *
   * The resulting label will show `"Checkbox Label"`.
   */
  label: string;

  /**
    * Used to define whether the hint expander component is required or not. If required, the value passed should be 'true'.
    */
  hintExpander?: HintExpander;

  /**
    * The checkbox content value
    */
  value: string;

}
