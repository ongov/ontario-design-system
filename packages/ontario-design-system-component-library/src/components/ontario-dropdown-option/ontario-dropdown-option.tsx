import { Component, Prop } from '@stencil/core';

/**
 * Ontario Dropdown Option represents a single, pre-defined option to be consumed by an
 * `ontario-dropdown-list`.
 *
 * This component does not render any visible UI of its own. Native `<option>` elements cannot be
 * slotted into a `<select>` that is rendered inside a shadow root, so `ontario-dropdown-list`
 * instead reads its `ontario-dropdown-option` light DOM children directly (their `value`,
 * `selected`, and text content) and re-renders them as native `<option>` elements inside its own
 * shadow root.
 *
 * As an alternative to `ontario-dropdown-option` children, options can also be passed to
 * `ontario-dropdown-list` using its `options` prop, as an array of objects (or a JSON string).
 * If both are provided, the `options` prop takes precedence.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/dropdown-lists.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-dropdown-list/
 *
 * @example
 * <ontario-dropdown-list caption="Do you like cats?" name="cat-dropdown">
 *   <ontario-dropdown-option value="dropdown-option-1">Option 1</ontario-dropdown-option>
 *   <ontario-dropdown-option value="dropdown-option-2" selected>Option 2</ontario-dropdown-option>
 *   <ontario-dropdown-option value="dropdown-option-3">Option 3</ontario-dropdown-option>
 * </ontario-dropdown-list>
 */
@Component({
	tag: 'ontario-dropdown-option',
	shadow: false,
})
export class OntarioDropdownOption {
	/**
	 * The value for the dropdown option.
	 * Each value must be unique to the option within the parent `ontario-dropdown-list`.
	 */
	@Prop() value: string;

	/**
	 * A boolean value to determine whether or not the dropdown option is pre-selected.
	 * If no option is marked as selected, the first available option (or the empty start
	 * option, if `isEmptyStartOption` is enabled on the parent `ontario-dropdown-list`)
	 * will be selected.
	 */
	@Prop() selected?: boolean = false;

	/**
	 * This component intentionally renders nothing. It exists only as a light DOM data holder;
	 * `ontario-dropdown-list` reads its `value`/`selected` props and text content directly and
	 * renders the corresponding native `<option>` elements itself.
	 */
	render() {
		return null;
	}
}
