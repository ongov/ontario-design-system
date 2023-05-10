import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { FrameOneComponent } from './frame-one/frame-one.component';
import { ComponentLibraryModule } from '@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library';

@NgModule({
	declarations: [AppComponent, LayoutComponent, FrameOneComponent],
	imports: [BrowserModule, AppRoutingModule, ComponentLibraryModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
