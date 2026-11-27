import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-form-container-page',
	templateUrl: './ontario-form-container.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioFormContainerPageComponent {
	provinceOptions = [
		{ label: 'Ontario', value: 'ON' },
		{ label: 'Quebec', value: 'QC' },
		{ label: 'Manitoba', value: 'MB' },
	];

	// Intentionally invalid value to exercise the component's gap fallback
	invalidGap = 'banana' as never;
}
