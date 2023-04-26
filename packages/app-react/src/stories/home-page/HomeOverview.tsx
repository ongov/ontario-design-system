import React from 'react';

export default function HomeOverview() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Overview</h2>
			</div>
			<div className="ontario-columns ontario-medium-12 ontario-large-8 ontario-margin-top-24-!">
				<p>A design system is a collection of building blocks for designing and developing websites and apps.</p>
				<p>
					The Ontario Design System includes things like buttons, navigation and form fields — and defines how they
					should look and behave.
				</p>
				<p>The design system helps you create Government of Ontario products that:</p>
				<div className="ontario-columns ontario-large-12">
					<div className="ontario-lists--two-column-list-md">
						<ul>
							<li>look consistent</li>
							<li>align with the Ontario brand</li>
							<li>use tried-and-tested code</li>
							<li>are accessible</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="ontario-connect ontario-aside ontario-columns ontario-small-11 ontario-medium-11 ontario-large-3">
				<h3 className="ontario-h5">Connect with us</h3>
				<p>
					<a href="https://designsystem.ontario.ca/docs/help-feedback.html#attend-a-drop-in-session">
						Join our drop-in sessions
					</a>{' '}
					to talk shop or get help.{' '}
					<a href="https://medium.com/ontariodigital/tagged/design-systems">You can also read our blog.</a>
				</p>
			</div>
		</div>
	);
}
