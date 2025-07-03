import { Grid } from '../../grid';
import { OntarioTextarea } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTextareaPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-textarea</h1>

				<div>
					<h2>"caption" Prop Variants</h2>

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
					<h2>"required" Prop Variants</h2>

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
					<h2>"value" Prop Variant</h2>

					<h3>Value entered</h3>
					<OntarioTextarea
						caption={{ captionText: 'What is the best kind of hat?' }}
						name="textarea-with value"
						value="The best kind of hat is probably the one that fits both your head and your personality. Personally, I’m torn between a classic wide-brimmed sun hat (for style and UV protection) and a cozy beanie (because winter waits for no one)."
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>"hint-text" Prop Variant</h2>

					<OntarioTextarea
						caption={{ captionText: 'What went well during this sprint?' }}
						name="textarea-hint-text"
						hintText="Include team wins, individual contributions, or process improvements."
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>"hint-expander" Prop Variant</h2>

					<OntarioTextarea
						caption={{ captionText: 'Tell us about your ideal vacation' }}
						name="textarea-hint-expander"
						hintExpander={{
							hint: 'Not sure what to write?',
							content:
								'Please describe your ideal vacation in detail, including destination, activities, and duration. This will help us understand your preferences better.',
						}}
					></OntarioTextarea>
				</div>

				<hr />

				<div>
					<h2>"language" Prop Variant</h2>

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
					<h2>"error-message" Prop Variant</h2>
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
