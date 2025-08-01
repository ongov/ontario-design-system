import { Grid } from '../../grid';
import { OntarioCriticalAlert } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCriticalAlertPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-critical-alert</h1>

				<h2>'content' Prop Variants</h2>

				<h3>string</h3>
				<OntarioCriticalAlert content="COVID-19 State of emergency extended until May 12, 2020." />

				<h3>slot (HTML)</h3>
				<OntarioCriticalAlert>
					<a href="#">COVID-19 State of emergency</a> extended until May 12, 2020.
				</OntarioCriticalAlert>
			</Grid>
		</main>
	);
}
