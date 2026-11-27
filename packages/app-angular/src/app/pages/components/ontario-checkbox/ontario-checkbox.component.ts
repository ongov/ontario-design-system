import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-checkbox-page',
	templateUrl: './ontario-checkbox.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioCheckboxPageComponent {
	caption = { captionText: 'Checkbox legend (default)', captionType: 'default' as const };

	options = [
		{ value: 'checkbox-default-1', label: 'Option 1', elementId: 'checkbox-default-1' },
		{ value: 'checkbox-default-2', label: 'Option 2', elementId: 'checkbox-default-2' },
		{ value: 'checkbox-default-3', label: 'Option 3', elementId: 'checkbox-default-3' },
	];

	customOnChange = (e: Event) => console.log(`customOnChange → ${(e.target as HTMLInputElement)?.value}`);
	customOnFocus = (e: Event) => console.log(`customOnFocus → ${(e.target as HTMLInputElement)?.value}`);
	customOnBlur = () => console.log(`customOnBlur`);
}
