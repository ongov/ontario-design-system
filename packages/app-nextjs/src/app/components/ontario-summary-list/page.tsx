'use client';

import Link from 'next/link';
import { OntarioSummaryList, OntarioSummaryListItem } from '@ongov/ontario-design-system-component-library-react';
import { Grid } from '../../grid';

export default function OntarioSummaryListPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-summary-list</h1>

				<div>
					<h2>Documentation Examples</h2>

					<h3>Row-level change links (action slot)</h3>
					<OntarioSummaryList caption="Personal information" headingLevel="h3">
						<OntarioSummaryListItem name="Last name" description="Smith">
							<Link slot="action" href="/step/personal-info">
								Change
								<span className="ontario-show-for-sr">your answer for: Last name</span>
							</Link>
						</OntarioSummaryListItem>
						<OntarioSummaryListItem name="First name" description="George">
							<Link slot="action" href="/step/personal-info">
								Change
								<span className="ontario-show-for-sr">your answer for: First name</span>
							</Link>
						</OntarioSummaryListItem>
						<OntarioSummaryListItem name="Middle name" description="Not applicable">
							<Link slot="action" href="/step/personal-info">
								Change
								<span className="ontario-show-for-sr">your answer for: Middle name</span>
							</Link>
						</OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Heading-level change link (caption-action slot)</h3>
					<OntarioSummaryList caption="Contact details" headingLevel="h3">
						<Link slot="caption-action" href="/step/contact">
							Change
							<span className="ontario-show-for-sr">your answers for: Contact details</span>
						</Link>
						<OntarioSummaryListItem name="Email" description="gsmith@gmail.com"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="Phone number" description="123-456-7890"></OntarioSummaryListItem>
					</OntarioSummaryList>
				</div>

				<div>
					<h2>Summary List Variants</h2>

					<h3>Default (row-level action links)</h3>
					<OntarioSummaryList id="ontario-summary-list-default" caption="Personal information" headingLevel="h3">
						<OntarioSummaryListItem
							name="Last name"
							description="Smith"
							actionLink={{ href: '/change-personal-info' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							name="First name"
							description="George"
							actionLink={{ href: '/change-personal-info' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							name="Middle name"
							description="Not applicable"
							actionLink={{ href: '/change-personal-info' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							name="Sex"
							description="Male"
							actionLink={{ href: '/change-personal-info' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							name="Place of birth"
							description="Ottawa"
							actionLink={{ href: '/change-personal-info' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Heading action link</h3>
					<OntarioSummaryList
						id="ontario-summary-list-heading-action"
						caption="Personal information"
						headingLevel="h3"
						captionActionLink={{ href: '/change-personal-info' }}
					>
						<OntarioSummaryListItem name="Last name" description="Smith"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="First name" description="George"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="Middle name" description="Not applicable"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="Sex" description="Male"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="Place of birth" description="Ottawa"></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Without caption action link</h3>
					<OntarioSummaryList id="ontario-summary-list-no-action" caption="Contact details" headingLevel="h3">
						<OntarioSummaryListItem name="Email" description="gsmith@gmail.com"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="Phone number" description="123-456-7890"></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Full width</h3>
					<OntarioSummaryList
						id="ontario-summary-list-full-width"
						caption="Summary"
						headingLevel="h3"
						fullWidth
						captionActionLink={{ href: '/change-address' }}
					>
						<OntarioSummaryListItem name="Address" description="111 Wellington St."></OntarioSummaryListItem>
						<OntarioSummaryListItem name="City" description="Toronto"></OntarioSummaryListItem>
						<OntarioSummaryListItem name="Province" description="Ontario"></OntarioSummaryListItem>
					</OntarioSummaryList>
				</div>

				<div>
					<h2>Summary List Item Variants</h2>

					<h3>Row with action link</h3>
					<OntarioSummaryList caption="Address" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-with-action"
							name="Address"
							description="111 Wellington St."
							actionLink={{ href: '/change-address' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Row without action link</h3>
					<OntarioSummaryList caption="Address" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-no-action"
							name="Address"
							description="111 Wellington St."
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Row with custom action label</h3>
					<OntarioSummaryList caption="Address" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-custom-label"
							name="Address"
							description="111 Wellington St."
							actionLink={{ href: '/edit-address', label: 'Edit' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Compact row</h3>
					<OntarioSummaryList caption="Address" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-compact"
							name="Address"
							description="111 Wellington St."
							compact
							actionLink={{ href: '/change-address' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<h3>Compact row without action link</h3>
					<OntarioSummaryList caption="Address" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-compact-no-action"
							name="Address"
							description="111 Wellington St."
							compact
						></OntarioSummaryListItem>
					</OntarioSummaryList>
				</div>
			</Grid>
		</main>
	);
}
