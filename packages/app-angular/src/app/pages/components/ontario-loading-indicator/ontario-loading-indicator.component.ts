import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-loading-indicator-page',
	templateUrl: './ontario-loading-indicator.component.html',
	imports: [ComponentLibraryModule, RouterLink],
})
export class OntarioLoadingIndicatorPageComponent {}
