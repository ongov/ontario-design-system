import { Grid } from '../../grid';
import { OntarioCard } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCardPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-card</h1>

				<h2>&apos;heading-level&apos; Prop Variants</h2>
				<h3>H2</h3>
				<OntarioCard
					headingLevel="h2"
					label="Heading level h2"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>H3</h3>
				<OntarioCard
					headingLevel="h3"
					label="Heading level h3"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>H4</h3>
				<OntarioCard
					headingLevel="h4"
					label="Heading level h4"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>H5</h3>
				<OntarioCard
					headingLevel="h5"
					label="Heading level h5"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>H6</h3>
				<OntarioCard
					headingLevel="h6"
					label="Heading level h6"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>&apos;image&apos; Prop Variants</h2>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					imageAltText="Placeholder image"
					label="Image prop is true"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>&apos;card-link&apos; Prop Variants</h2>
				<OntarioCard
					headingLevel="h2"
					cardLink="https://www.ontario.ca"
					label="Card link prop is true"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>&apos;layout-direction&apos; Prop Variants</h2>
				<h3>Horizontal</h3>
				<OntarioCard
					headingLevel="h2"
					label="Layout direction is horizontal"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Vertical</h3>
				<OntarioCard
					headingLevel="h2"
					label="Layout direction is vertical"
					layoutDirection="vertical"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>&apos;header-colour&apos; Prop Variants</h2>
				<h3>Dark-accent</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="dark-accent"
					label="Header colour is dark-accent"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-accent</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-accent"
					label="Header colour is light-accent"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-gold</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-gold"
					label="Header colour is light-gold"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-yellow</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-yellow"
					label="Header colour is light-yellow"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-taupe</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-taupe"
					label="Header colour is light-taupe"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-green</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-green"
					label="Header colour is light-green"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-lime</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-lime"
					label="Header colour is light-lime"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-teal</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-teal"
					label="Header colour is light-teal"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-sky</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-sky"
					label="Header colour is light-sky"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-blue</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-blue"
					label="Header colour is light-blue"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-purple</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-purple"
					label="Header colour is light-purple"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-orange</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-orange"
					label="Header colour is light-orange"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-red</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-red"
					label="Header colour is light-red"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Light-magenta</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-magenta"
					label="Header colour is light-magenta"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Gold</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="gold"
					label="Header colour is gold"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Yellow</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="yellow"
					label="Header colour is yellow"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Taupe</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="taupe"
					label="Header colour is taupe"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Green</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="green"
					label="Header colour is green"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Lime</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="lime"
					label="Header colour is lime"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Teal</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="teal"
					label="Header colour is teal"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Sky</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="sky"
					label="Header colour is sky"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Blue</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="blue"
					label="Header colour is blue"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Purple</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="purple"
					label="Header colour is purple"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Orange</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="orange"
					label="Header colour is orange"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Red</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="red"
					label="Header colour is red"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Magenta</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="magenta"
					label="Header colour is magenta"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>&apos;horizontal-impage-position-type&apos; Prop Variants</h2>
				<h3>Left</h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="left"
					label="horizontal image position type is left"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Right</h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="right"
					label="horizontal image position type is right"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>&apos;horizontal-image-size-type&apos; Prop Variants</h2>
				<h3>One-third</h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="left"
					horizontalImageSizeType="one-third"
					label="horizontal image size type is one-third"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>One-fourth</h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="right"
					horizontalImageSizeType="one-fourth"
					label="horizontal image size type is one-fourth"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>
			</Grid>
		</main>
	);
}
