import { Grid } from '../../grid';
import { OntarioCallout } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCalloutPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-callout</h1>

				<h2>"heading-type" Prop Variants</h2>
				<h3>heading type - h2</h3>
				<OntarioCallout
					headingType="h2"
					headingContentType="string"
					headingContent="<a href='#'>h2 heading-type</a>"
					content="This is testing the h2 heading-type."
				></OntarioCallout>

				<h3>heading type - h3</h3>
				<OntarioCallout
					headingType="h3"
					headingContentType="string"
					headingContent="<a href='#'>h3 heading-type</a>"
					content="This is testing the h3 heading-type."
				></OntarioCallout>

				<h3>heading type - h4</h3>
				<OntarioCallout
					headingType="h4"
					headingContentType="string"
					headingContent="<a href='#'>h4 heading-type</a>"
					content="This is testing the h4 heading-type."
				></OntarioCallout>

				<h3>heading type - h5</h3>
				<OntarioCallout
					headingType="h5"
					headingContentType="string"
					headingContent="<a href='#'>h5 heading-type</a>"
					content="This is testing the h5 heading-type."
				></OntarioCallout>

				<h3>heading type - h6</h3>
				<OntarioCallout
					headingType="h6"
					headingContentType="string"
					headingContent="<a href='#'>h6 heading-type</a>"
					content="This is testing the h6 heading-type."
				></OntarioCallout>

				<h2>"heading-content-type" Prop Variants</h2>
				<h3> heading content type - html </h3>
				<OntarioCallout
					headingType="h2"
					headingContentType="html"
					headingContent="<a href='#'>HTML heading-content-type</a>"
					content="<div><p>This is testing the heading-content-type with HTML content.</p></div> <div><p>This is testing the h2 heading-content-type with HTML content.</p></div>"
				></OntarioCallout>

				<h3>heading content type - string</h3>
				<OntarioCallout
					headingType="h3"
					headingContentType="string"
					headingContent="<a href='#'>String heading-content-type</a>"
					content="This is testing the string heading-content-type."
				></OntarioCallout>

				<h2>"highlight-colour" Prop Variants</h2>
				<h3>highlight colour - yellow </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="yellow"
					headingContentType="string"
					headingContent="<a href='#'>Yellow highlight colour</a>"
					content="This is testing the yellow highlight colour."
				></OntarioCallout>

				<h3>highlight colour - blue </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="blue"
					headingContentType="string"
					headingContent="<a href='#'>Blue highlight colour</a>"
					content="This is testing the blue highlight colour."
				></OntarioCallout>

				<h3>highlight colour - teal </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="teal"
					headingContentType="string"
					headingContent="<a href='#'>Teal highlight colour</a>"
					content="This is testing the teal highlight colour."
				></OntarioCallout>

				<h3>highlight colour - taupe </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="taupe"
					headingContentType="string"
					headingContent="<a href='#'>Taupe highlight colour</a>"
					content="This is testing the taupe highlight colour."
				></OntarioCallout>

				<h3>highlight colour - taupe </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="taupe"
					headingContentType="string"
					headingContent="<a href='#'>Taupe highlight colour</a>"
					content="This is testing the taupe highlight colour."
				></OntarioCallout>

				<h3>highlight colour - green </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="green"
					headingContentType="string"
					headingContent="<a href='#'>Green highlight colour</a>"
					content="This is testing the green highlight colour."
				></OntarioCallout>

				<h3>highlight colour - lime </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="lime"
					headingContentType="string"
					headingContent="<a href='#'>Lime highlight colour</a>"
					content="This is testing the lime highlight colour."
				></OntarioCallout>

				<h3>highlight colour - sky </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="sky"
					headingContentType="string"
					headingContent="<a href='#'>Sky highlight colour</a>"
					content="This is testing the sky highlight colour."
				></OntarioCallout>

				<h3>highlight colour - blue </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="blue"
					headingContentType="string"
					headingContent="<a href='#'>Blue highlight colour</a>"
					content="This is testing the blue highlight colour."
				></OntarioCallout>

				<h3>highlight colour - purple </h3>
				<OntarioCallout
					headingType="h2"
					highlightColour="purple"
					headingContentType="string"
					headingContent="<a href='#'>Purple highlight colour</a>"
					content="This is testing the purple highlight colour."
				></OntarioCallout>
			</Grid>
		</main>
	);
}
