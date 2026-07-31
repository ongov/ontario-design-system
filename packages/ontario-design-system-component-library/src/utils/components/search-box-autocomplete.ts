/** A single styled text run within a suggestion label — either a matched or completion portion. */
export interface Segment {
	text: string;
	kind: 'match' | 'completion';
}

/** Input accepted by `resolveSuggestionSegments` for pre-computed segment data. */
export interface SegmentResolutionInput {
	segments?: Segment[];
	highlightParts?: Array<{ text: string; isInputMatch: boolean }>;
	boldRanges?: Array<{ start: number; end: number }>;
}

/** Converts a label string and a set of matched character indices into contiguous `Segment` runs. */
function buildSegments(label: string, matchedIndices: Set<number>): Segment[] {
	const labelChars = Array.from(label);
	const segments: Segment[] = [];
	let activeText = '';
	let activeKind: Segment['kind'] | null = null;

	for (let index = 0; index < labelChars.length; index++) {
		const nextKind: Segment['kind'] = matchedIndices.has(index) ? 'match' : 'completion';

		if (activeKind === null || activeKind === nextKind) {
			activeText += labelChars[index];
			activeKind = nextKind;
			continue;
		}

		segments.push({ text: activeText, kind: activeKind });
		activeText = labelChars[index];
		activeKind = nextKind;
	}

	if (activeText && activeKind !== null) {
		segments.push({ text: activeText, kind: activeKind });
	}

	return segments;
}

/**
 * Computes highlight segments by finding matched character indices of `query` within `label`.
 * Returns `null` when no match is found.
 */
export function computeHighlightSegments(label: string, query: string): Segment[] | null {
	const normalizedLabel = label || '';
	const normalizedQuery = (query || '').trim();

	if (!normalizedLabel || !normalizedQuery) {
		return null;
	}

	const lowerLabel = normalizedLabel.toLowerCase();
	const lowerQuery = normalizedQuery.toLowerCase();
	const matchedIndices = new Set<number>();
	const contiguousMatchStart = lowerLabel.indexOf(lowerQuery);

	if (contiguousMatchStart >= 0) {
		for (let index = contiguousMatchStart; index < contiguousMatchStart + normalizedQuery.length; index++) {
			matchedIndices.add(index);
		}

		return buildSegments(normalizedLabel, matchedIndices);
	}

	const labelChars = Array.from(normalizedLabel);
	const queryChars = Array.from(normalizedQuery);
	let queryIndex = 0;

	for (let labelIndex = 0; labelIndex < labelChars.length && queryIndex < queryChars.length; labelIndex++) {
		if (labelChars[labelIndex].toLowerCase() === queryChars[queryIndex].toLowerCase()) {
			matchedIndices.add(labelIndex);
			queryIndex++;
		}
	}

	if (queryIndex < queryChars.length) {
		return null;
	}

	return buildSegments(normalizedLabel, matchedIndices);
}

/**
 * Resolves suggestion label segments using a single fallback order:
 * `segments` -> `highlightParts` -> `boldRanges` -> computed/default fallback.
 */
export function resolveSuggestionSegments(label: string, query: string, input?: SegmentResolutionInput): Segment[] {
	if (input?.segments?.length) {
		return input.segments;
	}

	if (input?.highlightParts?.length) {
		return input.highlightParts.map((part) => ({
			text: part.text,
			kind: part.isInputMatch ? 'match' : 'completion',
		}));
	}

	if (input?.boldRanges?.length) {
		const ranges = input.boldRanges
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

			const segments: Segment[] = [];
			let cursor = 0;
			for (const range of mergedRanges) {
				if (cursor < range.start) {
					segments.push({ text: label.slice(cursor, range.start), kind: 'match' });
				}
				segments.push({ text: label.slice(range.start, range.end), kind: 'completion' });
				cursor = range.end;
			}
			if (cursor < label.length) {
				segments.push({ text: label.slice(cursor), kind: 'match' });
			}

			return segments;
		}
	}

	if (!(query || '').trim()) {
		return [{ text: label, kind: 'completion' }];
	}

	return computeHighlightSegments(label, query) ?? [{ text: label, kind: 'completion' }];
}
