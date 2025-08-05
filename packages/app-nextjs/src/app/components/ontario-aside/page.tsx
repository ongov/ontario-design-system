import { Grid } from '../../grid';
import { OntarioAside } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioAsidePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-aside</h1>

				<h2>"heading-type" Prop Variants</h2>

				<h3>H2</h3>
				<OntarioAside
					headingType="h2"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>H3</h3>
				<OntarioAside
					headingType="h3"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>H4</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>H5</h3>
				<OntarioAside
					headingType="h5"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>H6</h3>
				<OntarioAside
					headingType="h6"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h2>"hightlight-colour" Prop Variants</h2>

				<h3>Teal</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="teal"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Gold</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Yellow</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="yellow"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Taupe</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="taupe"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Green</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="green"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Lime</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="lime"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Sky</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="sky"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Blue</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="blue"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>Purple</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="purple"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h2>"heading-content-type" Prop Variants</h2>

				<h3>String</h3>
				<OntarioAside
					headingType="h2"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="teal"
					content="Updated content"
				></OntarioAside>

				<h3>HTML</h3>
				<OntarioAside
					headingType="h2"
					headingContentType="html"
					headingContent="Did you know? <strong>HTML</strong> in heading!"
					highlightColour="teal"
					content="Updated content with <strong>HTML</strong> support."
				></OntarioAside>
			</Grid>
		</main>
	);
}
