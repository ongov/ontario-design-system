import { Segment } from '../../utils/components/search-box-autocomplete';

/** Represents a suggestion item in autocomplete mode */
export interface AutocompleteSuggestion {
	id?: string;
	label: string;
	value?: string;
	description?: string;
	href?: string;
	disabled?: boolean;
	segments?: Segment[];
}

export type Suggestion = string | AutocompleteSuggestion;

/** Payload emitted when a suggestion is selected */
export interface AutocompleteSuggestionSelectedEvent {
	query: string;
	suggestion: AutocompleteSuggestion;
	source: 'keyboard' | 'mouse';
}
