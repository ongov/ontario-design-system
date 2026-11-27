import translations from '../../../translations/global.i18n.json';
import { getDateErrorMessage } from './date-validation-utils';

describe('date field validation', () => {
	const validate = (yearValue: string, monthValue: string, dayValue: string) =>
		getDateErrorMessage({
			yearValue,
			monthValue,
			dayValue,
			yearVisible: true,
			monthVisible: true,
			dayVisible: true,
			errorMessages: translations.dateInput.error.en,
		});

	it.each([
		['202', '10', '12', 'Enter a valid year.', true, false, false],
		['2022', '13', '30', 'Enter a valid month.', false, true, false],
		['2022', '10', '32', 'Enter a valid day.', false, false, true],
		['202', '13', '32', 'Enter a valid date.', true, true, true],
		['2022', '13', '32', 'Enter a valid date.', false, true, true],
		['202', '', '32', 'Enter the month.', false, true, false],
		['', '', '', 'Enter a valid date.', true, true, true],
	])(
		'returns the field-range or missing-field error for %s-%s-%s',
		(year, month, day, message, yearInvalid, monthInvalid, dayInvalid) => {
			expect(validate(year, month, day)).toEqual({
				errorMessage: message,
				yearInvalid,
				monthInvalid,
				dayInvalid,
			});
		},
	);

	it.each([
		['2022', '02', '30'],
		['2023', '02', '29'],
		['2024', '02', '29'],
		['2100', '02', '29'],
		['2000', '02', '29'],
		['2022', '04', '31'],
	])('checks field ranges rather than calendar validity for %s-%s-%s', (year, month, day) => {
		expect(validate(year, month, day)).toEqual({
			errorMessage: '',
			yearInvalid: false,
			monthInvalid: false,
			dayInvalid: false,
		});
	});

	it('accepts in-range numeric decimals at the field-validation layer', () => {
		expect(validate('2022.5', '10.5', '12.5')).toEqual({
			errorMessage: '',
			yearInvalid: false,
			monthInvalid: false,
			dayInvalid: false,
		});
	});

	it('ignores hidden fields and keeps messages localized', () => {
		expect(
			getDateErrorMessage({
				yearValue: '',
				monthValue: '13',
				dayValue: '32',
				yearVisible: false,
				monthVisible: true,
				dayVisible: true,
				errorMessages: translations.dateInput.error.fr,
			}),
		).toEqual({
			errorMessage: 'Saisissez une date valide.',
			yearInvalid: false,
			monthInvalid: true,
			dayInvalid: true,
		});
	});
});
