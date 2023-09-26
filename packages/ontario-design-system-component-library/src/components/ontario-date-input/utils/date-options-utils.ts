import { DateInputFieldType } from '../ontario-date-input-interface';

export const getVisibleDateFields = (dateOptions: Array<DateInputFieldType>) => {
	const dayVisible = dateOptions.includes('day');
	const monthVisible = dateOptions.includes('month');
	const yearVisible = dateOptions.includes('year');

	return { dayVisible, monthVisible, yearVisible };
};
