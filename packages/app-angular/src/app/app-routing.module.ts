import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameoneComponent } from './pages/frameone/frameone.component';
import { FrametwoComponent } from './pages/frametwo/frametwo.component';
import { FramethreeComponent } from './pages/framethree/framethree.component';
import { FramefourComponent } from './pages/framefour/framefour.component';
import { FramefiveComponent } from './pages/framefive/framefive.component';
import { FramesixComponent } from './pages/framesix/framesix.component';

const routes: Routes = [
	{ path: '', redirectTo: 'frameone', pathMatch: 'full' },
	{ path: 'frameone', component: FrameoneComponent },
	{ path: 'frametwo', component: FrametwoComponent },
	{ path: 'framethree', component: FramethreeComponent },
	{ path: 'framefour', component: FramefourComponent },
	{ path: 'framefive', component: FramefiveComponent },
	{ path: 'framesix', component: FramesixComponent },
];
@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
