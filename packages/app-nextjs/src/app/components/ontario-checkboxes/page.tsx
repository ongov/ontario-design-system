import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioCheckboxesPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-checkboxes</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-checkboxes/client-side">Client Side Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-checkboxes/server-side">Server Side Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
