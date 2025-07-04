import { Grid } from '../../grid';
import { OntarioBadge } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioBadgePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-badge</h1>

				<h2>"Colour" Prop Variants</h2>

				<h3>teal</h3>
				<OntarioBadge colour="teal" label="Teal Badge" />

				<h2>"label" Prop Variants</h2>
				<h3>success label</h3>
				<OntarioBadge colour="green" label="Success" />
			</Grid>
		</main>
	);
}
