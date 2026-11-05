import { Grid } from '../../grid';
import { OntarioTag } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTagPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-tag</h1>

				<h2>Non-dismissible</h2>
				<OntarioTag label="Health" />
				<OntarioTag label="Education" selected />

				<h2>Dismissible</h2>
				<OntarioTag label="Category: Filter" value="category-filter" dismissible />
			</Grid>
		</main>
	);
}
