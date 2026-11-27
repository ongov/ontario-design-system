// Selectors for the ontario-tag demo page, shared by the e2e and VRT tests so a demo page rename is a single edit.
export const TAG_SELECTORS = {
	unselected: '#ontario-tag-unselected',
	selected: '#ontario-tag-selected',
	dismissible: '#ontario-tag-dismissible',
	dismissibleFrench: '#ontario-tag-dismissible-french',
} as const;
