import { Grid } from '../../grid';
import {
	OntarioIconAccessibility,
	OntarioIconAlertError,
	OntarioIconDropdownArrow,
	OntarioIconMastercard,
} from '@ongov/ontario-design-system-component-library-react';

export default function OntarioIconPage() {
	return (
		<main>
			<Grid>
				<h1>Ontario icons</h1>

				<section aria-labelledby="configurable-colour">
					<h2 id="configurable-colour">Configurable colour</h2>
					<OntarioIconAccessibility colour="blue" label="Accessibility" />
				</section>

				<section aria-labelledby="fixed-colour">
					<h2 id="fixed-colour">Fixed semantic colour</h2>
					<OntarioIconAlertError label="Error" />
				</section>

				<section aria-labelledby="multicolour">
					<h2 id="multicolour">Multicolour</h2>
					<OntarioIconMastercard label="Mastercard" />
				</section>

				<section aria-labelledby="dropdown-arrow">
					<h2 id="dropdown-arrow">Dropdown arrow</h2>
					<OntarioIconDropdownArrow />
				</section>

				<section aria-labelledby="accessibility-labels">
					<h2 id="accessibility-labels">Decorative and meaningful</h2>
					<p>
						<OntarioIconAccessibility /> Decorative icon
					</p>
					<p>
						<OntarioIconAccessibility label="Accessibility options" /> Meaningful icon
					</p>
				</section>
			</Grid>
		</main>
	);
}
