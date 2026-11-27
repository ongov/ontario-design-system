import translations from '../../../translations/global.i18n.json';
import { Language } from '../../../utils/common/language-types';
import { getDateErrorMessage } from './date-validation-utils';

export interface DateFieldsValidationOptions {
	day: string;
	month: string;
	year: string;
	language?: Language;
	minYear?: number;
	maxYear?: number;
}

/**
 * Validates all three date fields using the date input's default validation rules.
 */
export function validateDateFields({
	day,
	month,
	year,
	language = 'en',
	minYear,
	maxYear,
}: DateFieldsValidationOptions) {
	return getDateErrorMessage({
		dayValue: day,
		monthValue: month,
		yearValue: year,
		errorMessages: translations.dateInput.error[language],
		minYear,
		maxYear,
		dayVisible: true,
		monthVisible: true,
		yearVisible: true,
	});
}
