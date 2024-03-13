import {
	Component,
	State,
	Element,
	h,
	Prop,
	Event,
	Listen,
	Watch,
	getAssetPath,
	EventEmitter,
	AttachInternals,
} from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { DropdownOption } from './dropdown-option.interface';
import { Dropdown } from './dropdown.interface';
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
import { hasMultipleTrueValues } from '../../utils/helper/utils';
import { Language } from '../../utils/common/language-types';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import { InputFocusBlurEvent, EventType, InputInteractionEvent } from '../../utils/events/event-handler.interface';
import { handleInputEvent } from '../../utils/events/event-handler';

import { default as translations } from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-dropdown-list',
	styleUrl: 'ontario-dropdown-list.scss',
	shadow: true,
	formAssociated: true,
	assetsDirs: ['./assets'],
})
export class OntarioDropdownList implements Dropdown {
	@Element() element: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * The text to display for the dropdown list label.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   name="ontario-dropdown-list"
	 *   caption='{
	 *     "captionText": "Label",
	 *     "captionType": "heading",
	 *   }'
	 *   ...>
	 * </ontario-dropdown-list>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * The name for the dropdown list. The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * The ID for the dropdown list.
	 * If no ID is provided, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * The options for dropdown list.
	 *
	 * Each option will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 *
	 * In the example below, the options are being passed in as a string and there are three dropdown options displayed.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "captionText": "Label",
	 *     "captionType": "heading",
	 *   }'
	 *   name="ontario-dropdown-list"
	 *   options='[
	 *     {
	 *       "value": "dropdown-option-1",
	 *       "label": "Option 1",
	 *       "selected": "true"
	 *     },
	 *     {
	 *       "value": "dropdown-option-2",
	 *       "label": "Option 2"
	 *     },
	 *     {
	 *       "value": "dropdown-option-3",
	 *       "label": "Option 3"
	 *     }
	 *   ]'
	 * >
	 * </ontario-dropdown-list>
	 */
	@Prop() options: string | DropdownOption[];

	/**
	 * This is used to determine whether the dropdown list is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * This prop is used to determine whether or not the initial option displayed is empty.
	 * If set to `true`, it will render the default “select” text.
	 * If set to a string, it will render the string value.
	 *
	 * @example
	 * <ontario-dropdown-list is-empty-start-option="true"></ontario-dropdown-list>
	 *
	 * or
	 *
	 * <ontario-dropdown-list is-empty-start-option="Please select"></ontario-dropdown-list>
	 */
	@Prop() isEmptyStartOption?: boolean | string = false;

	/**
	 * Used to include the ontario-hint-text component for the dropdown list.
	 * This is optional.
	 */
	@Prop() hintText?: string | Hint;

	/**
	 * Used to include the ontario-hint-expander component for the dropdown list component.
	 * This is passed in as an object with key-value pairs.
	 *
	 * This is optional.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "caption": "What province do you live in?",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-dropdown-list"
	 *   options='[
	 *     {
	 *       "value": "dropdown-option-1",
	 *       "label": "Option 1",
	 *       "selected": "true"
	 *     },
	 *     {
	 *       "value": "dropdown-option-2",
	 *       "label": "Option 2"
	 *     },
	 *     {
	 *       "value": "dropdown-option-3",
	 *       "label": "Option 3"
	 *     }
	 *   ]'
	 *   hint-expander='{
	 *    "hint": "Hint expander for the dropdown list",
	 *    "content": "Example hint expander content for the dropdown list."
	 *   }'
	 * >
	 * </ontario-dropdown-list>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * Used to add a custom function to the dropdown onChange event.
	 */
	@Prop() customOnChange?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the dropdown onBlur event.
	 */
	@Prop() customOnBlur?: (event: globalThis.Event) => void;

	/**
	 * Used to add a custom function to the dropdown onFocus event.
	 */
	@Prop() customOnFocus?: (event: globalThis.Event) => void;

	/**
	 * Used for the `aria-describedby` value of the dropdown list. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * The options are re-assigned to the internalOptions array.
	 */
	@State() private internalOptions: DropdownOption[];

	/**
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText: Hint;

	/**
	 * The hint expander options are re-assigned to the internalHintExpander array.
	 */
	@State() private internalHintExpander: HintExpander;

	@State() translations: any = translations;

	/**
	 * Emitted when a keyboard input or mouse event occurs when a dropdown list has been changed.
	 */
	@Event() dropdownOnChange: EventEmitter<InputInteractionEvent>;

	/**
	 * Emitted when a keyboard input event occurs when a dropdown list has lost focus.
	 */
	@Event() dropdownOnBlur: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when a keyboard input event occurs when a dropdown list has gained focus.
	 */
	@Event() dropdownOnFocus: EventEmitter<InputFocusBlurEvent>;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
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
				.addMonospaceText(' <ontario-dropdown-list> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	/*
	 * Watch for changes in the `options` prop for validation purposes.
	 *
	 * Validate the `options` and make sure the `options` prop has a value.
	 * Log a warning if user doesn't input a value for the `options`.
	 */
	@Watch('options')
	validateOptions(newValue: object) {
		if (validateObjectExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' options ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-dropdown-list> ')
				.addRegularText('was not provided')
				.printMessage();
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

		// Check selected status of options and set the selectedValue
		this.validateSelectedOption(this.internalOptions);
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
			translations,
			this.language,
			false,
			this.required,
		);
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
	 * Watch for changes to the `language` prop to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
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
	 * Function to handle dropdown list events and the information pertaining to the dropdown list to emit.
	 */
	private handleEvent(event: Event, eventType: EventType) {
		const input = event.target as HTMLSelectElement | null;

		this.internals?.setFormValue?.(input?.value ?? '');

		handleInputEvent(
			event,
			eventType,
			input,
			this.dropdownOnChange,
			this.dropdownOnFocus,
			this.dropdownOnBlur,
			undefined,
			'dropdown',
			this.customOnChange,
			this.customOnFocus,
			this.customOnBlur,
			undefined,
			this.element,
		);
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * This function will set a selected key to `false` for each dropdown if no selected value is passed.
	 *
	 * It will also pass a warning to the user if multiple `true` selected values are passed.
	 *
	 * @param options
	 * @returns options
	 */
	private validateSelectedOption(options: DropdownOption[]) {
		const selected = 'selected';

		options.forEach((singleOption) => {
			// if no selected key is passed, set a default key to false
			if (!singleOption.hasOwnProperty(selected)) {
				singleOption.selected = false;
			}
		});

		if (hasMultipleTrueValues(options, selected)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' There are duplicate truthy `selected` values ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-dropdown-list> ')
				.addRegularText('options. Please update options so only one truthy `selected` value exists.')
				.printMessage();
		}

		return options;
	}

	private getDropdownArrow() {
		return {
			backgroundImage: `url(${getAssetPath('./assets/ontario-material-dropdown-arrow-48px.svg')})`,
		};
	}

	private getClass(): string {
		return this.hintExpander
			? `ontario-input ontario-dropdown ontario-dropdown-hint-expander--true`
			: `ontario-input ontario-dropdown`;
	}

	/**
	 * If a `hintText` prop is passed, the id generated from it will be set to the internal `hintTextId` state to match with the select `aria-describedBy` attribute.
	 */
	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.parseOptions();
		this.validateName(this.name);
		this.validateOptions(this.internalOptions);
		this.elementId = this.elementId ?? uuid();
		this.parseHintText();
		this.parseHintExpander();
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div class="ontario-form-group">
				{this.captionState.getCaption(this.getId(), !!this.internalHintExpander)}
				{this.internalHintText && (
					<ontario-hint-text
						hint={this.internalHintText.hint}
						hintContentType={this.internalHintText.hintContentType}
						ref={(el) => (this.hintTextRef = el)}
					></ontario-hint-text>
				)}
				<select
					class={this.getClass()}
					aria-describedby={this.hintTextId}
					id={this.getId()}
					name={this.name}
					style={this.getDropdownArrow()}
					onChange={(e) => this.handleEvent(e, EventType.Change)}
					onBlur={(e) => this.handleEvent(e, EventType.Blur)}
					onFocus={(e) => this.handleEvent(e, EventType.Focus)}
					required={!!this.required}
				>
					{this.isEmptyStartOption &&
						(this.isEmptyStartOption === true || this.isEmptyStartOption === 'true' ? (
							<option>{this.translations.dropdownList.select[`${this.language}`]}</option>
						) : (
							<option>{this.isEmptyStartOption}</option>
						))}

					{this.internalOptions?.map((dropdown) => (
						<option value={dropdown.value} selected={dropdown.selected}>
							{dropdown.label}
						</option>
					)) ?? ''}
				</select>
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
