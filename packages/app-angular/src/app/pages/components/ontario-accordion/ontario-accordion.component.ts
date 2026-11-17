import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-accordion-page',
	templateUrl: './ontario-accordion.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioAccordionPageComponent {
	// Intentionally invalid JSON for testing
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly invalidJson: any = '{ not valid json ';

	readonly nameVariantData = [
		{
			label: 'Accordion 1',
			accordionContentType: 'html',
			ariaLabelText: 'List of Ontario, Toronto and Lake Superior facts',
			content:
				'<ul><li>Ontario is Canada’s most populous province.</li><li>The capital city is Toronto.</li><li>Lake Superior is the largest of the Great Lakes.</li></ul>',
			isOpen: false,
		},
		{
			label: 'Accordion 2',
			accordionContentType: 'html',
			ariaLabelText: 'List of banana, Eiffel Tower and honey facts',
			isOpen: false,
			content:
				'<ul><li>Bananas are berries, but strawberries aren’t.</li><li>The Eiffel Tower can be 15 cm taller during the summer.</li><li>Honey never spoils.</li></ul>',
		},
	];

	readonly openExpandCollapseButton = {
		expandAllSectionsLabel: 'Expand All',
		collapseAllSectionsLabel: 'Collapse All',
		ariaLabelText: 'Expand or collapse all accordion sections',
	};

	readonly openData = [
		{
			label: 'Accordion 1',
			accordionContentType: 'html',
			content:
				'<ul><li>Cats have fewer toes on their back paws.</li><li>The unicorn is Scotland’s national animal.</li><li>Octopuses have three hearts.</li></ul>',
			ariaLabelText: 'List of cat, unicorn and octopus facts',
			isOpen: true,
		},
		{
			label: 'Accordion 2',
			accordionContentType: 'html',
			ariaLabelText: 'List of desert, wombat and star facts',
			isOpen: true,
			content:
				'<ul><li>The world’s largest desert is Antarctica.</li><li>Wombat poop is cube-shaped.</li><li>There are more stars in the universe than grains of sand on Earth.</li></ul>',
		},
	];

	readonly closedExpandCollapseButton = {
		expandAllSectionsLabel: 'Expand all',
		collapseAllSectionsLabel: 'Collapse all',
		ariaLabelText: 'Expand or collapse all accordion sections',
	};

	readonly closedData = [
		{
			label: 'Accordion 1',
			accordionContentType: 'string',
			content:
				'We choose to go to the moon. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too.',
			ariaLabelText: 'Famous quote from John F. Kennedy about going to the moon',
			isOpen: false,
		},
		{
			label: 'Accordion 2',
			accordionContentType: 'string',
			content:
				'Two roads diverged in a wood, and I— I took the one less traveled by, And that has made all the difference.',
			ariaLabelText: "Famous quote from Robert Frost's The Road Not Taken",
			isOpen: false,
		},
	];

	readonly customExpandCollapseButton = {
		expandAllSectionsLabel: 'Open all accordions',
		collapseAllSectionsLabel: 'Close all accordions',
		ariaLabelText: 'Expand or collapse all accordion sections',
	};

	readonly customData = [
		{
			label: 'Accordion 1',
			accordionContentType: 'string',
			content:
				'I believe that space travel will one day become as common as airline travel is today. I’m convinced, however, that the true future of space travel does not lie with government agencies — NASA is still obsessed with the idea that the primary purpose of the space program is science — but real progress will come from private companies competing to provide the ultimate adventure ride, and NASA will receive the trickle-down benefits.',
			ariaLabelText: 'Famous quote from Buzz Aldrin - Magnificent Desolation',
			isOpen: false,
		},
		{
			label: 'Accordion 2',
			accordionContentType: 'string',
			content:
				'Across the sea of space, the stars are other suns. We are made of star-stuff. We are a way for the cosmos to know itself. Some part of our being knows this is where we came from. We long to return. And we can, because the cosmos is also within us. We’re made of star-stuff. We are a way for the universe to know itself.',
			ariaLabelText: 'Famous quote from Carl Sagan - Cosmos',
			isOpen: false,
		},
	];

	readonly invalidButtonData = [
		{
			label: 'Accordion 1',
			accordionContentType: 'string',
			content:
				'If you have 3 quarters, 4 dimes, and 4 pennies, you have $1.19. You also have the largest amount of money in coins without being able to make change for a dollar.',
			isOpen: false,
			ariaLabelText: 'Accordion 1 content',
		},
	];
}
