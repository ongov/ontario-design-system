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
   * The name for the checkbox (note that to group checkboxes to the same question, the name must be the same)
   */
  @Prop() name: string;

  /**
   * The label text for the checkbox
   */
  @Prop({ mutable: true }) label: string;

  /**
   * Used to define whether the input field is required or not. If required, the value passed should be 'required'.
   */
  @Prop() required?: "required" | "optional" = "optional";

  /**
   * Define hint text on an element.
   */
  @Prop() hintText?: string;

  /**
   * The checkbox content value
   */
  @Prop() value: string;

  /**
   * If there are multiple checkboxes, display each checkbox as an option
   */
  @Prop() options: CheckboxOption[] | string;

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
   * Set `hint` using internal component logic
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
              ({this.required})
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
