import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-dropdown-list-page',
	templateUrl: './ontario-dropdown-list.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioDropdownListPageComponent {
	dropdownOptions = [
		{ value: 'option-1', label: 'Option 1' },
		{ value: 'option-2', label: 'Option 2' },
		{ value: 'option-3', label: 'Option 3' },
	];

	customOnChange = () => console.log('Dropdown changed');
	customOnBlur = () => console.log('Dropdown blurred');
	customOnFocus = () => console.log('Dropdown focused');
}
