export enum EventType {
	Change = 'change',
	Blur = 'blur',
	Focus = 'focus',
}

export type InputChangeEvent = {
	id?: string;
	value?: string;
};

export type RadioAndCheckboxChangeEvent = InputChangeEvent & {
	checked: boolean;
};

export type InputFocusBlurEvent = InputChangeEvent & {
	focused: boolean;
};

export type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
