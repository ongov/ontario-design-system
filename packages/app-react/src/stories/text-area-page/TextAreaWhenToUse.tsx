import React from 'react';

export default function TextAreaWhenToUse() {
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h1 className="ontario-h1">Text areas</h1>
					<p className="ontario-lead-statement">
						Use a text area when you want the user to enter <strong>more than</strong> a single line of information.
					</p>
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>When to use this component</h2>
					<p>
						A text area (or text box) is a <strong>multi-line field</strong> where the user can type in information.
					</p>

					<p>
						Use a text area when you want the user to enter <strong>more than</strong> a single line of information.
					</p>

					<p>Do not use a text area if:</p>
					<ul>
						<li>
							<p>
								you want users to enter answers that are only <strong>one line</strong> (instead, consider a <a href="/ontario-text-input">text input</a>)
							</p>
						</li>
						<li>
							<p>
								it will be easier for the user to choose from a <strong>set list of options</strong>
							</p>
							<ul>
								<li>
									users can find open-ended questions difficult to answer, so only use them when it doesn’t make sense to give them answers to choose from with a{' '}
									<a href="https://designsystem.ontario.ca/components/detail/dropdown-lists.html">dropdown list</a>,{' '}
									<a href="https://designsystem.ontario.ca/components/detail/radio-buttons.html">radio buttons</a> or{' '}
									<a href="https://designsystem.ontario.ca/components/detail/checkboxes.html">checkboxes</a>
								</li>
							</ul>
						</li>
					</ul>
					<hr />
				</div>
			</div>
		</>
	);
}
