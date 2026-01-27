import { Grid } from '../../grid';
import { OntarioTextarea } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTextareaPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-textarea</h1>

				<div>
					<h2>&quot;caption&quot; Prop Variants</h2>

					<h3>Default</h3>
					<OntarioTextarea
						caption={{ captionText: 'Label (default)', captionType: 'default' }}
						name="textarea-caption-default"
					></OntarioTextarea>

					<h3>Large</h3>
					<OntarioTextarea
						caption={{ captionText: 'Label (large)', captionType: 'large' }}
						name="textarea-caption-large"
					></OntarioTextarea>

					<h3>Heading</h3>
					<OntarioTextarea
						caption={{ captionText: 'Label (heading)', captionType: 'heading' }}
						name="textarea-caption-heading"
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>&quot;required&quot; Prop Variants</h2>

					<h3>Required</h3>
					<OntarioTextarea
						caption={{ captionText: 'Comments' }}
						name="textarea-required"
						required={true}
					></OntarioTextarea>

					<h3>Not required</h3>
					<OntarioTextarea
						caption={{ captionText: 'Tell us about yourself' }}
						name="textarea-not-required"
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>&quot;value&quot; Prop Variant</h2>

					<h3>Value entered</h3>
					<OntarioTextarea
						caption={{ captionText: 'What is the best kind of hat?' }}
						name="textarea-with value"
						value="The best kind of hat is probably the one that fits both your head and your personality. Personally, I’m torn between a classic wide-brimmed sun hat (for style and UV protection) and a cozy beanie (because winter waits for no one)."
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>&quot;hint-text&quot; Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioTextarea
						caption={{ captionText: 'What went well during this sprint?' }}
						name="textarea-hint-text-string"
						hintText={{
							hint: 'Include team wins, individual contributions, or process improvements.',
							hintContentType: 'string',
						}}
					></OntarioTextarea>

					<h3>html hint-content-type</h3>
					<OntarioTextarea
						caption={{ captionText: 'What can the team improve?' }}
						name="textarea-hint-text-html"
						hintText={{
							hint: '<p>Your feedback helps us grow.</p><p>What could we tweak, fix, or rethink to improve how we work?</p>',
							hintContentType: 'html',
						}}
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>&quot;hint-expander&quot; Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioTextarea
						caption={{ captionText: 'Tell us about your ideal vacation' }}
						name="textarea-hint-expander-string"
						hintExpander={{
							hint: 'Not sure what to write?',
							content:
								'Please describe your ideal vacation in detail, including destination, activities, and duration. This will help us understand your preferences better.',
							hintContentType: 'string',
						}}
					></OntarioTextarea>

					<h3>html hint content type</h3>
					<OntarioTextarea
						caption={{ captionText: 'What can the team improve?' }}
						name="textarea-hint-expander-html"
						hintExpander={{
							hint: 'What is meant by "improve"?',
							content:
								'<p>This question is about anything you think could work better — big or small.</p><ul><li>Was something confusing or inefficient?</li><li>Did communication feel unclear or delayed?</li><li>Were tools, timelines, or roles a bit off?</li></ul><p>You can focus on processes, collaboration, tools, meetings — anything you think could make our work smoother or more effective.</p>',
							hintContentType: 'html',
						}}
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>&quot;language&quot; Prop Variant</h2>

					<h3>English</h3>
					<OntarioTextarea
						caption={{ captionText: 'What is your favorite book?' }}
						name="textarea-language-english"
						language="en"
					></OntarioTextarea>

					<h3>French</h3>
					<OntarioTextarea
						caption={{ captionText: 'Quel est votre livre préféré ?' }}
						name="textarea-language-french"
						language="fr"
					></OntarioTextarea>

					<h3>French - Required</h3>
					<OntarioTextarea
						caption={{ captionText: 'Quel est votre livre préféré ?' }}
						name="textarea-language-french-required"
						language="fr"
						required={true}
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>&quot;error-message&quot; Prop Variant</h2>
					<OntarioTextarea
						caption={{ captionText: 'Please describe your experience' }}
						name="textarea-error-message"
						errorMessage="This field is required."
					></OntarioTextarea>
				</div>
			</Grid>
		</main>
	);
}
