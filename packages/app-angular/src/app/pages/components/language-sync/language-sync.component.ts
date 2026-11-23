import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

/**
 * Renders a header and footer with no `language` prop so tests can check that they follow the
 * page language (`<html lang>`) on load and the header's language toggle afterwards.
 */
@Component({
	selector: 'app-language-sync-page',
	templateUrl: './language-sync.component.html',
	imports: [ComponentLibraryModule],
})
export class LanguageSyncPageComponent {
	applicationHeaderInfo = JSON.stringify({ title: 'Application name', href: '/application-homepage' });

	// The toggle's default `href="#"` resolves against `<base href="/">` and would leave the page.
	preventToggleNavigation = (event: Event) => event.preventDefault();
}
