import { EventEmitter } from '@stencil/core';
import {
	InputType,
	EventType,
	InputFocusBlurEvent,
	InputChangeEvent,
	RadioAndCheckboxChangeEvent,
} from './event-handler.interface';

export const handleInputEvent = (
	ev: Event,
	eventType: EventType,
	input: InputType,
	inputChangeEvent: EventEmitter<InputChangeEvent | RadioAndCheckboxChangeEvent>,
	inputFocusEvent: EventEmitter<InputFocusBlurEvent>,
	inputBlurEvent: EventEmitter<InputFocusBlurEvent>,
	type?: string,
	customChangeFunction?: (event: Event) => void,
	customFocusFunction?: (event: Event) => void,
	customBlurFunction?: (event: Event) => void,
) => {
	if (eventType === 'change') {
		if (type === 'radio' || type === 'checkbox') {
			if (input instanceof HTMLInputElement) {
				inputChangeEvent.emit({
					checked: input?.checked,
					id: input?.id,
					value: input?.value,
				});
			}
		} else {
			inputChangeEvent.emit({
				id: input?.id,
				value: input?.value,
			});
		}

		customChangeFunction && customChangeFunction(ev);
	}

	if (eventType === 'focus') {
		inputFocusEvent.emit({
			id: input?.id,
			focused: true,
			value: input?.value,
		});

		customFocusFunction && customFocusFunction(ev);
	}

	if (eventType === 'blur') {
		inputBlurEvent.emit({
			id: input?.id,
			focused: false,
			value: input?.value,
		});

		customBlurFunction && customBlurFunction(ev);
	}
};
