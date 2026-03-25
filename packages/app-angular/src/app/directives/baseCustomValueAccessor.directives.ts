import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
	standalone: false,
})
export abstract class BaseCustomValueAccessor<T = string> implements ControlValueAccessor {
	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
	) {}

	onChange: (value: T) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(value: T) {
		this.renderer.setProperty(this.element.nativeElement, 'value', value);
	}

	abstract _handleChange(...args: any[]): void;
	abstract _handleBlurEvent(el: any): void;

	registerOnChange(fn: (value: T) => void) {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
	}
}
