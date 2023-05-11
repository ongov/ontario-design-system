import { NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from '@ontario-digital-service/ontario-design-system-component-library/loader';

defineCustomElements(window);

@NgModule({
	declarations: [...DIRECTIVES],
	exports: [...DIRECTIVES],
	providers: [],
})
export class ComponentLibraryModule {}
