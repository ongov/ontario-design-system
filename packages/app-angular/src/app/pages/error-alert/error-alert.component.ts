import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

type Field = 'name' | 'region' | 'contactMethod' | 'email';
type FormErrors = Partial<Record<Field, string>>;

@Component({
	selector: 'app-error-alert',
	templateUrl: './error-alert.component.html',
	styleUrls: ['./error-alert.component.scss'],
	standalone: false,
})
export class ErrorAlertComponent {
	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	@ViewChild('alert', { read: ElementRef }) alert?: ElementRef<HTMLOntarioErrorAlertElement>;
	@ViewChild('name', { read: ElementRef }) name?: ElementRef<HTMLOntarioInputElement>;
	@ViewChild('region', { read: ElementRef }) region?: ElementRef<HTMLOntarioDropdownListElement>;
	@ViewChild('contact', { read: ElementRef }) contact?: ElementRef<HTMLOntarioRadioButtonsElement>;
	@ViewChild('nativeEmail', { read: ElementRef }) nativeEmail?: ElementRef<HTMLInputElement>;

	errors: FormErrors = {};
	result = '';
	attempted = false;
	announceNative = false;

	regionOptions = [
		{ value: 'north', label: 'Northern Ontario' },
		{ value: 'south', label: 'Southern Ontario' },
	];

	contactOptions = [
		{ value: 'email', label: 'Email', elementId: 'contact-method-email' },
		{ value: 'phone', label: 'Phone', elementId: 'contact-method-phone' },
	];

	private validate(field: Field): string {
		switch (field) {
			case 'name':
				return this.name?.nativeElement.value?.trim() ? '' : 'Enter your full name.';
			case 'region':
				return this.region?.nativeElement.value ? '' : 'Select a region.';
			case 'contactMethod':
				return this.contact?.nativeElement.value ? '' : 'Select how we should contact you.';
			case 'email':
				return this.nativeEmail?.nativeElement.validity.valid
					? ''
					: 'Enter a valid email address, such as name@example.ca.';
		}
	}

	onChange(field: Field): void {
		if (!this.attempted) return;
		this.result = '';
		this.announceNative = field === 'email';
		this.errors = { ...this.errors, [field]: this.validate(field) };
	}

	async onSubmit(event: Event): Promise<void> {
		event.preventDefault();
		this.attempted = true;
		this.result = '';
		await this.alert?.nativeElement.show();

		this.announceNative = false;
		this.errors = {
			name: this.validate('name'),
			region: this.validate('region'),
			contactMethod: this.validate('contactMethod'),
			email: this.validate('email'),
		};
		this.changeDetector.detectChanges();

		// Let Angular push the error messages to the controls before checking their state.
		await new Promise((resolve) => requestAnimationFrame(resolve));
		await new Promise((resolve) => requestAnimationFrame(resolve));

		const odsInvalid = !!(this.errors.name || this.errors.region || this.errors.contactMethod);
		if (odsInvalid) return;

		await this.alert?.nativeElement.hide();
		if (this.errors.email) {
			this.nativeEmail?.nativeElement.focus();
		} else {
			this.result = 'All fields are valid. This demonstration did not submit any information.';
			this.changeDetector.detectChanges();
		}
	}

	async onReset(event: Event): Promise<void> {
		event.preventDefault();
		this.attempted = false;
		this.announceNative = true;
		await this.alert?.nativeElement.hide();
		this.errors = {};
		if (this.name) this.name.nativeElement.value = '';
		if (this.region) this.region.nativeElement.value = '';
		if (this.contact) this.contact.nativeElement.value = '';
		if (this.nativeEmail) this.nativeEmail.nativeElement.value = '';
		this.result = 'Example reset.';
		this.changeDetector.detectChanges();
	}
}
