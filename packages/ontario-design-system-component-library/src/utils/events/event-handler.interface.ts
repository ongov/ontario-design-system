export enum EventType {
	Change = 'change',
	Blur = 'blur',
	Focus = 'focus',
	Input = 'input',
}

export type InputInteractionEvent = {
	id?: string;
	value?: string;
};

export type InputInputEvent = InputInteractionEvent & {
	inputType?: string;
};

export interface RadioAndCheckboxChangeEvent {
	checked: boolean;
	checkboxStates: Record<string, boolean>;
	input: HTMLInputElement;
}

export type InputFocusBlurEvent = InputInteractionEvent & {
	focused: boolean;
};

export type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
