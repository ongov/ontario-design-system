import { Component, Event, h, Prop, State, Listen, Element, Watch } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { TextInput } from './input.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

import { Hint } from '../../utils/common.interface';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import { Language } from '../../utils/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { constructHintTextObject } from '../../utils/hints/hints';
import { InputFocusBlurEvent, EventType, InputChangeEvent } from '../../utils/events/event-handler.interface';
import { handleInputEvent } from '../../utils/events/event-handler';

import { default as translations } from '../../translations/global.i18n.json';

/**
 * Ontario Input component
 */
@Component({
	tag: 'ontario-input',
	styleUrl: 'ontario-input.scss',
	shadow: true,
})
export class OntarioInput implements TextInput {
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
	 * The width of the input field. If no value is assigned, it will present as the default input width.
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
	 * The name assigned to the input.The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * Define hint text for Ontario input. This is optional.
	 */
	@Prop() hintText?: string | Hint;

	/**
	 * This is used to determine whether the input is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * The input type value.
	 */
	@Prop({ mutable: true }) type: 'text' | 'tel' | 'email' | 'password' = 'text';

	/**
	 * The input content value.
	 */
	@Prop({ mutable: true }) value?: string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * Used to include the Hint Expander component underneath the input box.
	 * This is passed in as an object with key-value pairs. This is optional.
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
	@State() hintTextId: string | null | undefined;

	/**
	 * Used to add a custom function to the textarea onChange event.
	 */
	@Prop() customOnChange?: Function;

	/**
	 * Used to add a custom function to the textarea onBlur event.
	 */
	@Prop() customOnBlur?: Function;

	/**
	 * Used to add a custom function to the textarea onFocus event.
	 */
	@Prop() customOnFocus?: Function;

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
	 * Emitted when a keyboard input or mouse event occurs when an input has been changed.
	 */
	@Event({ eventName: 'inputOnChange' }) inputOnChange: InputChangeEvent;

	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	@Event({ eventName: 'inputOnBlur' }) inputOnBlur: InputFocusBlurEvent;

	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	@Event({ eventName: 'inputOnFocus' }) inputOnFocus: InputFocusBlurEvent;

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

	handleEvent = (ev: Event, eventType: EventType) => {
		const input = ev.target as HTMLInputElement | null;

		handleInputEvent(
			ev,
			eventType,
			input,
			this.inputOnChange,
			this.inputOnFocus,
			this.inputOnBlur,
			'input',
			this.customOnChange,
			this.customOnFocus,
			this.customOnBlur,
		);
	};

	public getId(): string {
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

	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.elementId = this.elementId ?? uuid();
		this.parseHintText();
		this.parseHintExpander();
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
				<input
					aria-describedby={this.hintTextId}
					class={this.getClass()}
					id={this.getId()}
					name={this.name}
					onInput={(e) => this.handleEvent(e, EventType.Change)}
					onBlur={(e) => this.handleEvent(e, EventType.Blur)}
					onFocus={(e) => this.handleEvent(e, EventType.Focus)}
					type={this.type}
					value={this.getValue()}
					required={!!this.required}
				/>
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
