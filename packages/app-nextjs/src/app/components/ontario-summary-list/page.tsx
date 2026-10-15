'use client';

import Link from 'next/link';
import { OntarioSummaryList, OntarioSummaryListItem } from '@ongov/ontario-design-system-component-library-react';
import { Grid } from '../../grid';

export default function OntarioSummaryListPage() {
	return (
		<main>
			<Grid>
				<div>
					<h1>ontario-summary-list</h1>
					<h2 id="summary-list">Summary list</h2>

					{/*
					Stencil reference (original)

					<ontario-summary-list caption="Personal information" heading-level="h3">
						<ontario-summary-list-item
							name="Last name"
							description="Smith"
							action-link='{"href":"#summary-list"}'
						></ontario-summary-list-item>
					</ontario-summary-list>

					<ontario-summary-list caption="Contact details" heading-level="h3" caption-action-link='{"href":"#summary-list"}'>
						<ontario-summary-list-item name="Email" description="gsmith@gmail.com"></ontario-summary-list-item>
					</ontario-summary-list>
					*/}

					<OntarioSummaryList caption="Personal information" headingLevel="h3">
						<OntarioSummaryListItem
							key="personal-last-name"
							name="Last name"
							description="Smith"
							actionLink={{ href: '#summary-list' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							key="personal-first-name"
							name="First name"
							description="George"
							actionLink={{ href: '#summary-list' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							key="personal-middle-name"
							name="Middle name"
							description="Not applicable"
							actionLink={{ href: '#summary-list' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							key="personal-sex"
							name="Sex"
							description="Male"
							actionLink={{ href: '#summary-list' }}
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							key="personal-birth-place"
							name="Place of birth"
							description="Ottawa"
							actionLink={{ href: '#summary-list' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<div className="ontario-margin-top-24-!">
					<OntarioSummaryList
						caption="Contact details"
						headingLevel="h3"
						captionActionLink={{ href: '#summary-list' }}
					>
						<OntarioSummaryListItem
							key="contact-email"
							name="Email"
							description="gsmith@gmail.com"
						></OntarioSummaryListItem>
						<OntarioSummaryListItem
							key="contact-phone"
							name="Phone number"
							description="123-456-7890"
						></OntarioSummaryListItem>
					</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Mixed rows (action slot override)" headingLevel="h3">
						<OntarioSummaryListItem
								key="mixed-last-name"
								name="Last name"
								description="Smith"
								actionLink={{ href: '#summary-list' }}
						></OntarioSummaryListItem>
							<OntarioSummaryListItem key="mixed-first-name" name="First name" description="George">
								<Link slot="action" href="#summary-list">
									Change
									<span className="ontario-show-for-sr"> your answer for: First name</span>
								</Link>
							</OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="mixed-middle-name"
								name="Middle name"
								description="Not applicable"
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Key: Value ratio 1:1" headingLevel="h3" columnRatio="1-1">
							<OntarioSummaryListItem
								key="ratio-1-1-row-1"
								name="Key: Value ratio 1:1"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="ratio-1-1-row-2"
								name="Key: Value ratio 1:1"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Key: Value ratio 1:2" headingLevel="h3" columnRatio="1-2">
							<OntarioSummaryListItem
								key="ratio-1-2-row-1"
								name="Key: Value ratio 1:2"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="ratio-1-2-row-2"
								name="Key: Value ratio 1:2"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Key: Value ratio 1:3" headingLevel="h3" columnRatio="1-3">
							<OntarioSummaryListItem
								key="ratio-1-3-row-1"
								name="Key: Value ratio 1:3"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="ratio-1-3-row-2"
								name="Key: Value ratio 1:3"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Key: Value ratio 2:1" headingLevel="h3" columnRatio="2-1">
							<OntarioSummaryListItem
								key="ratio-2-1-row-1"
								name="Key: Value ratio 2:1"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="ratio-2-1-row-2"
								name="Key: Value ratio 2:1"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Key: Value ratio 2:3" headingLevel="h3" columnRatio="2-3">
							<OntarioSummaryListItem
								key="ratio-2-3-row-1"
								name="Key: Value ratio 2:3"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="ratio-2-3-row-2"
								name="Key: Value ratio 2:3"
								description="Value"
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<div className="ontario-margin-top-24-!">
						<OntarioSummaryList caption="Full width (12-column)" headingLevel="h3" fullWidth>
							<OntarioSummaryListItem
								key="full-width-row-1"
								name="Key"
								description="Value content spanning the full page width — no max-width constraint."
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
							<OntarioSummaryListItem
								key="full-width-row-2"
								name="Supporting details"
								description="Compare this row width against the 8-column examples above."
								actionLink={{ href: '#summary-list' }}
							></OntarioSummaryListItem>
						</OntarioSummaryList>
					</div>

					<h2>Summary list item variants</h2>

					<OntarioSummaryList caption="Row with action link" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-with-action"
							name="Address"
							description="111 Wellington St."
							actionLink={{ href: '/change-address' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<OntarioSummaryList caption="Row without action link" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-no-action"
							name="Address"
							description="111 Wellington St."
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<OntarioSummaryList caption="Row with custom action label" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-custom-label"
							name="Address"
							description="111 Wellington St."
							actionLink={{ href: '/edit-address', label: 'Edit' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<OntarioSummaryList caption="Compact row" headingLevel="h3">
						<OntarioSummaryListItem
							id="ontario-summary-list-item-compact"
							name="Address"
							description="111 Wellington St."
							compact
							actionLink={{ href: '/change-address' }}
						></OntarioSummaryListItem>
					</OntarioSummaryList>

					<OntarioSummaryList caption="Compact row without action link" headingLevel="h3">
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
