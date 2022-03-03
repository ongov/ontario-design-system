import { Component, h, Prop, State, Watch } from '@stencil/core';
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
	 * Define hint text for Radio Button fieldset.
	 */
	@Prop() hintText?: string;

	/**
	 * Used to include the Hint Expander component for the Radio Button fieldset.
	 * This is passed in as an object with key-value pairs.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   legend="This is a question?"
	 *   options='[
	 * 	   {
			*     "name": "Radio",
			*     "value": "radio-option-1",
			*     "label": "Radio Option 1 Label",
			*     "hintExpander": {
			*			  "hint": "Hint expander",
			* 		    "content": "This is the content",
			*			  "aria-label": "This indicates that the hint can be expanded"
		*		    }
	 *      }
	 *   ]'
	 *   hint-expander='{
	 *     "hint": "Hint expander",
	 *     "content": "This is the content, yup this is the content",
	 *     "aria-label": "This indicates that the hint can be expanded"
	 *   }'
	 * >
	 * </ontario-radio-buttons>
	 */
	@Prop() hintExpander?: HintExpander | string;

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
	 *        "name": "Radio",
	 *        "value": "radio-1-value",
	 *        "label": "Radio Button Label 1"
	 *     },
	 *     {
	 *        "name": "Radio",
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
	 * This can be done by passing in `is-required` to the component.
	 *
	 * @example
	 * <ontario-radio-buttons ... is-required></ontario-radio-buttons>
	 */
	@Prop() isRequired?: boolean = false;

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
					<div class="ontario-radios">
						{this.internalOptions?.map((radioOption) =>
							<div class="ontario-radios__item">
								<input
									class="ontario-radios__input"
									id={radioOption.elementId}
									name={radioOption.name}
									type="radio"
									value={radioOption.value}
								/>
								<label class="ontario-radios__label" htmlFor={radioOption.elementId}>
									{radioOption.label}
								</label>

								<div class="ontario-radios__hint-expander">
									{radioOption.hintExpander && <ontario-hint-expander hint={radioOption.hintExpander.hint} content={radioOption.hintExpander.content} aria-label={radioOption.hintExpander.ariaLabel} input-exists></ontario-hint-expander>}
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
		)
	}
}
