import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-summary-list-page',
	templateUrl: './ontario-summary-list.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioSummaryListPageComponent {
	readonly actionLink = { href: '#summary-list' };
}
