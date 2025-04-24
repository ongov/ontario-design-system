import styles from './page.module.css';

import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<OntarioButton type="primary" label="Hello!" />
			</main>
		</div>
	);
}
