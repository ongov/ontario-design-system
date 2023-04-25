import React from 'react';
import Callout from '../../Prototype-Components/ontario-callouts-and-asides/ontario-callouts';

export default function HomeGetStarted() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<hr className="ontario-hr--dark" />
				<h2>Get started</h2>
			</div>

			<div className="ontario-columns ontario-large-6 ontario-margin-top-24-!">
				<h3 className="ontario-h4">For designers</h3>
				If you're creating mockups and prototypes,{' '}
				<a href="https://sb-designsystem.ontariogovernment.ca/alex/docs/documentation/for-designers.html">
					get the Ontario Design System fonts and prototyping kit
				</a>
				.
			</div>
			<div className="ontario-columns ontario-large-6 ontario-margin-top-24-!">
				<h3 className="ontario-h4">For developers</h3>
				If you're coding the website,{' '}
				<a href="https://sb-designsystem.ontariogovernment.ca/alex/docs/documentation/for-developers.html">
					learn how to install the distribution package and create custom components
				</a>
				.
			</div>

			<div className="ontario-columns ontario-large-12">
				<Callout />
			</div>
		</div>
	);
}
