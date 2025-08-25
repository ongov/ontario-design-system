import { Grid } from '../../grid';
import { OntarioAccordion } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioAccordionPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-accordion</h1>

				<h2>"name" Prop Variant</h2>
				<OntarioAccordion
					name="My Accordion"
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
						ariaLabelText: 'Expand or collapse all accordion sections',
					}}
					accordionData={[
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
					]}
				/>

				<hr />

				<h2>"is-open" Prop Variant</h2>

				<h3>Open Accordion</h3>
				<OntarioAccordion
					name="Accordion - Open"
					isOpen={true}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
						ariaLabelText: 'Expand or collapse all accordion sections',
					}}
					accordionData={[
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
					]}
				/>

				<hr />

				<h3>Closed Accordion</h3>
				<OntarioAccordion
					name="Accordion - Closed"
					isOpen={false}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
						ariaLabelText: 'Expand or collapse all accordion sections',
					}}
					accordionData={[
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
					]}
				/>

				<hr />

				<h2>"expand-collapse-button" Prop Variant</h2>
				<OntarioAccordion
					name="Accordion - Closed"
					isOpen={false}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Open all accordions',
						collapseAllSectionsLabel: 'Close all accordions',
						ariaLabelText: 'Expand or collapse all accordion sections',
					}}
					accordionData={[
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
					]}
				/>
			</Grid>
		</main>
	);
}
