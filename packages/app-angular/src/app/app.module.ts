import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular/dist/component-library';
import { RouterModule } from '@angular/router';
import { FormValueChangesDirective } from './directives/formValue.directives.js';
import { FormsModule } from '@angular/forms';
import {
	OntarioInputValueAccessor,
	OntarioTextareaValueAccessor,
	OntarioCheckboxesValueAccessor,
	OntarioRadioButtonsValueAccessor,
} from './directives/customValueAccessors.directives.js';
import { TemporaryStorageService } from './services/temporary-storage.services.js';

import { AppRoutingModule } from './app-routing.module.js';
import { AppComponent } from './app.component.js';
import { FrameOneComponent } from './pages//frameone/frameone.component.js';
import { FrameTwoComponent } from './pages/frametwo/frametwo.component.js';
import { FrameThreeComponent } from './pages/framethree/framethree.component.js';
import { FrameFourComponent } from './pages/framefour/framefour.component.js';
import { FrameFiveComponent } from './pages/framefive/framefive.component.js';
import { FrameSixComponent } from './pages/framesix/framesix.component.js';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxTranslateRoutesModule } from 'ngx-translate-routes';
import { createTranslateLoader } from './translation.config.js';

@NgModule({
	declarations: [
		AppComponent,
		FrameOneComponent,
		FrameTwoComponent,
		FrameThreeComponent,
		FrameFourComponent,
		FrameFiveComponent,
		FrameSixComponent,
		FormValueChangesDirective,
		OntarioInputValueAccessor,
		OntarioTextareaValueAccessor,
		OntarioCheckboxesValueAccessor,
		OntarioRadioButtonsValueAccessor,
	],
	imports: [
		ComponentLibraryModule,
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		FormsModule,
		HttpClientModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			useDefaultLang: true,
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
		NgxTranslateRoutesModule.forRoot({
			enableRouteTranslate: true,
			enableTitleTranslate: true,
		}),
	],
	providers: [TemporaryStorageService],
	bootstrap: [AppComponent],
})
export class AppModule {}
