import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface CheckboxOption {
  /**
   * The text to display as label.
   *
   * @example
   * <ontario-checkboxes
   *   name="ontario-checkboxes"
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[{
   *     "value": "checkbox-1-value",
   *     "label": "Checkbox Label"
   *   }]'
   * >
   * </ontario-checkboxes>
   *
   * The resulting label will show `"Checkbox Label"`.
   */
  label: string;

  /**
   * Used to include the Hint Expander component underneath the Checkbox Label.
   * This is passed in as an object in the `options` with key-value pairs.
   *
   * @example
   * <ontario-checkboxes
   *   name="ontario-checkboxes"
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[{
   *     "value": "checkbox-1-value",
   *     "label": "Checkbox Label",
   *     "hintExpander": {
   *			  "hint": "Hint expander",
   * 		    "content": "This is the content",
   *			  "aria-label": "This indicates that the hint can be expanded"
   *		 }
   *   }]'
   * >
   * </ontario-checkboxes>
   */
  hintExpander?: HintExpander;

  /**
   * The checkbox content value
   */
  value: string;
}
