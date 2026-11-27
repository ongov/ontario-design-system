import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-language-toggle-page',
	templateUrl: './ontario-language-toggle.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioLanguageTogglePageComponent {
	handleCustomToggle = (event: Event) => {
		console.log('Custom language toggle triggered!', event);
	};
}
