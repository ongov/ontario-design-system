import { Component, h, Prop, Element, Event, EventEmitter, Listen, State, Watch } from '@stencil/core';

import { CheckboxOption } from './checkbox-option.interface';
import { Checkboxes } from './checkboxes.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Hint } from '../../utils/common.interface';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import {
	validateObjectExists,
	validatePropExists,
	validateLanguage,
} from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/language-types';
import { constructHintTextObject } from '../../utils/hints/hints';

import { default as translations } from '../../translations/global.i18n.json';

/**
 * Ontario Checkbox component
 */
@Component({
	tag: 'ontario-checkboxes',
	styleUrl: 'ontario-checkboxes.scss',
	shadow: true,
})
export class OntarioCheckboxes implements Checkboxes {
	/**
	 * Grant access to the host element and related DOM methods/events within the class instance.
	 */
	@Element() element: HTMLElement;

	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * The text to display for the checkbox legend.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   ...>
	 * </ontario-checkboxes>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * The name for the checkboxes.
	 */
	@Prop() name: string;

	/**
	 * Used to include the ontario-hint-text component for the checkbox group.
	 * This is optional.
	 */
	@Prop({ mutable: true }) hintText?: string | Hint;

	/**
	 * Used to include the ontario-hint-expander component for the checkbox group.
	 * This is passed in as an object with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Checkbox legend",
	 *     "captionType": "heading",
	 *   }
	 *   name='ontario-checkboxes'
	 *   options='[
	 *		{
	 *			"value": "checkbox-option-1",
	 *			"label": "Checkbox option 1 label",
	 *			"elementId": "checkbox-1"
	 *		}
	 *   }]'
	 *   hint-expander='{
	 *    "hint": "Hint expander for the checkbox group",
	 *    "content": "Example hint expander content for the checkbox group"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
	 * In the example below, the options are being passed in as a string and
	 * there are two checkboxes to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *		"captionText": "Checkbox legend",
	 *		"captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes",
	 *   hint-text="Hint text for the checkbox group."
	 *   options='[
	 *		{
	 *			"value": "checkbox-option-1",
	 *			"label": "Checkbox option 1 label"
	 *			"elementId": "checkbox-1"
	 *     },
	 *     {
	 *        "value": "checkbox-option-2",
	 *        "label": "Checkbox option 2 label",
	 * 		  "elementId": "checkbox-2",
	 *	      "hintExpander": {
	 *				"hint": "Hint expander for checkbox option 2",
	 *              "content": "Example hint expander content for checkbox option 2"
	 *        }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	@Prop() options: CheckboxOption[] | string;

	/**
	 * This is used to determine whether the checkbox is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * Used for the `aria-describedby` value of the checkbox fieldset. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText: Hint;

	/**
	 * The hint expander options are re-assigned to the internalHintExpander array.
	 */
	@State() private internalHintExpander: HintExpander;

	/**
	 * The options are re-assigned to the internalOptions array.
	 */
	@State() private internalOptions: CheckboxOption[];

	/**
	 * Emitted when a keyboard input or mouse event occurs.
	 */
	@Event() changeEvent!: EventEmitter<KeyboardEvent>;

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

	@Watch('hintText')
	private parseHintText() {
		if (this.hintText) {
			const hintTextObject = constructHintTextObject(this.hintText);
			this.internalHintText = hintTextObject;
		}
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
		this.validateOptions(this.internalOptions);
	}

	/**
	 * Validate the options and make sure the options has a value.
	 * Log warning if user doesn't input a value for the options.
	 * @param newValue object to be validated
	 */
	validateOptions(newValue: object) {
		if (validateObjectExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' options ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-checkboxes> ')
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
				.addMonospaceText(' <ontario-checkboxes> ')
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

	handleChange = (ev: Event) => {
		const input = ev.target as HTMLInputElement | null;

		if (input) {
			input.checked = input.checked ?? '';
		}

		this.changeEvent.emit(ev as any);
	};

	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.parseOptions();
		this.parseHintExpander();
		this.parseHintText();
		this.validateName(this.name);
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div class="ontario-form-group">
				<fieldset class="ontario-fieldset" aria-describedby={this.hintTextId}>
					{this.captionState.getCaption(undefined, !!this.internalHintExpander)}
					{this.internalHintText && (
						<ontario-hint-text
							hint={this.internalHintText.hint}
							hintContentType={this.internalHintText.hintContentType}
							ref={(el) => (this.hintTextRef = el)}
						></ontario-hint-text>
					)}
					<div class="ontario-checkboxes">
						{this.internalOptions?.map((checkbox) => (
							<div class="ontario-checkboxes__item">
								<input
									class="ontario-checkboxes__input"
									id={checkbox.elementId}
									name={this.name}
									type="checkbox"
									value={checkbox.value}
									checkbox-label={checkbox.label}
									onChange={this.handleChange}
									required={!!this.required}
								/>
								<label class="ontario-checkboxes__label" htmlFor={checkbox.elementId}>
									{checkbox.label}
									{checkbox.hintExpander && this.captionState.getHintExpanderAccessibilityText(checkbox.label, true)}
								</label>

								<div class="ontario-checkboxes__hint-expander">
									{checkbox.hintExpander && (
										<ontario-hint-expander
											hint={checkbox.hintExpander.hint}
											content={checkbox.hintExpander.content}
											hintContentType={checkbox.hintExpander.hintContentType}
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
								hintContentType={this.internalHintExpander.hintContentType}
								input-exists
							></ontario-hint-expander>
						)}
					</div>
				</fieldset>
			</div>
		);
	}
}
