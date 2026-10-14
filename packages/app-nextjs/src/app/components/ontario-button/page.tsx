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
						{/* The generated React wrapper for icon components puts the real custom element inside an
						extra `display:contents` div and doesn't forward `slot` onto that div, so native slot
						assignment (which only looks at direct children) never finds it. Wrapping in a plain
						`<span slot="...">` ourselves works around this. */}
						<span slot="leading-icon">
							<OntarioIconAdd colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
					<OntarioButton id="ontario-button-leading-icon-secondary" type="secondary" label="Add item">
						<span slot="leading-icon">
							<OntarioIconAdd colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
					<OntarioButton id="ontario-button-leading-icon-tertiary" type="tertiary" label="Add item">
						<span slot="leading-icon">
							<OntarioIconAdd colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
				</div>

				<div>
					<h2>Buttons with a trailing icon</h2>

					<OntarioButton id="ontario-button-trailing-icon-primary" type="primary" label="Next">
						<span slot="trailing-icon">
							<OntarioIconAdd colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
					<OntarioButton id="ontario-button-trailing-icon-secondary" type="secondary" label="Next">
						<span slot="trailing-icon">
							<OntarioIconAdd colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
					<OntarioButton id="ontario-button-trailing-icon-tertiary" type="tertiary" label="Next">
						<span slot="trailing-icon">
							<OntarioIconAdd colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
				</div>

				<div>
					<h2>Buttons with leading and trailing icons</h2>

					<OntarioButton id="ontario-button-both-icons-primary" type="primary" label="Download report">
						<span key="leading-icon" slot="leading-icon">
							<OntarioIconDownload colour="inherit" isDecorative={true} />
						</span>
						<span key="trailing-icon" slot="trailing-icon">
							<OntarioIconChevronRight colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
					<OntarioButton id="ontario-button-both-icons-secondary" type="secondary" label="Download report">
						<span key="leading-icon" slot="leading-icon">
							<OntarioIconDownload colour="inherit" isDecorative={true} />
						</span>
						<span key="trailing-icon" slot="trailing-icon">
							<OntarioIconChevronRight colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
					<OntarioButton id="ontario-button-both-icons-tertiary" type="tertiary" label="Download report">
						<span key="leading-icon" slot="leading-icon">
							<OntarioIconDownload colour="inherit" isDecorative={true} />
						</span>
						<span key="trailing-icon" slot="trailing-icon">
							<OntarioIconChevronRight colour="inherit" isDecorative={true} />
						</span>
					</OntarioButton>
				</div>
			</Grid>
		</main>
	);
}
