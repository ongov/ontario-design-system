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
							<Link href="/components/ontario-badge">ontario-badge</Link>
						</li>
            <li>
              <Link href="/components/ontario-button">ontario-button</Link>
            </li>
            <li>
							<Link href="/components/ontario-card-collection">ontario-card-collection</Link>
		        <li>
            <li>
              <Link href="/components/ontario-critical-alert">ontario-critical-alert</Link>
            </li>
        		<li>
							<Link href="/components/ontario-hint-text">ontario-hint-text</Link>
            </li>
            <li>
							<Link href="/components/ontario-input">ontario-input</Link>
            </li>
						<li>
							<Link href="/components/ontario-language-toggle">ontario-language-toggle</Link>
            </li>
            <li>
							<Link href="/components/ontario-textarea">ontario-textarea</Link>
            </li>
            <li>
							<Link href="/components/ontario-page-alert">ontario-page-alert</Link>
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
