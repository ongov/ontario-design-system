'use client';

import { OntarioSearchBox } from '@ongov/ontario-design-system-component-library-react';
import { useCallback } from 'react';
import { Grid } from '../../grid';

const ontarioCities = [
	'Ajax',
	'Barrie',
	'Belleville',
	'Brampton',
	'Brant',
	'Brantford',
	'Brockville',
	'Burlington',
	'Cambridge',
	'Clarence-Rockland',
	'Cornwall',
	'Dryden',
	'Elliot Lake',
	'Greater Sudbury',
	'Guelph',
	'Haldimand County',
	'Hamilton',
	'Kawartha Lakes',
	'Kenora',
	'Kingston',
	'Kitchener',
	'London',
	'Markham',
	'Mississauga',
	'Niagara Falls',
	'Norfolk County',
	'North Bay',
	'Orillia',
	'Oshawa',
	'Ottawa',
	'Owen Sound',
	'Pembroke',
	'Peterborough',
	'Pickering',
	'Port Colborne',
	'Prince Edward County',
	'Quinte West',
	'Richmond Hill',
	'Sarnia',
	'Sault Ste. Marie',
	'St. Catharines',
	'St. Thomas',
	'Stratford',
	'Temiskaming Shores',
	'Thorold',
	'Thunder Bay',
	'Timmins',
	'Toronto',
	'Vaughan',
	'Waterloo',
	'Welland',
	'Windsor',
	'Woodstock',
];

export default function OntarioSearchBoxPage() {
	const handleSearch = async (value?: string) => {
		console.log('Performing search with value:', value);
	};

	const getOntarioCitySuggestions = async (query: string) => {
		const normalizedQuery = (query || '').toLowerCase();

		return ontarioCities.filter((city) => city.toLowerCase().includes(normalizedQuery)).slice(0, 8);
	};

	const handleCustomSearch = useCallback(async (value?: string) => {
		alert(`Custom search triggered with value: ${value}`);
	}, []);

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
				<div>
					<h1>ontario-search-box</h1>

					<h2 id="search-box">Search box</h2>
					<div id="autocomplete-demo" className="ontario-row ontario-margin-top-24-!">
						<h3 className="ontario-h4">Autocomplete with Ontario cities (async)</h3>
						<OntarioSearchBox
							elementId="ontario-search-autocomplete"
							enableAutocomplete
							minChars={0}
							debounceMs={0}
							caption={{
								captionText: 'Search Ontario cities',
								captionType: 'default',
							}}
							hintText="Start typing to see city suggestions."
							getSuggestions={getOntarioCitySuggestions}
							performSearch={handleSearch}
						></OntarioSearchBox>
					</div>

					<h2>&apos;language&apos; Prop Variants</h2>
					<h3>En</h3>
					<OntarioSearchBox elementId="search-language-en" caption="Search in English"></OntarioSearchBox>

					<h3>Fr</h3>
					<OntarioSearchBox
						elementId="search-language-fr"
						language="fr"
						caption="Recherche en français"
					></OntarioSearchBox>

					<h2>&apos;required&apos; Prop Variants</h2>
					<h3>True</h3>
					<OntarioSearchBox
						elementId="search-required-true"
						required={true}
						caption="Required field"
					></OntarioSearchBox>

					<h3>False</h3>
					<OntarioSearchBox
						elementId="search-required-false"
						required={false}
						caption="Optional field"
					></OntarioSearchBox>

					<h2>&apos;hint-text&apos; - Prop Variants</h2>
					<OntarioSearchBox
						elementId="search-hint-text"
						caption="Search with hint"
						hintText="This is a simple hint string."
					></OntarioSearchBox>

					<h2>performSearch - custom function</h2>
					<OntarioSearchBox
						elementId="search-custom"
						caption="Search with custom function"
						performSearch={handleCustomSearch}
					></OntarioSearchBox>

					<h2>Custom Event Handlers</h2>
					<OntarioSearchBox
						elementId="search-events"
						caption="Search with custom event handlers"
						customOnInput={handleInput}
						customOnChange={handleChange}
						customOnBlur={handleBlur}
						customOnFocus={handleFocus}
					></OntarioSearchBox>
				</div>
			</Grid>
		</main>
	);
}
