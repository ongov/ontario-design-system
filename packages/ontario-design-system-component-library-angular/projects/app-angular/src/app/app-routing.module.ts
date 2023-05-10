import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameoneComponent } from './frameone/frameone.component';
import { FrametwoComponent } from './frametwo/frametwo.component';
import { FramethreeComponent } from './framethree/framethree.component';

const routes: Routes = [
	{ path: 'frameone', component: FrameoneComponent },
	{ path: 'frametwo', component: FrametwoComponent },
	{ path: 'framethree', component: FramethreeComponent },
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
