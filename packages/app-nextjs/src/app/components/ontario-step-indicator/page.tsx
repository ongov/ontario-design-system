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
							<Link href="/components/ontario-step-indicator/client-side">Client Side Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-step-indicator/server-side">Server Side Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
