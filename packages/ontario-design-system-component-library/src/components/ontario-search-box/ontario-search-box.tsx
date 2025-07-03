import { Component, Prop, h, Element, EventEmitter, Event, AttachInternals, State, Watch } from '@stencil/core';
import { Input } from '../../utils/common/input/input';
import { Language } from '../../utils/common/language-types';
import OntarioIconSearch from '../ontario-icon/assets/ontario-icon-search.svg';
import { Hint } from '../../utils/common/common.interface';
import { handleInputEvent } from '../../utils/events/event-handler';
import {
	InputFocusBlurEvent,
	EventType,
	InputInteractionEvent,
	InputInputEvent,
} from '../../utils/events/event-handler.interface';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { InputCaption } from '../../utils/common/input-caption/input-caption';
import { default as translations } from '../../translations/global.i18n.json';
import { constructHintTextObject } from '../../utils/components/hints/hints';

@Component({
	tag: 'ontario-search-box',
	styleUrl: 'ontario-search-box.scss',
	shadow: true,
})
export class OntarioSearchBox {
	@Element() element: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	/**
	 * This Ref is used get a direct reference to the hint text element
	 */
	private hintTextRef?: HTMLOntarioHintTextElement;

	/**
	 * This Ref is used get a direct reference to the search input element
	 */
	private inputFieldRef?: HTMLInputElement;

	/**
	 * The language of the component.
	 * This is used for translations. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * The unique identifier of the search-box component. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * The value of the search term.
	 * This is optional.
	 */
	@Prop({ mutable: true }) value?: string;

	/**
	 * The text to display as the input label
	 *
	 * @example
	 * <ontario-search-box
	 *   caption='{
	 *			"captionText": "Search directory",
	 *			"captionType": "default"
	 *		}'
	 *		required = "true"
	 * >
	 * </ontario-search-box>
	 */
	@Prop() caption: Caption | string;

	/**
	 * This is used to determine whether the dropdown list is required or not.
	 * This prop gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * This Function to perform a search operation.
	 * This function will be called when the search submit button is triggered.
	 * The value argument is used for as search term to use for the search operation. This parameter is optional.
	 * The performSearch prop can be set dynamically using JavaScript, allowing you to define custom search functionality when the search form is submitted.
	 *
	 * @example
	 * <ontario-search-box
	 *	  id="ontario-search-box"
	 *	  caption='Search directory'
	 * ></ontario-search-box>
	 *
	 * <script>
	 *	window.addEventListener('load', () => {
	 *		const searchBox = document.getElementById('ontario-search-box');
	 *		searchBox.performSearch = async (value) => {
	 * 			console.log('Performing search with value:', value);
	 *		};
	 *	});
	 * </script>
	 */
	@Prop() performSearch?: (value?: string) => Promise<void>;

	/**
	 * Used to include the ontario-hint-text component for the search-box.
	 * This is optional.
	 */
	@Prop() hintText?: string | Hint;

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
	 * Emitted when the search is submitted.
	 * Below is an example on how to hook into the event to get the event details.
	 *
	 * @example
	 *	<script>
	 *		document.getElementById('ontario-search-box').addEventListener('searchOnSubmit', (event) => {
	 *	 		const searchValue = event.detail;
	 *			console.log('Search submitted with value:', searchValue);
	 *	  };
	 * 	</script>
	 */
	@Event() searchOnSubmit: EventEmitter<string>;

	/**
	 * Emitted when a input  occurs when an input has been changed.
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
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText: Hint;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * Used for the `aria-describedby` value of the dropdown list. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

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
	 * Watch for changes to the `language` prop to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	/**
	 * If a `hintText` prop is passed, the id generated from it will be set to the internal `hintTextId` state to match with the select `aria-describedBy` attribute.
	 */
	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.elementId = this.elementId;
		this.parseHintText();
		this.updateCaptionState(this.caption);
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

	/**
	 * handleSearch function is called when the search submit button is clicked
	 */
	async handleSearch(event: MouseEvent) {
		event.preventDefault();
		this.searchOnSubmit.emit(this.value);
		this.performSearch && (await this.performSearch(this.value));
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	private getValue(): string | number {
		return this.value ?? '';
	}

	/**
	 *This function ensures that the focus returns to the search input field when the reset button is clicked.
	 */
	private setFocus(inputRef?: HTMLInputElement) {
		if (inputRef) {
			inputRef.focus();
		}
	}

	/**
	 * when the reset button is clicked this function gets called
	 */
	handleFocus = () => {
		this.setFocus(this.inputFieldRef);
	};

	render() {
		const searchInputFieldId: string = 'ontario-search-input-field';
		return (
			<form
				name="searchForm"
				id="ontario-search-form-container"
				class="ontario-search__container ontario-columns ontario-small-10 ontario-medium-offset-3 ontario-medium-6 ontario-large-offset-0 ontario-large-6"
				novalidate
			>
				{this.captionState.getCaption(searchInputFieldId, false, true) /* Note the _required_ text is disabled */}
				{this.internalHintText && (
					<ontario-hint-text
						hint={this.internalHintText.hint}
						hintContentType={this.internalHintText.hintContentType}
						ref={(el) => (this.hintTextRef = el)}
					></ontario-hint-text>
				)}

				<div class="ontario-search__input-container">
					<Input
						aria-describedBy={this.hintTextId}
						type="search"
						name="search"
						id={searchInputFieldId}
						autoComplete="off"
						aria-autocomplete="none"
						className="ontario-search__input ontario-input"
						required={true}
						ref={(el) => (this.inputFieldRef = el)}
						onInput={(e) => this.handleEvent(e, EventType.Input)}
						onChange={(e) => this.handleEvent(e, EventType.Change)}
						onBlur={(e) => this.handleEvent(e, EventType.Blur)}
						onFocus={(e) => this.handleEvent(e, EventType.Focus)}
						value={this.getValue()}
					></Input>
					<Input
						className="ontario-search__reset"
						id="ontario-search-reset"
						type="reset"
						value=""
						onClick={() => this.handleFocus()}
					></Input>
					<button
						class="ontario-search__submit"
						type="submit"
						id="ontario-search-box__submit"
						onClick={(e) => this.handleSearch(e)}
					>
						<span innerHTML={OntarioIconSearch} />
					</button>
				</div>
			</form>
		);
	}
}
