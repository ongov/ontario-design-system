'use client';

import { Grid } from '../../../grid';
import { OntarioRadioButtons } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioRadioButtonsPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-radio-buttons (Client Side)</h1>

				<div>
					<h2>Custom Event Props</h2>

					<OntarioRadioButtons
						caption={{ captionText: 'Radio buttons (default)', captionType: 'default' }}
						name="radio-button-caption-default"
						options={[
							{
								value: 'radio-default-1',
								label: 'Option 1',
								elementId: 'radio-default-1',
							},
							{
								value: 'radio-default-2',
								label: 'Option 2',
								elementId: 'radio-default-2',
							},
							{
								value: 'radio-default-3',
								label: 'Option 3',
								elementId: 'radio-default-3',
							},
						]}
						customOnChange={(e) => console.log(`customOnChange → ${(e.target as HTMLInputElement)?.value}`)}
						customOnFocus={(e) => console.log(`customOnFocus → ${(e.target as HTMLInputElement)?.value}`)}
						customOnBlur={() => console.log(`customOnBlur`)}
					></OntarioRadioButtons>
				</div>
			</Grid>
		</main>
	);
}
