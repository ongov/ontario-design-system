'use client';

import { Grid } from '../../grid';
import { OntarioSearchBox } from '@ongov/ontario-design-system-component-library-react';
import { useCallback } from 'react';

export default function OntarioSearchBoxPage() {
	// Custom performSearch function
	const handleSearch = useCallback(async (value?: string) => {
		alert(`Custom search triggered with value: ${value}`);
	}, []);

	// Custom event handlers
	const handleInput = (event: Event) => {
		console.log('Input event:', (event.target as HTMLInputElement).value);
	};

	const handleChange = (event: Event) => {
		console.log('Change event:', (event.target as HTMLInputElement).value);
	};

	const handleBlur = () => {
		console.log('Blur event');
	};

	const handleFocus = () => {
		console.log('Focus event');
	};

	return (
		<main>
			<Grid>
				<h1>ontario-search-box</h1>

				<h2>'language' Prop Variants</h2>
				<h3>En</h3>
				<OntarioSearchBox caption="Search in English"></OntarioSearchBox>

				<h3>Fr</h3>
				<OntarioSearchBox language="fr" caption="Recherche en français"></OntarioSearchBox>

				<h2>'required' Prop Variants</h2>
				<h3>True</h3>
				<OntarioSearchBox required={true} caption="Required field"></OntarioSearchBox>

				<h3>False</h3>
				<OntarioSearchBox required={false} caption="Optional field"></OntarioSearchBox>

				<h2>'hint-text' - Prop Variants</h2>
				<OntarioSearchBox caption="Search with hint" hintText="This is a simple hint string."></OntarioSearchBox>

				<h2>performSearch - custom function</h2>
				<OntarioSearchBox
					id="search-custom"
					caption="Search with custom function"
					performSearch={handleSearch}
				></OntarioSearchBox>

				<h2>Custom Event Handlers</h2>
				<OntarioSearchBox
					id="search-events"
					caption="Search with custom event handlers"
					customOnInput={handleInput}
					customOnChange={handleChange}
					customOnBlur={handleBlur}
					customOnFocus={handleFocus}
				></OntarioSearchBox>
			</Grid>
		</main>
	);
}
