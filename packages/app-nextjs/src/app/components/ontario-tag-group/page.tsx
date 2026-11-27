'use client';

import { useState } from 'react';
import { Grid } from '../../grid';
import { OntarioTag, OntarioTagGroup } from '@ongov/ontario-design-system-component-library-react';

const initialFilters = [
	{ label: 'Category: Health', value: 'health' },
	{ label: 'Region: Northern Ontario', value: 'north' },
];

export default function OntarioTagGroupPage() {
	const [filters, setFilters] = useState(initialFilters);
	const removeFilter = (value: string) => setFilters((current) => current.filter((f) => f.value !== value));

	return (
		<main>
			<Grid>
				<h1>ontario-tag-group</h1>

				<h2>Applied filters</h2>
				<OntarioTagGroup heading="Applied filters" headingLevel="h3" hintText="Hint text example.">
					{filters.map((f) => (
						<OntarioTag
							key={f.value}
							label={f.label}
							value={f.value}
							dismissible
							onTagDismissed={() => removeFilter(f.value)}
						/>
					))}
				</OntarioTagGroup>

				<h2 className="ontario-margin-top-48-!">Filter set</h2>
				<OntarioTagGroup groupLabel="Topics">
					<OntarioTag label="Health" />
					<OntarioTag label="Education" selected />
				</OntarioTagGroup>
			</Grid>
		</main>
	);
}
