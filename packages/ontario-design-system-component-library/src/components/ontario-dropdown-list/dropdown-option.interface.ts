export interface DropdownOption {
  /**
   * The text to display as label.
   *
   * @example
   * <ontario-dropdown-list label="Do you like cats?" name="cat-dropdown" required
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
   *
   * The resulting text for the first dropdown option will show `"Option 1"`.
   * The resulting text for the first dropdown option will show `"Option 2"`.
   * The resulting text for the first dropdown option will show `"Option 3"`.
   */
  label: string;

  /**
   * The dropdown option content value.
   * Each value must be unique to the option.
   */
  value: string;
}
