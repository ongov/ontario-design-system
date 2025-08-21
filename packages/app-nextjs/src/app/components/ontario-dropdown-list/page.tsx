import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioDropdownListPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-dropdown-list</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-dropdown-list/client-side">Client Side Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-dropdown-list/server-side">Server Side Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
