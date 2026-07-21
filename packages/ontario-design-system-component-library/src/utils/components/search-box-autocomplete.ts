export interface Segment {
	text: string;
	kind: 'match' | 'completion';
}

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
