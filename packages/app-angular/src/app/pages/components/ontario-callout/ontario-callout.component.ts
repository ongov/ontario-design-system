import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-callout-page',
	templateUrl: './ontario-callout.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioCalloutPageComponent {
	headingTypes = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
	highlightColours = ['Yellow', 'Blue', 'Teal', 'Taupe', 'Green', 'Lime', 'Sky', 'Blue', 'Purple'];
}
