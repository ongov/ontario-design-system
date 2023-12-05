import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentLibraryModule } from '@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameOneComponent } from './pages//frameone/frameone.component';
import { FrameTwoComponent } from './pages/frametwo/frametwo.component';
import { FrameThreeComponent } from './pages/framethree/framethree.component';
import { FrameFourComponent } from './pages/framefour/framefour.component';
import { FrameFiveComponent } from './pages/framefive/framefive.component';
import { FrameSixComponent } from './pages/framesix/framesix.component';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxTranslateRoutesModule } from 'ngx-translate-routes';
import { createTranslateLoader } from './translation.config';

@NgModule({
	declarations: [
		AppComponent,
		FrameOneComponent,
		FrameTwoComponent,
		FrameThreeComponent,
		FrameFourComponent,
		FrameFiveComponent,
		FrameSixComponent,
	],
	imports: [
		ComponentLibraryModule,
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		// ngx-translate and the loader module
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
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
