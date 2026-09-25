import { Component, h, Prop, Element, Event, EventEmitter, Listen, State, Watch, AttachInternals } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { Input } from '../../utils/common/input/input';
import { Checkbox } from './checkbox.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Hint } from '../../utils/common/common.interface';
import { InputCaption } from '../../utils/common/input-caption/input-caption';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { validateLanguage, validatePropExists } from '../../utils/validation/validation-functions';
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
import { ErrorMessage } from '../../utils/components/error-message/error-message';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';

/**
 * Ontario Checkbox collects a single boolean selection, e.g. a terms and conditions acknowledgment.
 *
 * This component intentionally does not expose a `disabled` prop.
 *
 * For a set of related checkbox options, use `ontario-checkboxes` instead.
 *
 * To support accessible and understandable form completion:
 * - keep the checkbox and submission actions available
 * - use validation and error messaging to guide corrections
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/checkboxes.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-checkbox/
 *
 * Disabled/read-only policy source:
 * - https://designsystem.ontario.ca/components/detail/buttons.html#disabled-buttons
 */
@Component({
	tag: 'ontario-checkbox',
	styleUrl: 'ontario-checkbox.scss',
	shadow: true,
	formAssociated: true,
})
export class OntarioCheckbox implements Checkbox {
	@Element() element: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * The text to display as the checkbox label.
	 *
	 * @example
	 * <ontario-checkbox
	 *   label='{
	 *     "captionText": "I agree to the terms and conditions",
	 *     "captionType": "default"
	 *   }'
	 *   name="terms-and-conditions"
	 *   value="agreed"
	 * ></ontario-checkbox>
	 */
	@Prop() label: Caption | string;

	/**
	 * The unique identifier of the checkbox. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * The name for the checkbox. The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * The value submitted with the form data when the checkbox is checked.
	 */
	@Prop() value?: string;

	/**
	 * Whether the checkbox is checked. This is mutable and is kept in sync with user interaction.
	 */
	@Prop({ mutable: true }) checked?: boolean = false;

	/**
	 * Used to include the ontario-hint-text component for the checkbox.
	 * This is optional.
	 */
	@Prop({ mutable: true }) hintText?: string | Hint;

	/**
	 * Used to include the ontario-hint-expander component for the checkbox.
	 * This is passed in as an object with key-value pairs.
	 *
	 * This is optional.
	 *
	 * @example
	 * <ontario-checkbox
	 *   label="I agree to the terms and conditions"
	 *   name="terms-and-conditions"
	 *   value="agreed"
	 *   hint-expander='{
	 *    "hint": "Why do we ask for this?",
	 *    "content": "Example hint expander content for the checkbox"
	 *   }'
	 * >
	 * </ontario-checkbox>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * This is used to determine whether the checkbox is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 *
	 * When required and the checkbox is unchecked, an error state is displayed automatically.
	 * It clears once the checkbox is checked.
	 */
	@Prop() required?: boolean = false;

	/**
	 * Set this to display an error message
	 */
	@Prop({ mutable: true }) errorMessage?: string;

	/**
	 * The message to display when the checkbox is required and left unchecked. If not provided,
	 * a translated default message is used instead.
	 */
	@Prop() requiredValidationMessage?: string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * Used to add a custom function to the checkbox onChange event.
	 */
	@Prop() customOnChange?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the checkbox onBlur event.
	 */
	@Prop() customOnBlur?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the checkbox onFocus event.
	 */
	@Prop() customOnFocus?: (event: globalThis.Event) => void;

	/**
	 * Used for the `aria-describedby` value of the checkbox. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * The hint text options are re-assigned to the internalHintText state.
	 */
	@State() private internalHintText: Hint;

	/**
	 * The hint expander options are re-assigned to the internalHintExpander state.
	 */
	@State() private internalHintExpander: HintExpander;

	/**
	 * Emitted when a keyboard input or mouse event occurs when the checkbox has been changed.
	 */
	@Event() checkboxOnChange: EventEmitter<RadioAndCheckboxChangeEvent>;

	/**
	 * Emitted when a keyboard input event occurs when the checkbox has lost focus.
	 */
	@Event() checkboxOnBlur: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when a keyboard input event occurs when the checkbox has gained focus.
	 */
	@Event() checkboxOnFocus: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when an error message is reported to the component.
	 */
	@Event() inputErrorOccurred: EventEmitter<{ errorMessage: string }>;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is connected to the DOM. It is used for the initial language when the component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	/**
	 * Handles an update to the language should the user request a language update from the language toggle.
	 * @param {CustomEvent} - The language that has been selected.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
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
	 * If a `hintExpander` prop is passed, it will be parsed (if it is a string),
	 * and the result will be set to the `internalHintExpander` state.
	 * Includes error handling for invalid JSON strings.
	 */
	@Watch('hintExpander')
	private parseHintExpander() {
		const hintExpander = this.hintExpander;

		if (hintExpander) {
			if (typeof hintExpander === 'string') {
				try {
					this.internalHintExpander = JSON.parse(hintExpander);
				} catch {
					const message = new ConsoleMessageClass();
					message
						.addDesignSystemTag()
						.addMonospaceText(' hintExpander ')
						.addRegularText('for')
						.addMonospaceText(' <ontario-checkbox> ')
						.addRegularText('could not be parsed from a string. Please ensure it is valid JSON.')
						.printMessage();
				}
			} else {
				this.internalHintExpander = hintExpander;
			}
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
				.addMonospaceText(' <ontario-checkbox> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	/*
	 * Watch for changes in the `value` prop for validation purposes.
	 *
	 * Validate the `value` and make sure the `value` prop has a value.
	 * Log a warning if user doesn't input a value for the `value`.
	 */
	@Watch('value')
	validateValue(newValue?: string) {
		if (validatePropExists(newValue ?? '')) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' value ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-checkbox> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	/**
	 * Watch for changes to the `label` prop.
	 *
	 * The label will be run through the InputCaption constructor to convert it to the correct format, and set the result to the `captionState` state.
	 * @param newValue: Caption | string
	 */
	@Watch('label')
	updateCaptionState(newValue: Caption | string) {
		this.captionState = new InputCaption(
			this.element.tagName,
			newValue,
			translations,
			this.language,
			false,
			this.required,
		);
	}

	/**
	 * Watch for changes to the `language` prop to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.label);
	}

	/**
	 * Watch for changes to the `checked` prop to keep the form value in sync.
	 */
	@Watch('checked')
	handleCheckedChange() {
		this.setFormValue();
		this.applyRequiredValidation();
	}

	@Watch('errorMessage')
	broadcastInputErrorOccurredEvent() {
		// Emit event to notify anyone who wants to listen for errors occurring
		this.inputErrorOccurred.emit({ errorMessage: this.errorMessage ?? '' });
	}

	/**
	 * A required, unchecked checkbox always displays the error state - checking it clears the error.
	 */
	private applyRequiredValidation() {
		if (!this.required) {
			return;
		}

		if (this.checked) {
			this.errorMessage = undefined;
			return;
		}

		this.errorMessage =
			this.requiredValidationMessage ?? translations.checkbox.requiredFieldError[this.getComponentLanguage()];
	}

	private getComponentLanguage() {
		return this.language ?? 'en';
	}

	/**
	 * Function to handle checkbox events and the information pertaining to the checkbox to emit.
	 */
	private handleEvent(event: globalThis.Event, eventType: EventType) {
		if (eventType === EventType.Change) {
			event.stopPropagation();
		}

		const input = event.target as HTMLInputElement | null;

		if (eventType === EventType.Change) {
			this.checked = !!input?.checked;
		}

		handleInputEvent(
			event,
			eventType,
			input,
			this.checkboxOnChange,
			this.checkboxOnFocus,
			this.checkboxOnBlur,
			undefined,
			'checkbox',
			this.customOnChange,
			this.customOnFocus,
			this.customOnBlur,
			undefined,
			eventType === EventType.Change ? this.element : undefined,
		);
	}

	private setFormValue() {
		this.internals?.setFormValue?.(this.checked ? (this.value ?? 'on') : null);
	}

	public getId(): string {
		// A UUID is assigned in `componentWillLoad` if there is no given `elementId`.
		return this.elementId ?? '';
	}

	/**
	 * If a `hintText` prop is passed, the id generated from it will be set to the internal `hintTextId` state to match with the checkbox `aria-describedBy` attribute.
	 */
	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.updateCaptionState(this.label);
		this.elementId = this.elementId ?? uuid();
		this.parseHintText();
		this.parseHintExpander();
		this.validateName(this.name);
		this.validateValue(this.value);
		this.language = validateLanguage(this.language);
		this.setFormValue();
		this.applyRequiredValidation();
	}

	render() {
		const error = !!this.errorMessage;
		// The error styling clears once checked, even if the errorMessage prop is still set.
		const showErrorStyling = error && !this.checked;
		return (
			<div class={showErrorStyling ? 'ontario-input--error' : ''}>
				{this.internalHintText && (
					<ontario-hint-text
						hint={this.internalHintText.hint}
						hintContentType={this.internalHintText.hintContentType}
						ref={(el) => (this.hintTextRef = el)}
					></ontario-hint-text>
				)}
				<ErrorMessage message={this.errorMessage} error={error} />
				<div class="ontario-checkbox">
					<div class="ontario-checkbox__item">
						<Input
							className="ontario-checkbox__input"
							id={this.getId()}
							name={this.name}
							type="checkbox"
							value={this.value}
							required={!!this.required}
							checked={!!this.checked}
							ariaDescribedBy={this.hintTextId ?? undefined}
							onChange={(e) => this.handleEvent(e, EventType.Change)}
							onBlur={(e) => this.handleEvent(e, EventType.Blur)}
							onFocus={(e) => this.handleEvent(e, EventType.Focus)}
						></Input>
						{this.captionState.getCaption(this.getId(), !!this.internalHintExpander, false, 'ontario-checkbox__label')}

						{this.internalHintExpander && (
							<div class="ontario-checkbox__hint-expander">
								<ontario-hint-expander
									hint={this.internalHintExpander.hint}
									content={this.internalHintExpander.content}
									hintContentType={this.internalHintExpander.hintContentType}
									input-exists
								></ontario-hint-expander>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
