import { Component, State, h, Prop, Watch, getAssetPath } from '@stencil/core';
import { DropdownOption } from './dropdown-option.interface';
import { Dropdown } from './dropdown.interface';
import { v4 as uuid } from 'uuid';
import { validatePropExists, validateObjectExists } from '../../utils/validation/validation-functions';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

@Component({
  tag: 'ontario-dropdown-list',
  styleUrl: 'ontario-dropdown-list.scss',
  shadow: true,
  assetsDirs: ['./assets']
})
export class OntarioDropdownList implements Dropdown {
  /**
   * The label for the Dropdown List.
   */
  @Prop() label: string;

  /**
   * The name for the dropdown list.
   */
  @Prop() name: string;

  /**
   * The ID for the dropdown list.
   */
  @Prop({ mutable: true }) elementId?: string;

  /**
   * Each property will be passed in through an object in the options array.
   * This can either be passed in as an object directly (if using react), or as a string in HTML.
   * In the example below, the options are being passed in as a string and
   * there are three dropdown options to be displayed in the fieldset.
   *
   * @example
   * <ontario-dropdown-list label="Do you like cats?" name="cat-dropdown" is-required
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

  /*
   * Watch for changes in the `options` object for validation purpose
   * Validate the objects and make sure they exist.
   * Log error if user doesn't provide the options.
   */
  @Watch('options')
  validateOptionsContent(newValue: object) {
    const isOptionsBlank = validateObjectExists(newValue);
    if (isOptionsBlank) {
      printConsoleMessage([
        {
          message: ' options ',
          style: MessageStyle.Code,
        },
        {
          message: 'for',
          style: MessageStyle.Regular,
        },
        {
          message: ` <ontario-dropdown-list> `,
          style: MessageStyle.Code,
        },
        {
          message: `were not provided`,
          style: MessageStyle.Regular,
        },
      ], ConsoleType.Error);
    }
  }


  /**
   * Determine whether the dropdown list is required.
   * If required, add `is-required` attribute.
   * Otherwise, the `optional` flag will appear.
   *
   * @example
   * <ontario-dropdown-list ... is-required></ontario-dropdown-list>
   */
  @Prop() isRequired?: boolean = false;

  /**
   * Whether or not the initial option displayed is empty.
   * If set to true, it will render the default “select” text.
   * If set to a string, it will render the string value.
   *
   * @example
   * <ontario-dropdown-list is-empty-start-option></ontario-dropdown-list>
   *
   * or
   *
   * <ontario-dropdown-list is-empty-start-option="Please select"></ontario-dropdown-list>
   */
  @Prop() isEmptyStartOption?: boolean | string = false;

  private getDropdownArrow() {
    return {
      backgroundImage: `url(${getAssetPath('./assets/ontario-material-dropdown-arrow-48px.svg')})`,
    }
  }

  /*
   * Watch for changes in the `name` variable for validation purpose
   * Validate the name and make sure the name has a value.
   * Log error if user doesn't input a value for the name.
   */
  @Watch('name')
  validateNameContent(newValue: string) {
    const isNameBlank = validatePropExists(newValue);
    if (isNameBlank) {
      printConsoleMessage([
        {
          message: ' name ',
          style: MessageStyle.Code,
        },
        {
          message: 'for',
          style: MessageStyle.Regular,
        },
        {
          message: ` <ontario-dropdown-list> `,
          style: MessageStyle.Code,
        },
        {
          message: `was not provided`,
          style: MessageStyle.Regular,
        },
      ], ConsoleType.Error);
    }
  }

  /*
   * Watch for changes in the `label` variable for validation purpose
   * Validate the label and make sure the label has a value.
   * Log error if user doesn't input a value for the label.
   */
  @Watch('label')
  validateLabelContent(newValue: string) {
    const isLabelBlank = validatePropExists(newValue);
    if (isLabelBlank) {
      printConsoleMessage([
        {
          message: ' label ',
          style: MessageStyle.Code,
        },
        {
          message: 'for',
          style: MessageStyle.Regular,
        },
        {
          message: ` <ontario-dropdown-list> `,
          style: MessageStyle.Code,
        },
        {
          message: `was not provided`,
          style: MessageStyle.Regular,
        },
      ], ConsoleType.Error);
    }
  }

  public getId(): string {
    return this.elementId ?? '';
  }

  componentWillLoad() {
    this.parseOptions();
    this.validateNameContent(this.name);
    this.validateLabelContent(this.label);
    this.validateOptionsContent(this.internalOptions);
    this.elementId = this.elementId ?? uuid();
  }

  render() {
    return (
      <div class="ontario-form-group">
        <label class="ontario-label" htmlFor="ontario-dropdown-list">
          {this.label}
          <span class="ontario-label__flag">
            {this.isRequired ? "(required)" : "(optional)"}
          </span>
        </label>

        <select
          class="ontario-input ontario-dropdown"
          id={this.getId()}
          name={this.name}
          style={this.getDropdownArrow()}
        >
          {this.isEmptyStartOption && (
            this.isEmptyStartOption === true ?
              <option>
                Select
              </option>
              :
              <option>
                {this.isEmptyStartOption}
              </option>
          )}

          {this.internalOptions?.map((dropdown) =>
            <option value={dropdown.value}>
              {dropdown.label}
            </option>
          ) ?? ""}
        </select>
      </div>
    )
  }
}
