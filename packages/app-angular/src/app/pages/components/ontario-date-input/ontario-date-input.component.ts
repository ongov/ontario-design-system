import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-date-input-page',
	templateUrl: './ontario-date-input.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioDateInputPageComponent {
	log(message: string) {
		console.log(message);
	}
}
