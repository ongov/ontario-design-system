'use client';

import Link from 'next/link';
import {
	OntarioButton,
	OntarioSummaryList,
	OntarioSummaryListItem,
} from '@ongov/ontario-design-system-component-library-react';
import { Grid } from '../grid';

/**
 * Fixture page for `tests/stencil-ssr-slot-forwarding/stencil-ssr-slot-forwarding.e2e.ts`.
 *
 * `@stencil/ssr` wraps every Stencil component in a `display:contents` div, and the browser only
 * slots the direct children of a shadow host. A `slot` prop therefore only takes effect if the
 * wrapper div carries it too (see `patches/@stencil__ssr@0.4.0.patch`). The same fix is up for review
 * upstream: https://github.com/stenciljs/output-targets/pull/863
 */
export default function StencilSsrSlotForwardingPage() {
	return (
		<main>
			<Grid>
				<h1>Stencil SSR slot forwarding</h1>

				<h2>Stencil component with a slot prop</h2>
				<OntarioSummaryList caption="Stencil component in the action slot" headingLevel="h3">
					<OntarioSummaryListItem id="ssr-slot-stencil-item" name="Last name" description="Smith">
						<OntarioButton id="ssr-slot-stencil-button" slot="action" type="tertiary" label="Edit last name" />
					</OntarioSummaryListItem>
				</OntarioSummaryList>

				<h2>Plain element with a slot prop (control)</h2>
				<OntarioSummaryList caption="Plain element in the action slot" headingLevel="h3">
					<OntarioSummaryListItem id="ssr-slot-plain-item" name="First name" description="George">
						<Link id="ssr-slot-plain-link" slot="action" href="#plain">
							Edit first name
						</Link>
					</OntarioSummaryListItem>
				</OntarioSummaryList>

				<h2>Stencil components without a slot prop (control)</h2>
				<OntarioSummaryList id="ssr-slot-default-list" caption="Default slot" headingLevel="h3">
					<OntarioSummaryListItem key="email" name="Email" description="gsmith@example.com" />
					<OntarioSummaryListItem key="phone" name="Phone" description="555-0100" />
				</OntarioSummaryList>
			</Grid>
		</main>
	);
}
