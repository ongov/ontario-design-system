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
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: [
								'Ontario is Canada’s most populous province.',
								'The capital city is Toronto.',
								'Lake Superior is the largest of the Great Lakes.',
							],
						},
						{
							label: 'Accordion 2',
							content: [
								'Bananas are berries, but strawberries are not.',
								'The Eiffel Tower can be 15 cm taller during hot days.',
								'Honey never spoils.',
							],
						},
					]}
				/>

				<h2>"is-open" Prop Variant</h2>

				<h3>Open Accordion</h3>
				<OntarioAccordion
					name="Accordion - Open"
					isOpen={true}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: [
								'Cats have fewer toes on their back paws.',
								'The unicorn is Scotland’s national animal.',
								'Octopuses have three hearts.',
							],
						},
						{
							label: 'Accordion 2',
							content: [
								'The world’s largest desert is Antarctica.',
								'Wombat poop is cube-shaped.',
								'There are more stars in the universe than grains of sand on Earth.',
							],
						},
					]}
				/>

				<h3>Closed Accordion</h3>
				<OntarioAccordion
					name="Accordion - Closed"
					isOpen={false}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: [
								'Hot water freezes faster than cold water.',
								'The inventor of the frisbee was turned into a frisbee.',
								'The dot over the letter "i" is called a tittle.',
							],
						},
						{
							label: 'Accordion 2',
							content: [
								'Venus is the only planet to spin clockwise.',
								'The tongue is the only muscle attached at one end.',
								'Some turtles can breathe through their butts.',
							],
						},
					]}
				/>

				<h2>"expand-collapse-button" Prop Variant</h2>
				<OntarioAccordion
					name="Accordion - Closed"
					isOpen={false}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Open all accordions',
						collapseAllSectionsLabel: 'Close all accordions',
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: [
								'The longest place name on the planet is 85 letters long.',
								'The inventor of the microwave only received $2 for his discovery.',
								'The first computer mouse was made of wood.',
							],
						},
						{
							label: 'Accordion 2',
							content: [
								'The Twitter bird’s official name is Larry.',
								'The majority of your brain is fat.',
								'The hashtag symbol is technically called an octothorpe.',
							],
						},
					]}
				/>
			</Grid>
		</main>
	);
}
