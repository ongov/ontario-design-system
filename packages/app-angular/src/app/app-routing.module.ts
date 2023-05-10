import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { FrameOneComponent } from './frame-one/frame-one.component';

const routes: Routes = [
	{ path: '', component: LayoutComponent },
	{ path: 'FrameOne', component: FrameOneComponent },
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
