import { Grid } from '../../grid';
import { OntarioCardCollection } from '@ontario/ods-web-components/ontario-card-collection';
import { OntarioCard } from '@ontario/ods-web-components/ontario-card';

export default function OntarioCardCollectionPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-card-collection</h1>

				<h2>'cards-per-row' Prop Variants</h2>
				<h3>cards per row - 4</h3>
				<OntarioCardCollection cardsPerRow="4">
					<OntarioCard
						description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
						label="Card Title 1"
					></OntarioCard>
					<OntarioCard
						description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
						headerColour="purple"
						label="Card Title 2"
					></OntarioCard>
					<OntarioCard label="Card Title 3"></OntarioCard>
					<OntarioCard headerColour="blue" label="Card Title 4"></OntarioCard>
				</OntarioCardCollection>

				<h3>cards per row - 3</h3>
				<OntarioCardCollection cardsPerRow="3">
					<OntarioCard
						description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
						label="Card Title 1"
					></OntarioCard>
					<OntarioCard
						description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
						headerColour="sky"
						label="Card Title 2"
					></OntarioCard>
					<OntarioCard label="Card Title 3"></OntarioCard>
				</OntarioCardCollection>

				<h3>cards per row - 2</h3>
				<OntarioCardCollection cardsPerRow="2">
					<OntarioCard
						description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
						label="Card Title 1"
					></OntarioCard>
					<OntarioCard
						description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
						headerColour="sky"
						label="Card Title 2"
					></OntarioCard>
				</OntarioCardCollection>
			</Grid>
		</main>
	);
}
