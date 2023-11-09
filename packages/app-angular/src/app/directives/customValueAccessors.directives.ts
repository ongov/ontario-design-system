import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
