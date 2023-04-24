import React from 'react';

export default function TextInputWhenToUse() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h1>Text inputs</h1>
				<p className="ontario-lead-statement">
					Use a text input when you want the user to enter no more than a single line of information.
				</p>

				<h2>When to use this component</h2>
				<p>
					A text input is a <strong>single-line field</strong> where the user can type in information.
				</p>

				<p>Use a text input if:</p>
				<ul>
					<li>
						you want the user to enter <strong>no more than a single line</strong> of information
					</li>
					<li>
						you need <strong>unique information</strong> from the user such as their name or phone number
					</li>
					<li>
						it’s <strong>faster for the user</strong> to write out an answer rather than choose from a list
					</li>
				</ul>

				<p>Do not use a text input if:</p>
				<ul>
					<li>
						you want users to enter answers that are <strong>longer than one line</strong> (instead, consider a{' '}
						<a href="/ontario-text-area">text area</a>)
					</li>
					<li>
						you want users to choose from a <strong>set list of responses</strong> such as yes or no (instead, consider{' '}
						<a href="https://designsystem.ontario.ca/components/detail/radio-buttons.html">radio buttons</a>,{' '}
						<a href="https://designsystem.ontario.ca/components/detail/checkboxes.html">checkboxes</a> or{' '}
						<a href="https://designsystem.ontario.ca/components/detail/dropdown-lists.html">dropdown lists</a>)
					</li>
				</ul>
				<hr />
			</div>
		</div>
	);
}
