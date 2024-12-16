import {
	DAY_MIN_VALUE,
	DAY_MAX_VALUE,
	MONTH_MIN_VALUE,
	MONTH_MAX_VALUE,
	YEAR_MIN_VALUE,
	YEAR_MAX_VALUE,
} from '../constants';
import { DateValidatorReturnType } from '../ontario-date-input-interface';
import { isNumber, isEmpty } from '../../../utils/helper/utils';
import { Translations } from '../../../translations';
/*
 * Day field should be a number, not negative, no greater than “31”
 */
const isInvalidDay = (value: string) => {
	if (!isNumber(value)) {
		return true;
	}

	const day = Number(value);

	return day < DAY_MIN_VALUE || day > DAY_MAX_VALUE;
};

/*
 * Month field should be a number, not negative, no greater than “12”
 */
const isInvalidMonth = (value: string) => {
	if (!isNumber(value)) {
		return true;
	}

	const month = Number(value);

	return month < MONTH_MIN_VALUE || month > MONTH_MAX_VALUE;
};

/**
 * Valid value year against minimum and maximum year range (defaulted if not provided.)
 *
 * Year field should be a number and not written out; it has no concept of positive and negative.
 *
 * Suggestion:
 * - `< 0` B.C.E.
 * - `>= 0` A.C.E.
 *
 * @param value value to check for validity
 * @param minYear minimum valid year to validate against
 * @param maxYear maximum valid year to validate against
 */
export const isInvalidYear = (
	value: string | number,
	minYear: number = YEAR_MIN_VALUE,
	maxYear: number = YEAR_MAX_VALUE,
) => {
	if (!isNumber(value)) {
		return true;
	}

	const year = Number(value);

	return year < minYear || year > maxYear;
};

type GetDateErrorArg = {
	dayValue: string;
	monthValue: string;
	yearValue: string;
	errorMessages: Translations['dateInput']['error']['en'];
	minYear?: number;
	maxYear?: number;
	dayVisible: boolean;
	monthVisible: boolean;
	yearVisible: boolean;
};
/**
 * Helper function to get error message for birthdate validation
 */
export const getDateErrorMessage = ({
	dayValue,
	monthValue,
	yearValue,
	errorMessages,
	minYear,
	maxYear,
	dayVisible,
	monthVisible,
	yearVisible,
}: GetDateErrorArg): DateValidatorReturnType => {
	const {
		emptyDay,
		emptyMonth,
		emptyYear,
		emptyDayAndMonth,
		emptyDayAndYear,
		emptyMonthAndYear,
		invalidDate,
		invalidDay,
		invalidMonth,
		invalidYear,
	} = errorMessages;

	let error = '';
	let dayInvalid = false;
	let monthInvalid = false;
	let yearInvalid = false;

	const isDayEmpty = dayVisible && isEmpty(dayValue);
	const isMonthEmpty = monthVisible && isEmpty(monthValue);
	const isYearEmpty = yearVisible && isEmpty(yearValue);
	/*
	 *  If one ore more fields are valid but others are empty:
	 *  1 field empty:
	 *  Day as empty - “Enter the day.”
	 *  Month as empty - “Enter the month.”
	 *  Year as empty - “Enter the year.”
	 *  2 fields empty:
	 *  Month and day empty - “Enter the month and day.”
	 *  Year and day empty - “Enter the year and day.”
	 *  Year and month empty - “Enter the year and month.”
	 */
	if (isDayEmpty && isMonthEmpty && isYearEmpty) {
		error = invalidDate;
		dayInvalid = true;
		monthInvalid = true;
		yearInvalid = true;
	} else if (isDayEmpty && isMonthEmpty) {
		error = emptyDayAndMonth;
		dayInvalid = true;
		monthInvalid = true;
	} else if (isDayEmpty && isYearEmpty) {
		error = emptyDayAndYear;
		dayInvalid = true;
		yearInvalid = true;
	} else if (isMonthEmpty && isYearEmpty) {
		error = emptyMonthAndYear;
		yearInvalid = true;
		monthInvalid = true;
	} else if (isDayEmpty) {
		error = emptyDay;
		dayInvalid = true;
	} else if (isMonthEmpty) {
		error = emptyMonth;
		monthInvalid = true;
	} else if (isYearEmpty) {
		error = emptyYear;
		yearInvalid = true;
	}

	const isDayInvalid = dayVisible && isInvalidDay(dayValue);
	const isMonthInvalid = monthVisible && isInvalidMonth(monthValue);
	const isYearInvalid = yearVisible && isInvalidYear(yearValue, minYear, maxYear);
	/*
	 *  If only one error, specify where the error occurs
	 *  E.g. “Enter a valid day.”, “Enter a valid month.” Or “Enter a valid year.”
	 *  If 2 or more fields have error (or all 3), say “Enter a valid date.”
	 *  If one or more fields are invalid but the others are empty say: “Enter a valid date.”
	 */
	if (isEmpty(error)) {
		if (isDayInvalid && isMonthInvalid && isYearInvalid) {
			error = invalidDate;
			dayInvalid = true;
			monthInvalid = true;
			yearInvalid = true;
		} else if (isDayInvalid && isMonthInvalid) {
			error = invalidDate;
			dayInvalid = true;
			monthInvalid = true;
		} else if (isDayInvalid && isYearInvalid) {
			error = invalidDate;
			dayInvalid = true;
			yearInvalid = true;
		} else if (isMonthInvalid && isYearInvalid) {
			error = invalidDate;
			monthInvalid = true;
			yearInvalid = true;
		} else if (isYearInvalid) {
			error = invalidYear;
			yearInvalid = true;
		} else if (isMonthInvalid) {
			error = invalidMonth;
			monthInvalid = true;
		} else if (isDayInvalid) {
			error = invalidDay;
			dayInvalid = true;
		}
	}

	return { errorMessage: error, dayInvalid, monthInvalid, yearInvalid };
};
