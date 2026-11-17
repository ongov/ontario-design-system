import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-step-indicator-page',
	templateUrl: './ontario-step-indicator.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioStepIndicatorPageComponent {
	handleBackClick = () => alert('Back button clicked!');
}
