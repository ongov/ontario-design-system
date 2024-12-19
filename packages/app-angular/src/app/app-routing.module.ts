import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameOneComponent } from './pages/frameone/frameone.component.js';
import { FrameTwoComponent } from './pages/frametwo/frametwo.component.js';
import { FrameThreeComponent } from './pages/framethree/framethree.component.js';
import { FrameFourComponent } from './pages/framefour/framefour.component.js';
import { FrameFiveComponent } from './pages/framefive/framefive.component.js';
import { FrameSixComponent } from './pages/framesix/framesix.component.js';

const routes: Routes = [
	{ path: '', redirectTo: 'get-started', pathMatch: 'full' },
	{
		path: 'get-started',
		component: FrameOneComponent,
		data: { title: 'Get Started | Ontario Design System Angular demo' },
	},
	{
		path: 'create-account',
		component: FrameTwoComponent,
		data: { title: 'Create an account | Ontario Design System Angular demo' },
	},
	{
		path: 'contact-information',
		component: FrameThreeComponent,
		data: { title: 'Contact Information | Ontario Design System Angular demo' },
	},
	{
		path: 'describe-role',
		component: FrameFourComponent,
		data: { title: 'Describe Role | Ontario Design System Angular demo' },
	},
	{
		path: 'additional-details',
		component: FrameFiveComponent,
		data: { title: 'Additional Details | Ontario Design System Angular demo' },
	},
	{
		path: 'account-creation',
		component: FrameSixComponent,
		data: { title: 'Account Creation | Ontario Design System Angular demo' },
	},
	{
		path: 'fr/demarrer',
		component: FrameOneComponent,
		data: { title: 'Démarrer | Ontario Design System Angular demo' },
	},
	{
		path: 'fr/creer-compte',
		component: FrameTwoComponent,
		data: { title: 'Créer Compte | Ontario Design System Angular demo' },
	},
	{
		path: 'fr/coordonnees',
		component: FrameThreeComponent,
		data: { title: 'Coordonnées | Ontario Design System Angular demo' },
	},
	{
		path: 'fr/decrivez-role',
		component: FrameFourComponent,
		data: { title: 'Décrivez Rôle | Ontario Design System Angular demo' },
	},
	{
		path: 'fr/details-supplementaires',
		component: FrameFiveComponent,
		data: { title: 'Détails Supplémentaires | Ontario Design System Angular demo' },
	},
	{
		path: 'fr/creation-de-compte',
		component: FrameSixComponent,
		data: { title: 'Création de Compte | Ontario Design System Angular demo' },
	},
	{ path: 'fr/:**', redirectTo: 'fr/demarrer' },
	{ path: '**', redirectTo: 'get-started' },
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
