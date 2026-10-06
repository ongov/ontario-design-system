'use client';

import { Grid } from '../../../grid';
import { OntarioCheckbox } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCheckboxPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-checkbox (Client Side)</h1>

				<div>
					<h2>Custom Event Props</h2>

					<OntarioCheckbox
						label="I agree to the terms and conditions"
						name="checkbox-default"
						value="agreed"
						customOnChange={(e) => console.log(`customOnChange → ${(e.target as HTMLInputElement)?.checked}`)}
						customOnFocus={(e) => console.log(`customOnFocus → ${(e.target as HTMLInputElement)?.value}`)}
						customOnBlur={() => console.log(`customOnBlur`)}
					></OntarioCheckbox>
				</div>
			</Grid>
		</main>
	);
}
