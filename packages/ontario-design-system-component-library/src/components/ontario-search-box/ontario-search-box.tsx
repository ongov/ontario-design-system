import { Component, Prop, h, Element, EventEmitter, Event, AttachInternals, State, Watch } from '@stencil/core';
import OntarioIconSearch from '../ontario-icon/assets/ontario-icon-search.svg';

import { Input } from '../../utils/common/input/input';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { InputCaption } from '../../utils/common/input-caption/input-caption';
import { Language } from '../../utils/common/language-types';
import { Hint } from '../../utils/common/common.interface';
import { isClientSideRendering } from '../../utils/common/environment';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import { handleInputEvent } from '../../utils/events/event-handler';
import {
	InputFocusBlurEvent,
	EventType,
	InputInteractionEvent,
	InputInputEvent,
} from '../../utils/events/event-handler.interface';
import {
	computeHighlightSegments,
	resolveSuggestionSegments,
} from '../../utils/components/search-box-autocomplete';
import {
	AutocompleteSuggestion,
	AutocompleteSuggestionSelectedEvent,
	Suggestion,
} from './ontario-search-box.interface';

import translations from '../../translations/global.i18n.json';

/**
 * Ontario Search Box captures and submits search queries.
 *
 * This component intentionally does not expose `readOnly` or `disabled` props.
 *
 * To support accessible and understandable form completion:
 * - keep form fields and submission actions available
 * - use validation and error messaging to guide corrections
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/search-box.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-search-box/
 *
 * Disabled/read-only policy source:
 * - https://designsystem.ontario.ca/components/detail/buttons.html#disabled-buttons
 */
@Component({
	tag: 'ontario-search-box',
	styleUrl: 'ontario-search-box.scss',
	shadow: true,
})
export class OntarioSearchBox {
	@Element() element!: HTMLElement;
	@AttachInternals() internals!: ElementInternals;

	private suggestionSlotRef?: HTMLSlotElement;
	private inputRefId = 'ontario-search-input-field';
	private debounceTimer?: number | ReturnType<typeof setTimeout>;

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
	 * Enables autocomplete behaviour on the search input.
	 */
	@Prop() enableAutocomplete?: boolean = false;

	/**
	 * Async suggestion provider for autocomplete mode.
	 * Slot content has precedence over this callback.
	 */
	@Prop()
	getSuggestions?: (query: string) => Promise<Suggestion[]>;

	/**
	 * Minimum number of characters required before suggestions are shown.
	 */
	@Prop() minChars?: number = OntarioSearchBox.DEFAULT_MIN_CHARS;

	/**
	 * Debounce delay in milliseconds before `getSuggestions` is called.
	 */
	@Prop() debounceMs?: number = OntarioSearchBox.DEFAULT_DEBOUNCE_MS;

	/**
	 * Maximum number of suggestions rendered in async mode.
	 */
	@Prop() maxSuggestions?: number = OntarioSearchBox.DEFAULT_MAX_SUGGESTIONS;

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
	@Prop() caption!: Caption | string;

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
	@Event() searchOnSubmit!: EventEmitter<string>;

	/**
	 * Emitted when a input  occurs when an input has been changed.
	 */
	@Event() inputOnInput!: EventEmitter<InputInputEvent>;

	/**
	 * Emitted when a keyboard input or mouse event occurs when an input has been changed.
	 */
	@Event() inputOnChange!: EventEmitter<InputInteractionEvent>;

	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	@Event() inputOnBlur!: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	@Event() inputOnFocus!: EventEmitter<InputFocusBlurEvent>;

	/**
	 * Emitted when the autocomplete query changes.
	 */
	@Event() autocompleteQueryUpdated!: EventEmitter<{ query: string }>;

	/**
	 * Emitted after suggestions are updated from either slot content or async mode.
	 */
	@Event() autocompleteSuggestionsUpdated!: EventEmitter<{ query: string; count: number }>;

	/**
	 * Emitted when a suggestion is selected.
	 */
	@Event() autocompleteSuggestionSelected!: EventEmitter<AutocompleteSuggestionSelectedEvent>;

	/**
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText!: Hint;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState!: InputCaption;

	/**
	 * Used for the `aria-describedby` value of the dropdown list. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;
	@State()
	private suggestions: AutocompleteSuggestion[] = [];
	@State() private activeSuggestionIndex: number = -1;
	@State() private hoveredSuggestionIndex: number = -1;
	@State() private suggestionsOpen = false;
	@State() private hasSuggestionSlotContent = false;
	@State() private ariaLiveMessage = '';

	@State() translations: any = translations;

	// Constants for default values
	private static readonly DEFAULT_MIN_CHARS = 1;
	private static readonly DEFAULT_DEBOUNCE_MS = 150;
	private static readonly DEFAULT_MAX_SUGGESTIONS = 8;
	// Allows suggestion mousedown handlers to run before blur closes the list.
	private static readonly BLUR_CLOSE_DELAY_MS = 120;
	private static readonly RESULT_ITEM_TAG = 'ONTARIO-SEARCH-RESULT-ITEM';

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
			this.translations,
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

	@Watch('enableAutocomplete')
	handleAutocompleteToggled(): void {
		if (!this.enableAutocomplete) {
			this.resetSuggestions();
		}
	}

	/**
	 * If a `hintText` prop is passed, the id generated from it will be set to the internal `hintTextId` state to match with the select `aria-describedBy` attribute.
	 */
	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
		this.updateSuggestionSlotState(this.suggestionSlotRef);
	}

	componentWillLoad() {
		this.elementId = this.elementId;
		this.parseHintText();
		this.updateCaptionState(this.caption);
	}

	private syncFormValue(value: string) {
		try {
			if (typeof this.internals?.setFormValue === 'function') {
				this.internals.setFormValue(value);
			}
		} catch {
			// Ignore when running in contexts where the host element is not form-associated.
		}
	}

	disconnectedCallback() {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}
	}

	/**
	 * Function to handle input events and the information pertaining to the input to emit.
	 */
	private handleEvent(event: globalThis.Event, eventType: EventType) {
		const input = event.target as HTMLInputElement | null;

		// Update the component value to match the value of the input element.
		this.value = input?.value;

		// Guard usage of `this.internals` to ensure this logic only runs in the browser.
		// `ElementInternals` is not available during SSR, and unguarded access can cause hydration errors.
		this.syncFormValue(this.value ?? '');

		if (eventType === EventType.Input) {
			this.handleAutocompleteInput(this.value ?? '');
		}

		if (eventType === EventType.Blur && this.enableAutocomplete) {
			window.setTimeout(() => this.closeSuggestions(), OntarioSearchBox.BLUR_CLOSE_DELAY_MS);
		}

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
	 * Handles autocomplete query updates for slotted and async suggestion modes.
	 */
	private async handleAutocompleteInput(query: string) {
		this.autocompleteQueryUpdated.emit({ query });

		if (!this.enableAutocomplete) return;

		if (query.length < (this.minChars ?? OntarioSearchBox.DEFAULT_MIN_CHARS)) {
			this.clearSuggestions();
			return;
		}

		if (this.hasSuggestionSlotContent) {
			this.resetActiveSuggestionIndex();
			this.resetHoveredSuggestionIndex();
			this.decorateSlotSuggestionOptions();

			if (this.getSuggestionCount() > 0) {
				this.openSuggestions();
			} else {
				this.closeSuggestions();
			}

			this.emitSuggestionsUpdated();
			return;
		}

		if (!this.getSuggestions) {
			this.clearSuggestions();
			return;
		}

		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}

		this.debounceTimer = window.setTimeout(async () => {
			const expectedQuery = this.value ?? '';

			try {
				const results = await this.getSuggestions?.(expectedQuery);

				const currentQuery = this.value ?? '';
				if (expectedQuery !== currentQuery) {
					return;
				}

				const maxSuggestions = this.maxSuggestions ?? OntarioSearchBox.DEFAULT_MAX_SUGGESTIONS;
				this.suggestions = (results || [])
					.map((item, index) => this.normalizeSuggestion(item, index, currentQuery))
					.slice(0, maxSuggestions);
				this.resetActiveSuggestionIndex();
				this.emitSuggestionsUpdated();

				if (this.suggestions.length) {
					this.openSuggestions();
				} else {
					this.closeSuggestions();
				}
			} catch {
				this.clearSuggestions();
			}
		}, this.debounceMs ?? OntarioSearchBox.DEFAULT_DEBOUNCE_MS);
	}

	/**
	 * Normalises a raw suggestion item into a consistent AutocompleteSuggestion shape.
	 */
	private normalizeSuggestion(item: Suggestion, index: number, query: string): AutocompleteSuggestion {
		if (typeof item === 'string') {
			return {
				id: `${this.getSuggestionListId()}-option-${index}`,
				label: item,
				value: item,
				segments: resolveSuggestionSegments(item, query),
			};
		}

		const label = item.label || item.value || '';

		return {
			id: item.id || `${this.getSuggestionListId()}-option-${index}`,
			label,
			value: item.value || item.label,
			description: item.description,
			href: item.href,
			disabled: !!item.disabled,
			segments: resolveSuggestionSegments(label, query, item),
		};
	}

	/**
	 * Gets the unique ID for the suggestion list.
	 */
	private getSuggestionListId(): string {
		const idPrefix = this.getId() || this.inputRefId;
		return `${idPrefix}-suggestion-list`;
	}

	/**
	 * Gets the unique ID for the aria-live region.
	 */
	private getAriaLiveRegionId(): string {
		const idPrefix = this.getId() || this.inputRefId;
		return `${idPrefix}-aria-live-region`;
	}

	/**
	 * Gets all slotted suggestion elements.
	 */
	private getAllSlotSuggestionElements(slot = this.suggestionSlotRef): HTMLElement[] {
		const assignedElements = slot?.assignedElements({ flatten: true }) || [];
		return assignedElements as HTMLElement[];
	}

	/**
	 * Gets visible (non-hidden) slotted suggestion elements.
	 */
	private getSlotSuggestionElements(slot = this.suggestionSlotRef): HTMLElement[] {
		return this.getAllSlotSuggestionElements(slot).filter((el) => !el.hasAttribute('hidden'));
	}

	/**
	 * Updates slot state from the current assigned elements and reapplies option decoration.
	 */
	private updateSuggestionSlotState(slot?: HTMLSlotElement) {
		const assignedOptions = this.getAllSlotSuggestionElements(slot);
		this.hasSuggestionSlotContent = assignedOptions.length > 0;
		this.decorateSlotSuggestionOptions(this.getSlotSuggestionElements(slot));
	}

	private getCustomSlotHighlightTarget(option: HTMLElement): HTMLElement | undefined {
		const explicitTarget = option.querySelector('[data-ontario-search-highlight]') as HTMLElement | null;
		if (explicitTarget) {
			return explicitTarget;
		}

		return option.children.length === 0 ? option : undefined;
	}

	/**
	 * Decorates custom slotted markup that opts in via `data-ontario-search-highlight`.
	 */
	private decorateCustomSlotSuggestionOption(option: HTMLElement) {
		const highlightTarget = this.getCustomSlotHighlightTarget(option);
		if (!highlightTarget) {
			return;
		}

		const originalText = highlightTarget.dataset.ontarioSearchOriginalText ?? highlightTarget.textContent ?? '';

		if (!highlightTarget.dataset.ontarioSearchOriginalText) {
			highlightTarget.dataset.ontarioSearchOriginalText = originalText;
		}

		const segments = resolveSuggestionSegments(originalText, this.value || '');
		const highlightNodes = segments.map((segment) => {
			const segmentNode = document.createElement(segment.kind === 'completion' ? 'strong' : 'span');
			segmentNode.className =
				segment.kind === 'completion'
					? 'ontario-search-autocomplete__suggestion-completion'
					: 'ontario-search-autocomplete__suggestion-match';
			segmentNode.textContent = segment.text;
			return segmentNode;
		});

		// Clear existing children
		while (highlightTarget.firstChild) {
			highlightTarget.removeChild(highlightTarget.firstChild);
		}
		// Add new children
		highlightNodes.forEach((node) => {
			highlightTarget.appendChild(node);
		});
	}

	/**
	 * Applies accessibility attributes and active/hover styling hooks to slot options.
	 */
	private decorateSlotSuggestionOptions(assignedOptions = this.getSlotSuggestionElements()) {
		assignedOptions.forEach((option, index) => {
			if (!option.id) {
				option.id = `${this.getSuggestionListId()}-option-${index}`;
			}

			option.setAttribute('role', option.getAttribute('role') || 'option');
			option.setAttribute('tabindex', '-1');
			option.setAttribute('data-ontario-suggestion-index', String(index));
			option.classList.add('ontario-search-autocomplete__slot-option');

			const isActive = index === this.activeSuggestionIndex || index === this.hoveredSuggestionIndex;
			const isHovered = index === this.hoveredSuggestionIndex;
			option.setAttribute('aria-selected', String(isActive));
			// Slot options need explicit state classes so keyboard navigation can style active rows without relying on :hover.
			option.classList.toggle('ontario-search-autocomplete__slot-option--active', isActive);
			option.classList.toggle('ontario-search-autocomplete__slot-option--hovered', isHovered);

			if (option.tagName === OntarioSearchBox.RESULT_ITEM_TAG) {
				(option as any).active = isActive;
				const semanticLabel = (option as any).label || this.getSuggestionValueFromOption(option);
				if (typeof semanticLabel === 'string' && semanticLabel.length) {
					(option as any).segments = resolveSuggestionSegments(semanticLabel, this.value || '', option as any);
				}
			} else {
				this.decorateCustomSlotSuggestionOption(option);
			}
		});
	}

	private onSuggestionSlotChange = (event: Event) => {
		const slotElement = event.target as HTMLSlotElement;
		this.updateSuggestionSlotState(slotElement);

		if (!this.enableAutocomplete) return;

		if (
			this.hasSuggestionSlotContent &&
			(this.value?.length ?? 0) >= (this.minChars ?? OntarioSearchBox.DEFAULT_MIN_CHARS)
		) {
			this.openSuggestions();
			this.emitSuggestionsUpdated();
		} else {
			this.closeSuggestions();
			this.emitSuggestionsUpdated();
		}
	};

	/**
	 * Gets the suggestion count from async or slotted suggestions.
	 */
	private getSuggestionCount(): number {
		return this.hasSuggestionSlotContent ? this.getSlotSuggestionElements().length : this.suggestions.length;
	}

	/**
	 * Checks if suggestion at index is disabled.
	 */
	private isSuggestionDisabled(index: number): boolean {
		if (this.hasSuggestionSlotContent) {
			const option = this.getSlotSuggestionElements()[index];
			if (!option) return true;
			return option.hasAttribute('disabled') || option.getAttribute('aria-disabled') === 'true';
		}

		return !!this.suggestions[index]?.disabled;
	}

	private getActiveDescendantId(): string | undefined {
		if (this.activeSuggestionIndex < 0) return undefined;

		if (this.hasSuggestionSlotContent) {
			return this.getSlotSuggestionElements()[this.activeSuggestionIndex]?.id;
		}

		return this.suggestions[this.activeSuggestionIndex]?.id;
	}

	private findNextActiveIndex(currentIndex: number, direction: 1 | -1): number {
		const total = this.getSuggestionCount();
		if (total === 0) return -1;

		let candidate = currentIndex;

		for (let steps = 0; steps < total; steps++) {
			candidate = (candidate + direction + total) % total;

			if (!this.isSuggestionDisabled(candidate)) {
				return candidate;
			}
		}

		return -1;
	}

	private setActiveSuggestion(index: number) {
		this.activeSuggestionIndex = index;

		if (this.hasSuggestionSlotContent) {
			this.decorateSlotSuggestionOptions();
		}

		if (index >= 0) {
			const label = this.getSuggestionLabel(index);
			this.ariaLiveMessage = label;
		}
	}

	private getSuggestionLabel(index: number): string {
		if (this.hasSuggestionSlotContent) {
			const option = this.getSlotSuggestionElements()[index];
			return this.getSlotOptionLabel(option);
		}

		return this.suggestions[index]?.label || '';
	}

	private handleSuggestionMouseOver = (event: MouseEvent) => {
		if (!this.enableAutocomplete) return;

		const hoveredIndex = this.getSuggestionIndexFromEvent(event);
		if (hoveredIndex < 0 || hoveredIndex === this.hoveredSuggestionIndex) return;

		this.hoveredSuggestionIndex = hoveredIndex;

		if (this.hasSuggestionSlotContent) {
			this.decorateSlotSuggestionOptions();
		}
	};

	private handleSuggestionMouseLeave = () => {
		if (!this.enableAutocomplete) return;
		if (this.hoveredSuggestionIndex < 0) return;

		this.hoveredSuggestionIndex = -1;

		if (this.hasSuggestionSlotContent) {
			this.decorateSlotSuggestionOptions();
		}
	};

	private getSuggestionValueFromOption(option?: HTMLElement): string {
		if (!option) return '';
		return (
			option.getAttribute('data-value') ||
			option.getAttribute('value') ||
			(option as any).value ||
			option.textContent?.trim() ||
			''
		);
	}

	private emitSuggestionsUpdated(): void {
		this.autocompleteSuggestionsUpdated.emit({
			query: this.value ?? '',
			count: this.getSuggestionCount(),
		});
	}

	private openSuggestions(): void {
		if (!this.enableAutocomplete || this.getSuggestionCount() === 0) {
			this.suggestionsOpen = false;
			return;
		}

		this.suggestionsOpen = true;
	}

	private closeSuggestions(): void {
		this.suggestionsOpen = false;
		this.resetActiveSuggestionIndex();
		this.resetHoveredSuggestionIndex();
		if (this.hasSuggestionSlotContent) {
			this.decorateSlotSuggestionOptions();
		}
	}

	/**
	 * Reset the active suggestion index to -1.
	 */
	private resetActiveSuggestionIndex(): void {
		this.activeSuggestionIndex = -1;
	}

	/**
	 * Reset the hovered suggestion index to -1.
	 */
	private resetHoveredSuggestionIndex(): void {
		this.hoveredSuggestionIndex = -1;
	}

	/**
	 * Reset and close suggestions list.
	 */
	private resetSuggestions(): void {
		this.closeSuggestions();
		this.suggestions = [];
	}

	/**
	 * Clears all suggestion state: hides slotted options, closes the list, resets suggestions, and emits the updated event.
	 */
	private clearSuggestions(): void {
		this.closeSuggestions();
		this.suggestions = [];
		this.emitSuggestionsUpdated();
	}

	/**
	 * Selects a suggestion by index, updates the input value, and emits selection metadata.
	 */
	private selectSuggestionByIndex(index: number, source: 'keyboard' | 'mouse'): void {
		if (index < 0 || this.isSuggestionDisabled(index)) {
			return;
		}

		let selectedSuggestion: AutocompleteSuggestion | undefined;

		if (this.hasSuggestionSlotContent) {
			const option = this.getSlotSuggestionElements()[index];
			const optionValue = this.getSuggestionValueFromOption(option);

			selectedSuggestion = {
				id: option?.id,
				label: optionValue,
				value: optionValue,
				disabled: option?.hasAttribute('disabled') || option?.getAttribute('aria-disabled') === 'true',
			};
		} else {
			selectedSuggestion = this.suggestions[index];
		}

		if (!selectedSuggestion) return;

		this.value = selectedSuggestion.value || selectedSuggestion.label;

		if (this.inputFieldRef) {
			this.inputFieldRef.value = this.value || '';
		}

		this.syncFormValue(this.value ?? '');

		this.autocompleteSuggestionSelected.emit({
			query: this.value ?? '',
			suggestion: selectedSuggestion,
			source,
		});

		this.ariaLiveMessage = selectedSuggestion.label;
		this.closeSuggestions();
	}

	private getSuggestionIndexFromEvent(event: MouseEvent): number {
		const targetPath =
			typeof event.composedPath === 'function' ? event.composedPath() : [(event.target as EventTarget) || null];

		for (const pathItem of targetPath) {
			const attributeTarget = pathItem as { getAttribute?: (name: string) => string | null };
			if (typeof attributeTarget?.getAttribute !== 'function') continue;

			const indexAttribute = attributeTarget.getAttribute('data-ontario-suggestion-index');
			if (indexAttribute == null) continue;

			const parsedIndex = Number(indexAttribute);
			if (!Number.isNaN(parsedIndex)) {
				return parsedIndex;
			}
		}

		const eventTarget = event.target as HTMLElement | null;
		const indexedElement = eventTarget?.closest?.('[data-ontario-suggestion-index]') as HTMLElement | null;
		const fallbackIndex = indexedElement?.getAttribute('data-ontario-suggestion-index');
		if (fallbackIndex != null) {
			const parsedIndex = Number(fallbackIndex);
			if (!Number.isNaN(parsedIndex)) {
				return parsedIndex;
			}
		}

		return -1;
	}

	private handleSuggestionMouseDown = (event: MouseEvent) => {
		if (!this.enableAutocomplete) return;
		if (!this.hasSuggestionSlotContent) return;
		// Prevent blur from closing the list before the click can commit the selection.
		event.preventDefault();
	};

	private handleSuggestionClick = (event: MouseEvent) => {
		if (!this.enableAutocomplete) return;
		const selectedIndex = this.getSuggestionIndexFromEvent(event);
		if (selectedIndex < 0) return;
		this.selectSuggestionByIndex(selectedIndex, 'mouse');
	};

	/**
	 * Handles autocomplete keyboard navigation and keyboard-based suggestion selection.
	 */
	private handleInputKeyDown = (event: KeyboardEvent) => {
		if (!this.enableAutocomplete) return;

		const suggestionCount = this.getSuggestionCount();

		switch (event.key) {
			case 'ArrowDown': {
				if (!suggestionCount) return;
				event.preventDefault();
				this.openSuggestions();
				this.setActiveSuggestion(this.findNextActiveIndex(this.activeSuggestionIndex, 1));
				break;
			}
			case 'ArrowUp': {
				if (!suggestionCount) return;
				event.preventDefault();
				this.openSuggestions();
				this.setActiveSuggestion(this.findNextActiveIndex(this.activeSuggestionIndex, -1));
				break;
			}
			case 'Enter': {
				if (this.suggestionsOpen && this.activeSuggestionIndex >= 0) {
					event.preventDefault();
					this.selectSuggestionByIndex(this.activeSuggestionIndex, 'keyboard');
				}
				break;
			}
			case 'Escape': {
				if (this.suggestionsOpen) {
					event.preventDefault();
					this.closeSuggestions();
				}
				break;
			}
			case 'Tab': {
				this.closeSuggestions();
				break;
			}
		}
	};

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
		if (isClientSideRendering() && inputRef) {
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
		const searchInputFieldId = this.inputRefId;
		const shouldShowSuggestions = this.enableAutocomplete && this.suggestionsOpen && this.getSuggestionCount() > 0;
		const suggestionListClass = [
			'ontario-search-autocomplete__suggestion-list',
			shouldShowSuggestions && 'ontario-search-autocomplete__suggestion-list--open',
		]
			.filter(Boolean)
			.join(' ');

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

				<div class="ontario-search__input-suggestion-container">
					<div class="ontario-search__input-container">
						<Input
							ariaDescribedBy={this.hintTextId || undefined}
							type="search"
							name="search"
							id={searchInputFieldId}
							autoComplete="off"
							ariaAutocomplete={this.enableAutocomplete ? 'list' : 'none'}
							ariaControls={this.enableAutocomplete ? this.getSuggestionListId() : undefined}
							ariaExpanded={this.enableAutocomplete ? shouldShowSuggestions : undefined}
							ariaHaspopup={this.enableAutocomplete ? 'listbox' : undefined}
							ariaActivedescendant={this.enableAutocomplete ? this.getActiveDescendantId() : undefined}
							role={this.enableAutocomplete ? 'combobox' : undefined}
							className="ontario-search__input ontario-input"
							required={true}
							ref={(el) => (this.inputFieldRef = el)}
							onInput={(e) => this.handleEvent(e, EventType.Input)}
							onChange={(e) => this.handleEvent(e, EventType.Change)}
							onBlur={(e) => this.handleEvent(e, EventType.Blur)}
							onFocus={(e) => this.handleEvent(e, EventType.Focus)}
							onKeyDown={(e) => this.handleInputKeyDown(e as KeyboardEvent)}
							value={this.getValue()}
						></Input>
						<Input
							className="ontario-search__reset"
							id="ontario-search-reset"
							type="reset"
							value=""
							ariaLabel={this.translations.header.clearSearchField[`${this.language}`]}
							onClick={() => this.handleFocus()}
						></Input>
						<button
							class="ontario-search__submit"
							type="submit"
							id="ontario-search-box__submit"
							onClick={(e) => this.handleSearch(e)}
						>
							<span class="ontario-show-for-sr">{this.translations.header.submit[`${this.language}`]}</span>
							<span innerHTML={OntarioIconSearch} aria-hidden="true" />
						</button>
					</div>

					<ul
						id={this.getSuggestionListId()}
						class={suggestionListClass}
						role="listbox"
						aria-labelledby={searchInputFieldId}
						aria-hidden={String(!shouldShowSuggestions)}
						onMouseOver={this.handleSuggestionMouseOver}
						onMouseLeave={this.handleSuggestionMouseLeave}
						onMouseDown={this.handleSuggestionMouseDown}
						onClick={this.handleSuggestionClick}
					>
						<slot
							name="suggestions"
							ref={(el) => (this.suggestionSlotRef = el as HTMLSlotElement)}
							onSlotchange={this.onSuggestionSlotChange}
						></slot>
						{!this.hasSuggestionSlotContent &&
							this.suggestions.map((suggestion, index) => (
								<ontario-search-result-item
									id={suggestion.id}
									class={[
										'ontario-search-autocomplete__suggestion-option',
										index === this.activeSuggestionIndex && 'ontario-search-autocomplete__suggestion-option--active',
										index === this.hoveredSuggestionIndex && 'ontario-search-autocomplete__suggestion-option--hovered',
										suggestion.disabled && 'ontario-search-autocomplete__suggestion-option--disabled',
									]
										.filter(Boolean)
										.join(' ')}
									data-ontario-suggestion-index={String(index)}
									label={suggestion.label}
									value={suggestion.value}
									description={suggestion.description}
									href={suggestion.href}
									disabled={suggestion.disabled}
									segments={suggestion.segments}
									active={index === this.activeSuggestionIndex || index === this.hoveredSuggestionIndex}
									aria-label={suggestion.label}
									onMouseDown={(event) => {
										event.preventDefault();
										this.selectSuggestionByIndex(index, 'mouse');
									}}
								></ontario-search-result-item>
							))}
					</ul>

					<div id={this.getAriaLiveRegionId()} class="ontario-search__visually-hidden" aria-live="polite">
						{this.ariaLiveMessage}
					</div>
				</div>
			</form>
		);
	}
}
