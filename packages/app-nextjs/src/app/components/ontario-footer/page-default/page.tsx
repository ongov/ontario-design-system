import { Grid } from '../../../grid';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioFooterDefault() {
	return (
		<div>
			<main>
				<Grid>
					<h1>ontario-footer-default</h1>
				</Grid>
			</main>
			<div style={{ flex: '0 0 auto' }}>
				<OntarioFooter type="default" language="en" />
			</div>
		</div>
	);
}
