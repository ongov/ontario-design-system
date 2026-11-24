'use client';

import { useState } from 'react';
import { Grid } from '../../grid';
import { OntarioTag, OntarioTagGroup } from '@ongov/ontario-design-system-component-library-react';

const initialFilters = [
	{ label: 'Category: Health', value: 'health' },
	{ label: 'Region: Northern Ontario', value: 'north' },
];

const initialTopics = [
	{ label: 'Santé et bien-être', value: 'health' },
	{ label: 'Éducation et formation', value: 'education' },
];

export default function OntarioTagGroupPage() {
	const [filters, setFilters] = useState(initialFilters);
	const [topics, setTopics] = useState(initialTopics);
	const removeFilter = (value: string) => setFilters((current) => current.filter((f) => f.value !== value));
	const removeTopic = (value: string) => setTopics((current) => current.filter((t) => t.value !== value));

	return (
		<main>
			<Grid>
				<h1>ontario-tag-group</h1>

				<h2>Applied filters</h2>
				<OntarioTagGroup
					id="ontario-tag-group-applied-filters"
					heading="Applied filters"
					headingLevel="h3"
					hintText="Hint text example."
				>
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
				<OntarioTagGroup id="ontario-tag-group-filter-set" groupLabel="Topics">
					<OntarioTag label="Health" />
					<OntarioTag label="Education" selected />
				</OntarioTagGroup>

				<h2 className="ontario-margin-top-48-!">French</h2>
				<OntarioTagGroup id="ontario-tag-group-french" groupLabel="Sujets" language="fr">
					{topics.map((t) => (
						<OntarioTag
							key={t.value}
							label={t.label}
							value={t.value}
							language="fr"
							dismissible
							onTagDismissed={() => removeTopic(t.value)}
						/>
					))}
				</OntarioTagGroup>
			</Grid>
		</main>
	);
}
