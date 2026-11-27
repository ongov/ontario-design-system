import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-input-page',
	templateUrl: './ontario-input.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioInputPageComponent {
	htmlHintText = {
		hint: '<p>Standard message and data rates may apply</p><p>For example (123) 456-7890</p>',
		hintContentType: 'html',
	} as const;

	stringHintExpander = {
		hint: 'Help: where is my Ontario photo card number?',
		content:
			'The Ontario photo card number is a unique identifier for your photo card. It can be found on the front of the card, typically located below your name and photo.',
		hintContentType: 'string',
	} as const;

	htmlHintExpander = {
		hint: 'Help: where is my RIN?',
		content:
			'<p>You can find your RIN by contacting the Ministry of Government and Consumer Services or checking the official Ontario government website, specifically ServiceOntario, which handles vehicle registration.</p><p>For more information, visit <a href="https://www.ontario.ca/page/serviceontario">ServiceOntario</a>.</p>',
		hintContentType: 'html',
	} as const;

	// Intentionally invalid value to exercise the component's language fallback
	invalidLanguage = 'xx' as never;
}
