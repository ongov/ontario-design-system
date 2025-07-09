import { Grid } from '../../grid';
import { OntarioCard } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCardPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-card</h1>

				<h2>'heading-level' Prop Variants</h2>
				<h3>heading level - h2 </h3>
				<OntarioCard
					headingLevel="h2"
					label="Heading level h2"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>heading level - h3 </h3>
				<OntarioCard
					headingLevel="h3"
					label="Heading level h3"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>heading level - h4 </h3>
				<OntarioCard
					headingLevel="h4"
					label="Heading level h4"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>heading level - h5 </h3>
				<OntarioCard
					headingLevel="h5"
					label="Heading level h5"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>heading level - h6 </h3>
				<OntarioCard
					headingLevel="h6"
					label="Heading level h6"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>'image' Prop Variants</h2>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					imageAltText="Placeholder image"
					label="Image prop is true"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>'card-link' Prop Variants</h2>
				<OntarioCard
					headingLevel="h2"
					cardLink="https://www.ontario.ca"
					label="Card link prop is true"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>'layout-direction' Prop Variants</h2>
				<h3>layout direction - horizontal </h3>
				<OntarioCard
					headingLevel="h2"
					label="Layout direction is horizontal"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>layout direction - vertical </h3>
				<OntarioCard
					headingLevel="h2"
					label="Layout direction is vertical"
					layoutDirection="vertical"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>'header-colour' Prop Variants</h2>
				<h3>Header colour - dark-accent </h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="dark-accent"
					label="Header colour is dark-accent"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-accent</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-accent"
					label="Header colour is light-accent"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-gold</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-gold"
					label="Header colour is light-gold"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-yellow</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-yellow"
					label="Header colour is light-yellow"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-taupe</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-taupe"
					label="Header colour is light-taupe"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-green</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-green"
					label="Header colour is light-green"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-lime</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-lime"
					label="Header colour is light-lime"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-teal</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-teal"
					label="Header colour is light-teal"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-sky</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-sky"
					label="Header colour is light-sky"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-blue</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-blue"
					label="Header colour is light-blue"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-purple</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-purple"
					label="Header colour is light-purple"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-orange</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-orange"
					label="Header colour is light-orange"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-red</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-red"
					label="Header colour is light-red"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - light-magenta</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="light-magenta"
					label="Header colour is light-magenta"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - gold</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="gold"
					label="Header colour is gold"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - yellow</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="yellow"
					label="Header colour is yellow"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - taupe</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="taupe"
					label="Header colour is taupe"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - green</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="green"
					label="Header colour is green"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - lime</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="lime"
					label="Header colour is lime"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - teal</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="teal"
					label="Header colour is teal"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - sky</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="sky"
					label="Header colour is sky"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - blue</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="blue"
					label="Header colour is blue"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - purple</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="purple"
					label="Header colour is purple"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - orange</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="orange"
					label="Header colour is orange"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - red</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="red"
					label="Header colour is red"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>Header colour - magenta</h3>
				<OntarioCard
					headingLevel="h2"
					headerColour="magenta"
					label="Header colour is magenta"
					layoutDirection="horizontal"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>'horizontal-impage-position-type' Prop Variants</h2>
				<h3>horizontal image position type - left </h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="left"
					label="horizontal image position type is left"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>horizontal image position type - right </h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="right"
					label="horizontal image position type is right"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h2>'horizontal-impage-size-type' Prop Variants</h2>
				<h3>horizontal image size type - one-thid </h3>
				<OntarioCard
					headingLevel="h2"
					image="https://picsum.photos/200/300"
					horizontalImagePositionType="left"
					horizontalImageSizeType="one-third"
					label="horizontal image size type is one-third"
					description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
				></OntarioCard>

				<h3>horizontal image size type - one-fourth </h3>
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
