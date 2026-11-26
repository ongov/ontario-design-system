import { getDateErrorMessage } from './date-validation-utils';
import { validateDateFields } from './validate-date-fields';
import translations from '../../../translations/global.i18n.json';

describe('validateDateFields', () => {
	it.each([
		{ year: '', month: '', day: '' },
		{ year: '2024', month: '', day: '12' },
		{ year: '202', month: '12', day: '12' },
		{ year: '2024', month: '13', day: '12' },
		{ year: '2024', month: '12', day: '32' },
		{ year: '2024', month: '02', day: '29' },
	])('matches default validation for $year-$month-$day', ({ year, month, day }) => {
		expect(validateDateFields({ year, month, day })).toEqual(
			getDateErrorMessage({
				yearValue: year,
				monthValue: month,
				dayValue: day,
				errorMessages: translations.dateInput.error.en,
				yearVisible: true,
				monthVisible: true,
				dayVisible: true,
			}),
		);
	});

	it.each([
		{ year: '', month: '12', day: '12', message: 'emptyYear', invalid: 'yearInvalid' },
		{ year: '2024', month: '', day: '12', message: 'emptyMonth', invalid: 'monthInvalid' },
		{ year: '2024', month: '12', day: '', message: 'emptyDay', invalid: 'dayInvalid' },
		{ year: '202', month: '12', day: '12', message: 'invalidYear', invalid: 'yearInvalid' },
		{ year: '2024', month: '13', day: '12', message: 'invalidMonth', invalid: 'monthInvalid' },
		{ year: '2024', month: '12', day: '32', message: 'invalidDay', invalid: 'dayInvalid' },
	] as const)('reports $message for $year-$month-$day', ({ year, month, day, message, invalid }) => {
		const result = validateDateFields({ year, month, day });
		expect(result.errorMessage).toBe(translations.dateInput.error.en[message]);
		expect(result[invalid]).toBe(true);
	});

	it('uses the requested language and year limits', () => {
		expect(validateDateFields({ year: '2000', month: '12', day: '12', minYear: 2001, language: 'fr' })).toMatchObject({
			yearInvalid: true,
			monthInvalid: false,
			dayInvalid: false,
			errorMessage: translations.dateInput.error.fr.invalidYear,
		});
	});
});
