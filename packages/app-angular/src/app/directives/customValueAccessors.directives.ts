import { Directive, HostListener, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BaseCustomValueAccessor } from './baseCustomValueAccessor.directives';

@Directive({
	selector: 'ontario-input',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: OntarioInputValueAccessor,
			multi: true,
		},
	],
})
export class OntarioInputValueAccessor extends BaseCustomValueAccessor {
	@HostListener('inputValueChange', ['$event.detail'])
	_handleChange(value: string) {
		this.onChange(value);
	}

	@HostListener('onBlur', ['$event.target'])
	_handleBlurEvent(el: any) {
		this.onTouched();
	}
}

@Directive({
	selector: 'ontario-textarea',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: OntarioTextareaValueAccessor,
			multi: true,
		},
	],
})
export class OntarioTextareaValueAccessor extends BaseCustomValueAccessor {
	@HostListener('inputValueChange', ['$event.detail'])
	_handleChange(value: string) {
		this.onChange(value);
	}

	@HostListener('onBlur', ['$event.target'])
	_handleBlurEvent(el: any) {
		this.onTouched();
	}
}

@Directive({
	selector: 'ontario-checkboxes', // Adjust the selector as needed
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: OntarioCheckboxesValueAccessor,
			multi: true,
		},
	],
})
export class OntarioCheckboxesValueAccessor extends BaseCustomValueAccessor {
	@HostListener('checkboxOnChange', ['$event.detail'])
	_handleChange(event: any) {
		console.log('this is coming from custom value' + event);
		this.onChange(event.detail); // Assuming the emitted data contains the checkbox state
	}

	@HostListener('checkboxOnBlur', ['$event'])
	_handleBlurEvent(event: any) {
		this.onTouched();
	}
}
