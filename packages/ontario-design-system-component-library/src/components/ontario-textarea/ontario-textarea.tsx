import { Component, Event, EventEmitter, h, Prop, State, Listen, Watch, Element } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Hint, Input } from '../../utils/common.interface';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import { validatePropExists, validateLanguage } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/language-types';
import { constructHintTextObject } from '../../utils/hints/hints';

import { default as translations } from '../../translations/global.i18n.json';

/**
 * Ontario Textarea component properties
 */
@Component({
	tag: 'ontario-textarea',
	styleUrl: 'ontario-textarea.scss',
	shadow: true,
})
export class OntarioTextarea implements Input {
	/**
	 * Grant access to the host element and related DOM methods/events within the class instance.
	 */
	@Element() element: HTMLElement;

	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * The text to display as the label
	 *
	 * @example
	 * <ontario-input
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   required="true"
	 *   ...>
	 * </ontario-input>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The name assigned to the textarea. The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * The unique identifier of the textarea. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * This is used to determine whether the textarea is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * The textarea content value.
	 */
	@Prop({ mutable: true }) value?: string;

	/**
	 * Define hint text for Ontario textarea. This is optional.
	 */
	@Prop() hintText?: string | Hint;

	/**
	 * Used to include the Hint Expander component for the textarea.
	 * This is passed in as an object with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-textarea
	 *   caption='{
	 *     "captionText": "What are your thoughts",
	 *     "captionType": "heading",
	 *   }'
	 * 	 name: "textarea"
	 *   hint-expander='{
	 *     "hint": "This is the hint expander",
	 *     "content": "This is the content for the hint expander"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-textarea>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * Used for the `aria-describedby` value of the textarea. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

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

	@State() focused: boolean = false;

	/**
	 * Emitted when the input loses focus.
	 */
	@Event() blurEvent!: EventEmitter<void>;

	/**
	 * Emitted when the input gains focus.
	 */
	@Event() focusEvent!: EventEmitter<void>;

	/**
	 * Emitted when a keyboard input occurred.
	 */
	@Event() changeEvent!: EventEmitter<KeyboardEvent>;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the textarea component loads.
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
				.addMonospaceText(' <ontario-textarea> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

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
	 * Watch for changes in the `language` to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	handleBlur = () => {
		this.focused = false;
	};

	handleFocus = () => {
		this.focused = true;
	};

	handleChange = (ev: Event) => {
		const textarea = ev.target as HTMLInputElement | null;

		if (textarea) {
			this.value = textarea.value ?? '';
		}

		this.changeEvent.emit(ev as KeyboardEvent);
	};

	public getId(): string {
		return this.elementId ?? '';
	}

	private getValue(): string | number {
		return this.value ?? '';
	}

	private getClass(): string {
		return this.hintExpander ? `ontario-textarea ontario-textarea-hint-expander--true` : `ontario-textarea`;
	}

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
		return (
			<div>
				{this.captionState.getCaption(this.getId(), !!this.internalHintExpander)}
				{this.internalHintText && (
					<ontario-hint-text
						hint={this.internalHintText.hint}
						hintContentType={this.internalHintText.hintContentType}
						ref={(el) => (this.hintTextRef = el)}
					></ontario-hint-text>
				)}
				<textarea
					aria-describedby={this.hintTextId}
					class={this.getClass()}
					id={this.getId()}
					name={this.name}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
					onInput={this.handleChange}
					value={this.getValue()}
					required={!!this.required}
				></textarea>
				{this.internalHintExpander && (
					<ontario-hint-expander
						hint={this.internalHintExpander.hint}
						content={this.internalHintExpander.content}
						hintContentType={this.internalHintExpander.hintContentType}
						input-exists
					></ontario-hint-expander>
				)}
			</div>
		);
	}
}
