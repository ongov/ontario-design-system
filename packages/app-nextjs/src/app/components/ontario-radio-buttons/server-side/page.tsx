import { Grid } from '../../../grid';
import { OntarioRadioButtons } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioRadioButtonsPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-radio-buttons (Server Side)</h1>

				<div>
					<h2>"caption" Prop Variants</h2>

					<h3>Default</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Radio buttons legend (default)', captionType: 'default' }}
						id="radio-buttons-caption-default"
						name="radio-buttons-caption-default"
						options={[
							{
								value: 'radio-default-1',
								label: 'Option 1',
								elementId: 'radio-default-1',
							},
							{
								value: 'radio-default-2',
								label: 'Option 2',
								elementId: 'radio-default-2',
							},
							{
								value: 'radio-default-3',
								label: 'Option 3',
								elementId: 'radio-default-3',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">Large</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Radio buttons legend (large)', captionType: 'large' }}
						id="radio-buttons-caption-large"
						name="radio-buttons-caption-large"
						options={[
							{
								value: 'radio-large-1',
								label: 'Option 1',
								elementId: 'radio-large-1',
							},
							{
								value: 'radio-large-2',
								label: 'Option 2',
								elementId: 'radio-large-2',
							},
							{
								value: 'radio-large-3',
								label: 'Option 3',
								elementId: 'radio-large-3',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">Heading</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Radio buttons legend (heading)', captionType: 'heading' }}
						id="radio-buttons-caption-heading"
						name="radio-buttons-caption-heading"
						options={[
							{
								value: 'radio-heading-1',
								label: 'Option 1',
								elementId: 'radio-heading-1',
							},
							{
								value: 'radio-heading-2',
								label: 'Option 2',
								elementId: 'radio-heading-2',
							},
							{
								value: 'radio-heading-3',
								label: 'Option 3',
								elementId: 'radio-heading-3',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<div>
					<h2>"required" Prop Variants</h2>

					<h3>Required</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Contact method' }}
						id="radio-buttons-required"
						name="radio-buttons-required"
						required={true}
						options={[
							{
								value: 'email',
								label: 'Email',
								elementId: 'radio-required-email',
							},
							{
								value: 'text',
								label: 'Text message',
								elementId: 'radio-required-text',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">Not required</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Where do you live?' }}
						id="radio-buttons-not-required"
						name="radio-buttons-not-required"
						options={[
							{
								value: 'ontario',
								label: 'Ontario',
								elementId: 'radio-not-required-ontario',
							},
							{
								value: 'quebec',
								label: 'Quebec',
								elementId: 'radio-not-required-quebec',
							},
							{
								value: 'british-columbia',
								label: 'British Columbia',
								elementId: 'radio-not-required-british-columbia',
							},
							{
								value: 'other',
								label: 'Other province or country',
								elementId: 'radio-not-required-other',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<div>
					<h2>"hint-text" Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Have you changed your name?' }}
						id="radio-buttons-hint-text-string"
						name="radio-buttons-hint-text-string"
						hintText={{
							hint: 'This includes changing your last name or spelling your name differently.',
							hintContentType: 'string',
						}}
						options={[
							{
								value: 'yes',
								label: 'Yes',
								elementId: 'radio-hint-text-string-yes',
							},
							{
								value: 'no',
								label: 'No',
								elementId: 'radio-hint-text-string-no',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">html hint-content-type</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'What type of residence do you live in?' }}
						id="radio-buttons-hint-text-html"
						name="radio-buttons-hint-text-html"
						hintText={{
							hint: '<p>Select the option that best describes your current living situation.</p><p><strong>Note:</strong> This information helps determine your eligibility for certain programs.</p>',
							hintContentType: 'html',
						}}
						options={[
							{
								value: 'house',
								label: 'House',
								elementId: 'radio-hint-text-html-house',
							},
							{
								value: 'apartment',
								label: 'Apartment or condo',
								elementId: 'radio-hint-text-html-apartment',
							},
							{
								value: 'other',
								label: 'Other',
								elementId: 'radio-hint-text-html-other',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<div>
					<h2>"hint-expander" Prop Variants</h2>

					<h3>string hint-expander content type</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Do you have a driver’s licence issued in Ontario?' }}
						id="radio-buttons-hint-expander-string"
						name="radio-buttons-hint-expander-string"
						hintExpander={{
							hint: 'Help: who should select yes?',
							content:
								'Select yes if you currently hold a valid Ontario driver’s licence. Select no if you have never had one, if it was issued in another province or territory, or if you are unsure.',
							hintContentType: 'string',
						}}
						options={[
							{
								value: 'yes',
								label: 'Yes',
								elementId: 'radio-hint-expander-string-yes',
							},
							{
								value: 'no',
								label: 'No',
								elementId: 'radio-hint-expander-string-no',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">html hint-expander content type</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Do you have a legal issue?' }}
						id="radio-buttons-hint-expander-html"
						name="radio-buttons-hint-expander-html"
						hintExpander={{
							hint: 'What are some examples of legal issues?',
							content:
								'<div><p>Legal issues may include:</p><ul><li>Criminal matters</li><li>Family law issues like divorce, child custody or support</li><li>Immigration and refugee matters</li><li>Civil claims, including ones made in small claims court</li><li>Issues before a tribunal or board, including landlord/tenant issues</li><li>Social assistance review</li></ul></div>',
							hintContentType: 'html',
						}}
						options={[
							{
								value: 'yes',
								label: 'Yes',
								elementId: 'radio-hint-expander-html-yes',
							},
							{
								value: 'no',
								label: 'No',
								elementId: 'radio-hint-expander-html-no',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<div>
					<h2>"language" Prop Variants</h2>

					<h3>English</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'What is the primary language you use at home?' }}
						id="radio-buttons-language-english"
						name="radio-buttons-language-english"
						language="en"
						options={[
							{
								value: 'english',
								label: 'English',
								elementId: 'radio-language-english-english',
							},
							{
								value: 'french',
								label: 'French',
								elementId: 'radio-language-english-french',
							},
							{
								value: 'other',
								label: 'Other',
								elementId: 'radio-language-english-other',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">French</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Quelle est la langue principale que vous utilisez à la maison ?' }}
						id="radio-buttons-language-french"
						name="radio-buttons-language-french"
						language="fr"
						options={[
							{
								value: 'francais',
								label: 'Français',
								elementId: 'radio-language-french-francais',
							},
							{
								value: 'anglais',
								label: 'Anglais',
								elementId: 'radio-language-french-anglais',
							},
							{
								value: 'autre',
								label: 'Autre',
								elementId: 'radio-language-french-autre',
							},
						]}
					></OntarioRadioButtons>

					<h3 className="ontario-margin-top-48-!">French - Required</h3>
					<OntarioRadioButtons
						caption={{ captionText: 'Quelle est la langue principale que vous utilisez à la maison ?' }}
						id="radio-buttons-language-french-required"
						name="radio-buttons-language-french-required"
						language="fr"
						required={true}
						options={[
							{
								value: 'francais',
								label: 'Français',
								elementId: 'radio-language-french-required-francais',
							},
							{
								value: 'anglais',
								label: 'Anglais',
								elementId: 'radio-language-french-required-anglais',
							},
							{
								value: 'autre',
								label: 'Autre',
								elementId: 'radio-language-french-required-autre',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<div>
					<h2>"options" Prop Variants</h2>

					<h3>Option with hint expander</h3>
					<OntarioRadioButtons
						caption="Do you have children?"
						id="radio-buttons-options-hint-expander"
						name="radio-buttons-options-hint-expander"
						hintText="Select the option that fits best with your current situation."
						options={[
							{
								value: 'yes',
								label: 'Yes',
								elementId: 'radio-buttons-options-hint-expander-yes',
							},
							{
								value: 'adopt',
								label: 'I am adopting or looking to adopt a child',
								elementId: 'radio-buttons-options-hint-expander-adopt',
							},
							{
								value: 'legal-custody',
								label: 'I have legal custody of a child',
								elementId: 'radio-buttons-options-hint-expander-legal-custody',
							},
							{
								value: 'temporary-care',
								label: 'I have a child in my temporary care',
								elementId: 'radio-buttons-options-hint-expander-temporary-care',
								hintExpander: {
									hint: 'What does temporary care mean?',
									content:
										"Temporary care means you are temporarily taking care of a child and you are not the child's birth or adoptive parent.",
								},
							},
							{
								value: 'no',
								label: 'No',
								elementId: 'radio-buttons-options-hint-expander-no',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<div>
					<h2>"error-message" Prop Variants</h2>
					<OntarioRadioButtons
						caption={{ captionText: 'Choose how you want to be reminded.' }}
						id="radio-buttons-error-message"
						name="radio-buttons-error-message"
						errorMessage="You must select one reminder method on this page to continue."
						required={true}
						options={[
							{
								value: 'email',
								label: 'Email',
								elementId: 'radio-error-message-email',
							},
							{
								value: 'text-message',
								label: 'Text message',
								elementId: 'radio-error-message-text',
							},
							{
								value: 'phone-call',
								label: 'Automated phone call',
								elementId: 'radio-error-message-phone-call',
							},
						]}
					></OntarioRadioButtons>
				</div>

				<hr />

				<h2>ontario-radio-buttons Edge/Negative Cases</h2>

				<h3>Missing required "options" prop (should warn)</h3>
				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/* @ts-ignore */}
				<OntarioRadioButtons
					caption={{ captionText: 'Select a contact method' }}
					id="radio-buttons-missing-options"
					name="radio-buttons-missing-options"
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Empty "options" prop</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'Select a contact method' }}
					id="radio-buttons-empty-options"
					name="radio-buttons-empty-options"
					options={[]}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Invalid "options" prop</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'Select a contact method' }}
					id="radio-buttons-invalid-options"
					name="radio-buttons-invalid-options"
					// Intentionally invalid JSON for testing
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					options={'{ not valid json '}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Invalid "hint-expander" prop</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'Select a contact method' }}
					id="radio-buttons-invalid-hint-expander"
					name="radio-buttons-invalid-hint-expander"
					options={[
						{ value: 'email', elementId: 'radio-invalid-hint-email', label: 'Email' },
						{ value: 'phone', elementId: 'radio-invalid-hint-phone', label: 'Phone' },
					]}
					// Intentionally invalid JSON for testing
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					hintExpander={'{ not valid json '}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Invalid "language" prop (should fallback)</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'Select a contact method' }}
					id="radio-buttons-invalid-language"
					name="radio-buttons-invalid-language"
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					language="xx"
					options={[
						{ value: 'email', elementId: 'radio-invalid-language-email', label: 'Email' },
						{ value: 'phone', elementId: 'radio-invalid-language-phone', label: 'Phone' },
					]}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Empty caption text</h3>
				<OntarioRadioButtons
					caption={{ captionText: '' }}
					id="radio-buttons-empty-caption"
					name="radio-buttons-empty-caption"
					options={[
						{ value: 'yes', elementId: 'radio-empty-caption-yes', label: 'Yes' },
						{ value: 'no', elementId: 'radio-empty-caption-no', label: 'No' },
					]}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Empty "hint-text" content</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'Do you agree?' }}
					id="radio-buttons-empty-hint-text"
					name="radio-buttons-empty-hint-text"
					hintText={{
						hint: '',
						hintContentType: 'string',
					}}
					options={[
						{ value: 'yes', elementId: 'radio-empty-hint-yes', label: 'Yes' },
						{ value: 'no', elementId: 'radio-empty-hint-no', label: 'No' },
					]}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Empty "hint-expander" content</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'Do you agree?' }}
					id="radio-buttons-empty-hint-expander"
					name="radio-buttons-empty-hint-expander"
					hintExpander={{
						hint: 'Help: more information',
						content: '',
						hintContentType: 'string',
					}}
					options={[
						{ value: 'yes', elementId: 'radio-empty-expander-yes', label: 'Yes' },
						{ value: 'no', elementId: 'radio-empty-expander-no', label: 'No' },
					]}
				></OntarioRadioButtons>

				<h3 className="ontario-margin-top-48-!">Group and option hint expanders together</h3>
				<OntarioRadioButtons
					caption={{ captionText: 'How would you like to verify your identity?' }}
					id="radio-buttons-group-and-option-hint-expanders"
					name="radio-buttons-group-and-option-hint-expanders"
					hintExpander={{
						hint: 'Help: why do we need this?',
						content: 'We use this information to confirm your identity securely.',
						hintContentType: 'string',
					}}
					options={[
						{
							value: 'drivers-licence',
							elementId: 'radio-group-option-hint-drivers-licence',
							label: "Driver's licence",
							hintExpander: {
								hint: "Help: where can I find my driver's licence number?",
								content: 'You can find it on the front of your card.',
								hintContentType: 'string',
							},
						},
						{
							value: 'photo-card',
							elementId: 'radio-group-option-hint-photo-card',
							label: 'Ontario photo card',
						},
					]}
				></OntarioRadioButtons>
			</Grid>
		</main>
	);
}
