import { Component, h, Prop, Element, Event, Listen, State, Watch } from '@stencil/core';

import { Input } from '../../utils/common/input/input';
import { CheckboxOption } from './checkbox-option.interface';
import { Checkboxes } from './checkboxes.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Hint } from '../../utils/common/common.interface';
import { InputCaption } from '../../utils/common/input-caption/input-caption';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import {
	validateObjectExists,
	validatePropExists,
	validateLanguage,
} from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/common/language-types';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import {
	InputFocusBlurEvent,
	RadioAndCheckboxChangeEvent,
	EventType,
} from '../../utils/events/event-handler.interface';
import { handleInputEvent } from '../../utils/events/event-handler';

import { default as translations } from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-checkboxes',
	styleUrl: 'ontario-checkboxes.scss',
	shadow: true,
})
export class OntarioCheckboxes implements Checkboxes {
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
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * The name for the checkboxes. The name value is used to reference form data after a form is submitted.
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
	 *
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
	 * The options for the checkbox group.
	 *
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
	 *
	 * In the example below, the options are being passed in as a string and there are two checkboxes to be displayed in the fieldset.
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
	 * Used to add a custom function to the checkbox onChange event.
	 */
	@Prop() customOnChange?: Function;

	/**
	 * Used to add a custom function to the checkbox onBlur event.
	 */
	@Prop() customOnBlur?: Function;

	/**
	 * Used to add a custom function to the checkbox onFocus event.
	 */
	@Prop() customOnFocus?: Function;

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
	 * Emitted when a keyboard input or mouse event occurs when a checkbox option has been changed.
	 */
	@Event({ eventName: 'checkboxOnChange' }) checkboxOnChange: RadioAndCheckboxChangeEvent;

	/**
	 * Emitted when a keyboard input event occurs when a checkbox option has lost focus.
	 */
	@Event({ eventName: 'checkboxOnBlur' }) checkboxOnBlur: InputFocusBlurEvent;

	/**
	 * Emitted when a keyboard input event occurs when a checkbox option has gained focus.
	 */
	@Event({ eventName: 'checkboxOnFocus' }) checkboxOnFocus: InputFocusBlurEvent;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	/**
	 * Watch for changes to the `hintText` prop.
	 *
	 * If a `hintText` prop is passed, the `constructHintTextObject` function will convert it to the correct format, and set the result to the `internalHintText` state.
	 */
	@Watch('hintText')
	private parseHintText() {
		if (this.hintText) {
			const hintTextObject = constructHintTextObject(this.hintText);
			this.internalHintText = hintTextObject;
		}
	}

	/**
	 * Watch for changes to the `hintExpander` prop.
	 *
	 * If a `hintExpander` prop is passed, it will be parsed (if it is a string), and the result will be set to the `internalHintExpander` state.
	 */
	@Watch('hintExpander')
	private parseHintExpander() {
		const hintExpander = this.hintExpander;
		if (hintExpander) {
			if (typeof hintExpander === 'string') this.internalHintExpander = JSON.parse(hintExpander);
			else this.internalHintExpander = hintExpander;
		}
	}

	/**
	 * Watch for changes to the `options` prop.
	 *
	 * If an `options` prop is passed, it will be parsed (if it is a string), and the result will be set to the `internalOptions` state. The result will be run through a validation function.
	 */
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
	 * Validate the `options` and make sure the `options` prop has a value.
	 * Log a warning if user doesn't input a value for the `options`.
	 *
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
	 * Watch for changes in the `name` prop for validation purposes.
	 *
	 * Validate the `name` and make sure the `name` prop has a value.
	 * Log a warning if user doesn't input a value for the `name`.
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

	/**
	 * Watch for changes to the `caption` prop.
	 *
	 * The caption will be run through the InputCaption constructor to convert it to the correct format, and set the result to the `captionState` state.
	 * @param newValue: Caption | string
	 */
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
	 * Watch for changes to the `language` prop to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	/**
	 * Function to handle checkbox events and the information pertaining to the checkbox to emit.
	 */
	handleEvent = (ev: Event, eventType: EventType) => {
		const input = ev.target as HTMLInputElement | null;

		if (input) {
			input.checked = input.checked ?? '';
		}

		handleInputEvent(
			ev,
			eventType,
			input,
			this.checkboxOnChange,
			this.checkboxOnFocus,
			this.checkboxOnBlur,
			'checkbox',
			this.customOnChange,
			this.customOnFocus,
			this.customOnBlur,
		);
	};

	/**
	 * If a `hintText` prop is passed, the id generated from it will be set to the internal `hintTextId` state to match with the fieldset `aria-describedBy` attribute.
	 */
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
								<Input
									className="ontario-checkboxes__input"
									id={checkbox.elementId}
									name={this.name}
									type="checkbox"
									value={checkbox.value}
									required={!!this.required}
									onChange={(e) => this.handleEvent(e, EventType.Change)}
									onBlur={(e) => this.handleEvent(e, EventType.Blur)}
									onFocus={(e) => this.handleEvent(e, EventType.Focus)}
								></Input>
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
