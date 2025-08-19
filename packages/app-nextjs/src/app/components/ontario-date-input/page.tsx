import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioDateInputPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-back-to-top</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-date-input/client-side">Client Side Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-date-input/server-side">Server Side Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
