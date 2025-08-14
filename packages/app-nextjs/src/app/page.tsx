import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<h1>Welcome to SSR Test</h1>
			<ul>
				<li>
					<Link href="/client-test">Client-only Test</Link>
				</li>
				<li>
					<Link href="/ssr-test">SSR Test</Link>
				</li>
			</ul>
		</main>
	);
}
