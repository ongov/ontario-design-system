import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentLibraryModule } from '@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameoneComponent } from './pages//frameone/frameone.component';
import { FrametwoComponent } from './pages/frametwo/frametwo.component';
import { FramethreeComponent } from './pages/framethree/framethree.component';
import { FramefourComponent } from './pages/framefour/framefour.component';
import { FramefiveComponent } from './pages/framefive/framefive.component';
import { FramesixComponent } from './pages/framesix/framesix.component';

@NgModule({
	declarations: [
		AppComponent,
		FrameoneComponent,
		FrametwoComponent,
		FramethreeComponent,
		FramefourComponent,
		FramefiveComponent,
		FramesixComponent,
	],
	imports: [ComponentLibraryModule, BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
