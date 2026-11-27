import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { COMPONENT_ROUTES } from './pages/components/component-routes';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full', title: 'Ontario Design System Angular demo' },
	{ path: 'components', children: COMPONENT_ROUTES },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
