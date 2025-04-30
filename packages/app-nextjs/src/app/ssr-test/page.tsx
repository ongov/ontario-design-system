'use client';

import { useState } from 'react';
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function ClientTestPage() {
	const [count, setCount] = useState(0);

	return (
		<main>
			<h2>Client-Only Version</h2>
			<OntarioButton type="primary" onClick={() => setCount(count + 1)}>
				Clicked {count} times
			</OntarioButton>
		</main>
	);
}
