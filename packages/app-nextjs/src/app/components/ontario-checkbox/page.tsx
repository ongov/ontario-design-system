import { Grid } from '../../grid';
import { OntarioCheckboxes } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCheckboxesPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-checkboxes</h1>

				<div>
					<h2>"caption" Prop Variants</h2>

					<h3>Default</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Checkbox legend (default)', captionType: 'default' }}
						name="checkbox-caption-default"
						options={[
							{
								value: 'checkbox-default-1',
								label: 'Option 1',
								elementId: 'checkbox-default-1',
							},
							{
								value: 'checkbox-default-2',
								label: 'Option 2',
								elementId: 'checkbox-default-2',
							},
							{
								value: 'checkbox-default-3',
								label: 'Option 3',
								elementId: 'checkbox-default-3',
							},
						]}
					></OntarioCheckboxes>

					<h3>Large</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Checkbox legend (large)', captionType: 'large' }}
						name="checkbox-caption-large"
						options={[
							{
								value: 'checkbox-large-1',
								label: 'Option 1',
								elementId: 'checkbox-large-1',
							},
							{
								value: 'checkbox-large-2',
								label: 'Option 2',
								elementId: 'checkbox-large-2',
							},
							{
								value: 'checkbox-large-3',
								label: 'Option 3',
								elementId: 'checkbox-large-3',
							},
						]}
					></OntarioCheckboxes>

					<h3>Heading</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Checkbox legend (heading)', captionType: 'heading' }}
						name="checkbox-caption-heading"
						options={[
							{
								value: 'checkbox-heading-1',
								label: 'Option 1',
								elementId: 'checkbox-heading-1',
							},
							{
								value: 'checkbox-heading-2',
								label: 'Option 2',
								elementId: 'checkbox-heading-2',
							},
							{
								value: 'checkbox-heading-3',
								label: 'Option 3',
								elementId: 'checkbox-heading-3',
							},
						]}
					></OntarioCheckboxes>
				</div>

				<hr />

				<div>
					<h2>"required" Prop Variants</h2>

					<h3>Required</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Which tools do you use regularly?' }}
						name="checkbox-required"
						required={true}
						options={[
							{
								value: 'github',
								label: 'Github',
								elementId: 'checkbox-required-github',
							},
							{
								value: 'figma',
								label: 'Figma',
								elementId: 'checkbox-required-figma',
							},
							{
								value: 'slack',
								label: 'Slack',
								elementId: 'checkbox-required-slack',
							},
							{
								value: 'jira',
								label: 'Jira',
								elementId: 'checkbox-required-jira',
							},
						]}
					></OntarioCheckboxes>

					<h3>Not required</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'What types of pets do you own?' }}
						name="checkbox-not-required"
						options={[
							{
								value: 'cat',
								label: 'Cat',
								elementId: 'checkbox-not-required-cat',
							},
							{
								value: 'dog',
								label: 'Dog',
								elementId: 'checkbox-not-required-dog',
							},
							{
								value: 'fish',
								label: 'Fish',
								elementId: 'checkbox-not-required-fish',
							},
							{
								value: 'bird',
								label: 'Bird',
								elementId: 'checkbox-not-required-bird',
							},
						]}
					></OntarioCheckboxes>
				</div>

				<hr />

				<div>
					<h2>"hint-text" Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'What days do you usually work remotely?' }}
						name="checkbox-hint-text-string"
						hintText={{
							hint: 'Select all that apply.',
							hintContentType: 'string',
						}}
						options={[
							{
								value: 'monday',
								label: 'Monday',
								elementId: 'checkbox-hint-text-string-monday',
							},
							{
								value: 'tuesday',
								label: 'Tuesday',
								elementId: 'checkbox-hint-text-string-tuesday',
							},
							{
								value: 'wednesday',
								label: 'Wednesday',
								elementId: 'checkbox-hint-text-string-wednesday',
							},
							{
								value: 'thursday',
								label: 'Thursday',
								elementId: 'checkbox-hint-text-string-thursday',
							},
							{
								value: 'friday',
								label: 'Friday',
								elementId: 'checkbox-hint-text-string-friday',
							},
						]}
					></OntarioCheckboxes>

					<h3>html hint-content-type</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Which parts of the project felt unclear?' }}
						name="checkbox-hint-text-html"
						hintText={{
							hint: '<p>Select all that apply.</p><p>Think about moments where you hesitated, needed to ask questions, or felt unsure.</p>',
							hintContentType: 'html',
						}}
						options={[
							{
								value: 'goals-success-criteria',
								label: 'Goals or success criteria',
								elementId: 'checkbox-hint-text-html-goals',
							},
							{
								value: 'timeline-deadlines',
								label: 'Timeline or deadlines',
								elementId: 'checkbox-hint-text-html-timeline',
							},
							{
								value: 'roles-responsibilities',
								label: 'Roles and responsibilities',
								elementId: 'checkbox-hint-text-html-roles',
							},
							{
								value: 'technical-scope',
								label: 'Technical scope',
								elementId: 'checkbox-hint-text-html-technical',
							},
						]}
					></OntarioCheckboxes>
				</div>

				<hr />

				<div>
					<h2>"hint-expander" Prop Variant</h2>

					<h3>string hint-content-type</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'What areas of the project could have been better supported?' }}
						name="checkbox-hint-expander-string"
						hintExpander={{
							hint: 'Hint: What do you mean by "supported"?',
							content:
								'This could include times when you felt stuck, unclear on who to ask for help, or unsure of the expectations. You might also think about whether the right information, tools, or people were available when you needed them.',
							hintContentType: 'string',
						}}
					></OntarioCheckboxes>

					<h3>html hint content type</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Which topics should we include in the next team workshop?' }}
						name="checkboxes-hint-expander-html"
						hintExpander={{
							hint: 'Not sure what counts as a workshop topic?',
							content:
								'<p>It could be anything that supports learning, team bonding, or skill-building. Examples:</p> <ul> <li>Giving/receiving feedback</li> <li>Time management or async workflows</li> <li>Inclusive collaboration</li> <li>Using a tool more effectively</li></ul> ',
							hintContentType: 'html',
						}}
						options={[
							{
								value: 'communication-skills',
								label: 'Communication skills',
								elementId: 'checkboxes-hint-expander-html-communication',
							},
							{
								value: 'project-estimation',
								label: 'Project estimation',
								elementId: 'checkboxes-hint-expander-html-estimation',
							},
							{
								value: 'accessibility-design-dev',
								label: 'Accessibility in design/dev',
								elementId: 'checkboxes-hint-expander-html-accessibility',
							},
							{
								value: 'burnout-prevention',
								label: 'Burnout prevention',
								elementId: 'checkboxes-hint-expander-html-burnout',
							},
						]}
					></OntarioCheckboxes>
				</div>

				<hr />

				<div>
					<h2>"language" Prop Variants</h2>

					<h3>English</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Which of these animals would you most trust to guard your house?' }}
						name="checkbox-language-english"
						language="en"
						options={[
							{
								value: 'goose',
								label: 'Goose with attitude',
								elementId: 'checkbox-language-english-goose',
							},
							{
								value: 'cat',
								label: 'Cat with a clipboard',
								elementId: 'checkbox-language-english-cat',
							},
							{
								value: 'owl',
								label: 'Owl who knows too much',
								elementId: 'checkbox-language-english-owl',
							},
							{
								value: 'hedgehog',
								label: 'Hedgehog with a tiny helmet',
								elementId: 'checkbox-language-english-hedgehog',
							},
						]}
					></OntarioCheckboxes>

					<h3>French</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Lequel de ces animaux choisiriez-vous pour garder votre maison ?' }}
						name="checkbox-language-french"
						language="fr"
						options={[
							{
								value: 'oie',
								label: 'Une oie avec du caractère',
								elementId: 'checkbox-language-french-oie',
							},
							{
								value: 'chat',
								label: 'Un chat avec un clipboard',
								elementId: 'checkbox-language-french-chat',
							},
							{
								value: 'hibou',
								label: 'Un hibou qui en sait trop',
								elementId: 'checkbox-language-french-hibou',
							},
							{
								value: 'herrison',
								label: 'Un hérisson avec un tout petit casque',
								elementId: 'checkbox-language-french-herisson',
							},
						]}
					></OntarioCheckboxes>

					<h3>French - Required</h3>
					<OntarioCheckboxes
						caption={{ captionText: 'Lequel de ces animaux choisiriez-vous pour garder votre maison ?' }}
						name="checkbox-language-french-required"
						language="fr"
						required={true}
						options={[
							{
								value: 'oie',
								label: 'Une oie avec du caractère',
								elementId: 'checkbox-language-french-required-oie',
							},
							{
								value: 'chat',
								label: 'Un chat avec un clipboard',
								elementId: 'checkbox-language-french-required-chat',
							},
							{
								value: 'hibou',
								label: 'Un hibou qui en sait trop',
								elementId: 'checkbox-language-french-required-hibou',
							},
							{
								value: 'herrison',
								label: 'Un hérisson avec un tout petit casque',
								elementId: 'checkbox-language-french-required-herisson',
							},
						]}
					></OntarioCheckboxes>
				</div>

				<hr />

				<div>
					<h2>"options" Prop Variant</h2>

					<h3>Option with hint expander</h3>
					<OntarioCheckboxes
						caption="Do you have children?"
						name="checkbox-options-hint-expander"
						hintText="Select all that apply."
						options={[
							{
								value: 'yes',
								label: 'Yes',
								elementId: 'checkbox-options-hint-expander-yes',
							},
							{
								value: 'adopt',
								label: 'I am adopting or looking to adopt a child',
								elementId: 'checkbox-options-hint-expander-adopt',
							},
							{
								value: 'legal-custody',
								label: 'I have legal custody of a child',
								elementId: 'checkbox-options-hint-expander-legal-custody',
							},
							{
								value: 'temporary-care',
								label: 'I have a child in my temporary care',
								elementId: 'checkbox-options-hint-expander-temporary-care',
								hintExpander: {
									hint: 'What does temporary care mean?',
									content:
										"Temporary care means you are temporarily taking care of a child and you are not the child's birth or adoptive parent.",
								},
							},
							{
								value: 'no',
								label: 'No',
								elementId: 'checkbox-options-hint-expander-no',
							},
						]}
					></OntarioCheckboxes>
				</div>

				<hr />

				<div>
					<h2>"error-message" Prop Variant</h2>
					<OntarioCheckboxes
						caption={{ captionText: 'Choose how you want to be reminded' }}
						name="checkbox-error-message"
						errorMessage="You must select one or more reminder method(s) on this page to continue."
						required={true}
						options={[
							{
								value: 'email',
								label: 'Email',
								elementId: 'checkbox-error-message-email',
							},
							{
								value: 'text-message',
								label: 'Text message',
								elementId: 'checkbox-error-message-text',
							},
							{
								value: 'phone-call',
								label: 'Automated phone call',
								elementId: 'checkbox-error-message-phone-call',
							},
						]}
					></OntarioCheckboxes>
				</div>
			</Grid>
		</main>
	);
}
