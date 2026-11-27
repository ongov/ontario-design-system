import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-button-page',
	templateUrl: './ontario-button.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioButtonPageComponent {
	submitted = false;

	showAlert() {
		alert('Clicked!');
	}

	onSubmit(event: Event) {
		event.preventDefault();
		this.submitted = true;
	}
}
