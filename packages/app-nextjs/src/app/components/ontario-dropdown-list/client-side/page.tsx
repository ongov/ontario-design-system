'use client';
import { Grid } from '../../../grid';
import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react';

const dropdownOptions = [
	{ value: 'option-1', label: 'Option 1' },
	{ value: 'option-2', label: 'Option 2' },
	{ value: 'option-3', label: 'Option 3' },
];

export default function OntarioDropdownListPageClientSide() {
	return (
		<main>
			<Grid>
				<h1>ontario-dropdown-list (Client Side)</h1>

				<h2>Event Handler Props</h2>
				<OntarioDropdownList
					name="dropdown-events"
					caption="Dropdown with Event Handlers"
					options={dropdownOptions}
					customOnChange={() => console.log('Dropdown changed')}
					customOnBlur={() => console.log('Dropdown blurred')}
					customOnFocus={() => console.log('Dropdown focused')}
				/>

				<h2>Error State</h2>
				<OntarioDropdownList name="dropdown-error" caption="Dropdown with Error" options={dropdownOptions} />
			</Grid>
		</main>
	);
}
