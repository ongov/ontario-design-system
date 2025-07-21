import { Grid } from '../../grid';
import { OntarioLanguageToggle } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioLanguageTogglePage() {
	const handleCustomToggle = (event: Event) => {
		console.log('Custom language toggle triggered!', event);
	};

	return (
		<main>
			<Grid>
				<h1>OntarioLanguageToggle</h1>

				<h2>'language' Prop Variants</h2>
				<h3>Language - en</h3>
				<OntarioLanguageToggle language="en" />

				<h3>Language - fr</h3>
				<OntarioLanguageToggle language="fr" />

				<h2>'size' Prop Variants</h2>
				<h3>Size - default</h3>
				<OntarioLanguageToggle size="default" />

				<h3>Size - small</h3>
				<OntarioLanguageToggle size="small" />

				<h2>'url' Prop Variant</h2>
				<OntarioLanguageToggle url="https://example.com/fr" />

				<h2>'customLanguageToggle' Prop Variant</h2>
				<OntarioLanguageToggle customLanguageToggle={handleCustomToggle} />
			</Grid>
		</main>
	);
}
