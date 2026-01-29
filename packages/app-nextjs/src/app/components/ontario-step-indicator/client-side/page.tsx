'use client';
import { Grid } from '../../../grid';
import { OntarioStepIndicator } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioStepIndicatorClientSidePage() {
	return (
		<main>
			<Grid>
				<h1>OntarioStepIndicator (Client Side)</h1>
				<h2>'customOnClick' Prop Variant</h2>
				<OntarioStepIndicator
					showBackButton={true}
					currentStep={1}
					numberOfSteps={3}
					customOnClick={() => alert('Back button clicked!')}
				/>

				{/* You can add more client-only tests here */}
			</Grid>
		</main>
	);
}
