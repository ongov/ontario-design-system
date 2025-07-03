import { Grid } from '../../grid';
import { OntarioAccordion } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioAccordionPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-accordion</h1>

				<h2>"accordion" Prop Variants</h2>

				<h3>Name</h3>
				<OntarioAccordion
					name="My Accordion"
					expand-collapse-button='{
							"expandAllSectionsLabel": "Expand All",
							"collapseAllSectionsLabel": "Collapse All"
						}'
					accordion-data='[
							{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
							{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
						]'
				></OntarioAccordion>

				<h3>Open Accordion</h3>
				<OntarioAccordion
					name="My Accordion"
					isOpen={true}
					expand-collapse-button='{
							"expandAllSectionsLabel": "Expand All",
							"collapseAllSectionsLabel": "Collapse All"
						}'
					accordion-data='[
							{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
							{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
						]'
				></OntarioAccordion>

				<h3>Closed Accordion</h3>
				<OntarioAccordion
					name="My Accordion"
					isOpen={false}
					expand-collapse-button='{
							"expandAllSectionsLabel": "Expand All",
							"collapseAllSectionsLabel": "Collapse All"
						}'
					accordion-data='[
							{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
							{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
						]'
				></OntarioAccordion>
			</Grid>
		</main>
	);
}
