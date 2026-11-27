import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-aside-page',
	templateUrl: './ontario-aside.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioAsidePageComponent {
	readonly content =
		'As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.';
	readonly headingTypes = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
	readonly colours = ['teal', 'gold', 'yellow', 'taupe', 'green', 'lime', 'sky', 'blue', 'purple'] as const;
}
