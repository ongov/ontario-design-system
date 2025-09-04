import { Grid } from '../../../grid';
import { OntarioStepIndicator } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioStepIndicatorServerSidePage() {
	return (
		<main>
			<Grid>
				<h1>OntarioStepIndicator (Server Side)</h1>
				<h2>Default Step Indicator</h2>
				<OntarioStepIndicator currentStep={2} numberOfSteps={5} />

				<h2>With Back Button (URL)</h2>
				<OntarioStepIndicator
					showBackButton={true}
					backButtonUrl="https://www.ontario.ca"
					currentStep={1}
					numberOfSteps={3}
				/>

				<h2>Percentage Complete</h2>
				<OntarioStepIndicator percentageComplete={75} />

				<h2>French Language Example</h2>
				<OntarioStepIndicator currentStep={2} numberOfSteps={5} language="fr" />
			</Grid>
		</main>
	);
}
