import { EventEmitter } from '@stencil/core';
import {
	InputType,
	EventType,
	InputFocusBlurEvent,
	InputInteractionEvent,
	RadioAndCheckboxChangeEvent,
	InputInputEvent,
} from './event-handler.interface';

export const handleInputEvent = (
	event: Event,
	eventType: EventType,
	input: InputType,
	inputChangeEvent: EventEmitter<InputInteractionEvent | RadioAndCheckboxChangeEvent>,
	inputFocusEvent: EventEmitter<InputFocusBlurEvent>,
	inputBlurEvent: EventEmitter<InputFocusBlurEvent>,
	inputInputEvent?: EventEmitter<InputInputEvent>,
	type?: string,
	customChangeFunction?: (event: Event) => void,
	customFocusFunction?: (event: Event) => void,
	customBlurFunction?: (event: Event) => void,
	customInputFunction?: (event: Event) => void,
	hostElement?: HTMLElement,
) => {
	if (eventType === EventType.Input) {
		inputInputEvent?.emit({
			id: input?.id,
			value: (event as InputEvent).data ?? undefined,
			inputType: (event as InputEvent).inputType,
		});

		customInputFunction && customInputFunction(event);
	}

	if (eventType === EventType.Change) {
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

		customChangeFunction && customChangeFunction(event);

		// Note: Change events don't have composable set to true and don't cross the ShadowDOM boundary.
		// This will emit an event so the normal `onChange` event pattern is maintained.
		hostElement && emitEvent(hostElement, eventType, event);
	}

	if (eventType === EventType.Focus) {
		inputFocusEvent.emit({
			id: input?.id,
			focused: true,
			value: input?.value,
		});

		customFocusFunction && customFocusFunction(event);
	}

	if (eventType === EventType.Blur) {
		inputBlurEvent.emit({
			id: input?.id,
			focused: false,
			value: input?.value,
		});

		customBlurFunction && customBlurFunction(event);
	}
};

/**
 * Emit a custom event that can be subscribed to by an event listener.
 *
 * @param element Component host element, see https://stenciljs.com/docs/host-element
 * @param name name of the event
 * @param detail any relevant details, like the original event
 */
export const emitEvent = (element: HTMLElement, name: string, detail?: any) => {
	element.dispatchEvent(new CustomEvent(name, { composed: true, bubbles: true, detail }));
};
