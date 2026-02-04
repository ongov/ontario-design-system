import { Grid } from '../../grid';
import { OntarioHintText } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioButtonPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-hint-text</h1>

				<div>
					<h2>"hint-content-type" Prop Variants</h2>

					<h3>String</h3>
					<OntarioHintText
						hintContentType="string"
						hint="This is example hint text content - string version."
					></OntarioHintText>

					<h3>HTML</h3>
					<OntarioHintText
						hintContentType="html"
						hint="<p>This is an example of a multi-line hint text content - HTML version.</p><p>It can include <strong>HTML</strong> elements.</p>"
					></OntarioHintText>
				</div>
			</Grid>
		</main>
	);
}
