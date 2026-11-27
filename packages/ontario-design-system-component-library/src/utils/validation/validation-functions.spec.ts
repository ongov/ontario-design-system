import { validateLanguage } from './validation-functions';

describe('validateLanguage', () => {
	afterEach(() => {
		document.documentElement.removeAttribute('lang');
	});

	it('returns a supported language as-is', () => {
		document.documentElement.lang = 'en';
		expect(validateLanguage('fr')).toBe('fr');
	});

	it('reads the language from a CustomEvent', () => {
		expect(validateLanguage(new CustomEvent('setAppLanguage', { detail: 'fr' }))).toBe('fr');
	});

	it('returns English for an unsupported language', () => {
		document.documentElement.lang = 'fr';
		expect(validateLanguage('de')).toBe('en');
	});

	it('falls back to the html lang when no language is provided', () => {
		document.documentElement.lang = 'fr';
		expect(validateLanguage(undefined)).toBe('fr');
	});

	it('treats regional French variants as French', () => {
		document.documentElement.lang = 'fr-CA';
		expect(validateLanguage(undefined)).toBe('fr');
	});

	it('falls back to English when html lang is missing or unsupported', () => {
		expect(validateLanguage(undefined)).toBe('en');

		document.documentElement.lang = 'de';
		expect(validateLanguage(undefined)).toBe('en');
	});
});
