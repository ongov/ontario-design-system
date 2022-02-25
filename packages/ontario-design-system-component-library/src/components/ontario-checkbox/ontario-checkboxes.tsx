import { Component, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { CheckboxOption } from './checkbox-option.interface';
import { Checkbox } from './checkbox.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

/**
 * Ontario Checkbox component
 */
@Component({
  tag: 'ontario-checkboxes',
  styleUrl: 'ontario-checkboxes.scss',
  shadow: true,
})
export class OntarioCheckboxes implements Checkbox {
  /**
   * The legend for the checkbox
   */
  @Prop() legend: string;

  /**
   * Determine whether the input field is required.
   * If required, it should be set to true.
   * @example
   * <ontario-checkboxes ... is-required></ontario-checkboxes>
   */
  @Prop() isRequired: boolean = false;

  /**
   * Define hint text on an element.
   */
  @Prop() hintText?: string;

  /**
   * Used to include the Hint Expander component underneath the Checkbox Legend.
   * This is passed in as an object with key-value pairs.
   *
   * @example
   * <ontario-checkboxes
   *   legend="This is a question?"
   *   options='[{
   *     "name": "Checkbox 1",
   *     "value": "checkbox-1-value",
   *     "label": "Checkbox Label",
   *     "hintExpander": {
   *			  "hint": "Hint expander",
   * 		    "content": "This is the content",
   *			  "aria-label": "This indicates that the hint can be expanded"
   *		 }
   *   }]'
   *   hint-expander='{
   *    "hint": "Hint expander",
   *    "content": "This is the content, yup this is the content",
   *    "aria-label": "This indicates that the hint can be expanded"
      }'

   * >
   * </ontario-checkboxes>
   */
  @Prop() hintExpander: HintExpander | string;

  /**
   * The hint expander options are re-assigned to the internalHintExpander array.
   */
  @State() private internalHintExpander: HintExpander;

  @Watch('hintExpander')
  private parseHintExpander() {
    const hintExpander = this.hintExpander;
    if (hintExpander) {
      if (typeof hintExpander === 'string') this.internalHintExpander = JSON.parse(hintExpander);
      else this.internalHintExpander = hintExpander;
    }
  }

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
   * </ontario-checkboxes>
   */
  @Prop() options: CheckboxOption[] | string;

  /**
   * The options are re-assigned to the internalOptions array.
   */
  @State() private internalOptions: CheckboxOption[];

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

  componentWillLoad() {
    this.parseOptions();
    this.parseHintExpander();
  }

  render() {
    return (
      <div class="ontario-form-group">
        <fieldset class="ontario-fieldset">
          <legend class="ontario-fieldset__legend">
            {this.legend}
            <span class="ontario-label__flag">
              {this.isRequired ? "(required)" : "(optional)"}
            </span>
          </legend>

          {this.hintText && (
            <ontario-hint-text hint={this.hintText}></ontario-hint-text>
          )}

          <div class="ontario-checkboxes">
            {this.internalOptions?.map((checkbox) =>
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

            {this.internalHintExpander && (
              <ontario-hint-expander
                hint={this.internalHintExpander.hint}
                content={this.internalHintExpander.content}
                aria-label={this.internalHintExpander.ariaLabel}
                input-exists
              ></ontario-hint-expander>
            )}
          </div>
        </fieldset>
      </div>
    );
  }
}
