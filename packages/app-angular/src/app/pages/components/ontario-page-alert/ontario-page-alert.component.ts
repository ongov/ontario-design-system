import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-page-alert-page',
	templateUrl: './ontario-page-alert.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioPageAlertPageComponent {
	// Intentionally invalid to exercise the component's fallback behaviour.
	readonly invalidType = 'banana' as any;
}
