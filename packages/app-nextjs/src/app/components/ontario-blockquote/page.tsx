import { Grid } from '../../grid';
import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioBlockquotePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-blockquote</h1>

				<h2>"quote" Prop Variants</h2>

				<h3>Short quote (140 characters or less)</h3>
				<OntarioBlockquote id="ontario-blockquote-short" quote="This is an example of a short quote." />

				<h3>Long quote (over 140 characters)</h3>
				<OntarioBlockquote
					id="ontario-blockquote-long"
					quote="When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one that has opened for us."
				/>

				<h2>"attribution" and "byline" Prop Variants</h2>

				<h3>With attribution only</h3>
				<OntarioBlockquote
					id="ontario-blockquote-attribution"
					quote="The best way to find yourself is to lose yourself in the service of others."
					attribution="Mahatma Gandhi"
				/>

				<h3>With attribution and byline</h3>
				<OntarioBlockquote
					id="ontario-blockquote-attribution-byline"
					quote="Government at its best is the ally of civil society, helping to facilitate solutions."
					attribution="Homer Simpson"
					byline="Ontario Digital Service"
				/>

				<h2>Slotted Content Variant</h2>

				<h3>No "quote" prop provided (falls back to slotted content)</h3>
				<OntarioBlockquote id="ontario-blockquote-slotted">
					This quote is provided via slotted content instead of the quote prop.
				</OntarioBlockquote>
			</Grid>
		</main>
	);
}
