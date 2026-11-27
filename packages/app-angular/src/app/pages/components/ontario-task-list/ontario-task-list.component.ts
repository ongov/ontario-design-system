import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-task-list-page',
	templateUrl: './ontario-task-list.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioTaskListPageComponent {}
