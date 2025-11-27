import Link from 'next/link';
import { Grid } from '../../grid';
import { OntarioLoadingIndicator } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioLoadingIndicatorPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-loading-indicator</h1>

				<div>
					<ul>
						<li>
							<Link href="/components/ontario-loading-indicator/full-screen">
								"full-screen-overlay" Loading Indicator
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h2>"type" Prop Variants</h2>

					<h3>Small</h3>
					<div style={{ position: 'relative', height: '25vh' }}>
						<OntarioLoadingIndicator
							is-loading="true"
							full-screen-overlay="false"
							type="small"
						></OntarioLoadingIndicator>
					</div>

					<h3>Large</h3>
					<div style={{ position: 'relative', height: '25vh' }}>
						<OntarioLoadingIndicator
							is-loading="true"
							full-screen-overlay="false"
							type="large"
						></OntarioLoadingIndicator>
					</div>

					<hr />

					<h2>"isLoading" Prop Variant</h2>
					<div style={{ position: 'relative', height: '25vh' }}>
						<OntarioLoadingIndicator is-loading="false" full-screen-overlay="false"></OntarioLoadingIndicator>
					</div>

					<hr />

					<h2>"message" Prop Variant</h2>
					<div style={{ position: 'relative', height: '25vh' }}>
						<OntarioLoadingIndicator
							is-loading="true"
							full-screen-overlay="false"
							message="Please wait while we process your request"
						></OntarioLoadingIndicator>
					</div>

					<hr />

					<h2>"language" Prop Variants</h2>

					<h3>English</h3>
					<div style={{ position: 'relative', height: '25vh' }}>
						<OntarioLoadingIndicator is-loading="true" full-screen-overlay="false"></OntarioLoadingIndicator>
					</div>

					<h3>French</h3>
					<div style={{ position: 'relative', height: '25vh' }}>
						<OntarioLoadingIndicator
							is-loading="true"
							full-screen-overlay="false"
							language="fr"
						></OntarioLoadingIndicator>
					</div>
				</div>
			</Grid>
		</main>
	);
}
