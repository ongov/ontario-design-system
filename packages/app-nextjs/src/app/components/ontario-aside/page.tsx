import { Grid } from '../../grid';
import { OntarioAside } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioAsidePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-aside</h1>

				<h2>"HeadingType" Prop variant</h2>

				<h3>h3 HeadingType</h3>
				<OntarioAside
					headingType="h3"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h2>"Hightlight-colour" Prop variant</h2>

				<h3>h3 HeadingType</h3>
				<OntarioAside
					headingType="h3"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="teal"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>
			</Grid>
		</main>
	);
}
