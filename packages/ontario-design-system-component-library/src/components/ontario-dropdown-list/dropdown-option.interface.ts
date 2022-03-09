export interface DropdownOption {
  /**
   * The text to display as label.
   *
   * @example
   * <ontario-checkboxes
   *   legend="This is a question?"
   *   hint-text="This is the hint text"
   *   options='[{
   *     "name": "Checkbox 1",
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
   * The dropdown option content value.
   */
  value: string;

  /**
   * Whether or not the option is by default selected or not.
   */
  isSelected?: boolean;
}
