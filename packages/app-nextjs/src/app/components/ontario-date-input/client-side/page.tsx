'use client';
import { Grid } from '../../../grid';
import { OntarioDateInput } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioDateInputPageClientSide() {
	return (
		<main>
			<Grid>
				<h1>OntarioDateInput</h1>

				<h2>'error' Prop Variant</h2>
				<h3>Error State</h3>
				<OntarioDateInput caption="Date with error" onError={() => console.log('Please enter a valid date.')} />

				<h2>Event Handlers</h2>
				<h3>All Events</h3>
				<OntarioDateInput
					caption="Date with event handlers"
					onInputOnInput={() => console.log('Input event')}
					onInputOnFocus={() => console.log('Focus event')}
					onInputOnChange={() => console.log('Change event')}
					onInputOnBlur={() => console.log('Blur event')}
					onInputErrorOccurred={() => console.log('Error occurred')}
				/>
			</Grid>
		</main>
	);
}
