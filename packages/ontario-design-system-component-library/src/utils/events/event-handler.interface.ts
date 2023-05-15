export enum EventType {
	Change = 'change',
	Blur = 'blur',
	Focus = 'focus',
}

export type RadioAndCheckboxChangeEvent = {
	checked: boolean;
	id: string;
	value: string;
};

export type InputChangeEvent = {
	id: string;
	value: string;
};

export type InputFocusBlurEvent = {
	focused: boolean;
	id: string;
	value: string;
};

export type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
