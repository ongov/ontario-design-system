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

import translations from '../../translations/global.i18n.json';

/** Represents a suggestion item in autocomplete mode */
interface AutocompleteSuggestion {
	id?: string;
	label: string;
	value?: string;
	description?: string;
	href?: string;
	disabled?: boolean;
	boldRanges?: Array<{ start: number; end: number }>;
	highlightParts?: Array<{ text: string; isInputMatch: boolean }>;
}

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
	getSuggestions?: (query: string) => Promise<(string | AutocompleteSuggestion)[]>;

	/**
	 * Minimum number of characters required before suggestions are shown.
	 */
	@Prop() minChars?: number = 1;

	/**
	 * Debounce delay in milliseconds before `getSuggestions` is called.
	 */
	@Prop() debounceMs?: number = 150;

	/**
	 * Maximum number of suggestions rendered in async mode.
	 */
	@Prop() maxSuggestions?: number = 8;

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
	@Event() autocompleteSuggestionSelected!: EventEmitter<{
		query: string;
		suggestion: AutocompleteSuggestion;
		source: 'keyboard' | 'mouse';
	}>;

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
			this.closeSuggestions();
			this.suggestions = [];
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
			window.setTimeout(() => this.closeSuggestions(), 120);
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

	private async handleAutocompleteInput(query: string) {
		this.autocompleteQueryUpdated.emit({ query });

		if (!this.enableAutocomplete) return;

		if (query.length < (this.minChars ?? 1)) {
			this.updateSlotSuggestionVisibility('');
			this.suggestions = [];
			this.emitSuggestionsUpdated();
			this.closeSuggestions();
			return;
		}

		if (this.hasSuggestionSlotContent) {
			this.updateSlotSuggestionVisibility(query);
			this.activeSuggestionIndex = -1;
			this.hoveredSuggestionIndex = -1;
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
			this.suggestions = [];
			this.emitSuggestionsUpdated();
			this.closeSuggestions();
			return;
		}

		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}

		this.debounceTimer = window.setTimeout(async () => {
			const expectedQuery = this.value ?? '';

			try {
				const results = await this.getSuggestions?.(expectedQuery);

				if (expectedQuery !== (this.value ?? '')) {
					return;
				}

				const maxSuggestions = this.maxSuggestions ?? 8;
				this.suggestions = (results || [])
					.map((item, index) => this.normalizeSuggestion(item, index))
					.slice(0, maxSuggestions);
				this.activeSuggestionIndex = -1;
				this.emitSuggestionsUpdated();

				if (this.suggestions.length) {
					this.openSuggestions();
				} else {
					this.closeSuggestions();
				}
			} catch {
				this.suggestions = [];
				this.emitSuggestionsUpdated();
				this.closeSuggestions();
			}
		}, this.debounceMs ?? 150);
	}

	private normalizeSuggestion(
		item:
			| string
			| {
					id?: string;
					label: string;
					value?: string;
					description?: string;
					href?: string;
					disabled?: boolean;
					boldRanges?: Array<{ start: number; end: number }>;
					highlightParts?: Array<{ text: string; isInputMatch: boolean }>;
			  },
		index: number,
	) {
		if (typeof item === 'string') {
			return {
				id: `${this.getSuggestionListId()}-option-${index}`,
				label: item,
				value: item,
			};
		}

		return {
			id: item.id || `${this.getSuggestionListId()}-option-${index}`,
			label: item.label || item.value || '',
			value: item.value || item.label,
			description: item.description,
			href: item.href,
			disabled: !!item.disabled,
			boldRanges: item.boldRanges,
			highlightParts: item.highlightParts,
		};
	}

	private getSuggestionListId(): string {
		const idPrefix = this.getId() || this.inputRefId;
		return `${idPrefix}-suggestion-list`;
	}

	private getAriaLiveRegionId(): string {
		const idPrefix = this.getId() || this.inputRefId;
		return `${idPrefix}-aria-live-region`;
	}

	private getAllSlotSuggestionElements(slot = this.suggestionSlotRef): HTMLElement[] {
		const assignedElements = slot?.assignedElements({ flatten: true }) || [];
		return assignedElements as HTMLElement[];
	}

	private getSlotSuggestionElements(slot = this.suggestionSlotRef): HTMLElement[] {
		return this.getAllSlotSuggestionElements(slot).filter((el) => !el.hasAttribute('hidden'));
	}

	private updateSuggestionSlotState(slot?: HTMLSlotElement) {
		const assignedOptions = this.getAllSlotSuggestionElements(slot);
		this.hasSuggestionSlotContent = assignedOptions.length > 0;
		this.updateSlotSuggestionVisibility(this.value || '', assignedOptions);
		this.decorateSlotSuggestionOptions(this.getSlotSuggestionElements(slot));
	}

	private getSlotOptionLabel(option: HTMLElement): string {
		if (option.tagName === 'ONTARIO-SEARCH-RESULT-ITEM') {
			return (option as any).label || (option as any).value || this.getSuggestionValueFromOption(option);
		}

		return this.getSuggestionValueFromOption(option);
	}

	private updateSlotSuggestionVisibility(query: string, assignedOptions = this.getAllSlotSuggestionElements()) {
		const normalizedQuery = (query || '').trim();
		const hasQuery = normalizedQuery.length > 0;

		assignedOptions.forEach((option) => {
			const optionLabel = this.getSlotOptionLabel(option);
			const shouldShow =
				!hasQuery || this.computeFallbackHighlightParts(optionLabel, normalizedQuery).some((part) => part.isInputMatch);

			if (shouldShow) {
				option.removeAttribute('hidden');
			} else {
				option.setAttribute('hidden', '');
			}
			option.setAttribute('aria-hidden', String(!shouldShow));

			if (!shouldShow) {
				option.removeAttribute('data-ontario-suggestion-index');
				option.setAttribute('aria-selected', 'false');
				option.classList.remove('ontario-search-autocomplete__slot-option--active');
				option.classList.remove('ontario-search-autocomplete__slot-option--hovered');
			}
		});

		if (this.activeSuggestionIndex >= this.getSuggestionCount()) {
			this.activeSuggestionIndex = -1;
		}

		if (this.hoveredSuggestionIndex >= this.getSuggestionCount()) {
			this.hoveredSuggestionIndex = -1;
		}
	}

	private computeFallbackHighlightParts(label: string, query: string): Array<{ text: string; isInputMatch: boolean }> {
		const normalizedQuery = (query || '').trim();

		if (!normalizedQuery) {
			return [{ text: label, isInputMatch: false }];
		}

		const labelChars = Array.from(label);
		const queryChars = Array.from(normalizedQuery);
		const matchedIndices = new Set<number>();

		let queryIndex = 0;
		for (let labelIndex = 0; labelIndex < labelChars.length && queryIndex < queryChars.length; labelIndex++) {
			if (labelChars[labelIndex].toLowerCase() === queryChars[queryIndex].toLowerCase()) {
				matchedIndices.add(labelIndex);
				queryIndex++;
			}
		}

		if (queryIndex < queryChars.length) {
			matchedIndices.clear();
			const contiguousMatchStart = label.toLowerCase().indexOf(normalizedQuery.toLowerCase());
			if (contiguousMatchStart >= 0) {
				for (let i = contiguousMatchStart; i < contiguousMatchStart + queryChars.length; i++) {
					matchedIndices.add(i);
				}
			}
		}

		if (!matchedIndices.size) {
			return [{ text: label, isInputMatch: false }];
		}

		const segments: Array<{ text: string; isInputMatch: boolean }> = [];
		let activeSegment = '';
		let activeSegmentFromInput: boolean | null = null;

		for (let index = 0; index < labelChars.length; index++) {
			const fromInput = matchedIndices.has(index);

			if (activeSegmentFromInput === null || activeSegmentFromInput === fromInput) {
				activeSegment += labelChars[index];
				activeSegmentFromInput = fromInput;
				continue;
			}

			segments.push({ text: activeSegment, isInputMatch: activeSegmentFromInput });
			activeSegment = labelChars[index];
			activeSegmentFromInput = fromInput;
		}

		if (activeSegment && activeSegmentFromInput !== null) {
			segments.push({ text: activeSegment, isInputMatch: activeSegmentFromInput });
		}

		return segments;
	}

	private getCustomSlotHighlightTarget(option: HTMLElement): HTMLElement | undefined {
		const explicitTarget = option.querySelector('[data-ontario-search-highlight]') as HTMLElement | null;
		if (explicitTarget) {
			return explicitTarget;
		}

		return option.children.length === 0 ? option : undefined;
	}

	private decorateCustomSlotSuggestionOption(option: HTMLElement) {
		const highlightTarget = this.getCustomSlotHighlightTarget(option);
		if (!highlightTarget) {
			return;
		}

		const originalText = highlightTarget.dataset.ontarioSearchOriginalText ?? highlightTarget.textContent ?? '';

		if (!highlightTarget.dataset.ontarioSearchOriginalText) {
			highlightTarget.dataset.ontarioSearchOriginalText = originalText;
		}

		const highlightParts = this.computeFallbackHighlightParts(originalText, this.value || '');
		const highlightNodes = highlightParts.map((part) => {
			const segment = document.createElement(part.isInputMatch ? 'span' : 'strong');
			segment.className = part.isInputMatch
				? 'ontario-search-autocomplete__suggestion-match'
				: 'ontario-search-autocomplete__suggestion-completion';
			segment.textContent = part.text;
			return segment;
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
			option.classList.toggle('ontario-search-autocomplete__slot-option--active', isActive);
			option.classList.toggle('ontario-search-autocomplete__slot-option--hovered', isHovered);

			if (option.tagName === 'ONTARIO-SEARCH-RESULT-ITEM') {
				(option as any).active = isActive;
				const semanticLabel = (option as any).label || this.getSuggestionValueFromOption(option);
				if (typeof semanticLabel === 'string' && semanticLabel.length) {
					(option as any).highlightParts = this.computeFallbackHighlightParts(semanticLabel, this.value || '');
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

		if (this.hasSuggestionSlotContent && (this.value?.length ?? 0) >= (this.minChars ?? 1)) {
			this.openSuggestions();
			this.emitSuggestionsUpdated();
		} else {
			this.closeSuggestions();
			this.emitSuggestionsUpdated();
		}
	};

	private getSuggestionCount(): number {
		return this.hasSuggestionSlotContent ? this.getSlotSuggestionElements().length : this.suggestions.length;
	}

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

	private renderHighlightedSuggestionLabel(
		label: string,
		suggestion?: {
			boldRanges?: Array<{ start: number; end: number }>;
			highlightParts?: Array<{ text: string; isInputMatch: boolean }>;
		},
	) {
		if (!label) {
			return <span class="ontario-search-autocomplete__suggestion-label"></span>;
		}

		if (suggestion?.highlightParts?.length) {
			return (
				<span class="ontario-search-autocomplete__suggestion-label">
					{suggestion.highlightParts.map((part, index) => (
						<span
							class={
								part.isInputMatch
									? 'ontario-search-autocomplete__suggestion-match'
									: 'ontario-search-autocomplete__suggestion-completion'
							}
							key={`part-${index}`}
						>
							{part.text}
						</span>
					))}
				</span>
			);
		}

		if (suggestion?.boldRanges?.length) {
			const ranges = suggestion.boldRanges
				.map((range) => ({
					start: Math.max(0, Math.min(range.start, label.length)),
					end: Math.max(0, Math.min(range.end, label.length)),
				}))
				.filter((range) => range.end > range.start)
				.sort((a, b) => a.start - b.start);

			if (ranges.length) {
				const mergedRanges: Array<{ start: number; end: number }> = [];
				for (const range of ranges) {
					const lastRange = mergedRanges[mergedRanges.length - 1];
					if (!lastRange || range.start > lastRange.end) {
						mergedRanges.push({ ...range });
					} else {
						lastRange.end = Math.max(lastRange.end, range.end);
					}
				}

				const segments: Array<{ text: string; isCompletion: boolean }> = [];
				let cursor = 0;
				for (const range of mergedRanges) {
					if (cursor < range.start) {
						segments.push({ text: label.slice(cursor, range.start), isCompletion: false });
					}
					segments.push({ text: label.slice(range.start, range.end), isCompletion: true });
					cursor = range.end;
				}
				if (cursor < label.length) {
					segments.push({ text: label.slice(cursor), isCompletion: false });
				}

				return (
					<span class="ontario-search-autocomplete__suggestion-label">
						{segments.map((segment, index) => (
							<span
								class={
									segment.isCompletion
										? 'ontario-search-autocomplete__suggestion-completion'
										: 'ontario-search-autocomplete__suggestion-match'
								}
								key={`range-${index}`}
							>
								{segment.text}
							</span>
						))}
					</span>
				);
			}
		}

		const labelSegments = this.computeFallbackHighlightParts(label, this.value || '');

		return (
			<span class="ontario-search-autocomplete__suggestion-label">
				{labelSegments.map((segment, index) => (
					<span
						class={
							segment.isInputMatch
								? 'ontario-search-autocomplete__suggestion-match'
								: 'ontario-search-autocomplete__suggestion-completion'
						}
						key={`seg-${index}`}
					>
						{segment.text}
					</span>
				))}
			</span>
		);
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

	private emitSuggestionsUpdated() {
		this.autocompleteSuggestionsUpdated.emit({
			query: this.value ?? '',
			count: this.getSuggestionCount(),
		});
	}

	private openSuggestions() {
		if (!this.enableAutocomplete || this.getSuggestionCount() === 0) {
			this.suggestionsOpen = false;
			return;
		}

		this.suggestionsOpen = true;
	}

	private closeSuggestions() {
		this.suggestionsOpen = false;
		this.activeSuggestionIndex = -1;
		this.hoveredSuggestionIndex = -1;
		if (this.hasSuggestionSlotContent) {
			this.decorateSlotSuggestionOptions();
		}
	}

	private selectSuggestionByIndex(index: number, source: 'keyboard' | 'mouse') {
		if (index < 0 || this.isSuggestionDisabled(index)) {
			return;
		}

		let selectedSuggestion:
			| {
					id?: string;
					label: string;
					value?: string;
					description?: string;
					href?: string;
					disabled?: boolean;
			  }
			| undefined;

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
		const targetPath = event.composedPath();

		for (const pathItem of targetPath) {
			if (!(pathItem instanceof HTMLElement)) continue;

			const indexAttribute = pathItem.getAttribute('data-ontario-suggestion-index');
			if (indexAttribute == null) continue;

			const parsedIndex = Number(indexAttribute);
			if (!Number.isNaN(parsedIndex)) {
				return parsedIndex;
			}
		}

		return -1;
	}

	private handleSuggestionClick = (event: MouseEvent) => {
		if (!this.enableAutocomplete) return;

		const selectedIndex = this.getSuggestionIndexFromEvent(event);
		if (selectedIndex < 0) return;

		event.preventDefault();
		this.selectSuggestionByIndex(selectedIndex, 'mouse');
	};

	private handleSuggestionMouseDown = (event: MouseEvent) => {
		if (!this.enableAutocomplete) return;

		const selectedIndex = this.getSuggestionIndexFromEvent(event);
		if (selectedIndex < 0) return;

		event.preventDefault();
		this.selectSuggestionByIndex(selectedIndex, 'mouse');
	};

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
								<li
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
									data-value={suggestion.value || suggestion.label}
									role="option"
									aria-selected={String(index === this.activeSuggestionIndex || index === this.hoveredSuggestionIndex)}
									aria-disabled={String(!!suggestion.disabled)}
									aria-label={suggestion.label}
									tabIndex={-1}
									onClick={(event) => {
										event.preventDefault();
										this.selectSuggestionByIndex(index, 'mouse');
									}}
									onMouseDown={(event) => {
										event.preventDefault();
										this.selectSuggestionByIndex(index, 'mouse');
									}}
								>
									<div class="ontario-search-autocomplete__suggestion-content">
										{this.renderHighlightedSuggestionLabel(suggestion.label, suggestion)}
										{suggestion.description && (
											<span class="ontario-search-autocomplete__suggestion-description">{suggestion.description}</span>
										)}
									</div>
								</li>
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
