import { Grid } from '../../grid';
import { OntarioBadge } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioBadgePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-badge</h1>

				<h2>"colour" Prop Variants</h2>
				<h3>teal</h3>
				<OntarioBadge colour="teal" label="Teal Badge" />

				<h3>green</h3>
				<OntarioBadge colour="green" label="Green Badge" />

				<h3>light-teal</h3>
				<OntarioBadge colour="light-teal" label="Light Teal Badge" />

				<h3>black</h3>
				<OntarioBadge colour="black" label="Black Badge" />

				<h3>red</h3>
				<OntarioBadge colour="red" label="Red Badge" />

				<h3>green</h3>
				<OntarioBadge colour="green" label="Green Badge" />

				<h3>white</h3>
				<OntarioBadge colour="white" label="White Badge" />

				<h3>dark grey</h3>
				<OntarioBadge colour="dark-grey" label="Dark Grey Badge" />

				<h2>"label" Prop Variants</h2>
				<h3>success</h3>
				<OntarioBadge colour="green" label="Success" />

				<h3>error</h3>
				<OntarioBadge colour="red" label="Error" />
			</Grid>
		</main>
	);
}
