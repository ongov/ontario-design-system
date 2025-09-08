import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function SSRTestPage() {
	return (
		<main>
			<h2>SSR Version</h2>
			<OntarioButton type="primary">This button is server-rendered</OntarioButton>
		</main>
	);
}
