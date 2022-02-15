import { Component, Element, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { CheckboxOption as CheckboxOption } from './checkboxoption.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';
import { Hint } from '../../utils/common.interface';

/**
 * Ontario Checkbox component
 */
@Component({
  tag: 'ontario-checkbox',
  styleUrl: 'ontario-checkbox.scss',
  shadow: true,
})

export class OntarioCheckbox implements CheckboxOption {

  @Element() host: HTMLElement;

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
   * The ID for the checkbox
   */
  @Prop() elementId?: string;

  /**
   * Used to define whether the input field is required or not. If required, the value passed should be 'required'.
   */
  @Prop({ mutable: true }) required?: boolean = false;

  /**
   * Used to define whether the hint text component is required or not. If required, the value passed should be 'true'.
   */
  @Prop({ mutable: true }) hintText?: Hint;

  /**
   * Used to define whether the hint expander component is required or not. If required, the value passed should be 'true'.
   */
  @Prop({ mutable: true }) hintExpander?: HintExpander;

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
    if (!Array.isArray(this.options)) {
      this.internalOptions = JSON.parse(this.options);
    } else {
      this.internalOptions = this.options;
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
    this.label = this.label ?? this.host.textContent ?? '';
    this.parseOptions();
  }

  render() {
    return (
      <div class="ontario-form-group">
        <fieldset class="ontario-fieldset">
          <legend class="ontario-fieldset__legend">
            {this.legend}
          </legend>
          {this.hintText && <ontario-hint-text hint={this.hintText.hint} inputExists={this.hintText.inputExists}></ontario-hint-text>}

          <div class="ontario-checkboxes">
            {this.internalOptions
              ? this.internalOptions.map((checkbox) =>
                <div class="ontario-checkboxes__item">
                  <input
                    class="ontario-checkboxes__input"
                    id={checkbox.name}
                    name={checkbox.name}
                    type="checkbox"
                    value={checkbox.value}
                    checkbox-label={checkbox.label}
                    onChange={checkbox.handleChange}
                  />
                  <label class="ontario-checkboxes__label" htmlFor={checkbox.name}>
                    {checkbox.label}
                  </label>

                  {checkbox.hintExpander && <ontario-hint-expander hint={checkbox.hintExpander.hint} content={checkbox.hintExpander.content} aria-label={checkbox.hintExpander.ariaLabel} checkbox-exists={checkbox.hintExpander.inputExists}></ontario-hint-expander>}
                </div>
              )
              : <div class="ontario-checkboxes__item">
                <input
                  class="ontario-checkboxes__input"
                  id={this.name}
                  name={this.name}
                  type="checkbox"
                  value={this.value}
                  checkbox-label={this.label}
                  required={this.required}
                  onChange={this.handleChange}
                />
                <label class="ontario-checkboxes__label" htmlFor={this.name}>
                  {this.label}
                </label>

                {this.hintExpander && <ontario-hint-expander hint={this.hintExpander.hint} content={this.hintExpander.content} aria-label={this.hintExpander.ariaLabel} checkbox-exists={this.hintExpander.inputExists}></ontario-hint-expander>}
              </div>
            }
          </div>
        </fieldset>
      </div>
    );
  }
}
