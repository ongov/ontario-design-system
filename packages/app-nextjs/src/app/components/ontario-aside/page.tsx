import { Grid } from '../../grid';
import { OntarioAside } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioAsidePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-aside</h1>

				<h2>"heading-type" Prop Variants</h2>

				<h3>h2 Heading Type</h3>
				<OntarioAside
					headingType="h2"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>h3 Heading Type</h3>
				<OntarioAside
					headingType="h3"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>h4 Heading Type</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>h5 Heading Type</h3>
				<OntarioAside
					headingType="h5"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>h6 Heading Type</h3>
				<OntarioAside
					headingType="h6"
					headingContentType="string"
					headingContent="Quick fact:"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h2>"hightlight-colour" Prop Variants</h2>

				<h3>highlight colour - teal</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="teal"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - gold</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="gold"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - yellow</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="yellow"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - taupe</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="taupe"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - green</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="green"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - lime</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="lime"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - sky</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="sky"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - blue</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="blue"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h3>highlight colour - purple</h3>
				<OntarioAside
					headingType="h4"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="purple"
					content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."
				></OntarioAside>

				<h2>"heading-content-type" Prop Variants</h2>

				<h3>heading content type - string</h3>
				<OntarioAside
					headingType="h2"
					headingContentType="string"
					headingContent="Did you know?"
					highlightColour="teal"
					content="Updated content"
				></OntarioAside>

				<h3>heading content type - html</h3>
				<OntarioAside
					headingType="h2"
					headingContentType="html"
					headingContent="Did you know?"
					highlightColour="teal"
					content="<div>Updated content with <strong>HTML</strong> support.</div>"
				></OntarioAside>
			</Grid>
		</main>
	);
}
