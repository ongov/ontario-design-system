import { EventEmitter } from '@stencil/core';
import { InputType, EventType } from './event-handler.interface';

export const handleInputEvent = (
	ev: Event,
	eventType: EventType,
	input: InputType,
	inputChangeEvent: EventEmitter,
	inputFocusEvent: EventEmitter,
	inputBlurEvent: EventEmitter,
	type?: string,
	customChangeFunction?: Function,
	customFocusFunction?: Function,
	customBlurFunction?: Function,
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
