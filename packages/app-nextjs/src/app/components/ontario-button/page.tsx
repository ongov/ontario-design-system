'use client';

import { useState } from 'react';
import { Grid } from '../../grid';
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioButtonPage() {
	const [submitted, setSubmitted] = useState(false);

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
						ariaLabelText="Click to perform primary action"
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

				<div>
					<h2>"htmlType" Prop — Form Integration</h2>

					{submitted && <p id="form-submitted-message">Form submitted!</p>}

					<form
						id="ontario-button-form"
						onSubmit={(e) => {
							e.preventDefault();
							setSubmitted(true);
						}}
					>
						<input id="form-input" name="test-input" defaultValue="" />
						<OntarioButton id="ontario-button-submit" type="primary" htmlType="submit" label="Submit"></OntarioButton>
						<OntarioButton id="ontario-button-reset" type="secondary" htmlType="reset" label="Reset"></OntarioButton>
					</form>
				</div>
			</Grid>
		</main>
	);
}
