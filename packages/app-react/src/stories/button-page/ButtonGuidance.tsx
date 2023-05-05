import React from 'react';

export default function ButtonGuidance() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h3 className="ontario-h4 ontario-margin-top-24-!">Disabled buttons</h3>
				<p>
					Disabling buttons until users have correctly completed a form can cause usability and accessibility problems.
					Disabled buttons can create barriers for assistive technology users and users with physical or cognitive
					impairments, and they can be confusing and frustrating for all users because they do not help the user
					understand what they need to do to proceed.
				</p>
				<p>
					A better approach is to <strong></strong>keep buttons enabled and instead <strong></strong>develop error
					handling to provide clear feedback about any missed fields or input errors when the user tries to submit the
					form. For guidance on error messaging, see Page alerts.
				</p>
			</div>
		</div>
	);
}
