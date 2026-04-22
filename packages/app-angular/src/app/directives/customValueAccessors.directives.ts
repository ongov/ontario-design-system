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
	standalone: false,
})
export class OntarioInputValueAccessor extends BaseCustomValueAccessor<string> {
	@HostListener('inputOnChange', ['$event.detail.value'])
	_handleChange(value?: string) {
		this.onChange(value ?? '');
	}

	@HostListener('onBlur')
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
	standalone: false,
})
export class OntarioTextareaValueAccessor extends BaseCustomValueAccessor<string> {
	@HostListener('inputOnChange', ['$event.detail.value'])
	_handleChange(value?: string) {
		this.onChange(value ?? '');
	}

	@HostListener('onBlur')
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
	standalone: false,
})
export class OntarioCheckboxesValueAccessor extends BaseCustomValueAccessor<string[]> {
	@HostListener('change', ['$event'])
	_handleChange(event: Event) {
		const value = (event.target as { value?: string[] } | null)?.value;
		this.onChange(value ?? []);
	}

	@HostListener('checkboxOnBlur')
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
	standalone: false,
})
export class OntarioRadioButtonsValueAccessor extends BaseCustomValueAccessor<string> {
	@HostListener('change', ['$event'])
	_handleChange(event: Event) {
		const value = (event.target as { value?: string } | null)?.value;
		this.onChange(value ?? '');
	}

	@HostListener('radioOnBlur')
	_handleBlurEvent() {
		this.onTouched();
	}
}
