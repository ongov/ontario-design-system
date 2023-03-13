import { Component, h, Prop, State, Listen, Watch, Element } from '@stencil/core';
import { RadioButtons } from './radio-buttons.interface';
import { RadioOption } from './radio-option.interface';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';
import { validateObjectExists, validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { default as translations } from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-radio-buttons',
	styleUrl: 'ontario-radio-buttons.scss',
	shadow: true,
})
export class OntarioRadioButtons implements RadioButtons {
	/**
	 * Grant access to the host element and related DOM methods/events within the class instance.
	 */
	@Element() element: HTMLElement;

	/**
	 * The text to display as the label
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *    }'
	 *   required="true"
	 *   ...>
	 * </ontario-radio-buttons>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: string = 'en';

	/**
	 * The name assigned to the radio button.
	 * The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * Define hint text for Radio Button fieldset. This is optional.
	 */
	@Prop() hintText?: string;

	/**
	 * Used to include the Hint Expander component for the Radio Button fieldset.
	 * This is passed in as an object with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 * 	 name: "Radio"
	 *   options='[
	 * 	   {
	 *        "value": "radio-option-1",
	 * 				"elementId": "radio-1",
	 *        "label": "Radio Option 1 Label",
	 *        "hintExpander": {
	 *			    "hint": "Hint expander",
	 * 		      "content": "This is the content"
	 *		    }
	 *     }
	 *   ]'
	 *   hint-expander='{
	 *     "hint": "Hint expander",
	 *     "content": "This is the content, yup this is the content"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * This is used to determine whether the radio button is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple radio buttons in a fieldset, each radio button will be displayed as an option.
	 * In the example below, the options are being passed in as a string and
	 * there are two radio buttons to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   hint-text="This is the hint text"
	 *   options='[
	 *     {
	 *        "value": "radio-1-value",
	 * 				"elementId": "radio-1",
	 *        "label": "Radio Button Label 1"
	 *     },
	 *     {
	 *        "value": "radio-2-value",
	 * 				"elementId": "radio-1",
	 *        "label": "Radio Button Label 2",
	 *        "hintExpander": {
	 *          "hint": "Hint expander",
	 *          "content": "This is the content"
	 *        }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	@Prop() options: string | RadioOption[];

	/**
	 * The hint expander options are re-assigned to the internalHintExpander array.
	 */
	@State() private internalHintExpander: HintExpander;

	/**
	 * The options are re-assigned to the internalOptions array.
	 */
	@State() private internalOptions: RadioOption[];

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<string>) {
		this.language = event.detail;
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<string>) {
		const toggledLanguage = event.detail;
		this.language = toggledLanguage;
	}

	@Watch('hintExpander')
	private parseHintExpander() {
		const hintExpander = this.hintExpander;
		if (hintExpander) {
			if (typeof hintExpander === 'string') this.internalHintExpander = JSON.parse(hintExpander);
			else this.internalHintExpander = hintExpander;
		}
	}

	@Watch('options')
	parseOptions() {
		if (typeof this.options !== 'undefined') {
			if (!Array.isArray(this.options)) {
				this.internalOptions = JSON.parse(this.options);
			} else {
				this.internalOptions = this.options;
			}
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
				.addMonospaceText(' <ontario-radio-buttons> ')
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
				.addMonospaceText(' <ontario-radio-buttons> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	@Watch('caption')
	updateCaptionState(newValue: Caption | string) {
		this.captionState = new InputCaption(
			this.element.tagName,
			newValue,
			translations,
			this.language,
			true,
			this.required,
		);
	}

	/**
	 * Watch for changes in the `language` to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.parseOptions();
		this.parseHintExpander();
		this.validateName(this.name);
		this.validateOptions(this.internalOptions);
	}

	render() {
		return (
			<div class="ontario-form-group">
				<fieldset class="ontario-fieldset">
					{this.captionState.getCaption(undefined, !!this.internalHintExpander)}
					{this.hintText && <ontario-hint-text hint={this.hintText}></ontario-hint-text>}
					<div class="ontario-radios">
						{this.internalOptions?.map((radioOption) => (
							<div class="ontario-radios__item">
								<input
									class="ontario-radios__input"
									id={radioOption.elementId}
									name={this.name}
									type="radio"
									value={radioOption.value}
									required={!!this.required}
								/>
								<label class="ontario-radios__label" htmlFor={radioOption.elementId}>
									{radioOption.label}
									{radioOption.hintExpander &&
										this.captionState.getHintExpanderAccessibilityText(radioOption.label, true)}
								</label>

								<div class="ontario-radios__hint-expander">
									{radioOption.hintExpander && (
										<ontario-hint-expander
											hint={radioOption.hintExpander.hint}
											content={radioOption.hintExpander.content}
											input-exists
										></ontario-hint-expander>
									)}
								</div>
							</div>
						))}

						{this.internalHintExpander && (
							<ontario-hint-expander
								hint={this.internalHintExpander.hint}
								content={this.internalHintExpander.content}
								input-exists
							></ontario-hint-expander>
						)}
					</div>
				</fieldset>
			</div>
		);
	}
}
