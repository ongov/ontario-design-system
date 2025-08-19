import { Grid } from '../../../grid';
import { OntarioDateInput } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioDateInputPageServerSide() {
	return (
		<main>
			<Grid>
				<h1>OntarioDateInput</h1>

				<h2>'language' Prop Variants</h2>
				<h3>EN</h3>
				<OntarioDateInput caption="Date in English" language="en" />

				<h3>FR</h3>
				<OntarioDateInput caption="Date en français" language="fr" />

				<h2>'required' Prop Variants</h2>
				<h3>True</h3>
				<OntarioDateInput caption="Required Date" required={true} />

				<h3>False</h3>
				<OntarioDateInput caption="Optional Date" required={false} />

				<h2>'caption' Prop Variants</h2>
				<h3>String</h3>
				<OntarioDateInput caption="Simple Caption" />

				<h3>Object</h3>
				<OntarioDateInput
					caption={{
						captionText: 'Exact Date',
						captionType: 'heading',
					}}
				/>

				<h2>'captionType' Prop Variants</h2>
				<h3>Default</h3>
				<OntarioDateInput
					caption={{
						captionText: 'Default caption type',
						captionType: 'default',
					}}
				/>

				<h3>Heading</h3>
				<OntarioDateInput
					caption={{
						captionText: 'Heading caption type',
						captionType: 'heading',
					}}
				/>

				<h3>Large</h3>
				<OntarioDateInput
					caption={{
						captionText: 'Large caption type',
						captionType: 'large',
					}}
				/>

				<h2>'placeholder' Prop Variant</h2>
				<h3>Custom</h3>
				<OntarioDateInput caption="With Placeholders" placeholder={{ day: 'DD', month: 'MM', year: 'YYYY' }} />

				<h2>'dateOptions' Prop Variants</h2>
				<h3>Day, Month, Year</h3>
				<OntarioDateInput caption="Full Date" dateOptions={['day', 'month', 'year']} />

				<h3>Month, Year</h3>
				<OntarioDateInput caption="Month and Year Only" dateOptions={['month', 'year']} />

				<h3>Year</h3>
				<OntarioDateInput caption="Year Only" dateOptions={['year']} />

				<h2>'minYear' and 'maxYear' Prop Variants</h2>
				<h3>Custom Range</h3>
				<OntarioDateInput caption="Custom Year Range" minYear={2000} maxYear={2030} />

				<h2>'hintText' Prop Variant</h2>
				<h3>With Hint</h3>
				<OntarioDateInput caption="Date with hint" hintText="This is a helpful hint for the date input." />
			</Grid>
		</main>
	);
}
