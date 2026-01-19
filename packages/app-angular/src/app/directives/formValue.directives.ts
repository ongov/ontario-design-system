import { Directive } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
	selector: 'form',
	outputs: ['valueChangeEvents: valueChanges'],
	standalone: false,
})
export class FormValueChangesDirective {
	public valueChangeEvents: EventEmitter<any>;

	constructor(form: NgForm) {
		this.valueChangeEvents = new EventEmitter();
		if (form.valueChanges) {
			form.valueChanges.subscribe(this.valueChangeEvents);
		}
	}
}
