import React from 'react';

export default function HintWhenToUse() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h1>Hint</h1>
				<p className="ontario-lead-statement">Use clear and concise hint text to guide users as they fill out forms.</p>

				<h2>When to use this component</h2>
				<p>
					Use hint text to help users understand how to complete fields in a form. When adding hint text, the first
					choice should always be to display hint text without using a hint expander. Only use the hint expander option
					for less important or more complex information.
				</p>

				<ul>
					<li>
						If the information is <strong>very important</strong> and most or all users will need it, make it part of
						the form field label.
					</li>
					<li>
						If the information is <strong>fairly important</strong> and many users will need it, provide hint text that
						is visible by default.
					</li>
					<li>
						If the information is <strong>less important</strong> and only a minority of users will need it, put it in a
						hint expander.
					</li>
				</ul>
				<hr />
			</div>
		</div>
	);
}
