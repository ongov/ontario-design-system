import { Component, State, h, Prop, Watch } from '@stencil/core';
import { DropdownOption } from './dropdown-option.interface';
import { Dropdown } from './dropdown.interface';

@Component({
  tag: 'ontario-dropdown-list',
  styleUrl: 'ontario-dropdown-list.scss',
  shadow: true,
})
export class OntarioDropdownList implements Dropdown {
  /**
   * The legend for the Dropdown List.
   */
  @Prop() legend: string;

  /**
   * The name for the dropdown list.
   */
  @Prop() name: string;

  /**
   * The ID for the dropdown list.
   */
  @Prop() elementId: string;

  /**
    * Each property will be passed in through an object in the options array.
    * This can either be passed in as an object directly (if using react), or as a string in HTML.
    * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
    * In the example below, the options are being passed in as a string and
    * there are two checkboxes to be displayed in the fieldset.
    *
    * @example
    * <ontario-checkboxes
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
  @Prop() options: string | DropdownOption[];

  /**
   * The options are re-assigned to the internalOptions array.
   */
  @State() internalOptions: DropdownOption[];

  @Watch('options')
  parseOptions() {
    if (typeof (this.options) !== 'undefined') {
      if (!Array.isArray(this.options)) {
        this.internalOptions = JSON.parse(this.options);
      } else {
        this.internalOptions = this.options;
      }
    }
  }

  /**
  * Determine whether the dropdown list is required.
  * If required, it should be set to true.
  * @example
  * <ontario-dropdown-list ... is-required></ontario-dropdown-list>
  */
  @Prop() isRequired: boolean;

  /**
  * Whether or not the initial option displayed is empty.
  * If set to true, it will render the default “select” text.
  * If set to a string, it will render the string value.
  *
  * @example
  * <ontario-dropdown-list ... ></ontario-dropdown-list>
  */
  @Prop() isEmptyStartOption: boolean | string;

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
  @Prop() label: string;

  /**
   * The dropdown option content value.
   */
  @Prop() value: string;

  /**
   * Whether or not the option is by default selected or not.
   */
  @Prop() isSelected?: boolean;

  componentWillLoad() {
    this.parseOptions();
  }

  render() {
    return (
      <div class="ontario-form-group">
        <fieldset class="ontario-fieldset">
          <legend class="ontario-fieldset__legend">
            {this.legend}
            <span class="ontario-label__flag">
              {this.isRequired ? "(Required)" : "(Optional)"}
            </span>
          </legend>

          <select
            class="ontario-input ontario-dropdown"
            id={this.elementId}
            name={this.name}
          >
            {this.isEmptyStartOption &&
              (<option>
                Select
              </option>)
            }
            {this.internalOptions?.map((dropdown) =>
              <option value={dropdown.value}>
                {dropdown.label}
              </option>
            )}
          </select>
        </fieldset>
      </div>
    )
  }
}
