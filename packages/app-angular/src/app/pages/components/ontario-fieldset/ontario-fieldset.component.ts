import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-fieldset-page',
	templateUrl: './ontario-fieldset.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioFieldsetPageComponent {
	provinceOptions = [
		{ value: 'AB', label: 'Alberta' },
		{ value: 'BC', label: 'British Columbia' },
		{ value: 'MB', label: 'Manitoba' },
		{ value: 'NB', label: 'New Brunswick' },
		{ value: 'NL', label: 'Newfoundland and Labrador' },
		{ value: 'NS', label: 'Nova Scotia' },
		{ value: 'ON', label: 'Ontario' },
		{ value: 'QC', label: 'Quebec' },
		{ value: 'SK', label: 'Saskatchewan' },
		{ value: 'NT', label: 'Northwest Territories' },
		{ value: 'NU', label: 'Nunavut' },
		{ value: 'YT', label: 'Yukon' },
	];
}
