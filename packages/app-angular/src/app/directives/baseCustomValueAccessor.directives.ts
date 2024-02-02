import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class BaseCustomValueAccessor implements ControlValueAccessor {
	constructor(private element: ElementRef, private renderer: Renderer2) {}

	onChange: (value: string) => void = () => {};
	onTouched: () => void = () => {};

	writeValue(value: string) {
		this.renderer.setProperty(this.element.nativeElement, 'value', value);
	}

	abstract _handleChange(value: string): void;
	abstract _handleBlurEvent(el: any): void;

	registerOnChange(fn: (value: string) => void) {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
	}
}
