import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface RadioOption {
  /**
   ** The name assigned to the radio button. The name value is used to reference form data after a form is submitted.
   */
  name: string;

  /**
   * Text to display as the radio button's label
   *
   * Setting the radio label can be done using the element content or setting
   * the property. This property will take precedence.
   *
   * @example
   * <ontario-radio-button radioLabel="Override Radio Label">Radio Label</ontario-radio-button>
   *
   * The resulting radio label text will display "Override Radio label".
   *
   */
  label: string;

  /**
   * Used to include the Hint Expander component underneath the Radio Button Label.
   * This is passed in as an object in the `options` with key-value pairs.
   *
   * @example
   * <ontario-radio-buttons
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[{
   *     "name": "Radio Option 1",
   *     "value": "radio-option-1",
   *     "label": "Radio Option Label",
   *     "hintExpander": {
   *			  "hint": "Hint expander",
   * 		    "content": "This is the content",
   *			  "aria-label": "This indicates that the hint can be expanded"
   *		 }
   *   }]'
   * >
   * </ontario-radio-buttons>
   */
  hintExpander?: HintExpander;

  /**
   * The checked attribute of the radio button.
   *
   * This value is updated through the onChange event handler and by default
   * is set to false.
   *
   */
  checked?: boolean;

  /**
   ** The radio button content value.
  */
  value: string | number;
}
