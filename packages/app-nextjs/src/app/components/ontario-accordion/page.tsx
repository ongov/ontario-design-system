import { Grid } from '../../grid';
import { OntarioAccordion } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioAccordionPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-accordion</h1>

				<h2>"name" Prop Variant</h2>
				<h3>Name</h3>
				<OntarioAccordion
					name="My Accordion"
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: ['Item 1', 'Item 2', 'Item 3'],
						},
						{
							label: 'Accordion 2',
							content: ['Item A', 'Item B', 'Item C'],
						},
					]}
				/>

				<h2>"isOpen" variant</h2>

				<h3>Open Accordion</h3>
				<OntarioAccordion
					name="Accordion 2"
					isOpen={true}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: ['Item 1', 'Item 2', 'Item 3'],
						},
						{
							label: 'Accordion 2',
							content: ['Item A', 'Item B', 'Item C'],
						},
					]}
				/>

				<h3>Closed Accordion</h3>
				<OntarioAccordion
					name="Accordion 3"
					isOpen={false}
					expandCollapseButton={{
						expandAllSectionsLabel: 'Expand All',
						collapseAllSectionsLabel: 'Collapse All',
					}}
					accordionData={[
						{
							label: 'Accordion 1',
							content: ['Item 1', 'Item 2', 'Item 3'],
						},
						{
							label: 'Accordion 2',
							content: ['Item A', 'Item B', 'Item C'],
						},
					]}
				/>
			</Grid>
		</main>
	);
}
