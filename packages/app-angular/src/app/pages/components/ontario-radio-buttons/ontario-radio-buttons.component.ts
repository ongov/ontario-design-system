import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-radio-buttons-page',
	templateUrl: './ontario-radio-buttons.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioRadioButtonsPageComponent {
	readonly caption = { captionText: 'Radio buttons (default)', captionType: 'default' };

	readonly options = [
		{ value: 'radio-default-1', label: 'Option 1', elementId: 'radio-default-1' },
		{ value: 'radio-default-2', label: 'Option 2', elementId: 'radio-default-2' },
		{ value: 'radio-default-3', label: 'Option 3', elementId: 'radio-default-3' },
	];

	handleChange = (e: Event) => console.log(`customOnChange → ${(e.target as HTMLInputElement)?.value}`);
	handleFocus = (e: Event) => console.log(`customOnFocus → ${(e.target as HTMLInputElement)?.value}`);
	handleBlur = () => console.log(`customOnBlur`);
}
