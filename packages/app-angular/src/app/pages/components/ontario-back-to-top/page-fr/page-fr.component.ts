import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-back-to-top-page-fr-page',
	templateUrl: './page-fr.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioBackToTopPageFrPageComponent {
	readonly lines = Array.from({ length: 50 }, (_, i) => i + 1);
}
