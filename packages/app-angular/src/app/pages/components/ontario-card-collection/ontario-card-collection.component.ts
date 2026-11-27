import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-card-collection-page',
	templateUrl: './ontario-card-collection.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioCardCollectionPageComponent {
	description = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum';
}
