import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { RadioButtons } from './radio-buttons.interface';
import { RadioOption } from './radio-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

@Component({
	tag: 'ontario-radio-buttons',
	styleUrl: 'ontario-radio-buttons.scss',
	shadow: true,
})

export class OntarioRadioButtons implements RadioButtons {
	/**
	 * The legend for the Radio Buttons.
	 */
	@Prop() legend: string;

	/**
	* Define hint text on an element.
	*/
	@Prop() hintText?: string;

	/**
	 * Used to include the Hint Expander component underneath the Radio Button Legend.
	 * This is passed in as an object with key-value pairs.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   legend="This is a question?"
	 *   options='[{
	 *     "name": "Radio Option 1",
	 *     "value": "radio-option-1",
	 *     "label": "Radio Option 1 Label",
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
	 *   }'
	 * >
	 * </ontario-radio-buttons>
		*/
	@Prop() hintExpander: HintExpander | string;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple radio buttons in a fieldset, each radio button will be displayed as an option.
	 * In the example below, the options are being passed in as a string and
	 * there are two radio buttons to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   legend="This is a question?"
	 *   hint-text="This is the hint text"
	 *   options='[
	 *     {
	 *        "name": "Radio Button 1",
	 *        "value": "radio-1-value",
	 *        "label": "Radio Button Label 1"
	 *     },
	 *     {
	 *        "name": "Radio Button 2",
	 *        "value": "radio-2-value",
	 *        "label": "Radio Button Label 2",
	 *        "hintExpander": {
	 *          "hint": "Hint expander",
	 *          "content": "This is the content",
	 *          "aria-label": "This indicates that the hint can be expanded"
	 *        }
	 *      }
	 *   ]'
	 * >
	 * </ontario-radio-buttons>
	 */
	@Prop() options: string | RadioOption[];

	/**
	 * The options are re-assigned to the internalOptions array.
	 */
	@State() internalOptions: RadioOption[];

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
	 * Determine whether the input field is required.
	 * If required, it should be set to true.
	 *
	 * @example
	 * <ontario-radio-buttons ... is-required></ontario-radio-buttons>
	 */
	@Prop() isRequired: boolean;

	/**
	 * The checked attribute of the radio button.
	 *
	 * This value is updated through the onChange event handler and by default
	 * is set to false.
	 *
	 */
	@Prop({ reflect: true, mutable: true }) checked?: boolean = false;

	/**
	 * Text to display as the radio button's label
	 *
	 * Setting the radio label can be done using the element content or setting
	 * the property. This property will take precedence.
	 *
	 * @example
	 * <ontario-radio-button radioLabel="Override Radio Label">Radio Label</ontario-radio-button>
	 *
	 * The resulting radio label text will display "Override Radio label".
	 *
	 */
	@Prop({ mutable: true }) radioLabel: string;

	/**
	 ** The name assigned to the radio button. The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * Used to define whether the input field is required or not. If required, the value passed should be 'required'.
	 */
	@Prop({ reflect: true }) required?: boolean = false;

	/**
	 ** The radio button content value.
	 */
	@Prop() value: string | number;

	/**
	 ** Emitted when the input gains focus.
	 */
	@Event() radioChangeEvent!: EventEmitter<void>;

	@State() checkedValueSet: boolean = false;

	handleChange = (e: any) => {
		this.checked = e.target.checked;

		// uncheck any radio buttons with the same name value
		if (this.checked) {
			this.uncheckRadioButtonSiblings();
		}

		this.radioChangeEvent.emit()
	}

	private uncheckRadioButtonSiblings = () => {
		// get all sibling radio buttons with the same name value that are not the one being selected
		const radioButtonSiblings = Array.from(document.querySelectorAll(`ontario-radio-button[name="${this.name}"]`)).filter((radio: HTMLOntarioRadioButtonsElement) => radio.value !== this.value);

		console.log(document.querySelectorAll(`ontario-radio-button[name="${this.name}"]`));
		// manually set all sibling radio button's checked status to be false
		return radioButtonSiblings.forEach((radio: HTMLOntarioRadioButtonsElement) => radio.checked = false);
	}

	private validateCheckedValue() {
		if (this.checked === true) {
			this.checkedValueSet = true;
			throw new Error('The default checked value of a radio button should be `false`. The checked attribute is controlled via the change event handler.');
		}

		this.checkedValueSet = false;
	}

	componentWillLoad() {
		// make sure a true checked value has not been set
		this.validateCheckedValue();
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

					{this.hintText && (
						<ontario-hint-text hint={this.hintText}></ontario-hint-text>
					)}
					<div class="ontario-radios">
						{this.internalOptions.map((radioButton) =>
							this.checkedValueSet === false && (
								<div class="ontario-radios__item">
									<input
										checked={this.checked}
										class="ontario-radios__input"
										name={radioButton .name}
										onChange={this.handleChange}
										type="radio"
										value={radioButton.value}
									/>
									<label class="ontario-radios__label" htmlFor={radioButton.name}>
										{radioButton.label}
									</label>
								</div>
							)
						)}
					</div>
				</fieldset>
			</div>
		)
	}
}
