import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-card-page',
	templateUrl: './ontario-card.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioCardPageComponent {
	description = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum';

	headingLevels = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;

	headerColours = [
		{ heading: 'darkAccent', colour: 'darkAccent' },
		{ heading: 'lightAccent', colour: 'lightAccent' },
		{ heading: 'lightGold', colour: 'lightGold' },
		{ heading: 'lightYellow', colour: 'lightYellow' },
		{ heading: 'lightTaupe', colour: 'lightTaupe' },
		{ heading: 'lightGreen', colour: 'lightGreen' },
		{ heading: 'lightLime', colour: 'lightLime' },
		{ heading: 'lightTeal', colour: 'lightTeal' },
		{ heading: 'lightSky', colour: 'lightSky' },
		{ heading: 'lightBlue', colour: 'lightBlue' },
		{ heading: 'lightPurple', colour: 'lightPurple' },
		{ heading: 'lightOrange', colour: 'lightOrange' },
		{ heading: 'lightRed', colour: 'lightRed' },
		{ heading: 'lightMagenta', colour: 'lightMagenta' },
		{ heading: 'Gold', colour: 'gold' },
		{ heading: 'Yellow', colour: 'yellow' },
		{ heading: 'Taupe', colour: 'taupe' },
		{ heading: 'Green', colour: 'green' },
		{ heading: 'Lime', colour: 'lime' },
		{ heading: 'Teal', colour: 'teal' },
		{ heading: 'Sky', colour: 'sky' },
		{ heading: 'Blue', colour: 'blue' },
		{ heading: 'Purple', colour: 'purple' },
		{ heading: 'Orange', colour: 'orange' },
		{ heading: 'Red', colour: 'red' },
		{ heading: 'Magenta', colour: 'magenta' },
	] as const;
}
