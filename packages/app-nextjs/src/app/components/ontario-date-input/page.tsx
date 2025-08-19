import { Grid } from '../../grid';
import { OntarioDateInput } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioDateInputPage() {
	return (
		<main>
			<Grid>
				<h1>OntarioDateInput</h1>

				<h2>'language' Prop Variants</h2>
				<h3>Language - en</h3>
				<OntarioDateInput caption="Date in English" language="en" />

				<h3>Language - fr</h3>
				<OntarioDateInput caption="Date en français" language="fr" />

				<h2>'required' Prop Variants</h2>
				<h3>Required - true</h3>
				<OntarioDateInput caption="Required Date" required={true} />

				<h3>Required - false</h3>
				<OntarioDateInput caption="Optional Date" required={false} />

				<h2>'caption' Prop Variants</h2>
				<h3>Caption - string</h3>
				<OntarioDateInput caption="Simple Caption" />

				<h3>Caption - object</h3>
				<OntarioDateInput
					caption={{
						captionText: 'Exact Date',
						captionType: 'heading',
					}}
				/>

				<h2>'placeholder' Prop Variant</h2>
				<OntarioDateInput caption="With Placeholders" placeholder={{ day: 'DD', month: 'MM', year: 'YYYY' }} />

				<h2>'dateOptions' Prop Variants</h2>
				<h3>dateOptions - day, month, year</h3>
				<OntarioDateInput caption="Full Date" dateOptions={['day', 'month', 'year']} />

				<h3>dateOptions - month, year</h3>
				<OntarioDateInput caption="Month and Year Only" dateOptions={['month', 'year']} />

				<h3>dateOptions - year</h3>
				<OntarioDateInput caption="Year Only" dateOptions={['year']} />

				<h2>'minYear' and 'maxYear' Prop Variants</h2>
				<OntarioDateInput caption="Custom Year Range" minYear={2000} maxYear={2030} />
			</Grid>
		</main>
	);
}
