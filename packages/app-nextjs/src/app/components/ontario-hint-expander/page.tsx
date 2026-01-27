import { Grid } from '../../grid';
import { OntarioHintExpander } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioHintExpanderPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-hint-expander</h1>

				<div>
					<h2>&quot;hint-content-type&quot; Prop Variants</h2>

					<h3>String</h3>
					<OntarioHintExpander
						hintContentType="string"
						hint="What does temporary care mean?"
						content="Temporary care means you are temporarily taking care of a child and you are not the child's birth or adoptive parent."
					></OntarioHintExpander>

					<h3>HTML</h3>
					<OntarioHintExpander
						hintContentType="html"
						hint="What are some examples of legal issues?"
						content="<div>
                            <p>Legal issues may include:</p>
                            <ul>
                                <li>Criminal matters</li>
                                <li>Family law issues like divorce, child custody or support</li>
                                <li>Immigration and refugee matters</li>
                                <li>Civil claims, including ones made in small claims court</li>
                                <li>Issues before a tribunal or board, including landlord/tenant issues</li>
                                <li>Social assistance review</li>
                            </ul>
                        </div>"
					></OntarioHintExpander>
				</div>
			</Grid>
		</main>
	);
}
