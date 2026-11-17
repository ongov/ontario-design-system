import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-search-box-page',
	templateUrl: './ontario-search-box.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioSearchBoxPageComponent {
	readonly ontarioCities = [
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

	readonly autocompleteCaption = { captionText: 'Search Ontario cities', captionType: 'default' };

	handleSearch = async (value?: string) => {
		console.log('Performing search with value:', value);
	};

	getOntarioCitySuggestions = async (query: string) => {
		const normalizedQuery = (query || '').toLowerCase();

		return this.ontarioCities.filter((city) => city.toLowerCase().includes(normalizedQuery)).slice(0, 8);
	};

	handleCustomSearch = async (value?: string) => {
		alert(`Custom search triggered with value: ${value}`);
	};

	handleInput = (event: Event) => {
		console.log('Input event:', (event.target as HTMLInputElement).value);
	};

	handleChange = (event: Event) => {
		console.log('Change event:', (event.target as HTMLInputElement).value);
	};

	handleBlur = () => {
		console.log('Blur event');
	};

	handleFocus = () => {
		console.log('Focus event');
	};
}
