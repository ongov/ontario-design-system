import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from '@ontario-digital-service/ontario-design-system-component-library/loader';

@NgModule({
	declarations: [...DIRECTIVES],
	exports: [...DIRECTIVES],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: () => {
				return defineCustomElements();
			},
		},
	],
})
export class ComponentLibraryModule {}
