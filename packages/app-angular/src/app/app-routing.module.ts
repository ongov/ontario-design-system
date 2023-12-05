import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameOneComponent } from './pages/frameone/frameone.component';
import { FrameTwoComponent } from './pages/frametwo/frametwo.component';
import { FrameThreeComponent } from './pages/framethree/framethree.component';
import { FrameFourComponent } from './pages/framefour/framefour.component';
import { FrameFiveComponent } from './pages/framefive/framefive.component';
import { FrameSixComponent } from './pages/framesix/framesix.component';

const routes: Routes = [
	{ path: '', redirectTo: 'get-started', pathMatch: 'full' },
	{ path: 'get-started', component: FrameOneComponent },
	{ path: 'create-account', component: FrameTwoComponent },
	{ path: 'contact-information', component: FrameThreeComponent },
	{ path: 'describe-role', component: FrameFourComponent },
	{ path: 'additional-details', component: FrameFiveComponent },
	{ path: 'account-creation', component: FrameSixComponent },
	{ path: 'fr/demarrer', component: FrameOneComponent },
	{ path: 'fr/creer-compte', component: FrameTwoComponent },
	{ path: 'fr/coordonnees', component: FrameThreeComponent },
	{ path: 'fr/decrivez-role', component: FrameFourComponent },
	{ path: 'fr/details-supplementaires', component: FrameFiveComponent },
	{ path: 'fr/creation-de-compte', component: FrameSixComponent },
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
