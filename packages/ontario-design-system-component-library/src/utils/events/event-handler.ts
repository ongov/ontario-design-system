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
	const emitInputEvent = () => {
		inputInputEvent?.emit({
			id: input?.id,
			value: (event as InputEvent).data ?? undefined,
			inputType: (event as InputEvent).inputType,
		});

		customInputFunction?.(event);
	};

	const emitChangeEvent = () => {
		if (type === 'radio' || type === 'checkbox') {
			if (input instanceof HTMLInputElement) {
				const isChecked = input?.checked ?? false;
				updateCheckboxStates(input, isChecked, hostElement);
			}
		} else {
			inputChangeEvent.emit({
				id: input?.id,
				value: input?.value,
			});
		}

		customChangeFunction?.(event);

		// Note: Change events don't have composable set to true and don't cross the ShadowDOM boundary.
		// This will emit an event so the normal `onChange` event pattern is maintained.
		hostElement && emitEvent(hostElement, eventType, event);
	};

	const emitFocusEvent = () => {
		inputFocusEvent.emit({
			id: input?.id,
			focused: true,
			value: input?.value,
		});

		customFocusFunction?.(event);
	};

	const emitBlurEvent = () => {
		inputBlurEvent.emit({
			id: input?.id,
			focused: false,
			value: input?.value,
		});

		customBlurFunction?.(event);
	};

	switch (eventType) {
		case EventType.Input:
			emitInputEvent();
			break;
		case EventType.Change:
			emitChangeEvent();
			break;
		case EventType.Focus:
			emitFocusEvent();
			break;
		case EventType.Blur:
			emitBlurEvent();
			break;
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

/**
 * Updates the state of a checkbox and emits corresponding events.
 *
 * @param input - The HTMLInputElement representing the checkbox.
 * @param isChecked - A boolean indicating whether the checkbox is checked or unchecked.
 *
 * This method updates the internal state of checkboxes and emits both Angular and Custom events:
 */

export const updateCheckboxStates = (input: HTMLInputElement, isChecked: boolean, hostElement?: HTMLElement) => {
	const checkboxChangeEvent = new CustomEvent('checkboxChange', {
		detail: {
			id: input.id,
			checked: isChecked,
		},
		bubbles: true,
		composed: true,
	});

	input.dispatchEvent(checkboxChangeEvent);
	hostElement && emitEvent(hostElement, 'checkboxChange', { id: input.id, checked: isChecked });
};
