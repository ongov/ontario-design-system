import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameoneComponent } from './pages/frameone/frameone.component';
import { FrametwoComponent } from './pages/frametwo/frametwo.component';
import { FramethreeComponent } from './pages/framethree/framethree.component';
import { FramefourComponent } from './pages/framefour/framefour.component';
import { FramefiveComponent } from './pages/framefive/framefive.component';
import { FramesixComponent } from './pages/framesix/framesix.component';

const routes: Routes = [
	{ path: '', redirectTo: 'get-started', pathMatch: 'full' },
	{ path: 'get-started', component: FrameoneComponent },
	{ path: 'create-account', component: FrametwoComponent },
	{ path: 'contact-information', component: FramethreeComponent },
	{ path: 'describe-role', component: FramefourComponent },
	{ path: 'additional-details', component: FramefiveComponent },
	{ path: 'account-creation', component: FramesixComponent },
	{ path: 'fr/demarrer', component: FrameoneComponent },
	{ path: 'fr/creer-compte', component: FrametwoComponent },
	{ path: 'fr/coordonnees', component: FramethreeComponent },
	{ path: 'fr/decrivez-role', component: FramefourComponent },
	{ path: 'fr/details-supplementaires', component: FramefiveComponent },
	{ path: 'fr/creation-de-compte', component: FramesixComponent },
	{ path: 'fr/:**', redirectTo: 'fr/demarrer' },
	{ path: '**', redirectTo: 'get-started' },
];
@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], // Provide the HashLocationStrategy
})
export class AppRoutingModule {}
