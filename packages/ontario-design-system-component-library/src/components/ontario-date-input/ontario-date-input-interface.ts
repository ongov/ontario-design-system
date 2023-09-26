export type DateInputFieldType = 'day' | 'month' | 'year';

export type DateInputPlaceholder = {
	day?: string;
	month?: string;
	year?: string;
};

export type DateValidatorReturnType = {
	errorMessage?: string;
	dayInvalid: boolean;
	monthInvalid: boolean;
	yearInvalid: boolean;
};
