'use client';

import { Grid } from '../../grid';
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioButtonPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-button</h1>

				<div>
					<h2>"type" Prop Variants</h2>

					<h3>Primary</h3>
					<OntarioButton
						id="ontario-button-primary"
						type="primary"
						label="Primary Button"
						aria-label-text="Click to perform primary action"
					></OntarioButton>

					<h3>Secondary</h3>
					<OntarioButton
						id="ontario-button-secondary"
						type="secondary"
						label="Secondary Button"
						onClick={() => alert('Clicked!')}
					></OntarioButton>

					<h3>Tertiary</h3>
					<OntarioButton id="ontario-button-tertiary" type="tertiary" label="Tertiary Button"></OntarioButton>
				</div>
			</Grid>
		</main>
	);
}
