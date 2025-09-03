'use client';

import { Grid } from '../../../grid';
import { OntarioCheckboxes } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCheckboxesPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-checkboxes</h1>

				<div>
					<h2>Custom Event Props</h2>

					<OntarioCheckboxes
						caption={{ captionText: 'Checkbox legend (default)', captionType: 'default' }}
						name="checkbox-caption-default"
						options={[
							{
								value: 'checkbox-default-1',
								label: 'Option 1',
								elementId: 'checkbox-default-1',
							},
							{
								value: 'checkbox-default-2',
								label: 'Option 2',
								elementId: 'checkbox-default-2',
							},
							{
								value: 'checkbox-default-3',
								label: 'Option 3',
								elementId: 'checkbox-default-3',
							},
						]}
						customOnChange={(e) => console.log(`customOnChange → ${(e.target as HTMLInputElement)?.value}`)}
						customOnFocus={(e) => console.log(`customOnFocus → ${(e.target as HTMLInputElement)?.value}`)}
						customOnBlur={() => console.log(`customOnBlur`)}
					></OntarioCheckboxes>
				</div>
			</Grid>
		</main>
	);
}
