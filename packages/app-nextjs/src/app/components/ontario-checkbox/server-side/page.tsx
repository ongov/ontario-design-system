import { Grid } from '../../../grid';
import { OntarioCheckbox } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCheckboxPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-checkbox (Server Side)</h1>

				<div>
					<h2>Default</h2>
					<OntarioCheckbox
						id="ontario-checkbox-default"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-default"
						value="agreed"
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"label" Prop Variants</h2>

					<h3>Large</h3>
					<OntarioCheckbox
						id="ontario-checkbox-label-large"
						label={{ captionText: 'I have read and agree to the Terms and Conditions (large)', captionType: 'large' }}
						name="checkbox-label-large"
						value="agreed"
					></OntarioCheckbox>

					<h3>Heading</h3>
					<OntarioCheckbox
						id="ontario-checkbox-label-heading"
						label={{
							captionText: 'I have read and agree to the Terms and Conditions (heading)',
							captionType: 'heading',
						}}
						name="checkbox-label-heading"
						value="agreed"
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"checked" Prop Variant</h2>
					<OntarioCheckbox
						id="ontario-checkbox-checked"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-checked"
						value="agreed"
						checked
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"required" Prop Variants</h2>

					<h3>Required</h3>
					<OntarioCheckbox
						id="ontario-checkbox-required"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-required"
						value="agreed"
						required
					></OntarioCheckbox>

					<h3>Not required</h3>
					<OntarioCheckbox
						id="ontario-checkbox-not-required"
						label="Subscribe to our newsletter"
						name="checkbox-not-required"
						value="subscribed"
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"hint-text" Prop Variant</h2>
					<OntarioCheckbox
						id="ontario-checkbox-hint-text"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-hint-text"
						value="agreed"
						hintText="This is hint text."
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"hint-expander" Prop Variant</h2>
					<OntarioCheckbox
						id="ontario-checkbox-hint-expander"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-hint-expander"
						value="agreed"
						hintExpander={{
							hint: 'Additional context here',
							content: 'This is expander content.',
						}}
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"error-message" Prop Variant</h2>
					<OntarioCheckbox
						id="ontario-checkbox-error"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-error"
						value="agreed"
						errorMessage="Please accept the Terms and Conditions to proceed."
					></OntarioCheckbox>
				</div>

				<hr />

				<div>
					<h2>"language" Prop Variants</h2>

					<h3>English</h3>
					<OntarioCheckbox
						id="ontario-checkbox-language-english"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-language-english"
						value="agreed"
						language="en"
					></OntarioCheckbox>

					<h3>French</h3>
					<OntarioCheckbox
						id="ontario-checkbox-language-french"
						label="J’ai lu et j’accepte les conditions générales"
						name="checkbox-language-french"
						value="agreed"
						language="fr"
					></OntarioCheckbox>
				</div>
			</Grid>
		</main>
	);
}
