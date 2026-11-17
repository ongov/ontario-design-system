import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-textarea-page',
	templateUrl: './ontario-textarea.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioTextareaPageComponent {
	readonly captionDefault = { captionText: 'Label (default)', captionType: 'default' };
	readonly captionLarge = { captionText: 'Label (large)', captionType: 'large' };
	readonly captionHeading = { captionText: 'Label (heading)', captionType: 'heading' };

	readonly hintTextString = {
		hint: 'Include team wins, individual contributions, or process improvements.',
		hintContentType: 'string',
	};
	readonly hintTextHtml = {
		hint: '<p>Your feedback helps us grow.</p><p>What could we tweak, fix, or rethink to improve how we work?</p>',
		hintContentType: 'html',
	};

	readonly hintExpanderString = {
		hint: 'Not sure what to write?',
		content:
			'Please describe your ideal vacation in detail, including destination, activities, and duration. This will help us understand your preferences better.',
		hintContentType: 'string',
	};
	readonly hintExpanderHtml = {
		hint: 'What is meant by "improve"?',
		content:
			'<p>This question is about anything you think could work better — big or small.</p><ul><li>Was something confusing or inefficient?</li><li>Did communication feel unclear or delayed?</li><li>Were tools, timelines, or roles a bit off?</li></ul><p>You can focus on processes, collaboration, tools, meetings — anything you think could make our work smoother or more effective.</p>',
		hintContentType: 'html',
	};

	readonly hatValue =
		'The best kind of hat is probably the one that fits both your head and your personality. Personally, I’m torn between a classic wide-brimmed sun hat (for style and UV protection) and a cozy beanie (because winter waits for no one).';
}
