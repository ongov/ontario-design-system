import Link from 'next/link';
import { Grid } from '../../grid';

export default function OntarioBackToTopPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-back-to-top</h1>
				<div>
					<ul>
						<li>
							<Link href="/components/ontario-back-to-top/page-en">English Page</Link>
						</li>
						<li>
							<Link href="/components/ontario-back-to-top/page-fr">French Page</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
