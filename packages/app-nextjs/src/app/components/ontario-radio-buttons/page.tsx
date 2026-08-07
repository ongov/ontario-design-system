import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioRadioButtonsPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-radio-buttons</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-radio-buttons/client-side">Client Side Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-radio-buttons/server-side">Server Side Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
