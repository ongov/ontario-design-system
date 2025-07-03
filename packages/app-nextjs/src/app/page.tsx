import Link from 'next/link';

import { Grid } from './grid';

export default function Home() {
	return (
		<main>
			<Grid>
				<div>
					<h1>Ontario Design System Web Components - Visual Regression Testing PoC (NextJS)</h1>
					<p>
						This proof of concept showcases the Ontario Design System components rendered in Next.js for the purpose of
						visual regression testing. Each page displays one or more components with relevant visual variations.
					</p>
				</div>

				<hr />
				<div>
					<h2>Component Pages</h2>
					<ul>
						<li>
							<Link href="/components/ontario-accordion">ontario-accordion</Link>
						</li>
						<li>
							<Link href="/components/ontario-hint-text">ontario-hint-text</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
