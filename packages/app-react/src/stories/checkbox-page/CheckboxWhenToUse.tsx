import React from 'react';

export default function CheckboxWhenToUse() {
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h1>Checkboxes</h1>
					<p className="ontario-lead-statement">
						Use checkboxes when you want the user to select one or more options from a list.
					</p>

					<h2>When to use this component</h2>
					<p>Use checkboxes when you want the user to:</p>
					<ul>
						<li>
							select <strong>more than one option</strong> from a list
						</li>
						<li>
							<strong>sign off</strong> or agree to something using a single checkbox
						</li>
					</ul>

					<p>
						If you want the user to select <strong>only one option</strong> use a list with radio buttons.
					</p>
					<hr />
				</div>
			</div>
		</>
	);
}
