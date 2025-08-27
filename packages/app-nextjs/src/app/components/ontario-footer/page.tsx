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
							<Link href="/components/ontario-footer/page-simple">Simple Footer</Link>
						</li>
						<li>
							<Link href="/components/ontario-footer/page-expanded">Expanded Footer</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
