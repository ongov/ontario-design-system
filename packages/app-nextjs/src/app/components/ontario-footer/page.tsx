import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioFooterPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-footer</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-footer/page-default">Default Footer</Link>
						</li>
						<li>
							<Link href="/components/ontario-footer/page-two-column">Two Column Expanded Footer</Link>
						</li>
						<li>
							<Link href="/components/ontario-footer/page-three-column">Three Column Expanded Footer</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
