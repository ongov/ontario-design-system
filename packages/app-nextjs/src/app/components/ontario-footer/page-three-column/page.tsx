import { Grid } from '../../../grid';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioFooterThreeColumn() {
	return (
		<div>
			<main>
				<Grid>
					<h1>ontario-footer-three-column</h1>
				</Grid>
			</main>
			<div style={{ flex: '0 0 auto' }}>
				<OntarioFooter type="default" language="en" />
			</div>
		</div>
	);
}
