import { Component, Event, h, Prop, State, Listen, Element, Watch, EventEmitter, AttachInternals } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { Input } from '../../utils/common/input/input';
import { TextInput } from './input.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Hint } from '../../utils/common/common.interface';
import { InputCaption } from '../../utils/common/input-caption/input-caption';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { Language } from '../../utils/common/language-types';
import { validateLanguage, validatePropExists } from '../../utils/validation/validation-functions';
import { translations as globalTranslations, Translations } from '../../translations';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import {
	InputFocusBlurEvent,
	EventType,
	InputInteractionEvent,
	InputInputEvent,
} from '../../utils/events/event-handler.interface';
import { handleInputEvent } from '../../utils/events/event-handler';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

import { ErrorMessage } from '../../utils/components/error-message/error-message';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';

@Component({
	tag: 'ontario-input',
	styleUrl: 'ontario-input.scss',
	shadow: true,
	formAssociated: true,
})
export class OntarioInput implements TextInput {
	@Element() element: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * The text to display as the input label
	 *
	 * @example
	 * <ontario-input
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }
	 *   required="true"
	 *   ...>
	 * </ontario-input>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The unique identifier of the input. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * The width of the input field. If no value is assigned, it will present as the `default` input width.
	 */
	@Prop({ mutable: true }) inputWidth:
		| '2-char-width'
		| '3-char-width'
		| '4-char-width'
		| '5-char-width'
		| '7-char-width'
		| '10-char-width'
		| '20-char-width'
		| 'default' = 'default';

	/**
	 * The name assigned to the input. The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * Used to include the ontario-hint-text component for the input.
	 * This is optional.
	 */
	@Prop() hintText?: string | Hint;

	/**
	 * This is used to determine whether the input is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 *
	 * _Please add a validation messaging using `requiredValidationMessage` if setting this property._
	 *
	 * @example
	 * <ontario-input
	 *		id="address-line-1"
	 *		caption="Address line 1"
	 *		required
	 *		required-validation-message="Please enter an address, including street number and street name"
	 *		name="address-line-1"
	 *		hint-text="Street and number or P.O. box."
	 *	></ontario-input>
	 */
	@Prop() required?: boolean = false;

	/**
	 * The input type value.
	 *
	 * If no `type` is provided, it will default to 'text'.
	 */
	@Prop({ mutable: true }) type: 'text' | 'tel' | 'email' | 'password' = 'text';

	/**
	 * The input content value.
	 *
	 * This is optional.
	 */
	@Prop({ mutable: true }) value?: string;

	/**
	 * Set this to display an
	 */
	@Prop({ mutable: true }) errorMessage?: string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * Used to include the ontario-hint-expander component for the input component.
	 * This is passed in as an object with key-value pairs.
	 *
	 * This is optional.
	 *
	 * @example
	 * <ontario-input
	 *   caption='{
	 *     "caption": "Address",
	 *     "captionType": "heading",
	 *   }
	 *   hint-expander='{
	 *    "hint": "Hint expander",
	 *    "content": "This is the content"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-input>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * Used for the `aria-describedby` value of the input. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | undefined;

	/**
	 * Enable live validation on the input.  Custom live validation can be performed using an `inputValidator`
	 * validation function.  It will also validate the `required` state if no errors are returned from
	 * the `inputValidator`.  Please set a `requiredValidationMessage` to report concisely to the end user what
	 * they are required to set.
	 */
	@Prop() enableLiveValidation: boolean = false;

	/**
	 * Validate the validity of the input value `onBlur`.  This `async` function should return a result
	 * to trigger an error message.  Returning `undefined` or `null` will clear it.
	 */
	@Prop() inputValidator?: (value?: string) => Promise<{ errorMessage?: string } | null | undefined>;

	/**
	 * Used to add a custom function to the input onInput event.
	 */
	@Prop() customOnInput?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the input onChange event.
	 */
	@Prop() customOnChange?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the input onBlur event.
	 */
	@Prop() customOnBlur?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the input onFocus event.
	 */
	@Prop() customOnFocus?: (event: globalThis.Event) => void;

	/**
	 * Custom error message to display if a required field is not filled out.  _Please add a
	 * custom message when setting an input as required_.
	 */
	@Prop() requiredValidationMessage: string;

	/**
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText: Hint;

	/**
	 * The hint expander options are re-assigned to the internalHintExpander array.
	 */
	@State() private internalHintExpander: HintExpander;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * Track if the input has been interacted with, used to validate if
	 * a `required` field is in error.
	 */
	@State() private hasBeenInteractedWith: boolean = false;

	/**
	 * Global translations for accessing built-in translations
	 */
	@State() private translations: Translations = globalTranslations;

	/**
	 * Emitted when a input  occurs when an input has been changed.
	 */
	@Event() inputOnInput: EventEmitter<InputInputEvent>;

	/**
	 * Emitted when a keyboard input or mouse event occurs when an input has been changed.
	 */
	@Event() inputOnChange: EventEmitter<InputInteractionEvent>;

	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	@Event() inputOnBlur: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	@Event() inputOnFocus: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when an error message is reported to the component.
	 */
	@Event() inputErrorOccurred: EventEmitter<{ inputId: string; errorMessage: string }>;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 * @param event The language that has been selected.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	/**
	 * Handles an update to the language should the user request a language update from the language toggle.
	 * @param event The language that has been selected.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
	}

	/**
	 * Handle the change in the `value` property and validate if the input has been interacted with by
	 * the user to aid in determining if the required state should produce an error.
	 */
	@Watch('value')
	handleValueChange() {
		this.hasBeenInteractedWith = this.hasBeenInteractedWith || !!this.value;
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
				.addMonospaceText(' <ontario-input> ')
				.addRegularText('was not provided')
				.printMessage();
		}
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
	 * Watch for changes to the `caption` prop.
	 *
	 * The caption will be run through the InputCaption constructor to convert it to the correct format, and set the result to the `captionState` state.
	 * @param newValue: Caption | string
	 */
	@Watch('caption')
	private updateCaptionState(newValue: Caption | string) {
		this.captionState = new InputCaption(
			this.element.tagName,
			newValue,
			this.translations,
			this.language,
			false,
			this.required,
		);
	}

	/**
	 * Watch for changes in the `language` prop to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	/**
	 * Handle the component being blurred and perform validation logic on the input.  Custom validation
	 * takes persistance, followed by validating the required state.
	 *
	 * Finally, an event is emitted to notify anything listening for the `inputErrorOccurred` that
	 * an error occurred.
	 */
	@Listen('blur', { capture: true })
	async handleComponentBlur() {
		if (this.enableLiveValidation) {
			// Call inputValidator function to perform custom validation
			const validationResult = this.inputValidator && this.inputValidator(this.value);
			await validationResult?.then((x) => (this.errorMessage = x?.errorMessage));

			// Validate the `required` field
			// Only report a required error if no other error message is reported via validation
			if (this.required && this.hasBeenInteractedWith && !validationResult)
				if (!this.value)
					this.errorMessage =
						this.requiredValidationMessage || this.translations.input.requiredFieldError[this.getComponentLanguage()];
				else this.errorMessage = undefined;
		}
	}

	@Watch('errorMessage')
	broadcastInputErrorOccurredEvent() {
		// Emit event to notify anyone who wants to listen for errors occurring
		this.inputErrorOccurred.emit({ inputId: this.getId(), errorMessage: this.errorMessage ?? '' });
	}

	/**
	 * Function to handle input events and the information pertaining to the input to emit.
	 */
	private handleEvent(event: globalThis.Event, eventType: EventType) {
		const input = event.target as HTMLInputElement | null;

		// Update the component value to match the value of the input element.
		this.value = input?.value;

		this.internals?.setFormValue?.(this.value ?? '');

		handleInputEvent(
			event,
			eventType,
			input,
			this.inputOnChange,
			this.inputOnFocus,
			this.inputOnBlur,
			this.inputOnInput,
			'input',
			this.customOnChange,
			this.customOnFocus,
			this.customOnBlur,
			this.customOnInput,
			this.element,
		);
	}

	public getId(): string {
		// A UUID is assigned in `componentWillLoad` if there is no given `elementId`.
		return this.elementId ?? '';
	}

	private getValue(): string | number {
		return this.value ?? '';
	}

	private getClass(): string {
		if (this.hintExpander) {
			return this.inputWidth === 'default'
				? `ontario-input ontario-input-hint-expander--true`
				: `ontario-input ontario-input--${this.inputWidth} ontario-input-hint-expander--true`;
		} else {
			return this.inputWidth === 'default' ? `ontario-input` : `ontario-input ontario-input--${this.inputWidth}`;
		}
	}

	private getComponentLanguage() {
		return this.language ?? 'en';
	}

	/**
	 * If a `hintText` prop is passed, the id generated from it will be set to the internal `hintTextId` state to match with the input `aria-describedBy` attribute.
	 */
	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.elementId = this.elementId ?? uuid();
		this.parseHintText();
		this.parseHintExpander();
		this.validateName(this.name);
		this.language = validateLanguage(this.language);
	}

	render() {
		const error = !!this.errorMessage;
		return (
			<div class={`ontario-form-group ${error ? 'ontario-input--error' : ''}`}>
				{this.captionState.getCaption(this.getId(), !!this.internalHintExpander)}
				{this.internalHintText && (
					<ontario-hint-text
						hint={this.internalHintText.hint}
						hintContentType={this.internalHintText.hintContentType}
						ref={(el) => (this.hintTextRef = el)}
					></ontario-hint-text>
				)}
				<ErrorMessage message={this.errorMessage} error={error} />
				<Input
					aria-describedBy={this.hintTextId}
					className={this.getClass()}
					id={this.getId()}
					name={this.name}
					onInput={(e) => this.handleEvent(e, EventType.Input)}
					onChange={(e) => this.handleEvent(e, EventType.Change)}
					onBlur={(e) => this.handleEvent(e, EventType.Blur)}
					onFocus={(e) => this.handleEvent(e, EventType.Focus)}
					type={this.type}
					value={this.getValue()}
					required={!!this.required}
				></Input>
				{this.internalHintExpander && (
					<ontario-hint-expander
						hint={this.internalHintExpander.hint}
						content={this.internalHintExpander.content}
						hintContentType={this.internalHintExpander.hintContentType}
					></ontario-hint-expander>
				)}
			</div>
		);
	}
}
