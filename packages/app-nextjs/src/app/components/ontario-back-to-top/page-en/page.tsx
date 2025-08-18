import { Grid } from '../../../grid';
import { OntarioBackToTop } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioBackToTopPageEnglish() {
	return (
		<main>
			<Grid>
				<h1>ontario-back-to-top</h1>

				<h3>Language prop - en</h3>
				<OntarioBackToTop language="en" />

				<h2>Scrollable Content</h2>
				<div style={{ height: '1500px' }}>
					<p>Scroll down to see the Back to Top button appear...</p>
					{Array.from({ length: 50 }).map((_, i) => (
						<p key={i}>This is line {i + 1} of scrollable content.</p>
					))}
				</div>
			</Grid>
		</main>
	);
}
