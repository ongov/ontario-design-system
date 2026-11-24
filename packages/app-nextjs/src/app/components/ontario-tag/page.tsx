import { Grid } from '../../grid';
import { OntarioTag } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTagPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-tag</h1>

				<h2>Non-dismissible</h2>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
					<OntarioTag id="ontario-tag-unselected" label="Health" />
					<OntarioTag id="ontario-tag-selected" label="Education" selected />
				</div>

				<h2 className="ontario-margin-top-48-!">Dismissible</h2>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
					<OntarioTag id="ontario-tag-dismissible" label="Category: Filter" value="category-filter" dismissible />
				</div>

				<h2 className="ontario-margin-top-48-!">French</h2>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
					<OntarioTag
						id="ontario-tag-dismissible-french"
						label="Santé et bien-être"
						value="health"
						language="fr"
						dismissible
					/>
				</div>
			</Grid>
		</main>
	);
}
