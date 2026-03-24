export type DateInputFieldType = 'day' | 'month' | 'year';

export type DateInputValueParts = {
	day: string;
	month: string;
	year: string;
	normalizedValue: string;
};

export type DateInputValueChangeEvent = {
	value?: string;
};

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
