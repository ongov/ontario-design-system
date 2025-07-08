import { Grid } from '../../grid';
import { OntarioBadge } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioBadgePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-badge</h1>

				<h2>"colour" Prop Variants</h2>
				<h3>teal colour</h3>
				<OntarioBadge colour="teal" label="Teal Badge" />

				<h3>green colour</h3>
				<OntarioBadge colour="green" label="Green Badge" />

				<h3>light-teal colour</h3>
				<OntarioBadge colour="lightTeal" label="Light Teal Badge" />

				<h3>black colour</h3>
				<OntarioBadge colour="black" label="Black Badge" />

				<h3>red colour</h3>
				<OntarioBadge colour="red" label="Red Badge" />

				<h3>green colour</h3>
				<OntarioBadge colour="green" label="Green Badge" />

				<h3>white colour</h3>
				<OntarioBadge colour="white" label="White Badge" />

				<h3>dark grey colour</h3>
				<OntarioBadge colour="darkGrey" label="Dark Grey Badge" />

				<h2>"label" Prop Variants</h2>
				<h3>success label</h3>
				<OntarioBadge colour="green" label="Success" />

				<h3>error label</h3>
				<OntarioBadge colour="red" label="Error" />
			</Grid>
		</main>
	);
}
