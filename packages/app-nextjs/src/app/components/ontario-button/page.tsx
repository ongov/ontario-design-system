'use client';

import { useState } from 'react';
import { Grid } from '../../grid';
import {
	OntarioButton,
	OntarioIconAdd,
	OntarioIconChevronRight,
	OntarioIconDownload,
	OntarioIconMap,
} from '@ongov/ontario-design-system-component-library-react';

/**
 * NOTE: the leading/trailing icon examples below pass `slot` straight to the icon component, which only
 * works in this app with the `@stencil/ssr` slot patch (PR #428, `patches/@stencil__ssr@0.4.0.patch`), or
 * once a release includes the upstream fix: https://github.com/stenciljs/output-targets/pull/863
 *
 * Without either, `@stencil/ssr` wraps the icon in a `display:contents` div that doesn't carry `slot`, so
 * the browser never slots the icon and the button renders without it. Wrapping the icon in a plain
 * `<span slot="leading-icon">` works around that if this branch has to run without the patch.
 */
export default function OntarioButtonPage() {
	const [submitted, setSubmitted] = useState(false);

	return (
		<main>
			<Grid>
				<h1>ontario-button</h1>

				<div>
					<h2>"type" Prop Variants</h2>

					<h3>Primary</h3>
					<OntarioButton
						id="ontario-button-primary"
						type="primary"
						label="Primary Button"
						ariaLabelText="Click to perform primary action"
					></OntarioButton>

					<h3>Secondary</h3>
					<OntarioButton
						id="ontario-button-secondary"
						type="secondary"
						label="Secondary Button"
						onClick={() => alert('Clicked!')}
					></OntarioButton>

					<h3>Tertiary</h3>
					<OntarioButton id="ontario-button-tertiary" type="tertiary" label="Tertiary Button"></OntarioButton>
				</div>

				<div>
					<h2>"htmlType" Prop — Form Integration</h2>

					{submitted && <p id="form-submitted-message">Form submitted!</p>}

					<form
						id="ontario-button-form"
						onSubmit={(e) => {
							e.preventDefault();
							setSubmitted(true);
						}}
					>
						<input id="form-input" name="test-input" defaultValue="" />
						<OntarioButton id="ontario-button-submit" type="primary" htmlType="submit" label="Submit"></OntarioButton>
						<OntarioButton id="ontario-button-reset" type="secondary" htmlType="reset" label="Reset"></OntarioButton>
					</form>
				</div>

				<div>
					<h2>Icon-only buttons</h2>

					<OntarioButton id="ontario-button-icon-only-primary" type="primary" ariaLabelText="Open map">
						<OntarioIconMap colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-icon-only-secondary" type="secondary" ariaLabelText="Open map">
						<OntarioIconMap colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-icon-only-tertiary" type="tertiary" ariaLabelText="Open map">
						<OntarioIconMap colour="inherit" isDecorative={true} />
					</OntarioButton>
				</div>

				<div>
					<h2>Buttons with a leading icon</h2>

					<OntarioButton id="ontario-button-leading-icon-primary" type="primary" label="Add item">
						<OntarioIconAdd slot="leading-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-leading-icon-secondary" type="secondary" label="Add item">
						<OntarioIconAdd slot="leading-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-leading-icon-tertiary" type="tertiary" label="Add item">
						<OntarioIconAdd slot="leading-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
				</div>

				<div>
					<h2>Buttons with a trailing icon</h2>

					<OntarioButton id="ontario-button-trailing-icon-primary" type="primary" label="Next">
						<OntarioIconAdd slot="trailing-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-trailing-icon-secondary" type="secondary" label="Next">
						<OntarioIconAdd slot="trailing-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-trailing-icon-tertiary" type="tertiary" label="Next">
						<OntarioIconAdd slot="trailing-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
				</div>

				<div>
					<h2>Buttons with leading and trailing icons</h2>

					<OntarioButton id="ontario-button-both-icons-primary" type="primary" label="Download report">
						<OntarioIconDownload key="leading-icon" slot="leading-icon" colour="inherit" isDecorative={true} />
						<OntarioIconChevronRight key="trailing-icon" slot="trailing-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-both-icons-secondary" type="secondary" label="Download report">
						<OntarioIconDownload key="leading-icon" slot="leading-icon" colour="inherit" isDecorative={true} />
						<OntarioIconChevronRight key="trailing-icon" slot="trailing-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
					<OntarioButton id="ontario-button-both-icons-tertiary" type="tertiary" label="Download report">
						<OntarioIconDownload key="leading-icon" slot="leading-icon" colour="inherit" isDecorative={true} />
						<OntarioIconChevronRight key="trailing-icon" slot="trailing-icon" colour="inherit" isDecorative={true} />
					</OntarioButton>
				</div>
			</Grid>
		</main>
	);
}
