import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-header-page',
	templateUrl: './ontario-header.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioHeaderPageComponent {
	menuItems = JSON.stringify([
		{ title: 'Item 1', href: '/item-1' },
		{ title: 'Item 2', href: '/item-2' },
		{ title: 'Item 3', href: '/item-3' },
	]);

	signInMenuItems = JSON.stringify([
		{ title: 'Profile', href: '/profile' },
		{ title: 'Sign out', href: '/sign-out' },
	]);

	applicationHeaderInfo = JSON.stringify({ title: 'Application name', href: '/application-homepage' });

	serviceOntarioHeaderInfo = JSON.stringify({ title: 'ServiceOntario Service' });
}
