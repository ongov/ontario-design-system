import { Component, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { CheckboxOption } from './checkboxoption.interface';
import { Checkbox } from './checkbox.interface';

/**
 * Ontario Checkbox component
 */
@Component({
  tag: 'ontario-checkbox',
  styleUrl: 'ontario-checkbox.scss',
  shadow: true,
})
export class OntarioCheckbox implements Checkbox {

  /**
   * The legend for the checkbox
   */
  @Prop() legend: string;

  /**
   * Used to define whether the input field is required or not. If required, the value passed should be 'is-required'.
   */
  @Prop() isRequired: boolean = false;

  /**
   * Define hint text on an element.
   */
  @Prop() hintText?: string;

  /**
   * The checkbox content value
   */
  @Prop() value: string;

  /**
   * Each property will be passed in through an object in the options array.
   * This can either be passed in as an object directly (if using react), or as a string in HTML.
   * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
   * In the example below, the options are being passed in as a string and
   * there are two checkboxes to be displayed in the fieldset.
   *
   * @example
   * <ontario-checkbox
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
  @Prop() options: CheckboxOption[] | string;

  /**
   * If the options are passed in as a string,
   * they will be parsed to JSON and assigned to internalOptions.
   */
  @State() internalOptions: CheckboxOption[];

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
   * Emitted when a keyboard input or mouse event occurs.
   */
  @Event() changeEvent!: EventEmitter<any>;

  handleChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;

    if (input) {
      input.checked = input.checked ?? '';
    }

    this.changeEvent.emit(ev as any);
  };

  /**
   * Parse through options passed in as a string and convert to JSON.
   */
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
          <ontario-hint-text hint={this.hintText}></ontario-hint-text>

          <div class="ontario-checkboxes">
            {this.internalOptions.map((checkbox) =>
              <div class="ontario-checkboxes__item">
                <input
                  class="ontario-checkboxes__input"
                  id={checkbox.name}
                  name={checkbox.name}
                  type="checkbox"
                  value={checkbox.value}
                  checkbox-label={checkbox.label}
                  onChange={this.handleChange}
                />
                <label class="ontario-checkboxes__label" htmlFor={checkbox.name}>
                  {checkbox.label}
                </label>

                <div class="ontario-checkboxes__hint-expander">
                  {checkbox.hintExpander && <ontario-hint-expander hint={checkbox.hintExpander.hint} content={checkbox.hintExpander.content} aria-label={checkbox.hintExpander.ariaLabel} input-exists></ontario-hint-expander>}
                </div>
              </div>
            )}
          </div>
        </fieldset>
      </div>
    );
  }
}
