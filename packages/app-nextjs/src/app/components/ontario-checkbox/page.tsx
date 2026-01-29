import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioStepIndicatorPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-step-indicator</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-checkbox/client-side">Client Side Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-checkbox/server-side">Server Side Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
