import { Grid } from '../../grid';
import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react';

const dropdownOptions = [
	{ value: 'option-1', label: 'Option 1' },
	{ value: 'option-2', label: 'Option 2' },
	{ value: 'option-3', label: 'Option 3' },
];

export default function OntarioDropdownListPage() {
	return (
		<main>
			<Grid>
				<h1>OntarioDropdownList</h1>

				<h2>'language' Prop Variants</h2>
				<h3>Language - en</h3>
				<OntarioDropdownList name="dropdown-en" caption="Dropdown in English" language="en" options={dropdownOptions} />

				<h3>Language - fr</h3>
				<OntarioDropdownList
					name="dropdown-fr"
					caption="Liste déroulante en français"
					language="fr"
					options={dropdownOptions}
				/>

				<h2>'caption' Prop Variants</h2>
				<h3>Caption - string</h3>
				<OntarioDropdownList name="dropdown-caption-string" caption="Simple Caption" options={dropdownOptions} />

				<h3>Caption - object</h3>
				<OntarioDropdownList
					name="dropdown-caption-object"
					caption={{ captionText: 'Dropdown Label', captionType: 'heading' }}
					options={dropdownOptions}
				/>

				<h2>'required' Prop Variants</h2>
				<h3>Required - true</h3>
				<OntarioDropdownList
					name="dropdown-required"
					caption="Required Dropdown"
					required={true}
					options={dropdownOptions}
				/>

				<h3>Required - false</h3>
				<OntarioDropdownList
					name="dropdown-optional"
					caption="Optional Dropdown"
					required={false}
					options={dropdownOptions}
				/>

				<h2>'isEmptyStartOption' Prop Variants</h2>
				<h3>isEmptyStartOption - true</h3>
				<OntarioDropdownList
					name="dropdown-empty-true"
					caption="Empty Start Option (true)"
					isEmptyStartOption={true}
					options={dropdownOptions}
				/>

				<h3>isEmptyStartOption - custom string</h3>
				<OntarioDropdownList
					name="dropdown-empty-string"
					caption="Empty Start Option (custom)"
					isEmptyStartOption="Please select an option"
					options={dropdownOptions}
				/>

				<h2>'hintText' Prop Variant</h2>
				<OntarioDropdownList
					name="dropdown-hint"
					caption="Dropdown with Hint"
					hintText="This is a helpful hint."
					options={dropdownOptions}
				/>

				<h2>'hintExpander' Prop Variant</h2>
				<OntarioDropdownList
					name="dropdown-hint-expander"
					caption="Dropdown with Hint Expander"
					hintExpander={{
						hint: 'Need help?',
						content: 'This dropdown lets you select one of several options.',
					}}
					options={dropdownOptions}
				/>
			</Grid>
		</main>
	);
}
