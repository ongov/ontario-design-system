import { Component, State, Element, h, Prop, Watch, getAssetPath } from '@stencil/core';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { DropdownOption } from './dropdown-option.interface';
import { Dropdown } from './dropdown.interface';
import { v4 as uuid } from 'uuid';
import { validateObjectExists, validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { default as translations } from '../../translations/global.i18n.json';

@Component({
  tag: 'ontario-dropdown-list',
  styleUrl: 'ontario-dropdown-list.scss',
  shadow: true,
  assetsDirs: ['./assets']
})
export class OntarioDropdownList implements Dropdown {
  /**
   * The text to display as the label
   *
   * @example
   * <ontario-dropdown-list
   *   caption='{
   *     "captionText": "Address",
   *     "captionType": "heading",
   *     "isRequired": true}'
   *   ...>
   * </ontario-dropdown-list>
   */
  @Prop() caption: InputCaption | string;

  /**
   * Instantiate an InputCaption object for internal logic use
   */
  @State() private captionState: InputCaption;

  /**
   * Grant access to the host element and related DOM methods/events within the class instance.
   */
  @Element() element: HTMLElement;

  /**
   * The language of the component.
   * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
   */
  @Prop({ mutable: true }) language?: string = 'en';

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
    * Watch for changes in the `label` prop for validation purpose
    * Validate the label and make sure the label has a value.
    * Log warning if user doesn't input a value for the label.
    */
  @Watch('label')
  validateLabel(newValue: string) {
    if (validatePropExists(newValue)) {
      const message = new ConsoleMessageClass();
      message
        .addDesignSystemTag()
        .addMonospaceText(' label ')
        .addRegularText('for')
        .addMonospaceText(' <ontario-dropdown-list> ')
        .addRegularText('was not provided')
        .printMessage();
    }
  }

  /*
    * Watch for changes in the `name` prop for validation purpose
    * Validate the name and make sure the name has a value.
    * Log warning if user doesn't input a value for the name.
    */
  @Watch('name')
  validateName(newValue: string) {
    if (validatePropExists(newValue)) {
      const message = new ConsoleMessageClass();
      message
        .addDesignSystemTag()
        .addMonospaceText(' name ')
        .addRegularText('for')
        .addMonospaceText(' <ontario-dropdown-list> ')
        .addRegularText('was not provided')
        .printMessage();
    }
  }

  /*
    * Watch for changes in the `options` prop for validation purpose
    * Validate the options and make sure the options has a value.
    * Log warning if user doesn't input a value for the options.
    */
  @Watch('options')
  validateOptions(newValue: object) {
    if (validateObjectExists(newValue)) {
      const message = new ConsoleMessageClass();
      message
        .addDesignSystemTag()
        .addMonospaceText(' options ')
        .addRegularText('for')
        .addMonospaceText(' <ontario-dropdown-list> ')
        .addRegularText('was not provided')
        .printMessage();
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

  public getId(): string {
    return this.elementId ?? '';
  }

  @Watch('caption')
  private updateCaptionState() {
    this.captionState = new InputCaption(this.element.tagName, this.caption, translations, this.language);
  }

  componentWillLoad() {
    this.updateCaptionState();
    this.parseOptions();
    this.validateName(this.name);
    this.validateLabel(this.label);
    this.validateOptions(this.internalOptions);
    this.elementId = this.elementId ?? uuid();
  }

  componentWillUpdate() {
    this.updateCaptionState();
  }

  render() {
    return (
      <div class="ontario-form-group">
        {this.captionState.getCaption(this.getId())}
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
