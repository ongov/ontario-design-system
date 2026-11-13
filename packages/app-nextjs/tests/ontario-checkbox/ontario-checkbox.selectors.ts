// Selectors for the ontario-checkbox demo pages, shared by the e2e and VRT tests so a demo page rename is a single edit.
export const CHECKBOX_SELECTORS = {
	default: '#ontario-checkbox-default',
	labelLarge: '#ontario-checkbox-label-large',
	labelHeading: '#ontario-checkbox-label-heading',
	checked: '#ontario-checkbox-checked',
	required: '#ontario-checkbox-required',
	notRequired: '#ontario-checkbox-not-required',
	hintText: '#ontario-checkbox-hint-text',
	hintExpander: '#ontario-checkbox-hint-expander',
	error: '#ontario-checkbox-error',
	languageEnglish: '#ontario-checkbox-language-english',
	languageFrench: '#ontario-checkbox-language-french',
	customEvents: '#ontario-checkbox-custom-events',
	customOnChangeOutput: '#ontario-checkbox-custom-on-change',
	customOnFocusOutput: '#ontario-checkbox-custom-on-focus',
	customOnBlurOutput: '#ontario-checkbox-custom-on-blur',
} as const;
