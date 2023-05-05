import { Component, h, Prop, State, Listen, Watch, Element } from '@stencil/core';
import { RadioButtons } from './radio-buttons.interface';
import { RadioOption } from './radio-option.interface';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';
import {
	validateObjectExists,
	validatePropExists,
	validateLanguage,
} from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/language-types';
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

	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * The text to display for the radio button legend.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
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
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * The name assigned to the radio button.
	 * The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * Used to include the ontario-hint-text component for radio button group.
	 * This is optional.
	 */
	@Prop() hintText?: string;

	/**
	 * Used to include the ontario-hint-expander component for the radio button group.
	 * This is passed in as an object with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }'
	 * 	 name="radios"
	 *   options='[
	 * 	   {
	 *        "value": "radio-option-1",
	 * 		  "elementId": "radio-1",
	 *        "label": "Radio option 1 label",
	 *        "hintExpander": {
	 *			  "hint": "Hint expander for radio option 1",
	 * 		      "content": "Example hint expander content for radio option 1."
	 *		  }
	 *     }
	 *   ]'
	 *   hint-expander='{
	 *     "hint": "Hint expander for the radio button group",
	 *     "content": "Example hint expander content for the radio button group."
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
	 * If there are multiple radio buttons in a group, each radio button will be displayed as an option.
	 * In the example below, the options are being passed in as a string and there are two radio buttons to be displayed in the group.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }'
	 *   name="radios"
	 *   hint-text="Hint text for the radio button group."
	 *   options='[
	 *     {
	 *        "value": "radio-option-1",
	 * 		  "elementId": "radio-1",
	 *        "label": "Radio option 1 label"
	 *     },
	 *     {
	 *        "value": "radio-option-2",
	 * 		  "elementId": "radio-2",
	 *        "label": "Radio option 2 label",
	 *        "hintExpander": {
	 *			  "hint": "Hint expander for radio option 2",
	 * 		      "content": "Example hint expander content for radio option 2."
	 *		  }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	@Prop() options: string | RadioOption[];

	/**
	 * Used for the `aria-describedby` value of the radio button group. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

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
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		const toggledLanguage = validateLanguage(event);
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

	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.parseOptions();
		this.parseHintExpander();
		this.validateName(this.name);
		this.validateOptions(this.internalOptions);
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div class="ontario-form-group">
				<fieldset class="ontario-fieldset" aria-describedby={this.hintTextId}>
					{this.captionState.getCaption(undefined, !!this.internalHintExpander)}
					{this.hintText && (
						<ontario-hint-text hint={this.hintText} ref={(el) => (this.hintTextRef = el)}></ontario-hint-text>
					)}
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
