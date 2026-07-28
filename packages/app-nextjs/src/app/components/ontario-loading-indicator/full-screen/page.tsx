import { Grid } from '../../../grid';
import { OntarioLoadingIndicator } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioLoadingIndicatorPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-loading-indicator</h1>

				<div>
					<h2>"full screen overlay" Prop Variant</h2>
					<div style={{ position: 'relative', height: '100vh' }}>
						<OntarioLoadingIndicator
							is-loading={true}
							full-screen-overlay={true}
							type="large"
						></OntarioLoadingIndicator>
					</div>
				</div>
			</Grid>
		</main>
	);
}
