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
	@HostListener('inputOnChange', ['$event.detail'])
	_handleChange(value: string) {
		this.onChange(value);
	}

	@HostListener('onBlur', ['$event.target'])
	_handleBlurEvent() {
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
	@HostListener('inputOnChange', ['$event.detail'])
	_handleChange(value: string) {
		this.onChange(value);
	}

	@HostListener('onBlur', ['$event.target'])
	_handleBlurEvent() {
		this.onTouched();
	}
}

@Directive({
	selector: 'ontario-checkboxes',
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
		this.onChange(event);
	}

	@HostListener('checkboxOnBlur', ['$event'])
	_handleBlurEvent() {
		this.onTouched();
	}
}

@Directive({
	selector: 'ontario-radio-buttons',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: OntarioRadioButtonsValueAccessor,
			multi: true,
		},
	],
})
export class OntarioRadioButtonsValueAccessor extends BaseCustomValueAccessor {
	@HostListener('radioOnChange', ['$event.detail'])
	_handleChange(event: any) {
		this.onChange(event.detail);
	}

	@HostListener('radioOnBlur', ['$event'])
	_handleBlurEvent() {
		this.onTouched();
	}
}
