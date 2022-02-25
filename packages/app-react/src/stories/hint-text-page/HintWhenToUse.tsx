import React from 'react';

export default function HintWhenToUse() {
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h1 className="ontario-h1">Hint</h1>
					<p className="ontario-lead-statement">Use clear and concise hint text to guide users as they fill out forms.</p>
				</div>
			</div>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>When to use this component</h2>
					<p>
						Use hint text to help users understand how to complete fields in a form. When adding hint text, the first choice should always be to display hint text without using a
						hint expander. Only use the hint expander option for less important or more complex information.
					</p>

					<ul>
						<li>
							<p>
								If the information is <strong>very important</strong> and most or all users will need it, make it part of the form field label.
							</p>
						</li>
						<li>
							<p>
								If the information is <strong>fairly important</strong> and many users will need it, provide hint text that is visible by default.
							</p>
						</li>
						<li>
							<p>
								If the information is <strong>less important</strong> and only a minority of users will need it, put it in a hint expander.
							</p>
						</li>
					</ul>
					<hr />
				</div>
			</div>
		</>
	);
}
