import { Grid } from '../../../grid';
import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react';

const dropdownOptions = [
	{ value: 'option-1', label: 'Option 1' },
	{ value: 'option-2', label: 'Option 2' },
	{ value: 'option-3', label: 'Option 3' },
];

const dropdownOptionsWithSelected = [
	{ value: 'option-1', label: 'Option 1' },
	{ value: 'option-2', label: 'Option 2', selected: true },
	{ value: 'option-3', label: 'Option 3' },
];

export default function OntarioDropdownListPageServerSide() {
	return (
		<main>
			<Grid>
				<h1>ontario-dropdown-list</h1>

				<h2>'language' Prop Variants</h2>
				<h3>EN</h3>
				<OntarioDropdownList name="dropdown-en" caption="Dropdown in English" language="en" options={dropdownOptions} />

				<h3>FR</h3>
				<OntarioDropdownList
					name="dropdown-fr"
					caption="Liste déroulante en français"
					language="fr"
					options={dropdownOptions}
				/>

				<h2>'caption' Prop Variants</h2>
				<h3>String</h3>
				<OntarioDropdownList name="dropdown-caption-string" caption="Simple Caption" options={dropdownOptions} />

				<h3>Object</h3>
				<OntarioDropdownList
					name="dropdown-caption-object"
					caption={{ captionText: 'Dropdown Label', captionType: 'heading' }}
					options={dropdownOptions}
				/>

				<h2>'captionType' Prop Variants</h2>
				<h3>Default</h3>
				<OntarioDropdownList
					name="dropdown-caption-object"
					caption={{ captionText: 'Default caption type', captionType: 'default' }}
					options={dropdownOptions}
				/>

				<h3>Large</h3>
				<OntarioDropdownList
					name="dropdown-caption-object"
					caption={{ captionText: 'Large caption type', captionType: 'large' }}
					options={dropdownOptions}
				/>

				<h3>Heading</h3>
				<OntarioDropdownList
					name="dropdown-caption-object"
					caption={{ captionText: 'Heading caption type', captionType: 'heading' }}
					options={dropdownOptions}
				/>

				<h2>'options' Prop Variant - Preselected Value</h2>
				<h3>Option 2 Preselected</h3>
				<OntarioDropdownList
					name="dropdown-preselected"
					caption="Dropdown with Option 2 Preselected"
					options={dropdownOptionsWithSelected}
				/>

				<h2>'required' Prop Variants</h2>
				<h3>True</h3>
				<OntarioDropdownList
					name="dropdown-required"
					caption="Required Dropdown"
					required={true}
					options={dropdownOptions}
				/>

				<h3>False</h3>
				<OntarioDropdownList
					name="dropdown-optional"
					caption="Optional Dropdown"
					required={false}
					options={dropdownOptions}
				/>

				<h2>'isEmptyStartOption' Prop Variants</h2>
				<h3>True</h3>
				<OntarioDropdownList
					name="dropdown-empty-true"
					caption="Empty Start Option (true)"
					isEmptyStartOption={true}
					options={dropdownOptions}
				/>

				<h3>Custom String</h3>
				<OntarioDropdownList
					name="dropdown-empty-string"
					caption="Empty Start Option (custom)"
					isEmptyStartOption="Please select an option"
					options={dropdownOptions}
				/>

				<h2>'hintText' Prop Variant</h2>
				<h3>String</h3>
				<OntarioDropdownList
					name="dropdown-hint"
					caption="Dropdown with Hint"
					hintText="This is a helpful hint."
					options={dropdownOptions}
				/>

				<h2>'hintExpander' Prop Variant</h2>
				<h3>Object</h3>
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
