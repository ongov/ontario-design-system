'use client';
import { Grid } from '../../grid';
import { OntarioLanguageToggle } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioLanguageTogglePage() {
	const handleCustomToggle = (event: Event) => {
		console.log('Custom language toggle triggered!', event);
	};

	return (
		<main>
			<Grid>
				<h1>ontario-language-toggle</h1>

				<h2>'language' Prop Variants</h2>
				<h3>EN</h3>
				<OntarioLanguageToggle language="en" />

				<h3>FR</h3>
				<OntarioLanguageToggle language="fr" />

				<h2>'size' Prop Variants</h2>
				<h3>default</h3>
				<OntarioLanguageToggle size="default" />

				<h3>small</h3>
				<OntarioLanguageToggle size="small" />

				<h2>'url' Prop Variant</h2>
				<OntarioLanguageToggle url="https://example.com/fr" />

				<h2>'customLanguageToggle' Prop Variant</h2>
				<OntarioLanguageToggle customLanguageToggle={handleCustomToggle} />
			</Grid>
		</main>
	);
}
