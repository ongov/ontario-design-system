import { Grid } from '../../grid';
import { OntarioCallout } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCalloutPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-callout</h1>
				<h2>"heading-type" Prop Variants</h2>
				<h3>h2 heading-type</h3>
				<OntarioCallout
					headingType="h2"
					headingContentType="html"
					headingContent="<a href='#'>h2 heading-type</a>"
					content="This is testing the h2 heading-type."
				></OntarioCallout>

				<h3>h3 heading-type</h3>
				<OntarioCallout
					headingType="h3"
					headingContentType="html"
					headingContent="<a href='#'>h3 heading-type</a>"
					content="This is testing the h3 heading-type."
				></OntarioCallout>

				<h2>"heading-content-type" Prop Variants</h2>
				<h3>h2 heading-content-type is html </h3>
				<OntarioCallout
					headingType="h2"
					headingContentType="html"
					headingContent="<a href='#'>HTML heading-content-type</a>"
					content="<div><p>This is testing the heading-content-type with HTML content.</p></div> <div><p>This is testing the h2 heading-content-type with HTML content.</p></div>"
				></OntarioCallout>

				<h3>h3 heading-content-type is string</h3>
				<OntarioCallout
					headingType="h3"
					headingContentType="string"
					headingContent="<a href='#'>String heading-content-type</a>"
					content="This is testing the string heading-content-type."
				></OntarioCallout>

				<h2>"highlight-colour" Prop Variants</h2>
				<h3>yellow highlight-colour </h3>
				<OntarioCallout
					headingType="h2"
					headingContentType="string"
					headingContent="<a href='#'>Yellow highlight colour</a>"
					content="This is testing the yellow highlight colour."
				></OntarioCallout>

				<h3>blue highlight-colour </h3>
				<OntarioCallout
					headingType="h2"
					headingContentType="string"
					headingContent="<a href='#'>Blue highlight colour</a>"
					content="This is testing the blue highlight colour."
				></OntarioCallout>
			</Grid>
		</main>
	);
}
