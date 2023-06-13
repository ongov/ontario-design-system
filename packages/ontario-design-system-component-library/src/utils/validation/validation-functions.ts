import { Language } from '../common/language-types';

export function validatePropExists(newValue: string | HTMLElement): boolean {
	// Check if new value that is passed in is a string and is not empty
	const isNewValueBlank = typeof newValue !== 'string' || newValue === '';

	// Return true if new value is both a string and is not empty
	return isNewValueBlank;
}

/**
 * Validate value against enumType
 * T must extends String to gain access to the `toLowerCase()` function
 * @param value value to be compared against enumType
 * @param enumType list of enum values provided by caller
 * @returns enum value if a match is found or undefined if no matches are found
 */
export function validateValueAgainstEnum<T extends String, E extends Object>(value: T, enumType: E): T {
	return Object.values(enumType).find((type) => type === value.toLowerCase());
}

export function validateObjectExists(newValue: object): boolean {
	// Check if new value that is passed in is a string and is not empty
	const isNewValueBlank = typeof newValue !== 'object';

	// Return true if new value is both a string and is not empty
	return isNewValueBlank;
}

/**
 * Validate value against keys
 * @param value value to be compared against keys
 * @param keys of values provided by caller
 * @returns true if a match is found or false if no matches are found
 */
export function validateValueAgainstArray<T extends string>(value: T, keys: ReadonlyArray<string>): boolean {
	return keys.includes(value);
}

export function validateLanguage(language: CustomEvent<Language> | string | undefined) {
	if (language) {
		const toggledLanguage = typeof language !== 'string' ? language.detail : language;
		if (toggledLanguage && (toggledLanguage === 'en' || toggledLanguage === 'fr')) return toggledLanguage;
		else return 'en';
	}

	return 'en';
}
