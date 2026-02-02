import { Grid } from '../../grid';
import { OntarioPageAlert } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioPageAlertPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-page-alert</h1>

				<h2>"page-alert-type" Prop Variants</h2>

				<h3>Informational</h3>
				<OntarioPageAlert type="informational" heading="Licence plates" id="ontario-page-alert-informational">
					<p>
						ServiceOntario centres may issue either a blue licence plate or a white embossed ‘Yours to Discover’ licence
						plate depending on availability. <a href="#">Learn more about replacing a licence plate</a>.
					</p>
				</OntarioPageAlert>

				<h3>Warning</h3>
				<OntarioPageAlert type="warning" heading="Service wait times" id="ontario-page-alert-warning">
					<p>
						We are experiencing longer than normal wait times at this ServiceOntario centre. You can{' '}
						<a href="#">check out our Service Finder</a> to see if the service you need is offered online or at a
						different centre nearby.
					</p>
				</OntarioPageAlert>

				<h3>Success</h3>
				<OntarioPageAlert
					type="success"
					heading="Your payment was successful and your order is now complete."
					content="Please look out for an email confirmation with your receipt and order number. Your licence plate sticker should arrive in 2-4 weeks."
					id="ontario-page-alert-success"
				></OntarioPageAlert>

				<h3>Error</h3>
				<OntarioPageAlert type="error" heading="There is a problem" id="ontario-page-alert-error">
					<p>Errors were found on this page:</p>
					<ul>
						<li>
							<a href="#">Your licence plate number must be a valid plate number</a>
						</li>
						<li>
							<a href="#">The odometer reading must be a valid number</a>
						</li>
						<li>
							<a href="#">The name field must not be empty</a>
						</li>
					</ul>
				</OntarioPageAlert>

				<hr />

				<h2>ontario-page-alert Edge Cases</h2>

				<h3>No type prop (should default to informational)</h3>
				<OntarioPageAlert id="ontario-page-alert-default" heading="Default type">
					<p>Defaults to informational.</p>
				</OntarioPageAlert>

				<h3>Invalid type (should warn + fall back)</h3>
				<OntarioPageAlert id="ontario-page-alert-invalid-type" type={'banana' as any} heading="Invalid type">
					<p>Invalid type value.</p>
				</OntarioPageAlert>

				<h3>No heading</h3>
				<OntarioPageAlert id="ontario-page-alert-no-heading" type="warning">
					<p>Missing heading prop.</p>
				</OntarioPageAlert>

				<h3>Both content prop and slot provided (content prop wins)</h3>
				<OntarioPageAlert
					id="ontario-page-alert-content-prop-vs-slot"
					type="success"
					heading="Content wins"
					content="This should render, not the slot."
				>
					<p>This slot should NOT appear.</p>
				</OntarioPageAlert>
			</Grid>
		</main>
	);
}
