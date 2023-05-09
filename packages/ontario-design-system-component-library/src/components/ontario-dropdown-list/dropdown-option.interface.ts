export interface DropdownOption {
	/**
	 * The text to display as the dropdown list option label.
	 *
	 * @example
	 * <ontario-dropdown-list
	 * 	label="Label"
	 * 	name="ontario-dropdown-list"
	 *  required
	 * 	options='[
	 * 	  {
	 *      "value": "dropdown-option-1",
	 *      "label": "Option 1"
	 *    },
	 *    {
	 *      "value": "dropdown-option-2",
	 *      "label": "Option 2"
	 *    },
	 *    {
	 *       "value": "dropdown-option-3",
	 *       "label": "Option 3"
	 *     }
	 *  ]'
	 * >
	 * </ontario-dropdown-list>
	 */
	label: string;

	/**
	 * The dropdown list option value.
	 * Each value must be unique to the option.
	 */
	value: string;

	/**
	 * A boolean value to determine whether or not the dropdown list option is pre-selected.
	 * If no selected value is set, it will be set to false.
	 */
	selected?: boolean;
}
