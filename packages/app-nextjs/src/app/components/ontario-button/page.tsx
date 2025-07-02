import { Grid } from '../../grid';
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioButtonPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-button</h1>

				<h2>"type" Prop Variants</h2>
				<OntarioButton type="primary" label="Primary Button"></OntarioButton>
				<OntarioButton type="secondary" label="Secondary Button"></OntarioButton>
				<OntarioButton type="tertiary" label="Tertiary Button"></OntarioButton>
			</Grid>
		</main>
	);
}
