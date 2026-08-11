'use client';

import { OntarioSearchBox } from '@ongov/ontario-design-system-component-library-react';
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

	return (
		<main>
			<Grid>
				<div>
					<h1>ontario-search-box</h1>

					{/*
					Stencil reference (original)

					<ontario-search-box
						id="ontario-search-box"
						caption="Search directory"
						hint-text="Search by employee name or organization name."
					></ontario-search-box>

					<script>
						const searchBox = document.getElementById('ontario-search-autocomplete');
						searchBox.getSuggestions = async (query) => cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));
					</script>

					<ontario-search-box id="ontario-search-autocomplete" caption="Search Ontario cities" enable-autocomplete></ontario-search-box>
					*/}

					<h2 id="search-box">Search box</h2>
					<div className="ontario-row ontario-margin-top-24-!">
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
				</div>
			</Grid>
		</main>
	);
}
