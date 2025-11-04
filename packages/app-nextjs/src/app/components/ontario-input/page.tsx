import { Grid } from '../../grid';
import { OntarioInput } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioInputPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-input</h1>

				<div>
					<h2>"caption" Prop Variants</h2>

					<h3>Default</h3>
					<OntarioInput
						caption={{ captionText: 'Label (default)', captionType: 'default' }}
						name="input-caption-default"
					></OntarioInput>

					<h3>Large</h3>
					<OntarioInput
						caption={{ captionText: 'Label (large)', captionType: 'large' }}
						name="input-caption-large"
					></OntarioInput>

					<h3>Heading</h3>
					<OntarioInput
						caption={{ captionText: 'Label (heading)', captionType: 'heading' }}
						name="input-caption-heading"
					></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"input-width" Prop Variants</h2>

					<h3>2 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (2 character width)' }}
						name="input-2-char-width"
						input-width="2-char-width"
					></OntarioInput>

					<h3>3 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (3 character width)' }}
						name="input-3-char-width"
						input-width="3-char-width"
					></OntarioInput>

					<h3>4 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (4 character width)' }}
						name="input-4-char-width"
						input-width="4-char-width"
					></OntarioInput>

					<h3>5 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (5 character width)' }}
						name="input-5-char-width"
						input-width="5-char-width"
					></OntarioInput>

					<h3>7 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (7 character width)' }}
						name="input-7-char-width"
						input-width="7-char-width"
					></OntarioInput>

					<h3>10 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (10 character width)' }}
						name="input-10-char-width"
						input-width="10-char-width"
					></OntarioInput>

					<h3>20 character width</h3>
					<OntarioInput
						caption={{ captionText: 'Label (20 character width)' }}
						name="input-20-char-width"
						input-width="20-char-width"
					></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"required" Prop Variants</h2>

					<h3>Required</h3>
					<OntarioInput caption={{ captionText: 'First name' }} name="input-required" required={true}></OntarioInput>

					<h3>Not required</h3>
					<OntarioInput caption={{ captionText: 'Last name' }} name="input-not-required"></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"value" Prop Variant</h2>

					<h3>Value entered</h3>
					<OntarioInput caption={{ captionText: 'City/Town' }} name="input-with value" value="Toronto"></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"hint-text" Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioInput
						caption={{ captionText: 'Address Line 1' }}
						name="input-hint-text-string"
						hintText={{
							hint: 'Street and number or P.O. box.',
							hintContentType: 'string',
						}}
					></OntarioInput>

					<h3>html hint-content-type</h3>
					<OntarioInput
						caption={{ captionText: 'Enter your preferred phone number for text reminders' }}
						name="input-hint-text-html"
						hintText={{
							hint: '<p>Standard message and data rates may apply</p><p>For example (123) 456-7890</p>',
							hintContentType: 'html',
						}}
					></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"hint-expander" Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioInput
						caption={{ captionText: 'Ontario photo card number' }}
						name="input-hint-expander-string"
						hintExpander={{
							hint: 'Help: where is my Ontario photo card number?',
							content:
								'The Ontario photo card number is a unique identifier for your photo card. It can be found on the front of the card, typically located below your name and photo.',
							hintContentType: 'string',
						}}
					></OntarioInput>

					<h3>html hint content type</h3>
					<OntarioInput
						caption={{ captionText: 'Registrant identification number (RIN) on green ownership paper' }}
						name="input-hint-expander-html"
						hintExpander={{
							hint: 'Help: where is my RIN?',
							content:
								'<p>You can find your RIN by contacting the Ministry of Government and Consumer Services or checking the official Ontario government website, specifically ServiceOntario, which handles vehicle registration.</p><p>For more information, visit <a href="https://www.ontario.ca/page/serviceontario">ServiceOntario</a>.</p>',
							hintContentType: 'html',
						}}
					></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"language" Prop Variant</h2>

					<h3>English</h3>
					<OntarioInput
						caption={{ captionText: 'Postal Code' }}
						name="input-language-english"
						language="en"
					></OntarioInput>

					<h3>French</h3>
					<OntarioInput
						caption={{ captionText: 'Code postal' }}
						name="input-language-french"
						language="fr"
					></OntarioInput>

					<h3>French - Required</h3>
					<OntarioInput
						caption={{ captionText: 'Code postal' }}
						name="input-language-french-required"
						language="fr"
						required={true}
					></OntarioInput>
				</div>

				<hr />

				<div>
					<h2>"error-message" Prop Variant</h2>
					<OntarioInput
						caption={{ captionText: 'Driver’s licence number' }}
						name="input-error-message"
						errorMessage="You must enter a driver's licence number."
						required={true}
					></OntarioInput>
				</div>
			</Grid>
		</main>
	);
}
